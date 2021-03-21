var sortedTimestampInsert = function (arr, e) {
    
    if (arr.length == 0) {
        arr.push(e);
      return e;
    }
    let i = arr.length - 1;
    while (i >= 0) {
        if (arr[i]['timestamp'] < e['timestamp']) {
            arr.splice(i+1, 0, e);
        return arr
      }
      i--
    }
    arr.splice(0, 0, e);
    return arr
  }
export default {



    fetchMessages: function (address, messages){
        return this.$IOTA.findTransactionObjects({ addresses: [address] })
        .then(transactions => {
            for (let i = 0; i < transactions.length; i++) {
                let transaction = transactions[i]
                
                this.$IOTA.getBundle(transaction.hash)
                .then(bundle => {
                    let msg = this.$Extract.extractJson(bundle)
                    let msg2 = JSON.parse(msg)
                    if (!msg2['message'] && !msg2['name']) {
                        return null
                    }
                    if(messages.findIndex((element) => element['hash'] == bundle[0].hash) < 0){
                        msg2['timestamp'] = transaction.timestamp
                        msg2['hash'] = bundle[0].hash
                        sortedTimestampInsert(messages, msg2)
                    }
                    return null
                    
                })
                .catch(err => {
                    console.error(err);
                    return null
                });
              }
              return null;
    
        })
        .catch(err => {
            console.log(err)
            return null;
            // ...
        })
    },
    
        fetchMessagesWithTags: function (address, callbck, tags){
            return this.$IOTA.findTransactionObjects({ addresses: [address], tags:tags })
            .then(transactions => {
                for (let i = 0; i < transactions.length; i++) {
                    let transaction = transactions[i]
                    
                    this.$IOTA.getBundle(transaction.hash)
                    .then(bundle => {
                        let msg = this.$Extract.extractJson(bundle)
                        let msg2 = JSON.parse(msg)
                        callbck(msg2)
                        return null
                        
                    })
                    .catch(err => {
                        //console.error(err);
                        return err
                    });
                  }
                  return null;
        
            })
            .catch( err => {
                //console.log(err)
                return err;
                // ...
            })
    },
    postMessage: function (message, addr, tag="9999999999999999999999") {
        const jsonThread = JSON.stringify(message)
        const messageInTrytes = this.$Converter.asciiToTrytes(jsonThread)
  
        const seed =
        'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
        const depth = 3;
        const minimumWeightMagnitude = 9;
        console.log(messageInTrytes.length)
        const transfers = [
        {
            value: 0,
            address: addr,
            message: messageInTrytes,
            tag:tag
        }
        ];
  
        this.$IOTA.prepareTransfers(seed, transfers)
        .then(trytes => {
            return this.$IOTA.sendTrytes(trytes, depth, minimumWeightMagnitude);
        })
        .then(bundle => {
            console.log(bundle[0].hash)
  
        })
        .catch(err => {
            console.error(err)
        });
  
      },
    generateAddressFromName: function (name, timestamp) {
        return this.$boardName + this.$Converter.asciiToTrytes(this.$MD5(name+timestamp))
    },
    generateTag: function (name) {
        return this.$Converter.asciiToTrytes(this.$MD5(name)).slice(0,27)
    }
  }
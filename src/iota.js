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
                        msg2['timestamp'] = bundle[0].timestamp
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
    postMessage: function (message, addr) {

        const jsonThread = JSON.stringify(message)
        const messageInTrytes = this.$Converter.asciiToTrytes(jsonThread)
  
        const seed =
        'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
        const depth = 3;
        const minimumWeightMagnitude = 9;
        const transfers = [
        {
            value: 0,
            address: addr,
            message: messageInTrytes
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
      postThread: function (message, addr) {

        const jsonThread = JSON.stringify(message)
        const messageInTrytes = this.$Converter.asciiToTrytes(jsonThread)
  
        const seed =
        'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
        const depth = 3;
        const minimumWeightMagnitude = 9;
        const transfers = [
        {
            value: 0,
            address: addr,
            message: messageInTrytes
        }
        ];
  
        return this.$IOTA.prepareTransfers(seed, transfers)
        .then(trytes => {
            return this.$IOTA.sendTrytes(trytes, depth, minimumWeightMagnitude);
        })
      },
    generateAddressFromName: function (name, timestamp) {
        return this.$boardName + this.$Converter.asciiToTrytes(this.$MD5(name+timestamp))
    }
  }
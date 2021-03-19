export default {
    fetchMessages: function (address, messages){
        return this.$IOTA.findTransactionObjects({ addresses: [address] })
        .then(transactions => {
            for (let i = 0; i < transactions.length; i++) {
                let transaction = transactions[i]
                this.$IOTA.getBundle(transaction.hash)
                .then(bundle => {
                    let msg = this.$Extract.extractJson(bundle)
                    if(messages.indexOf(msg) < 0){
                        messages.push(msg)
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
    generateAddressFromName: function (name) {
        return this.$boardName + this.$Converter.asciiToTrytes(this.$MD5(name))
    }
  }
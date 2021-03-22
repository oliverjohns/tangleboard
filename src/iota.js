let UTFConverter = require('tryte-utf8-json-codec');
import {globalSettings} from './main.js'
var sortedTimestampInsert = function (arr, e, reverse) {
    
    if (arr.length == 0) {
        arr.push(e);
      return e;
    }
    let i = arr.length - 1;
    while (i >= 0) {
        if (reverse) {
            if (arr[i]['timestamp'] > e['timestamp']) {
                arr.splice(i+1, 0, e);
                return arr
            }
        } else {
            if (arr[i]['timestamp'] < e['timestamp']) {
                arr.splice(i+1, 0, e);
                return arr
            }
        }
        
      i--
    }
    arr.splice(0, 0, e);
    return arr
  }
var ExtractBundle = function (bundle){
    let data = new Array(bundle[0].lastIndex)
    for (let i = 0; i<=bundle[0].lastIndex; i++){
        data[bundle[i].currentIndex] = bundle[i].signatureMessageFragment
    }
    return UTFConverter.utf8StringFromTrytes(data.join())
    
}
export default {
    addMessage: function(bundle, messages){
        let msg = JSON.parse(ExtractBundle(bundle))
        msg['timestamp'] = bundle[0].timestamp
        msg['hash'] = bundle[0].hash
        messages.push(msg)
    },
    fetchMessages: function (address, messages, reverse = false){
        return this.$IOTA.findTransactionObjects({ addresses: [address] })
        .then(transactions => {
            for (let i = 0; i < transactions.length; i++) {
                let transaction = transactions[i]
                
                this.$IOTA.getBundle(transaction.hash)
                .then(bundle => {
                    let msg = ExtractBundle(bundle)
                    let msg2 = JSON.parse(msg)
                    if (!msg2['message'] && !msg2['name']) {
                        return null
                    }
                    if(messages.findIndex((element) => element['hash'] == bundle[0].hash) < 0){
                        msg2['timestamp'] = bundle[0].timestamp
                        msg2['hash'] = bundle[0].hash
                        sortedTimestampInsert(messages, msg2, reverse)
                    }
                    return null
                    
                })
                .catch(() => {
                    //console.error(err);
                    return null
                });
              }
              return null;
    
        })
        .catch(() => {
            //console.log(err)
            return null;
            // ...
        })
        
    },
   
    
    postMessage: function (message, addr) {

        const jsonThread = JSON.stringify(message)
        const messageInTrytes = this.$UTFConverter.trytesFromUTF8String(jsonThread)
  
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
        .catch(err => {
            console.error(err)
            return null
        });
  
      },
      postThread: function (message, addr) {

        const jsonThread = JSON.stringify(message)
        const messageInTrytes = this.$UTFConverter.trytesFromUTF8String(jsonThread)
  
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
        return globalSettings.boardName + 'A'.repeat(17 - globalSettings.boardName.length) +  this.$Converter.asciiToTrytes(this.$MD5(name+timestamp))
    }
  }

import {globalSettings} from './main.js'
var signAlgorithm = {
    name: "RSASSA-PKCS1-v1_5",
    hash: {
      name: "SHA-256"
    },
    modulusLength: 2048,
    extractable: true,
    publicExponent: new Uint8Array([1, 0, 1])
  }
var scope = ["sign", "verify"]

function arrayBufferToBase64String(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer)
    var byteString = ''
    for (var i=0; i<byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i])
    }
    return btoa(byteString)
  }

  function base64StringToArrayBuffer(b64str) {
    var byteStr = atob(b64str)
    var bytes = new Uint8Array(byteStr.length)
    for (var i = 0; i < byteStr.length; i++) {
      bytes[i] = byteStr.charCodeAt(i)
    }
    return bytes.buffer
  }

  function textToArrayBuffer(str) {
    var buf = unescape(encodeURIComponent(str)) // 2 bytes for each char
    var bufView = new Uint8Array(buf.length)
    for (var i=0; i < buf.length; i++) {
      bufView[i] = buf.charCodeAt(i)
    }
    return bufView
  }




function convertBinaryToPem(binaryData, label) {
    var base64Cert = arrayBufferToBase64String(binaryData)
    var pemCert = "-----BEGIN " + label + "-----\r\n"
    var nextIndex = 0
    while (nextIndex < base64Cert.length) {
      if (nextIndex + 64 <= base64Cert.length) {
        pemCert += base64Cert.substr(nextIndex, 64) + "\r\n"
      } else {
        pemCert += base64Cert.substr(nextIndex) + "\r\n"
      }
      nextIndex += 64
    }
    pemCert += "-----END " + label + "-----\r\n"
    return pemCert
  }

  function convertPemToBinary(pem) {
    var lines = pem.split('\n')
    var encoded = ''
    for(var i = 0;i < lines.length;i++){
      if (lines[i].trim().length > 0 &&
          lines[i].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
          lines[i].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
          lines[i].indexOf('-END RSA PRIVATE KEY-') < 0 &&
          lines[i].indexOf('-END RSA PUBLIC KEY-') < 0) {
        encoded += lines[i].trim()
      }
    }
    return base64StringToArrayBuffer(encoded)
  }
export default {
    generateKey:  function () {
        return new Promise(function(resolve) {
          var genkey = crypto.subtle.generateKey(signAlgorithm, true, scope)
          genkey.then(function (pair) {
            resolve(pair)
          })
        })
    },

    signData: async function (data) {
        return arrayBufferToBase64String(await window.crypto.subtle.sign(signAlgorithm, globalSettings.PrivateKey, textToArrayBuffer(data)))
    },
    exportPublicKey: function () {
        return new Promise(function(resolve) {
          window.crypto.subtle.exportKey('spki', globalSettings.PublicKey).
          then(function(spki) {
            resolve(convertBinaryToPem(spki, "RSA PUBLIC KEY"))
          })
        })
    },
    importPublicKey: function (pemKey) {
        return new Promise(function(resolve) {
          var importer = crypto.subtle.importKey("spki", convertPemToBinary(pemKey), signAlgorithm, true, ["verify"])
          importer.then(function(key) {
            resolve(key)
          })
        })
    },
    VerifySig: function (pub, sig, data) {
        return crypto.subtle.verify(signAlgorithm, pub, base64StringToArrayBuffer(sig), textToArrayBuffer(data))
    }
   
  
  }
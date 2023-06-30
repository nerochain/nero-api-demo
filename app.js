var request = require('request');
var faucetOptions = {
  'method': 'POST',
  'url': 'https://api.nerochain.io/api/v1/userFaucet',
  'headers': {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "NERO Faucet",
    "data": {
      "to": "0xRecipientAddress",
      "value": 0.1,
      "gas": 21000
    }
  })
};

// Create a faucet transaction
request(faucetOptions, function (error, faucetResponse) {
  if (error) throw new Error(error);
  if (faucetResponse.statusCode === 201) {
    var transactionHash = JSON.parse(faucetResponse.body).transactionHash;
    console.log("Faucet transaction created. Transaction hash:", transactionHash);

    // Send a message
    var messageOptions = {
      'method': 'POST',
      'url': 'https://api.nerochain.io/api/v1/sendMessage',
      'headers': {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": "send my message",
        "data": {
          "to": "0xRecipientAddress",
          "data": "Your message"
        }
      })
    };

    request(messageOptions, function (error, messageResponse) {
      if (error) throw new Error(error);
      if (messageResponse.statusCode === 201) {
        var messageTransactionHash = JSON.parse(messageResponse.body).transactionHash;
        console.log("Message sent. Transaction hash:", messageTransactionHash);
      } else {
        console.log("Failed to send the message:", messageResponse.statusCode);
      }
    });
  } else {
    console.log("Failed to create the faucet transaction:", faucetResponse.statusCode);
  }
});

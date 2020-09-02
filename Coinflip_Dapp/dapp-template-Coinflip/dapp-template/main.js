var web3 = new Web3(Web3.givenProvider);
var contractInstance;
//var valueContract = 5000000000000000000;

//Type in command prompt: python -m http.server
//Type in web browser: localhost:8000
//Connect Metamask in web browser to local host (port 7545)

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x454d7E229dfA665dc8e27b6f8127FF7Dbd5990a0", {from: accounts[0]});
      console.log(contractInstance)
    });
    //$("heads_button").click(headsInput)
    //$("tails_button").click(tailsInput)
    $("#top_up_button").click(topUpInput)
    $("#get_contract_balance_button").click(getContractBalanceOutput)
    $("#withdraw_funds_button").click(withdrawFundsOutput)

});



/*function headsInput(){

}

function tailsInput(){

}*/


// This function currently DEPOSITS funds instead of withdrawing them
// @ comment 119/333 and working upwards from there
function withdrawFundsOutput(balanceToTransfer){
  var balanceToTransfer = $("#withdraw_funds_output").val();
  balanceToTransfer = web3.utils.toWei(balanceToTransfer, "ether");
  /*config = {
    value: web3.utils.toWei(balanceToTransfer, "ether"),
    //from: accounts[0]
  }*/

  //contractInstance.methods.withdrawFunds(web3.utils.toWei(balanceToTransfer, "ether")).send(config)
  // See https://stackoverflow.com/questions/59855799/how-to-resolve-this-error-in-solidity-the-constructor-should-be-payable-if-you
  // on using payable on a withdrawal function
  /*contractInstance.methods.withdrawFunds(balanceToTransfer).send().then(function(res){
    var etherAmount = web3.utils.fromWei(res, "ether");
          alert("Fund have been withdrawn: " + etherAmount);
    });*/

  contractInstance.methods.withdrawFunds(balanceToTransfer).send()
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    alert("Done");
  })
}


//works! 27/08/20
function topUpInput(){
  var top_up = $("#top_up_input").val();
  var config = {
    value: web3.utils.toWei(top_up.toString(), "ether"),
    gas: 100000
  }

  contractInstance.methods.topUpContract().send(config)
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    alert("Done");
  })
}

//works! 27/08/2020
//doesn't work 29/08/2020
function getContractBalanceOutput(){
  contractInstance.methods.getContractBalance().call().then(function(res){
    $("#balance_output").text(web3.utils.fromWei(res, 'ether') + " ETH");
    console.log(web3.utils.fromWei(res, 'ether') + " ETH");
  })
}

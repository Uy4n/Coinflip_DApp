const Coinflip = artifacts.require("Coinflip");
// Deploying the contract with an inital value by making a payable constructor
module.exports = function(deployer, network, accounts) {
  deployer.deploy(Coinflip).then(function(instance){
    instance.topUpContract({value: web3.utils.toWei("5", "ether"), from: accounts[0]})
  });

};

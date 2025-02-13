const VotingApplication = artifacts.require("VotingApplication");

module.exports = function(deployer) {
  deployer.deploy(VotingApplication);
};

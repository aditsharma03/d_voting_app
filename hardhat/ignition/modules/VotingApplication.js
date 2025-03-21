// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

//const JAN_1ST_2030 = 1893456000;
//const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("VotingApplicationModule", (m) => {
  //const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  //const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const voting_application = m.contract("VotingApplication", [] );

  return { voting_application };
});

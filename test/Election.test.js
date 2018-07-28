// const chai = require('chai');
// const Web3 = require('web3');
// const ganache = require('ganache-cli');

// const { expect } = chai;
// const provider = ganache.provider();
// const web3 = new Web3(provider);

// const compiledFactory = require('../ethereum/build/ElectionFactory.json');
// const compiledElection = require('../ethereum/build/Election.json');

// let accounts;
// let factory;
// let election;
// let electionAddress;

// beforeEach(async () => {
//   accounts = await web3.eth.getAccounts();

//   factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
//     .deploy({ data: compiledFactory.bytecode })
//     .send({ from: accounts[0], gas: '1000000' });

//   await factory.methods.createElection().send({
//     from: accounts[1],
//     gas: '1000000'
//   });

//   [electionAddress] = await factory.methods.getDeployedElections().call();
//   election = await new web3.eth.Contract(
//     JSON.parse(compiledElection.interface),
//     electionAddress
//   );
// });

// describe('Elections', () => {
//   it('should deploy a election factory and a election', async () => {
//     expect(election.options).to.have.property('address');
//   });

//   it('should mark caller as election admin', async () => {
//     const admin = await election.methods.admin().call();

//     expect(admin).to.equal(accounts[1]);
//   });

//   it('should allow admin to add new voter to election', async () => {
//     await election.methods.addVoter(accounts[2]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     const isVoter = await election.methods.voters(accounts[2]).call();

//     expect(isVoter).to.be.true;
//   });

//   it('should not allow non admin to add new voter to election', async () => {
//     try {
//       await election.methods.addVoter(accounts[2]).send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//       expect(false).to.be.true;
//     } catch (err) {
//       expect(err).to.be.not.null;
//     }
//   });

//   it('should allow admin to add new candidate to election', async () => {
//     await election.methods.addCandidate('Naruto').send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     const candidate = await election.methods.candidates(0).call();
//     expect(candidate.name).to.equal('Naruto');
//   });

//   it('should not allow non admin to add new voter to election', async () => {
//     try {
//       await election.methods.addCandidate('Naruto').send({
//         from: accounts[0],
//         gas: '1000000'
//       });

//       expect(false).to.be.true;
//     } catch (err) {
//       expect(err).to.be.not.null;
//     }
//   });

//   it('should return the current length of the candidates array', async () => {
//     const candidatesLength = await election.methods.getCandidatesCount().call();
//     expect(+candidatesLength).to.equal(0);
//   });

//   it('should have the candidates array incremented for each candidate', async () => {
//     await election.methods.addCandidate('Naruto').send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     await election.methods.addCandidate('Luffy').send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     const candidatesLength = await election.methods.getCandidatesCount().call();
//     expect(+candidatesLength).to.equal(2);
//   });

//   it('should let voter submit a vote', async () => {
//     await election.methods.addCandidate('Naruto').send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     await election.methods.addCandidate('Luffy').send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     const candidatesLength = await election.methods.getCandidatesCount().call();

//     expect(+candidatesLength).to.equal(2);

//     await election.methods.addVoter(accounts[2]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     await election.methods.submitVote('0').send({
//       from: accounts[2],
//       gas: '1000000'
//     });

//     const isVoted = await election.methods.votings(accounts[2]).call();
//     const candidate = await election.methods.candidates(0).call();

//     expect(isVoted).to.equal(true);
//     expect(+candidate.voteCount).to.equal(1);
//   });
// });

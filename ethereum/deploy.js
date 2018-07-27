const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'mushroom exist flag torch clip cement tortoise pen assault robust multiply unique',
  'https://rinkeby.infura.io/v3/0c042362a74d45a8926a5cd007bd323c'
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: '0x' + compiledFactory.bytecode })
      .send({ from: accounts[0], gas: '1000000' });
    console.log('Contract deployed to', result.options.address);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

deploy();

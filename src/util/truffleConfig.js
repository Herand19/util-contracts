const HDWalletProvider = require('truffle-hdwallet-provider')

const DEFAULT_GAS_PRICE = 5e9
const GAS_LIMIT = 5e6
const DEFAULT_MNEMONIC = 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'

function truffleConfig ({
  mnemonic = DEFAULT_MNEMONIC,
  gasPrice = DEFAULT_GAS_PRICE,
  gas = GAS_LIMIT,  
  aditionalNetwork,
  optimizedEnabled = false,
  urlKovan = 'https://kovan.infura.io/',
  urlRinkeby = 'http://node.rinkeby.gnosisdev.com:8545', // 'https://kovan.infura.io/',
  urlRopsten = 'https://ropsten.infura.io',
  urlMainnet = 'https://mainnet.infura.io',
  urlDevelopment = 'localhost',
  portDevelopment = 8545
}) {
  console.log(`Using gas limit: ${gas}`)
  console.log(`Using gas price: ${gasPrice}`)
  console.log(`Optimizer enabled: ${optimizedEnabled}`)
  console.log('Using default mnemonic: %s', mnemonic === DEFAULT_MNEMONIC)

  const networks = {
    development: {
      host: urlDevelopment,
      port: portDevelopment,
      gas, 
      gasPrice,
      network_id: '*'
    },
    live: {
      provider: _getProvider(urlMainnet),
      network_id: '1',
      gas,
      gasPrice
    },
    mainnet: {
      provider: _getProvider(urlMainnet),
      network_id: '0',
      gas,
      gasPrice
    },
    kovan: {
      provider: _getProvider(urlKovan),
      network_id: '42',
      gas,
      gasPrice
    },
    rinkeby: {
      provider: _getProvider(urlRinkeby),
      network_id: '4',
      gas,
      gasPrice
    },
    ropsten: {
      provider: _getProvider(urlRopsten),
      network_id: '3',
      gas,
      gasPrice
    }
  }

  if (aditionalNetwork) {
    // Add an aditional network
    // Useful, for example to better integration with docker-compose connectivity
    const { name, url, networkId, gas, gasPrice } = aditionalNetwork
    networks[name] = {
      provider: _getProvider(url),
      network_id: networkId,
      gas,
      gasPrice
    }
  }

  return {
    networks,
    solc: {
      optimizer: {
        enabled: optimizedEnabled
      }
    }
  }
}

function _getProvider (url) {
  return () => {
    return new HDWalletProvider(mnemonic, url)
  }
}

module.exports = truffleConfig
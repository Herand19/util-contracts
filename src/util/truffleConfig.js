const HDWalletProvider = require('truffle-hdwallet-provider')
const assert = require('assert')

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
  urlRinkeby = 'https://rinkeby.infura.io/', // 'http://node.rinkeby.gnosisdev.com:443',
  urlRopsten = 'https://ropsten.infura.io',
  urlMainnet = 'https://mainnet.infura.io',
  urlDevelopment = 'localhost',
  portDevelopment = 8545
}) {
  assert(mnemonic, 'The mnemonic has not been provided')
  console.log(`Using gas limit: ${gas}`)
  console.log(`Using gas price: ${gasPrice}`)
  console.log(`Optimizer enabled: ${optimizedEnabled}`)
  console.log('Using default mnemonic: %s', mnemonic === DEFAULT_MNEMONIC)

  const _getProvider = url => {
    return () => {
      return new HDWalletProvider(mnemonic, url)
    }
  }

  const networks = {
    development: {
      host: urlDevelopment,
      port: portDevelopment,
      gas,
      gasPrice,
      network_id: '*'
    },
    mainnet: {
      provider: _getProvider(urlMainnet),
      network_id: '1',
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

module.exports = truffleConfig

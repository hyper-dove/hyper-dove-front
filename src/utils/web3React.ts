import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from '@pancakeswap/sdk'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from '@pancakeswap/uikit'
import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'
import { Web3Provider } from '@ethersproject/providers'
import { CHAIN_ID } from 'config/constants/networks'
import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(CHAIN_ID, 10)

export const injected = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
})

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export async function activateInjectedProvider(providerName: 'Metamask' | 'Coinbase Wallet') {
  const { ethereum } = window
  console.log('ethereum = ', ethereum)
  if (!ethereum?.providers) {
    return undefined
  }

  let provider
  switch (providerName) {
    case 'Coinbase Wallet':
      provider = ethereum.providers.find(({ isCoinbaseWallet }) => isCoinbaseWallet)
      break
    case 'Metamask':
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask)
      break
  }
  console.log('provider ', provider)
  if (provider) {
    ethereum.setSelectedProvider(provider)
  }
  return true
}

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.BSC]: bscConnector,
  // [ConnectorNames.Blocto]: async () => {ㅇ
  //   const { BloctoConnector } = await import('@blocto/blocto-connector')
  //   return new BloctoConnector({ chainId, rpc: rpcUrl })
  // },
  // [ConnectorNames.WalletLink]: async () => {
  //   const { WalletLinkConnector } = await import('@web3-react/walletlink-connector')
  //   return new WalletLinkConnector({
  //     url: rpcUrl,
  //     appName: 'test',
  //     appLogoUrl: 'https://pancakeswap.com/logo.png',
  //     supportedChainIds: [ChainId.MAINNET, ChainId.TESTNET],
  //   })
  // },
} as const

export const getLibrary = (provider): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string,
): Promise<string> => {
  // if (window.BinanceChain && connector instanceof BscConnector) {
  //   const { signature } = await window.BinanceChain.bnbSign(account, message)
  //   return signature
  // }

  // /**
  //  * Wallet Connect does not sign the message correctly unless you use their method
  //  * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
  //  */
  // if (provider.provider?.wc) {
  //   const wcMessage = hexlify(toUtf8Bytes(message))
  //   const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
  //   return signature
  // }d

  return provider.getSigner().signMessage(message)
}

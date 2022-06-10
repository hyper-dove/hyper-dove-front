import Metamask from 'components/Common/Svg/Icons/Metamask'
import WalletConnect from 'components/Common/Svg/Icons/WalletConnect'
import TrustWallet from 'components/Common/Svg/Icons/TrustWallet'
import MathWallet from 'components/Common/Svg/Icons/MathWallet'
import TokenPocket from 'components/Common/Svg/Icons/TokenPocket'
import BinanceChain from 'components/Common/Svg/Icons/BinanceChain'
import SafePal from 'components/Common/Svg/Icons/SafePal'
import Coin98 from 'components/Common/Svg/Icons/Coin98'
import Blocto from 'components/Common/Svg/Icons/Blocto'
import CoinbaseWallet from 'components/Common/Svg/Icons/CoinbaseWallet'
import Opera from 'components/Common/Svg/Icons/Opera'

import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
    href: 'https://metamask.app.link/dapp/pancakeswap.finance/',
  },
  // {
  //   title: 'Binance Wallet',
  //   icon: BinanceChain,
  //   connectorId: ConnectorNames.BSC,
  //   priority: 2,
  // },
  {
    title: 'Coinbase Wallet',
    icon: CoinbaseWallet,
    //connectorId: ConnectorNames.WalletLink,
    connectorId: ConnectorNames.Injected,
    priority: 2,
  },
  // {
  //   title: 'Trust Wallet',
  //   icon: TrustWallet,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 4,
  //   href: 'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://pancakeswap.finance/',
  // },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 3,
  },
  {
    title: 'Fortmatic',
    icon: Blocto,
    connectorId: ConnectorNames.Fortmatic,
    priority: 999,
  },
  // {
  //   title: 'Opera Wallet',
  //   icon: Opera,
  //   connectorId: ConnectorNames.Injected,
  //   priority: () => {
  //     return typeof window !== 'undefined' && Boolean(window?.ethereum?.isOpera) ? 0 : 6
  //   },
  //   href: 'https://www.opera.com/crypto/next',
  // },
  // {
  //   title: 'MathWallet',
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  // },
  // {
  //   title: 'TokenPocket',
  //   icon: TokenPocket,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  // },
  // {
  //   title: 'SafePal',
  //   icon: SafePal,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  // },
  // {
  //   title: 'Coin98',
  //   icon: Coin98,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  // },
  // {
  //   title: 'Blocto',
  //   icon: Blocto,
  //   connectorId: ConnectorNames.Blocto,
  //   priority: 999,
  // },
]

export default connectors
export const connectorLocalStorageKey = 'connectorIdv2'
export const walletLocalStorageKey = 'wallet'

export const walletConnectConfig = connectors.find((c) => c.title === 'WalletConnect')

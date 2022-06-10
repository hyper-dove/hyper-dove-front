import { FC } from 'react'
import { SvgProps } from 'components/Common/Svg/types'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
  Blocto = 'blocto',
  WalletLink = 'walletlink',
  Fortmatic = 'fortmatic',
}

export type Login = (connectorId: ConnectorNames, connectorTitle: string) => void

export interface Config {
  title: string
  icon: FC<SvgProps>
  connectorId: ConnectorNames
  priority: number | (() => number)
  href?: string
}

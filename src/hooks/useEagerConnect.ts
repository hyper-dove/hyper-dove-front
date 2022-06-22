import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from '@pancakeswap/uikit'
import { walletLocalStorageKey } from 'components/widgets/WalletModal/config'
import useAuth from 'hooks/useAuth'
import { isMobile } from 'react-device-detect'
import { injected } from 'utils/web3React'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const _ethereumListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'ethereum', {
      get() {
        return this._eth
      },
      set(_eth) {
        this._eth = _eth

        resolve()
      },
    }),
  )

const safeGetLocalStorageItem = (key: string) => {
  try {
    return typeof window?.localStorage?.getItem === 'function' && (window?.localStorage?.getItem(key) as any)
  } catch (err) {
    // Ignore Local Storage Browser error
    // - NS_ERROR_FILE_CORRUPTED
    // - QuotaExceededError
    console.error(`Local Storage error: ${err?.message}`)

    return null
  }
}

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const tryLogin = (c: ConnectorNames, connectorTitle: string) => {
      setTimeout(() => login(c, connectorTitle))
    }

    const connectorId = safeGetLocalStorageItem(connectorLocalStorageKey)
    const connectorTitle = safeGetLocalStorageItem(walletLocalStorageKey)
    console.log('connectorId = ', connectorId)
    console.log('connectorTitle = ', connectorTitle)
    if (connectorId && connectorTitle) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      // if (isConnectorBinanceChain && !isBinanceChainDefined) {
      //   _binanceChainListener().then(() => login(connectorId))
      //   return
      // }
      if (connectorId === ConnectorNames.Injected) {
        const isEthereumDefined = Reflect.has(window, 'ethereum')

        // handle opera lazy inject ethereum
        if (!isEthereumDefined) {
          _ethereumListener().then(() => tryLogin(connectorId, connectorTitle))

          return
        }
        // somehow injected login not working well on development mode
        injected.isAuthorized().then(() => tryLogin(connectorId, connectorTitle))
      } else {
        tryLogin(connectorId, connectorTitle)
      }
    } else {
      // Dapp browse will try login even is not authorized.
      injected.isAuthorized().then(() => {
        if (isMobile && window.ethereum) {
          tryLogin(ConnectorNames.Injected, connectorTitle)
        }
      })
    }
  }, [login])
}

export default useEagerConnect

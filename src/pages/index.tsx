import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useEffect } from 'react'
import useToast from 'hooks/useToast'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { Box } from 'components/Common/Box'
import { Text } from 'components/Common/Text'

const IndexPage = () => {
  const { account, error } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const { logout } = useAuth()
  console.log(account)
  useEffect(() => {
    if (account) {
      toastSuccess(
        t('Provider Error'),
        <Box>
          <Text>{t('No provider was found')}</Text>
        </Box>,
      )
    }
    if (error) {
      toastError(
        t('Provider Error'),
        <Box>
          <Text>{t('No provider was found')}</Text>
        </Box>,
      )
    }
  }, [account, error])
  const handleDisconnect = () => {
    logout()
  }

  return (
    <div>
      {account && <button>{account}</button>}
      {account && <button onClick={handleDisconnect}>disconnect</button>}
      {!account && <ConnectWalletButton scale="sm" />}
    </div>
  )
}

export default IndexPage

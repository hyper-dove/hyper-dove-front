import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useEffect, useState } from 'react'
import useToast from 'hooks/useToast'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { Box } from 'components/Common/Box'
import { Text } from 'components/Common/Text'
import { signMessage } from 'utils/web3React'
import useWeb3Provider from 'hooks/useActiveWeb3React'

const IndexPage = () => {
  const { account, error } = useWeb3React()
  const { library, connector } = useWeb3Provider()
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

  const [isLoading, setIsLoading] = useState(false)
  const sign = async () => {
    try {
      setIsLoading(true)

      const signature = await signMessage(connector, library, account, 'test')
      console.log('signature = ', signature)
      alert(signature)
      // const response = await fetch(`${API_PROFILE}/api/users/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     address: account,
      //     username: userName,
      //     signature,
      //   }),
      // })
      // if (response.ok) {
      //   //setExistingUserState(ExistingUserState.CREATED)
      // } else {
      //   const data = await response.json()
      //   toastError(t('Error'), data?.error?.message)
      // }
    } catch (error) {
      toastError(error instanceof Error && error?.message ? error.message : JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleContract = () => {}

  return (
    <div>
      {account && <button>{account}</button>}
      {account && <button onClick={handleDisconnect}>disconnect</button>}
      {account && <button onClick={sign}>sign</button>}
      {!account && <ConnectWalletButton scale="sm" />}

      <div></div>
    </div>
  )
}

export default IndexPage

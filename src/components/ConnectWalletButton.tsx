import useWalletModal from 'components/widgets/WalletModal/useWalletModal'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Trans from './Trans'
import { ButtonProps } from 'components/Common/Button'

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const handleConnect = () => {
    onPresentConnectModal()
  }
  return (
    <button onClick={handleConnect} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </button>
  )
}

export default ConnectWalletButton

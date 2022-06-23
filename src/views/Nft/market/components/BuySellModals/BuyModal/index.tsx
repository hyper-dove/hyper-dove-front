import { useEffect, useState } from 'react'
import { InjectedModalProps } from '@pancakeswap/uikit'
import { MaxUint256, Zero } from '@ethersproject/constants'
import useTheme from 'hooks/useTheme'
import { useTranslation, TranslateFunction } from 'contexts/Localization'
import useTokenBalance, { useGetEthBalance, useGetEthBalance_ } from 'hooks/useTokenBalance'
// import { getBalanceNumber } from 'utils/formatBalance'
// import { ethersToBigNumber } from 'utils/bigNumber'
// import tokens from 'config/constants/tokens'
// import { CHAIN_ID } from 'config/constants/networks'
// import { ChainId } from '@pancakeswap/sdk'
import { parseUnits, formatEther } from '@ethersproject/units'
import { useERC20, useNftMarketPlaceContract, useNftMarketPlaceContract2 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
// import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
// import { requiresApproval } from 'utils/requiresApproval'
import useToast from 'hooks/useToast'
// import { ToastDescriptionWithTx } from 'components/Toast'
import { NftToken } from 'state/nftMarket/types'
import useCatchTxError from 'hooks/useCatchTxError'
import { StyledModal } from './styles'
import ReviewStage from './ReviewStage'
// import ConfirmStage from '../shared/ConfirmStage'
// import ApproveAndConfirmStage from '../shared/ApproveAndConfirmStage'
import { PaymentCurrency, BuyingStage } from './types'
// import TransactionConfirmed from '../shared/TransactionConfirmed'

const modalTitles = (t: TranslateFunction) => ({
  [BuyingStage.REVIEW]: t('Review'),
  [BuyingStage.APPROVE_AND_CONFIRM]: t('Back'),
  [BuyingStage.CONFIRM]: t('Back'),
  [BuyingStage.TX_CONFIRMED]: t('Transaction Confirmed'),
})

interface BuyModalProps extends InjectedModalProps {
  nftToBuy: NftToken
}

// NFT WBNB in testnet contract is different
// const wbnbAddress =
//   CHAIN_ID === String(ChainId.MAINNET) ? tokens.wbnb.address : '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f'

const BuyModal: React.FC<BuyModalProps> = ({ nftToBuy, onDismiss }) => {
  const [stage, setStage] = useState(BuyingStage.REVIEW)
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const [paymentCurrency, setPaymentCurrency] = useState<PaymentCurrency>(PaymentCurrency.ETH)
  const [isPaymentCurrentInitialized, setIsPaymentCurrentInitialized] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoadingTx } = useCatchTxError()
  const { account } = useWeb3React()
  // const wbnbContractReader = useERC20(wbnbAddress, false)
  // const wbnbContractApprover = useERC20(wbnbAddress)
  const { reader, signer } = useNftMarketPlaceContract2()

  const { toastSuccess } = useToast()

  const nftPriceWei = parseUnits(nftToBuy?.price, 'ether')
  const nftPrice = parseFloat(nftToBuy?.price)

  // BNB - returns ethers.BigNumber
  const { balance, fetchStatus: walletFetchStatus } = useGetEthBalance_()
  const formattedEthBalance = formatEther(balance)
  console.log('formattedEthBalance = ', formattedEthBalance)
  console.log('nftPriceWei = ', nftPriceWei)
  // WBNB - returns BigNumber
  // const { balance: wbnbBalance, fetchStatus: wbnbFetchStatus } = useTokenBalance(wbnbAddress)
  // const formattedWbnbBalance = getBalanceNumber(wbnbBalance)
  // const walletFetchStatus = paymentCurrency === PaymentCurrency.BNB ? bnbFetchStatus : wbnbFetchStatus

  const notEnoughEthForPurchase = nftToBuy?.price > formattedEthBalance
  // const notEnoughEthForPurchase = true
  // useEffect(() => {
  //   if (bnbBalance.lt(nftPriceWei) && wbnbBalance.gte(ethersToBigNumber(nftPriceWei)) && !isPaymentCurrentInitialized) {
  //     setPaymentCurrency(PaymentCurrency.WBNB)
  //     setIsPaymentCurrentInitialized(true)
  //   }
  // }, [bnbBalance, wbnbBalance, nftPriceWei, isPaymentCurrentInitialized])

  // const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
  //   onRequiresApproval: async () => {
  //     return requiresApproval(wbnbContractReader, account, nftMarketContract.address)
  //   },
  //   onApprove: () => {
  //     return callWithGasPrice(wbnbContractApprover, 'approve', [nftMarketContract.address, MaxUint256])
  //   },
  //   onApproveSuccess: async ({ receipt }) => {
  //     toastSuccess(
  //       t('Contract approved - you can now buy NFT with WBNB!'),
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
  //     )
  //   },
  //   onConfirm: () => {
  //     const payAmount = Number.isNaN(nftPrice) ? Zero : parseUnits(nftToBuy?.marketData?.currentAskPrice)
  //     if (paymentCurrency === PaymentCurrency.BNB) {
  //       return callWithGasPrice(nftMarketContract, 'buyTokenUsingBNB', [nftToBuy.collectionAddress, nftToBuy.tokenId], {
  //         value: payAmount,
  //       })
  //     }
  //     return callWithGasPrice(nftMarketContract, 'buyTokenUsingWBNB', [
  //       nftToBuy.collectionAddress,
  //       nftToBuy.tokenId,
  //       payAmount,
  //     ])
  //   },
  //   onSuccess: async ({ receipt }) => {
  //     setConfirmedTxHash(receipt.transactionHash)
  //     setStage(BuyingStage.TX_CONFIRMED)
  //     toastSuccess(
  //       t('Your NFT has been sent to your wallet'),
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
  //     )
  //   },
  // })

  async function buyNft() {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */

    /* user will be prompted to pay the asking proces to complete the transaction */

    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(signer, 'createMarketSale', [nftToBuy.tokenId], {
        value: nftPriceWei,
      })
    })

    console.log('receipt ', receipt)
    if (receipt?.status) {
      toastSuccess(t('Transaction has succeeded!'))
      setConfirmedTxHash(receipt.transactionHash)
    } else {
      alert('false')
      onDismiss?.()
    }
  }

  const continueToNextStage = () => {
    buyNft()
    // if (paymentCurrency === PaymentCurrency.WBNB && !isApproved) {
    //   setStage(BuyingStage.APPROVE_AND_CONFIRM)
    // } else {
    //   setStage(BuyingStage.CONFIRM)
    // }
  }

  const goBack = () => {
    setStage(BuyingStage.REVIEW)
  }

  const showBackButton = stage === BuyingStage.CONFIRM || stage === BuyingStage.APPROVE_AND_CONFIRM

  return (
    <StyledModal
      title={modalTitles(t)[stage]}
      stage={stage}
      onDismiss={onDismiss}
      onBack={showBackButton ? goBack : null}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <ReviewStage
        nftToBuy={nftToBuy}
        paymentCurrency={paymentCurrency}
        setPaymentCurrency={setPaymentCurrency}
        nftPrice={nftPrice}
        walletBalance={parseFloat(formattedEthBalance)}
        walletFetchStatus={walletFetchStatus}
        notEnoughEthForPurchase={notEnoughEthForPurchase}
        continueToNextStage={continueToNextStage}
      />
      {/* {stage === BuyingStage.REVIEW && (
        <ReviewStage
          nftToBuy={nftToBuy}
          paymentCurrency={paymentCurrency}
          setPaymentCurrency={setPaymentCurrency}
          nftPrice={nftPrice}
          walletBalance={walletBalance}
          walletFetchStatus={walletFetchStatus}
          notEnoughBnbForPurchase={notEnoughBnbForPurchase}
          continueToNextStage={continueToNextStage}
        />
      )}
      {stage === BuyingStage.APPROVE_AND_CONFIRM && (
        <ApproveAndConfirmStage
          variant="buy"
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
        />
      )}
      {stage === BuyingStage.CONFIRM && <ConfirmStage isConfirming={isConfirming} handleConfirm={handleConfirm} />}
      {stage === BuyingStage.TX_CONFIRMED && <TransactionConfirmed txHash={confirmedTxHash} onDismiss={onDismiss} />} */}
    </StyledModal>
  )
}

export default BuyModal

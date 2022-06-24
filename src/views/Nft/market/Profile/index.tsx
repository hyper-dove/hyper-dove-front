import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import StatBox, { StatBoxItem } from 'views/Nft/market/components/StatBox'
import { Box, Flex, Text, Card, Grid, GridProps, Heading } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import Image from 'next/image'
import { useTranslation } from 'contexts/Localization'
import { CollectibleActionCard } from '../components/CollectibleCard'
import GridPlaceholder from '../components/GridPlaceholder'
import useMarketNfts from '../hooks/useMarketNfts'
import { useNftMarketPlaceContract } from 'hooks/useContract'
import StyledBannerImageWrapper from 'views/Nft/market/components/BannerHeader/BannerImage'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { parseUnits } from '@ethersproject/units'
import useToast from 'hooks/useToast'
import { useModal } from 'components/widgets/Modal'
import SellModal from 'views/Nft/market/components/BuySellModals/SellModal'

const Profile = (props) => {
  const { t } = useTranslation()
  const { nfts, isFetchingNfts } = useMarketNfts(true)
  const { fetchWithCatchTxError, loading: isLoadingTx } = useCatchTxError()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')

  const { account } = useWeb3React()
  const nftMarketPlaceContract = useNftMarketPlaceContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const [nft, setNft] = useState(null)
  const onSuccess = () => {}
  const [onPresentSellModal] = useModal(<SellModal nftToSell={nft} variant={'sell'} onSuccessSale={onSuccess} />)

  const sellToken = async (nft) => {
    setNft(nft)
    // const nftPriceWei = parseUnits(nft.price, 'ether')
    // const receipt = await fetchWithCatchTxError(() => {
    //   return callWithGasPrice(nftMarketPlaceContract, 'resellToken', [nftMarketPlaceContract.tokenId], {
    //     value: nftPriceWei,
    //   })
    // })
    // if (receipt?.status) {
    //   toastSuccess(t('Transaction has succeeded!'))
    //   setConfirmedTxHash(receipt.transactionHash)
    // } else {
    //   //   alert('false')
    //   //   onDismiss?.()
    // }
  }
  useEffect(() => {
    if (nft) onPresentSellModal()
  }, [nft])
  return (
    <Page style={{ minHeight: 'auto' }}>
      <Flex flexDirection="column" mb="24px" {...props}>
        <Box position="relative" pb="56px">
          <StyledBannerImageWrapper>
            <Image
              src={'/images/teams/no-team-banner.png'}
              alt={'bannerAlt'}
              layout="fill"
              objectFit="cover"
              priority
            />
          </StyledBannerImageWrapper>
          <Box position="absolute" bottom={0} left={-4}>
            <Flex alignItems="flex-end">avater</Flex>
          </Box>
        </Box>
      </Flex>
      <Grid
        gridGap="16px"
        alignItems="center"
        gridTemplateColumns={['1fr', null, null, null, 'repeat(2, 1fr)']}
        {...props}
      >
        <Box>
          <Heading as="h1" scale="xl" color="secondary" mb="16px">
            {account}
          </Heading>
          설명
        </Box>
        <Box>
          <StatBox>
            <StatBoxItem title={t('NFT Collected')} stat={nfts?.length.toString() ? nfts.length.toString() : '0'} />
            <StatBoxItem title={t('Points')} stat={'0'} />
            <StatBoxItem title={t('Achievements')} stat={'0'} />
          </StatBox>
        </Box>
      </Grid>

      {nfts ? (
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
          alignItems="start"
        >
          {nfts.map((nft) => {
            const currentAskPriceAsNumber = nft.marketData && parseFloat(nft?.marketData?.currentAskPrice)
            return (
              <CollectibleActionCard
                key={nft.tokenId}
                nft={nft}
                currentAskPrice={currentAskPriceAsNumber > 0 ? currentAskPriceAsNumber : undefined}
                isUserNft={true}
                sellToken={sellToken}
              />
            )
          })}
        </Grid>
      ) : (
        <GridPlaceholder />
      )}
    </Page>
  )
}

export default Profile

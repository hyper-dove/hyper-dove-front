import StatBox, { StatBoxItem } from 'views/Nft/market/components/StatBox'
import { Box, Flex, Text, Card, Grid, GridProps, Heading } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import Image from 'next/image'
import { useTranslation } from 'contexts/Localization'
import { CollectibleLinkCard } from '../components/CollectibleCard'
import GridPlaceholder from '../components/GridPlaceholder'
import useMarketNfts from '../hooks/useMarketNfts'
import StyledBannerImageWrapper from 'views/Nft/market/components/BannerHeader/BannerImage'

const Profile = (props) => {
  const { t } = useTranslation()
  const { nfts, isFetchingNfts } = useMarketNfts(true)

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
            타이틀
          </Heading>
          설명
        </Box>
        <Box>
          <StatBox>
            <StatBoxItem title={t('NFT Collected')} stat={'1'} />
            <StatBoxItem title={t('Points')} stat={'1'} />
            <StatBoxItem title={t('Achievements')} stat={'1'} />
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
              <CollectibleLinkCard
                key={nft.tokenId}
                nft={nft}
                currentAskPrice={currentAskPriceAsNumber > 0 ? currentAskPriceAsNumber : undefined}
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

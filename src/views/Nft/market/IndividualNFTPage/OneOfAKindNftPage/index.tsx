import { useMemo } from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import sum from 'lodash/sum'
import Page from 'components/Layout/Page'
import { useGetCollection } from 'state/nftMarket/hooks'
import CircleLoader from 'components/Loader/CircleLoader'
import MainNFTCard from './MainNFTCard'
import useMarketNfts from 'views/Nft/market/hooks/useMarketNfts'
import { useGetEthBalance } from 'hooks/useTokenBalance'
// import ManageNFTsCard from './ManageNFTsCard'
import { TwoColumnsContainer } from '../shared/styles'
import PageLoader from 'components/Loader/PageLoader'
// import PropertiesCard from '../shared/PropertiesCard'
// import DetailsCard from '../shared/DetailsCard'
// import useGetCollectionDistribution from '../../../hooks/useGetCollectionDistribution'
// import OwnerCard from './OwnerCard'
// import MoreFromThisCollection from '../shared/MoreFromThisCollection'
// import ActivityCard from './ActivityCard'
// import { useCompleteNft } from '../../../hooks/useCompleteNft'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenId: string
}

const OwnerActivityContainer = styled(Flex)`
  gap: 22px;
`

const IndividualNFTPage: React.FC<IndividualNFTPageProps> = ({ collectionAddress, tokenId }) => {
  const { nfts, isFetchingNfts } = useMarketNfts()
  console.log('nfts = ', nfts, ' tokenId= ', tokenId)
  const nft = nfts.find((nft) => nft.tokenId.toString() === tokenId)
  // const collection = useGetCollection(collectionAddress)
  // const { data: distributionData, isFetching: isFetchingDistribution } = useGetCollectionDistribution(collectionAddress)
  // const {
  //   combinedNft: nft,
  //   isOwn: isOwnNft,
  //   isProfilePic,
  //   isLoading,
  //   refetch,
  // } = useCompleteNft(collectionAddress, tokenId)

  // const properties = nft?.attributes

  // const attributesRarity = useMemo(() => {
  //   if (distributionData && !isFetchingDistribution && properties) {
  //     return Object.keys(distributionData).reduce((rarityMap, traitType) => {
  //       const total = sum(Object.values(distributionData[traitType]))
  //       const nftAttributeValue = properties.find((attribute) => attribute.traitType === traitType)?.value
  //       const count = distributionData[traitType][nftAttributeValue]
  //       const rarity = (count / total) * 100
  //       return {
  //         ...rarityMap,
  //         [traitType]: rarity,
  //       }
  //     }, {})
  //   }
  //   return {}
  // }, [properties, isFetchingDistribution, distributionData])
  console.log('nft= ', nft)
  if (!nft) {
    // Normally we already show a 404 page here if no nft, just put this checking here for safety.

    // For now this if is used to show loading spinner while we're getting the data
    return <PageLoader />
  }

  return (
    <Page>
      <MainNFTCard nft={nft} isOwnNft={false} nftIsProfilePic={false} onSuccess={() => {}} />
      <TwoColumnsContainer flexDirection={['column', 'column', 'row']}>
        <Flex flexDirection="column" width="100%">
          {/* <ManageNFTsCard nft={nft} isOwnNft={isOwnNft} isLoading={isLoading} onSuccess={refetch} />
          <PropertiesCard properties={properties} rarity={attributesRarity} />
          <DetailsCard contractAddress={collectionAddress} ipfsJson={nft?.marketData?.metadataUrl} /> */}
        </Flex>
        <OwnerActivityContainer flexDirection="column" width="100%">
          {/* <OwnerCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={isProfilePic} onSuccess={refetch} />
          <ActivityCard nft={nft} /> */}
        </OwnerActivityContainer>
      </TwoColumnsContainer>
      {/* <MoreFromThisCollection collectionAddress={collectionAddress} currentTokenName={nft.name} /> */}
    </Page>
  )
}

export default IndividualNFTPage

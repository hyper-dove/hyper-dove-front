import { Box, CardBody, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
// import { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import PreviewImage from './PreviewImage'
import { CostLabel, LowestPriceMetaRow, MetaRow } from './styles'
import LocationTag from './LocationTag'
import { CollectibleCardProps } from './types'
//import { useGetLowestPriceFromNft } from '../../hooks/useGetLowestPrice'
// import { pancakeBunniesAddress } from '../../constants'
import NFTMedia from '../NFTMedia'

const CollectibleCardBody: React.FC<any> = ({ nft, nftLocation, currentAskPrice, isUserNft, sellToken }) => {
  const { t } = useTranslation()
  const { name, description, price } = nft
  //const bnbBusdPrice = useBNBBusdPrice()
  //const isPancakeBunny = nft.collectionAddress?.toLowerCase() === pancakeBunniesAddress.toLowerCase()
  //const { isFetching, lowestPrice } = useGetLowestPriceFromNft(nft)

  return (
    <CardBody p="8px">
      <NFTMedia as={PreviewImage} nft={nft} height={320} width={320} mb="8px" borderRadius="8px" />
      <Flex alignItems="center" justifyContent="space-between">
        {/* {nft?.collectionName && (
          <Text fontSize="12px" color="textSubtle" mb="8px">
            {nft?.collectionName}
          </Text>
        )} */}
        {nftLocation && <LocationTag nftLocation={nftLocation} />}
      </Flex>
      <Text as="h4" fontWeight="600" mb="8px">
        {name}
      </Text>
      <Text as="h4" fontWeight="600" mb="8px">
        {description}
      </Text>
      <Box borderTop="1px solid" borderTopColor="cardBorder" pt="8px">
        <Text fontSize="12px" color="textSubtle">
          {price} ETH
        </Text>
        {/* {isPancakeBunny && (
          <LowestPriceMetaRow lowestPrice={lowestPrice} isFetching={isFetching} bnbBusdPrice={bnbBusdPrice} />
        )} */}
        {/* {currentAskPrice && (
          <MetaRow title={isUserNft ? t('Your price') : t('Asking price')}>
            <CostLabel cost={currentAskPrice}  />
          </MetaRow>
        )} */}
        {isUserNft && <button onClick={() => sellToken(nft)}>sell</button>}
      </Box>
    </CardBody>
  )
}

export default CollectibleCardBody

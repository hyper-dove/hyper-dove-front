import { StyledCollectibleCard } from './styles'
import CardBody from './CardBody'
import { CollectibleCardProps } from './types'

const CollectibleActionCard: React.FC<CollectibleCardProps> = ({
  nft,
  nftLocation,
  currentAskPrice,
  isUserNft,
  sellToken,
  ...props
}) => {
  return (
    <StyledCollectibleCard {...props}>
      <CardBody
        nft={nft}
        nftLocation={nftLocation}
        currentAskPrice={currentAskPrice}
        isUserNft={isUserNft}
        sellToken={sellToken}
      />
    </StyledCollectibleCard>
  )
}

export default CollectibleActionCard

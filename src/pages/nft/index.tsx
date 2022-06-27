import { Box, Flex } from 'components/Common'
import CollectionWrapper from 'views/Nft/market/Items/CollectionWrapper'
import PageHeader from 'components/PageHeader'
import { Heading } from 'components/Common'
import { useTranslation } from 'contexts/Localization'

const NftMainPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Overview')}
            </Heading>
            <Heading scale="md" color="text">
              {t('choose one your nft ')}
            </Heading>
            <Heading scale="md" color="text">
              {t('or Create and listing your NFT.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <CollectionWrapper />
    </div>
  )
}
export default NftMainPage

import { Box, Flex } from 'components/Common'

import PageHeader from 'components/PageHeader'
import { Heading } from 'components/Common'
import { useTranslation } from 'contexts/Localization'
import CollectionWrapper from 'views/Nft/market/Items/CollectionWrapper'
const MarketPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Market Listing')}
            </Heading>
            <Heading scale="md" color="text">
              {t('choose one your nft ')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APR, low risk.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <CollectionWrapper />
    </>
  )
}
export default MarketPage

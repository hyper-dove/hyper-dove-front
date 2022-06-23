import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Flex, Text, Card } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useNftMarketPlaceContract } from 'hooks/useContract'
import styled from 'styled-components'
import Profile from 'views/Nft/market/Profile'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`
const Mypage = () => {
  const nffMarketPlaceContract = useNftMarketPlaceContract()
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()

  useEffect(() => {
    //loadNFTs()
  }, [])

  async function loadNFTs() {
    const data = await nffMarketPlaceContract.fetchMyNFTs()
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await nffMarketPlaceContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenURI)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI,
        }
        return item
      }),
    )
    setNfts(items)
    setLoadingState('loaded')
  }
  function listNFT(nft) {
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }
  const { t } = useTranslation()

  if (loadingState === 'loaded' && !nfts.length) return <h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>

  return <Profile />
}
export default Mypage

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { ethers } from 'ethers'

import { useNftMarketPlaceContract } from 'hooks/useContract'

const useMarketNfts = () => {
  const { chainId, account, error } = useWeb3React()
  const [nfts, setNfts] = useState([])
  const [isFetchingNfts, setIsFetchingNfts] = useState(false)
  const nffMarketPlaceContract = useNftMarketPlaceContract(false)
  async function loadNFTs() {
    const data = await nffMarketPlaceContract.fetchMarketItems()
    console.log('data = ', data)
    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nffMarketPlaceContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        }
        return item
      }),
    )
    setNfts(items)
    setIsFetchingNfts(false)
  }

  useEffect(() => {
    if (account) loadNFTs()
  }, [account])

  return { nfts, isFetchingNfts }
}

export default useMarketNfts

/* pages/create-nft.js */
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import useWeb3Provider from 'hooks/useActiveWeb3React'

import { getNftMarketPlaceAddress } from 'utils/addressHelpers'
import { getNftMarketPlaceContract } from 'utils/contractHelpers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNftMarketPlaceContract } from 'hooks/useContract'
import { Input } from 'components/Common/Input'
import { Flex } from 'components/Common/Box'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function CreateItem() {
  const { library, connector } = useWeb3Provider()
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoadingTx } = useCatchTxError()
  const nffMarketPlaceContract = useNftMarketPlaceContract()
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let listingPrice = await nffMarketPlaceContract.getListingPrice()
    listingPrice = listingPrice.toString()
    const methodArgs = [url, price]
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(nffMarketPlaceContract, 'createToken', methodArgs, { value: listingPrice })
    })
    console.log('receipt ', receipt)

    router.push('/')
  }

  return (
    <Flex>
      <Flex flexDirection="column">
        <Input placeholder="Asset Name" onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })} />

        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </Flex>
    </Flex>
  )
}

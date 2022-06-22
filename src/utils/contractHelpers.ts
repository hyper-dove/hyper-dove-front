import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from 'utils/providers'
import poolsConfig from 'config/constants/pools'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import { getDoveAddress, getNftMarketPlaceAddress } from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import doveAbi from 'config/abi/doveContract.json'
import NFTMarketplaceAbi from 'config/abi/nftMarketplace.json'
// Types
import type { Erc20, Erc721, PancakeSquad, Erc721collection } from 'config/abi/types'

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  console.log('address = ', address, signerOrProvider)
  return new Contract(address, abi, signerOrProvider)
}
export const getNftMarketPlaceContract = (signer?: Signer | Provider, address?: string) => {
  return getContract(NFTMarketplaceAbi, getNftMarketPlaceAddress(), signer) as any
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(bep20Abi, address, signer) as Erc20
}
export const getErc721Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(erc721Abi, address, signer) as Erc721
}
// export const getPancakeSquadContract = (signer?: Signer | Provider) => {
//   return getContract(pancakeSquadAbi, getPancakeSquadAddress(), signer) as PancakeSquad
// }
export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string) => {
  return getContract(erc721CollectionAbi, address, signer) as Erc721collection
}

export const getDoveContract = (signer?: Signer | Provider) => {
  return getContract(doveAbi, getDoveAddress(), signer) as Erc721collection
}

// export const getNftSaleContract = (signer?: Signer | Provider) => {
//   return getContract(nftSaleAbi, getNftSaleAddress(), signer) as Erc721collection
// }

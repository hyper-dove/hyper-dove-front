import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useEffect, useState } from 'react'
import useToast from 'hooks/useToast'
import { useModal } from 'components/widgets/Modal'
import useAuth from 'hooks/useAuth'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTranslation } from 'contexts/Localization'
import { Box, Flex, Grid } from 'components/Common/Box'
import Container from 'components/Layout/Container'
import { Button } from 'components/Common/Button'
import { Text } from 'components/Common/Text'
import { signMessage } from 'utils/web3React'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import ConfirmModal from 'components/Mint/Modals/Confirm'
import { useDoveContract } from 'hooks/useContract'
import useCatchTxError from 'hooks/useCatchTxError'
import { ethers } from 'ethers'
import EthBalance from 'components/EthBalance'
import NftList from 'components/NftList'
import axios from 'axios'
import { getNftMarketPlaceAddress } from 'utils/addressHelpers'
import { useNftMarketPlaceContract } from 'hooks/useContract'

const ethUtil = require('ethereumjs-util')

declare global {
  interface Window {
    web3: any
  }
}

const IndexPage = ({ theme }) => {
  const nffMarketPlaceContract = useNftMarketPlaceContract()
  const [fortmaticAccount, setFortmaticAccount] = useState('')
  const { chainId, account, error } = useWeb3React()
  const { logout, fm } = useAuth()
  const { library, connector } = useWeb3Provider()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [txHashMintingResult, setTxHashMintingResult] = useState(null)
  const onConfirmClose = () => {
    setTxHashMintingResult(null)
  }

  const nftDoveContract = useDoveContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoadingTx } = useCatchTxError()
  console.log('chainId = ', chainId)
  const [onPresentConfirmModal, onDismiss] = useModal(
    <ConfirmModal
      title={t('Mint')}
      isLoading={isLoading}
      headerBackground={theme?.colors?.gradients?.cardHeader}
      txHash={txHashMintingResult}
      loadingText={t('Please confirm your transaction in wallet.')}
      loadingButtonLabel={t('Minting...')}
      successButtonLabel={t('Close')}
      onConfirmClose={onConfirmClose}
    />,
    false,
  )

  useEffect(() => {
    console.log('window.web3.currentProvider = ', window.web3.currentProvider)
    if (window.web3.currentProvider.isFortmatic && fm) {
      setIsLoading(true)
      fm.user.login().then(() => {
        window.web3.eth.getAccounts().then((account) => {
          console.log('account = ', account)
          setFortmaticAccount(account)
          setIsLoading(false)
        })
      })
    }
  }, [window.web3.currentProvider, setFortmaticAccount])

  useEffect(() => {
    if (account) {
      toastSuccess(
        t('Success Connect'),
        <Box>
          <Text>{t('Success Connect')}</Text>
        </Box>,
      )
    }
    if (error) {
      console.log('error = ', error)
      toastError(
        t(' Error'),
        <Box>
          <Text>{t(JSON.stringify(error))}</Text>
        </Box>,
      )
    }
  }, [account, error])

  const handleDisconnect = () => {
    if (fm) {
      setFortmaticAccount(null)
      fm.user.logout()
    }

    logout()
  }

  const verifyMessage = async ({ message, address, signature }) => {
    try {
      const { utils } = ethers
      //version 1
      /* 메세지와 시그니처를 통해서 address를 도출 */
      const actualAddress = utils.verifyMessage(message, signature)
      console.log('actualAddress = ', actualAddress)
      console.log('verifyMessage', message, address, signature)
      //version2
      // const msgHash = utils.hashMessage(message)
      // const msgHashBytes = utils.arrayify(msgHash)
      // Now you have the digest,
      // const recoveredPubKey = utils.recoverPublicKey(msgHashBytes, signature)
      // const recoveredAddress = utils.recoverAddress(msgHashBytes, signature)

      const signerAddr = actualAddress
      console.log('signerAddr = ', signerAddr)
      if (signerAddr !== address) {
        return false
      }
      return true
    } catch (err) {
      console.log('error = ', err)
      return false
    }
  }

  const sign = async () => {
    try {
      setIsLoading(true)
      const message = 'sign message test'
      console.log(connector)
      console.log(library)
      console.log(account)
      console.log(message)
      // {
      //   "address": "0x3Ad6b7b048093316DDb80b0f69Eeb38FA21D00d1",
      //   "msg": "sign message test",
      //   "sig": "0x080a464cd6d6a7acf8b8418b6c3c4676c30de665ea40de09096afa00c83464c96523e8f8d107a9aa20d8df50cfaec3125f6c6f0226c9d8423b17f3f1c3fc64fe1c",
      //   "version": "2"
      // }
      //0x080a464cd6d6a7acf8b8418b6c3c4676c30de665ea40de09096afa00c83464c96523e8f8d107a9aa20d8df50cfaec3125f6c6f0226c9d8423b17f3f1c3fc64fe1c
      let signature = await signMessage(connector, library, account, message)
      console.log('signature = ', signature)

      const isValid = await verifyMessage({
        message,
        address: account,
        signature,
      })
      console.log('isValid = ', isValid)
      if (isValid) {
        alert('Verified')
      }
    } catch (error) {
      toastError(error instanceof Error && error?.message ? error.message : JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  const fortmaticSign = () => {
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) throw error
      const message = 'sign message test'
      const from = accounts[0]
      const msg = ethUtil.bufferToHex(new Buffer(message, 'utf8'))
      const params = [msg, from]
      const method = 'personal_sign'

      window.web3.currentProvider.sendAsync(
        {
          id: 1,
          method,
          params,
          from,
        },
        async function (error, result) {
          if (error) throw error
          console.log(result)
          const isValid = await verifyMessage({ message, address: from, signature: result.result })
          if (isValid) {
            alert('Verify!')
          }
        },
      )
    })
  }
  const mintTokenCallBack = async () => {
    console.log('nftDoveContract = ', nftDoveContract)
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(nftDoveContract, 'mintNFT', [''])
    })
    console.log('receipt ', receipt)
    if (receipt?.status) {
      toastSuccess(t('Transaction has succeeded!'))
      setTxHashMintingResult(receipt.transactionHash)
    } else {
      alert('false')
      onDismiss?.()
    }
  }

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  // useEffect(() => {
  //   loadNFTs()
  // }, [])
  const marketplaceAddress = getNftMarketPlaceAddress()
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    //library
    // const contract = getNftMarketPlaceContract(library)
    // const provider = new ethers.providers.JsonRpcProvider()
    // const contract = new ethers.Contract(marketplaceAddress, NftMarketPlace, provider)
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
    setLoadingState('loaded')
  }

  // useEffect(() => {
  //   alert('hleoo')
  // })
  console.log('nft = ', nfts)

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(nffMarketPlaceContract, 'createMarketSale', [nft.tokenId], {
        value: price,
      })
    })

    console.log('receipt ', receipt)
    if (receipt?.status) {
      toastSuccess(t('Transaction has succeeded!'))
      setTxHashMintingResult(receipt.transactionHash)
    } else {
      alert('false')
      onDismiss?.()
    }

    loadNFTs()
  }
  return (
    <div>
      <EthBalance />
      <NftList />
      {isLoading ? <div>LOADING</div> : <div>LOADING END </div>}
      {fortmaticAccount && <button>{fortmaticAccount}</button>}
      {fortmaticAccount && <button onClick={fortmaticSign}>SIGN</button>}
      {fortmaticAccount && <button onClick={handleDisconnect}>disconnect</button>}
      {account && <button>genric {account}</button>}
      {account && <button onClick={handleDisconnect}>disconnect</button>}
      {account && <button onClick={sign}>sign</button>}
      {!fortmaticAccount && !account && <ConnectWalletButton scale="sm" />}
      <Button width="100%" onClick={mintTokenCallBack} disabled={isLoading} endIcon={isLoading ? <div /> : undefined}>
        {t('Mint NFTs (%tickets%)', { tickets: 'test' })}
      </Button>

      <Button width="100%" onClick={loadNFTs} disabled={isLoading} endIcon={isLoading ? <div /> : undefined}>
        {t('loadNFTs', { tickets: 'test' })}
      </Button>
      <Box py="32px">
        <Container px={[0, null, '24px']}>
          <Grid
            gridGap="16px"
            gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
            alignItems="start"
          >
            {nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">
                    {nft.name}
                  </p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button
                    className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                    onClick={() => buyNft(nft)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default IndexPage

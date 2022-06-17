import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import BigNumber from 'bignumber.js'
const EthBalance = () => {
  const { account, library } = useWeb3React<Web3Provider>()
  const [balance, setBalance] = useState<BigNumber | null>(null)
  useEffect(() => {
    if (!account || !library) return
    const fetch = async () => {
      let balance = (await library.getBalance(account)) as unknown as BigNumber //Will give value in.
      console.log('balance: ' + balance)
      setBalance(balance)
    }
    fetch()
  }, [account])

  if (!balance) {
    return <div>...</div>
  }
  return <div>{parseFloat(formatEther(balance)).toPrecision(4)} Ξ</div>
}

export default EthBalance

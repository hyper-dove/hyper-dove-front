import { useEffect, useState } from 'react'

const useFortmatic = (fm) => {
  const [fortmaticAccount, setFortmaticAccount] = useState('')

  useEffect(() => {
    console.log('window.web3.currentProvider = ', window.web3.currentProvider)
    if (window.web3.currentProvider.isFortmatic && fm) {
      //   fm.user.login().then(() => {
      //     window.web3.eth.getAccounts().then((account) => {
      //       console.log('hello')
      //       setFortmaticAccount(account)
      //     })
      //   })
    }
  }, [window.web3.currentProvider, fm])

  return { fortmaticAccount }
}

export default useFortmatic

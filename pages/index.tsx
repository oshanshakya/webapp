import { useState, useEffect} from 'react'
import {ethers} from "ethers"
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"
import TokenListRinkeby from '../assets/token-list-rinkeby.json'
import useBalance from '../actions/useBalance'
import { InjectedConnector } from '@web3-react/injected-connector'
import type { NextPage } from 'next'
import NextLink from "next/link"

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      1, // Mainet
      3, // Ropsten
      4, // Rinkeby
      5, // Goerli
      42, // Kovan
    ],
  })

//   const [balance] = useBalance(
//           selectedToken.address,
//           selectedToken.decimals
//         )

  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }
  
  export const Wallet = () => {
    const { chainId, account, activate, active } = useWeb3React<Web3Provider>()
    const [selectedToken, setSelectedToken] = useState(TokenListRinkeby[0])
  
    const onClick = () => {
      activate(injectedConnector)
    }

    const [balance] = useBalance(
              selectedToken.address,
              selectedToken.decimals
            )
        
    return (
      <div>
        <div>ChainId: {chainId}</div>
        <div>Account: {account}</div>
        {active ? (
          <div>✅ </div>
        ) : (
          <button type="button" onClick={onClick}>
            Connect
          </button>
        )}
        <select onChange={(e) => setSelectedToken(TokenListRinkeby[0])}>
           {TokenListRinkeby.map((token, index) => (
             <option value={index} key={token.address}>{token.name}</option>
          ))}
         </select>
        {selectedToken.name} balance {balance}
      </div>
    )
  }
  
  function Home() {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet />
      </Web3ReactProvider>
    )
  }

  export default Home;


// export default function Home() {
//     const [selectedToken, setSelectedToken] = useState(TokenListRinkeby[0])
//     const { active, account, library, connector, activate, deactivate } = useWeb3React() //hooks
     
//     async function connect() {
//       try {
//         await activate(injected)
//       } catch (ex) {
//         console.log(ex)
//       }
//     }
  
//     async function disconnect() {
//       try {
//         await deactivate(injected)
//       } catch (ex) {
//         console.log(ex)
//       }
//     }
  
//     const [balance] = useBalance(
//       selectedToken.address,
//       selectedToken.decimals
//     )
  
//     // setTimeout(function() {
//     //   location.reload();
//     // }, 30000);
   
//     return (
//       <div className="flex flex-col items-center justify-center">
//         <button onClick={connect}> Connect to Metamask</button>
//         {active ? <span> Connected with  <b>{account}</b> </span> : <span> Not Connected</span> }
//         <button onClick={disconnect}> Disconnect </button>
  
//         <select onChange={(e) => setSelectedToken(TokenListRinkeby[e.target.value])}>
//           {TokenListRinkeby.map((token, index) => (
//             <option value={index} key={token.address}>{token.name}</option>
//           ))}
//         </select>
//         {selectedToken.name} balance {balance}
//       </div>
//     )
//   }

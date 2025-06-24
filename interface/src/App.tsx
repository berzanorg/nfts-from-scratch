/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react'
import './App.css'
import keoneHorse from './assets/keonehorse.jpeg'
import type { EIP6963AnnounceProviderEvent, EIP6963ProviderDetail } from './util'

function App() {
  const [wallets, setWallets] = useState<Array<EIP6963ProviderDetail>>([])
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [address, setAddress] = useState<string>()
  const [mintedSupply, setMintedSupply] = useState<number>(0)
  const [hasMinted, setHasMinted] = useState<boolean>(false)

  const popup = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (address) console.log(address)
  }, [address])

  useEffect(() => {
    window.addEventListener('eip6963:announceProvider' as any, (event: EIP6963AnnounceProviderEvent) => {
      setWallets((wallets) => [...wallets, event.detail])
    })

    setInterval(async () => {
      const result = await fetchMintedSupply()
      setMintedSupply((m) => (m > result ? m : result))
      console.log('total minted:', result)
    }, 1000)

    fetchMintedSupply().then((result) => {
      setMintedSupply(result)
      console.log('total minted:', result)
    })
  }, [])

  async function fetchMintedSupply() {
    const response = await fetch('https://monad-testnet.g.alchemy.com/v2/VpjvDg2yIzs3hY7Q4XK0lPsL2JT6QvSR', {
      method: 'POST',
      body: JSON.stringify({
        method: 'eth_call',
        params: [
          {
            to: '0x75b8C569e68C17ffF2c113d46DcF25971389a6FE',
            data: `0x18160ddd`,
          },
          'latest',
        ],
      }),
    })

    const parsedResponse = await response.json()

    const parsedTotalSupply = BigInt(parsedResponse.result)

    return parseInt(parsedTotalSupply.toString())
  }

  async function connect() {
    window.dispatchEvent(new Event('eip6963:requestProvider'))
    popup.current!.hidden = false
  }

  async function mint() {
    const txId = await selectedWallet!.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: '0x75b8C569e68C17ffF2c113d46DcF25971389a6FE',
          from: address,
          value: '0x' + (1n * 10n ** 18n).toString(16),
          data: '0x1249c58b',
          gas: '0x' + (115625).toString(16),
        },
      ],
    })

    setMintedSupply((m) => m + 1)
    setHasMinted(true)

    console.log('tx id:', txId)
  }

  return (
    <div className='w-full max-w-2xl'>
      <header className='sticky px-4 top-0 z-30 flex items-center h-16 justify-between bg-slate/20 backdrop-blur-xl'>
        <a
          href='/'
          className='font-semibold text-2xl'
        >
          Keonehorse
        </a>
        <button
          disabled={!!address}
          onClick={connect}
          className='bg-indigo-500 rounded-full h-10 px-6 font-semibold'
        >
          {address ? 'Connected' : 'Connect'}
        </button>
      </header>

      <main className='flex flex-col py-8 px-4 items-center gap-6'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-bold text-center'>Keonehorse</h1>
          <p className='font-medium text-neutral-400'>Mint Keonehorse on Monad Testnet</p>
        </div>
        <img
          src={keoneHorse}
          alt='keonehorse'
          className='max-w-80 rounded-xl'
        />
        <p>Supply: {mintedSupply}/33</p>
        <button
          onClick={mint}
          disabled={hasMinted || address === undefined}
          className='bg-indigo-500 rounded-full h-12 px-8 font-semibold text-lg'
        >
          Mint
        </button>
      </main>

      <div
        ref={popup}
        hidden
        className='fixed top-0 z-40 left-0 w-full h-svh bg-slate-900/20 backdrop-blur-xl flex flex-col items-center justify-center'
      >
        <div className='flex flex-col gap-4 px-4 py-8'>
          {wallets.map((wallet) => (
            <>
              <button
                onClick={async () => {
                  setSelectedWallet(wallet)
                  popup.current!.hidden = true
                  const addresses: Array<string> = await wallet.provider.request({
                    method: 'eth_requestAccounts',
                    params: [],
                  })

                  const chainId = await await wallet.provider.request({
                    method: 'eth_chainId',
                    params: [],
                  })

                  if (chainId !== '0x279f') {
                    await wallet.provider.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: '0x279f' }],
                    })
                  }

                  console.log('chain switched to monad testnet')
                  console.log('address is', addresses![0])

                  setAddress(addresses![0])
                }}
                className='flex gap-2 font-semibold text-lg items-center hover:bg-white/20 rounded-xl p-2 duration-200'
              >
                <img
                  key={wallet.info.uuid}
                  src={wallet.info.icon}
                  className='h-8 w-8'
                />
                {wallet.info.name}
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

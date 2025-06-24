# NFTs From Scratch

Monad Developers Workshop

> Keonehorse - The smartest yet humblest human horse.

<img src="keonehorse.jpeg" alt="Keonehorse" width="256">

## Tools to install

- [Foundry](https://getfoundry.sh/introduction/installation/)
- [Bun](https://bun.sh/)
- [VS Code](https://code.visualstudio.com/download)
- [Solidity Extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

## Project layout

- [`contracts`](/contracts)
- [`interface`](/interface)
- [`metadata`](/metadata)

## Deployments

- [Pinata](https://pinata.cloud/) - IPFS
- [Monad Testnet](https://testnet.monad.xyz/) - Blockchain
- [Cloudflare Workers](https://workers.cloudflare.com/) - Web

### IPFS

After signing up for [Pinata](https://pinata.cloud/), using the web interface you can deploy the art and generated metadata.

### Blockchain

After having a wallet on [Monad Testnet](https://testnet.monad.xyz/), using Foundry's `forge` tool with deployment scripts you can deploy the smart contract.

### Web

After signing up for [Cloudflare Workers](https://workers.cloudflare.com/), using static asset support you can deploy the interface to web.

## Extra things

### Contract Verification

If you want people to easily interact with the smart contract from [MonVision](https://testnet.monvision.io/) explorer, you can verify the source code of the contract as below after replacing `<address>` with the contract you deployed.

```bash
forge verify-contract \
  --rpc-url https://testnet-rpc.monad.xyz \
  --verifier sourcify \
  --verifier-url 'https://sourcify-api-monad.blockvision.org' \
  <address> \
  src/NFT.sol:NFT
```

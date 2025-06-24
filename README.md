# NFTs From Scratch

Monad Developers Workshop

## Tools to install

- [Foundry](https://getfoundry.sh/introduction/installation/)
- [Bun](https://bun.sh/)
- [VS Code](https://code.visualstudio.com/download)
- [Solidity Extension](vscode:extension/JuanBlanco.solidity)

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

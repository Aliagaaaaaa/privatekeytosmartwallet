# Private Key to Smart Wallet

A TypeScript program that demonstrates how to convert an Ethereum private key into a smart account (wallet) and perform transactions using the Thirdweb Account Factory on the Base Sepolia testnet.

## What it does

This program:
1. **Converts a private key** to an Externally Owned Account (EOA)
2. **Creates a smart account** using Thirdweb's account factory on Base Sepolia testnet
3. **Checks the balance** of the smart account
4. **Sends ETH** from the smart account to a destination address if balance is sufficient

## Prerequisites

- A valid Ethereum private key (without 0x prefix)
- Destination Ethereum address to send ETH to
- Test ETH on Base Sepolia (you can get it from a faucet)
- An Alchemy API key (get one at https://www.alchemy.com/ for free)

## Configuration

Before running, update these constants in `index.ts`:
```typescript
const PRIVATE_KEY = "your-private-key-here"; // Without 0x prefix
const DESTINATION_ADDRESS = "0x..."; // Address to send ETH to
const AMOUNT_TO_SEND = "0.00001"; // Amount in ETH

// Replace YOUR_ALCHEMY_API_KEY with your actual Alchemy API key
const BUNDLER_URL = "https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY";
const RPC_URL = "https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY";
```

## Installation

```bash
bun install
```

## Usage

```bash
bun run index.ts
```

The program will:
- Display the smart account address and original EOA address
- Check the smart account balance
- Send the specified amount to the destination address
- Provide a transaction hash and explorer link for verification
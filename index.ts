import { createPublicClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { createSmartAccountClient } from "permissionless";
import { toThirdwebSmartAccount } from "permissionless/accounts";

const PRIVATE_KEY = "";
const DESTINATION_ADDRESS = "";
const AMOUNT_TO_SEND = "0.00001";

const BUNDLER_URL = "https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"; 
const RPC_URL = "https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY";


const FACTORY_ADDRESS = "0xde320c2e2b4953883f61774c006f9057a55b97d1"; // p2p.me thirdweb account factory
const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; // v0.6

async function main() {
  console.log("Starting process on Base Sepolia...");

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(RPC_URL),
  });

  const signer = privateKeyToAccount(PRIVATE_KEY);

  const simpleSmartAccount = await toThirdwebSmartAccount({
    client: publicClient,
    owner: signer,
    factoryAddress: FACTORY_ADDRESS,
    entryPoint: {
      address: ENTRY_POINT,
      version: "0.6",
    },
  });

  const saAddress = simpleSmartAccount.address;
  console.log("-----------------------------------------");
  console.log("Smart Account Address:", saAddress);
  console.log("Signer (EOA) Address:", signer.address);
  console.log("-----------------------------------------");

  const balance = await publicClient.getBalance({ address: saAddress });
  console.log(`Balance in Smart Account: ${balance.toString()} wei`);

  if (balance === 0n) {
    console.error("ERROR: The Smart Account has no ETH for gas.");
    console.log(`Please send test ETH (faucet) to: ${saAddress}`);
    return;
  }

  const smartAccountClient = createSmartAccountClient({
    account: simpleSmartAccount,
    chain: baseSepolia,
    bundlerTransport: http(BUNDLER_URL),
  });

  try {
    console.log(`Sending ${AMOUNT_TO_SEND} ETH to ${DESTINATION_ADDRESS}...`);
    
    const txHash = await smartAccountClient.sendTransaction({
      to: DESTINATION_ADDRESS,
      value: parseEther(AMOUNT_TO_SEND),
      data: "0x",
    });

    console.log("Transaction sent successfully!");
    console.log("Hash:", txHash);
    console.log(`View in Explorer: https://sepolia.basescan.org/tx/${txHash}`);
  } catch (error) {
    console.error("Error sending:");
    if (error instanceof Error) {
      if (error.message) console.error("Detail:", error.message);
      else console.error(error);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

main().catch(console.error);
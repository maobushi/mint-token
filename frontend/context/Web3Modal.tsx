"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";
// Your WalletConnect Cloud project ID
export const projectId = "b5bc64bc3cf2e6be41f4b513db22beeb";

// 2. Set chains
const mainnet = {
	chainId: 1,
	name: "Ethereum",
	currency: "ETH",
	explorerUrl: "https://etherscan.io",
	rpcUrl: "https://cloudflare-eth.com",
};

const baseChain = {
	chainId: 84532,
	name: "Base Sepolia",
	currency: "ETH",
	explorerUrl: "https://sepolia-explorer.base.org",
	rpcUrl: "	https://sepolia.base.org",
};

// 3. Create a metadata object
const metadata = {
	name: "token-mint",
	description: "AppKit Example",
	url: "https://web3modal.com", // origin must match your domain & subdomain
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
	/*Required*/
	metadata,

	/*Optional*/
	enableEIP6963: true, // true by default
	enableInjected: true, // true by default
	enableCoinbase: true, // true by default
	rpcUrl: "...", // used for the Coinbase SDK
	defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
	ethersConfig: defaultConfig({
		metadata,
		auth: {
			email: false,
			socials: [],
			showWallets: true,
			walletFeatures: true,
		},
	}),
	chains: [mainnet, baseChain],
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }: { children: ReactNode }) {
	return children;
}

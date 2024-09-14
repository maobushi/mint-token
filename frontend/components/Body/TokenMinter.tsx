"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ethers, BrowserProvider } from "ethers";
import {
	useWeb3ModalProvider,
	useWeb3ModalAccount,
	useWeb3Modal,
} from "@web3modal/ethers/react";

type Token = {
	name: string;
	symbol: string;
	totalSupply: string;
};

export default function TokenViewer() {
	const { open } = useWeb3Modal();
	const { address, isConnected } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const [tokens, setTokens] = useState<Token[]>([]);
	const [contractAddress, setContractAddress] = useState("");

	useEffect(() => {
		console.log("Switched to BaseTestNet");
	}, []);

	const handleViewTokens = async () => {
		if (contractAddress && walletProvider) {
			try {
				console.log("トークン情報取得開始:", contractAddress);
				const ethersProvider = new BrowserProvider(walletProvider);
				const signer = await ethersProvider.getSigner();
				console.log("署名者取得完了");

				const erc20ABI = [
					"function name() view returns (string)",
					"function symbol() view returns (string)",
					"function totalSupply() view returns (uint256)",
				];

				const contract = new ethers.Contract(contractAddress, erc20ABI, signer);

				const name = await contract.name();
				const symbol = await contract.symbol();
				const totalSupply = await contract.totalSupply();

				const newToken: Token = {
					name,
					symbol,
					totalSupply: ethers.formatEther(totalSupply),
				};

				setTokens([newToken]);
				setContractAddress("");
			} catch (error) {
				console.error("トークン情報取得エラー:", error);
				if (error instanceof Error) {
					alert(`トークン情報取得中にエラーが発生しました: ${error.message}`);
				} else {
					alert(
						"トークン情報取得中に予期せぬエラーが発生しました。コンソールを確認してください。"
					);
				}
			}
		} else {
			alert("コントラクトアドレスを入力してください。");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>ウォレット接続</CardTitle>
					<CardContent>
						{isConnected ? (
							<div>
								<p>接続済み</p>
								<p>アドレス: {address}</p>
							</div>
						) : (
							<Button onClick={() => open()}>ウォレットに接続</Button>
						)}
					</CardContent>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>トークン情報表示</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div>
							<Label htmlFor="contractAddress">コントラクトアドレス</Label>
							<Input
								id="contractAddress"
								value={contractAddress}
								onChange={(e) => setContractAddress(e.target.value)}
								placeholder="0x..."
							/>
						</div>
						<Button
							onClick={handleViewTokens}
							type="button"
							disabled={!isConnected}
						>
							トークン情報を表示
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>トークン情報</CardTitle>
				</CardHeader>
				<CardContent>
					{tokens.length > 0 ? (
						<ul className="space-y-2">
							{tokens.map((token, index) => (
								<li
									key={index}
									className="flex flex-col space-y-1 border-b pb-2"
								>
									<span>名前: {token.name}</span>
									<span>シンボル: {token.symbol}</span>
									<span>総供給量: {token.totalSupply}</span>
								</li>
							))}
						</ul>
					) : (
						<p>トークン情報はありません。</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

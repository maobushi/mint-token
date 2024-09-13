"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Token = {
	name: string;
	symbol: string;
	amount: number;
};

export default function TokenMinter() {
	const [tokens, setTokens] = useState<Token[]>([]);
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	const [amount, setAmount] = useState("");

	const handleMint = () => {
		if (name && symbol && amount) {
			const newToken: Token = {
				name,
				symbol,
				amount: parseFloat(amount),
			};
			setTokens([...tokens, newToken]);
			setName("");
			setSymbol("");
			setAmount("");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>トークンMint</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div>
							<Label htmlFor="name">トークン名</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="例: My Token"
							/>
						</div>
						<div>
							<Label htmlFor="symbol">ティッカーシンボル</Label>
							<Input
								id="symbol"
								value={symbol}
								onChange={(e) => setSymbol(e.target.value)}
								placeholder="例: MTK"
							/>
						</div>
						<div>
							<Label htmlFor="amount">発行量</Label>
							<Input
								id="amount"
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="例: 1000000"
							/>
						</div>
						<Button onClick={handleMint} type="button">
							Mint
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>保有トークン</CardTitle>
				</CardHeader>
				<CardContent>
					{tokens.length > 0 ? (
						<ul className="space-y-2">
							{tokens.map((token, index) => (
								<li
									key={index}
									className="flex justify-between items-center border-b pb-2"
								>
									<span>
										{token.name} ({token.symbol})
									</span>
									<span className="font-bold">
										{token.amount.toLocaleString()}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p>保有しているトークンはありません。</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

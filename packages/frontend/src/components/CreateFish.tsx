// React
import React, { useState, useEffect } from 'react';

// Styled Components
import styled from 'styled-components';

// Toast
import { toast } from 'react-toastify';

// Web3
import { useWeb3React } from '@web3-react/core';

// Big Number
import BN from 'bn.js';

// Harmony SDK
import { numberToString, fromWei, hexToNumber, Units, Unit } from '@harmony-js/utils';

// Utils
import { Fish } from '../utils/fish'
import { useFishFight } from '../context/fishFightContext';


const catchRates = ["100", "50", "25", "5"];

const CreateFish = () => {
	const { FishFight, refetchBalance} = useFishFight()

	// All fish owned by user
	const [myFish, setMyFish] = useState<Fish[]>([]);
	const [myFishCount, setMyFishCount] = useState<number>(0);

	// Name of the fish that the user is creating/minting
	const [fishName, setFishName] = useState("Fishy")

	// Contract balance
	const [contractBalance, setContractBalance] = useState("");
	console.log(contractBalance)

	// Context
	const { account } = useWeb3React();

	useEffect(() => {
		getContractBalance();
		loadUsersFish();
	}, [myFishCount]);

	// Will query contract to get a list of all fish owned by user 
	const loadUsersFish = async () => {
		const fishUserOwns: BN = await FishFight.factory.methods.balanceOf(account).call();
		const totalFish = new BN(fishUserOwns).toNumber()
		setMyFishCount(totalFish);
		console.log(myFishCount)

		const tempFish: Fish[] = [];

		// For every fish the user owns get token, then fish info, generate fish and push instance to tempFish 
		// once its done, setMyFish to tempfish
		for(let i = 0; i < myFishCount; i++) {
			const tokenId = await FishFight.factory.methods.tokenOfOwnerByIndex(account, i).call();
			const fishInfo = await FishFight.factory.methods.getFishInfo(tokenId).call();
			const fish = new Fish(
				tokenId,
				fishInfo.fishTypeIndex,
				fishInfo.name,
				fishInfo.birth,
				fishInfo.strength,
				fishInfo.intelligence,
				fishInfo.agility,
				fishInfo.traitsA,
				fishInfo.traitsB,
				fishInfo.traitsC
			);
			tempFish.push(fish);
		}
		setMyFish(tempFish);
	}

	// Get contract balance and parse it to One
	const getContractBalance = async () => {
		try {
			const balance = await FishFight.factory.methods.getContractBalance().call();
			const parsedBalance = fromWei(balance, Units.one);

			setContractBalance(parsedBalance);
			console.log(contractBalance)
		} catch (error) {
			console.error(error);
		}
		return null
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFishName(e.target.value);
	}

	const handleClickCatch = (value: string, name: string) => async () => {
		if (account) {
			try {
				const fish = await FishFight.factory.methods.catchFish(name).send({
					from: account,
					gasPrice: 1000000000,
					gasLimit: 500000,
					value: new Unit(value).asOne().toWei(),
				});
				console.log(fish);
				toast.success('Transaction done', {
					onClose: async () => {
						getContractBalance()
						loadUsersFish()
						refetchBalance()
					},
				});
			} catch (error) {
				toast.error(error);
			}
		} else {
			toast.error('Connect your wallet');
		}
		return null
	};

	const handleFishClick = (tokenId: number) => async () => {
		const tokenUri = await FishFight.factory.methods.tokenURI(tokenId).call();
		console.log(tokenUri)
	}

	return (
		<CreateFishComponent>
			<FlexGrid>
			{catchRates.map((rate, index) => (
				<CatchFishButton key={index} onClick={handleClickCatch(rate, fishName)}>
					{rate}% Catch Rate for {rate} ONE
				</CatchFishButton>
			))}
			</FlexGrid>
			<form>
				<label>
					Fish Name:
					<input type="text" value={fishName} onChange={handleChange} />
				</label>
			</form>
			<h1>Fished Owned: {myFishCount}</h1>
			<FlexGrid>
			{myFish.map((fish, index) => (
					<FishNFT onClick={handleFishClick(fish.tokenId)} key={index}>
						<FishName>{fish.name}</FishName>
						<FishData>{fish.birth}</FishData>
						<FishData>Strength: {fish.strength} Intelligence: {fish.intelligence} Agility: {fish.agility}</FishData>
					</FishNFT>
				))}
			</FlexGrid>
		</CreateFishComponent>
	);
};

const CreateFishComponent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -10vh;
	padding: 40px 60px;
	border-radius: 25px;
	width: 100%;
	background-color: white;
	box-shadow: 2px 8px 10px 4px rgba(0, 0, 0, 0.3);
	color: #a70000;
	font-size: 1.5rem;
`;

const FlexGrid = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	width: 100%;
`;

const FishNFT = styled.div`
	flex: 1;
	border-radius: 25px;
	width: 100%;
	padding: 15px;
	background-color: white;
	box-shadow: 2px 8px 10px 4px rgba(0, 0, 0, 0.3);
`;

const FishName = styled.h3`
	color: ${"black"};
`;

const FishData = styled.p`
	color: ${"black"};
`;

const CatchFishButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.7);
	color: black;
	padding: 20px 20px;
	border-radius: 10px;
	box-shadow: 1px 2px 4px 4px rgba(0, 0, 0, 0.2);
	font-size: 1.5rem;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 1);
		cursor: pointer;
	}

	span {
		font-size: 1rem;
		margin-left: 8px;
		align-self: flex-end;
	}
`;

const TotalStaked = styled.div`
	font-size: 3.5rem;
	margin-top: 16px;
	color: black;
`;

export default CreateFish;

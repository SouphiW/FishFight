// React
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// Styled Components
import styled from 'styled-components';

// Utils
import useHorizontalScroll from "../utils/horizontalScrolling";
import { useUnity } from '../context/unityContext';
import Account from '../components/Account';
import FishNFT from './FishNFT';
import { useFishPool } from '../context/fishPoolContext';
import { useWeb3React } from '@web3-react/core';

enum FishToShow {
  Public,
  User
}


const ViewFish = () => {
	const { userFish, publicFish, arePublicFishLoaded, areUserFishLoaded } = useFishPool();
	const [fishToShow, setFishToShow] = useState<FishToShow>(FishToShow.Public);
	const unityContext = useUnity();
	const { account } = useWeb3React();

	useEffect(() => {
		console.log("account connected")
		if(account) {
			setFishToShow(FishToShow.User)
		}
		setFishToShow(FishToShow.Public)
	}, [account]);

	useEffect(() => {
		console.log("Fish arrays changed")
	}, [userFish, publicFish]);


	useEffect(() => {
		unityContext.showOcean();
	}, [unityContext.isFishPoolReady]);

	const setFishToView = () => {
		if(fishToShow == FishToShow.Public) {
			setFishToShow(FishToShow.User)
		}
		else {
			setFishToShow(FishToShow.Public)
		}
	}

	const scrollRef = useHorizontalScroll();

	return (
		<FishViewerContainer>
				<FishViewerButtons>
					{fishToShow == FishToShow.Public ? <Text>Public Fish</Text> : <Text>Your Fish</Text>}
					{account ?
					<GameButton onClick={() => setFishToView()}>{fishToShow == FishToShow.Public ? "Show my Fish" : "Show public Fish"}</GameButton>
					:
					<Account/>
					}
					{fishToShow == FishToShow.Public && !arePublicFishLoaded &&
						<Text>Loading public fish...</Text>
					}
					{fishToShow == FishToShow.User && account && !areUserFishLoaded &&
						<Text>Loading your fish...</Text>
					}
					{fishToShow == FishToShow.User && account && areUserFishLoaded && userFish?.length == 0 &&
						<CatchButton to={'/catch'}>Catch a Fish!</CatchButton>
					}
					
				</FishViewerButtons>

				<FishGrid ref={scrollRef}>
				{fishToShow == FishToShow.Public &&
					publicFish?.map((fish, index) => (
						<FishNFT onClick={() => unityContext.showFish(fish)} fish={fish} key={index}></FishNFT>
					))
				}
				{fishToShow == FishToShow.User && account && userFish?.length > 0 &&
					userFish?.map((fish, index) => (
						<FishNFT onClick={() => unityContext.showFish(fish)} fish={fish} key={index}></FishNFT>
					))
				}
				</FishGrid>
		</FishViewerContainer>
		
	);
};

interface GridProps {
	ref?: any;
}

const Text = styled.p`
	display: flex;
	flex-flow: column;
	justify-content: center;
	padding: ${props => props.theme.spacing.gap};
	margin: 0;
	background-color: white;
	font-size: ${props => props.theme.font.large}vmin;
	border-radius: 25px;
	margin-left: ${props => props.theme.spacing.gapSmall};
`;

const GameButton = styled.button`
	display: flex;
	flex-flow: column;
	justify-content: center;
	padding: 2.2vmin;
	border-radius: 25px;
	background-color: white;
	border: none;
	opacity: 0.7;
	box-shadow: 1px 2px 4px 4px rgba(0, 0, 0, 0.25);
	color: black;
	margin-left: ${props => props.theme.spacing.gapSmall};
	transition: opacity 0.3s ease, box-shadow 0.25s ease-in-out;
	text-transform: uppercase;
	font-weight: bolder;
	text-decoration: none;
	font-size: ${props => props.theme.font.medium}vmin;

	&:hover {
		opacity: 1;
		box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
`;

const CatchButton = styled(Link)`
	display: flex;
	flex-flow: column;
	justify-content: center;
	padding: 2.2vmin;
	border-radius: 25px;
	background-color: white;
	border: none;
	opacity: 0.7;
	box-shadow: 1px 2px 4px 4px rgba(0, 0, 0, 0.25);
	color: black;
	margin-left: ${props => props.theme.spacing.gapSmall};
	transition: opacity 0.3s ease, box-shadow 0.25s ease-in-out;
	text-transform: uppercase;
	font-weight: bolder;
	text-decoration: none;
	font-size: ${props => props.theme.font.medium}vmin;

	&:hover {
		opacity: 1;
		box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
`;

const ConnectButton = styled(Account)`
	justify-content: center;
	height: 10%;
`;

const FishViewerContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
`;

const FishViewerButtons = styled.div`
	display: flex;
	flex-flow: row nowrap;
	height: 17%;
`;

const FishGrid = styled.div<GridProps>`
	display: flex;
	flex-direction: row nowrap;
	justify-content: space-between;
	height: 72%;
	overflow-y: hidden;
	overflow-x: hidden;
`;


export default ViewFish;

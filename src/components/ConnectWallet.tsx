import { useEffect } from 'react';
import styled from 'styled-components';
import { useUnity } from '../context/unityContext';
import Account from './Account';


const ConnectWallet = () => {
	const unityContext = useUnity()

	useEffect(() => {
		unityContext.showFishing();
	}, [unityContext.isFishPoolReady]);

	return (
		<ConnectContainer>
			<Account />
			<Text>To Catch A Fish Connect Your Wallet</Text>
		</ConnectContainer>
	);
};

const ConnectContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
`;

const Text = styled.p`
	display: flex;
	flex-flow: column;
	justify-content: center;
	padding: ${props => props.theme.spacing.gap};
	margin: 0;
	margin-top: ${props => props.theme.spacing.gap};
	background-color: white;
	font-size: ${props => props.theme.font.large}vmin;
	border-radius: 25px;
	margin-left: ${props => props.theme.spacing.gapSmall};
`;


export default ConnectWallet;

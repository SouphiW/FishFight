import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';

import { useHarmony } from '../context/harmonyContext';
import { useFishFight } from '../context/fishFightContext';

const Balance = () => {
	const { balance  } = useFishFight();

	if (!balance) return null;

	return (
		<BalanceComponent>
			<b>{balance.split('.')[0]}</b> <span>ONE</span>
		</BalanceComponent>
	);
};

const BalanceComponent = styled.div`
	display: flex;
	flex-flow: row;
	justify-content: center;
	font-size: ${props => props.theme.font.medium}vmin;
	margin-left: ${props => props.theme.spacing.gapSmall};
	padding: ${props => props.theme.spacing.gapSmall} ${props => props.theme.spacing.gapSmall};
	border-radius: 25px;
	background-color: white;
	color: black;

	& > span {
		margin-left: 4px;
	}
`;

export default Balance;

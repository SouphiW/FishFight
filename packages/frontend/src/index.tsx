import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { HarmonyProvider } from './context/harmonyContext';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibraryProvider } from './utils/provider';
import { FishFightProvider } from './context/fishFightContext';
import { UnityProvider } from './context/unityContext';


ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibraryProvider}>
			<HarmonyProvider>
				<UnityProvider>
					<FishFightProvider>
						<App />
					</FishFightProvider>
				</UnityProvider>
			</HarmonyProvider>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

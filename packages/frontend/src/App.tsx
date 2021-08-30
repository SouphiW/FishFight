// FishFight
import { useFishFight } from './context/fishFightContext';

// React web3
import { useWeb3React } from '@web3-react/core';

// React toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
import styled from 'styled-components';

// Components
import Account from './components/Account';
import Balance from './components/Balance';
import CreateFish from './components/CreateFish';
import UnityWindow from './components/UnityWindow';

// Logo
import Logo from './img/harmony_logo.svg';


const App = () => {
	const { FishFight } = useFishFight();
	
	// Will all remain undefined until user logs in
	// If user is using harmony wallet library will only contain messenger
	// If user is using other wallet library will have a web3Provider
	const { account, connector, library} = useWeb3React();

	return (
		<Wrapper>
			<Container>
				{account &&
				<>
						<Topbar>
							<img src={Logo} alt="Harmony logo" />
							<Flex>
								{/*<Balance /> */}
								{/*<Account />*/}
							</Flex>
						</Topbar>
						<Content>
							{/* <UnityWindow /> */}
							{ <CreateFish/> }
						</Content>
				</>
				}
				{!account &&
					<Account/>
				}
			</Container>
			<ToastContainer
				position="bottom-right"
				newestOnTop={false}
				pauseOnFocusLoss={false}
				pauseOnHover={false}
				rtl={false}
			/>
		</Wrapper>
	);
};

const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Topbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 74px;
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 0px 24px;
	max-width: 1200px;
	margin: 0 auto;
`;

const Wrapper = styled.div`
	background-color: #0093e9;
	background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
	font-size: 1rem;
	color: white;
`;

export default App;

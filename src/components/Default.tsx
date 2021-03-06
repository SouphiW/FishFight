// React
import React, { useState, useEffect } from 'react';
// Styled Components
import styled from 'styled-components';
import { useUnity } from '../context/unityContext';



const Default = () => {
	const unityContext = useUnity();

	useEffect(() => {
		unityContext.showHome();
	}, []);

	return (
		<></>
	);
};



export default Default;

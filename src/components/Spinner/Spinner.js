import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Definir colores constantes para el spinner
const ML_BLUE = '#3483fa';

const SpinnerContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  padding: '20px',
});

const StyledCircularProgress = styled(CircularProgress)({
  color: ML_BLUE,
});

export default function Spinner() {
  return (
    <SpinnerContainer>
      <StyledCircularProgress />
    </SpinnerContainer>
  );
}

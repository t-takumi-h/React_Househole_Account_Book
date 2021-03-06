import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Router } from './router/Router';

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;

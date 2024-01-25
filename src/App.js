import './App.css';

import {
    VStack,
  Container,
  Text,
  ChakraBaseProvider,
  extendBaseTheme
} from '@chakra-ui/react'

import DocxReader from "./components/DocxReader";

const theme = extendBaseTheme({})

function App() {
  return (
      <ChakraBaseProvider theme={theme}>
          <VStack>
              <Container maxW='2xl' centerContent>
                  <Text fontSize='4xl'>Juvo CV Parser</Text>
                  <DocxReader />
              </Container>
          </VStack>
      </ChakraBaseProvider>
  )
}

export default App;

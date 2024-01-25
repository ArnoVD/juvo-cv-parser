import './App.css';

import {
    VStack,
    Button,
  Container,
  Text,
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'

import axios from 'axios';

import DocxReader from "./components/DocxReader";

const theme = extendBaseTheme({})

function askQuestion() {
    const body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": ""
            }
        ]
    };

    const config = {
        headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
        }
    }

    axios.post(`https://api.openai.com/v1/chat/completions`,  body, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}

function App() {
  return (
      <ChakraBaseProvider theme={theme}>
          <VStack>
              <Container maxW='2xl' centerContent>
                  <Text fontSize='4xl'>Juvo CV Parser</Text>
                  <DocxReader />
                  <Button colorScheme='teal' size='lg' onClick={askQuestion}>
                      Button
                  </Button>
              </Container>
          </VStack>
      </ChakraBaseProvider>
  )
}

export default App;

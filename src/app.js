import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Input,
  VStack,
  Stat,
  Link,
  StatNumber,
  StatHelpText,
  Badge,
  Stack,
  Card,
  CardHeader,
  Spinner,
  Image,
  Flex,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import './App.css';
import githubLogo from './assets/GitHub_Logo.png'; // import your GitHub logo

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('available_links.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = useCallback(
    debounce((event) => {
      setFilter(event.target.value.toLowerCase());
    }, 300),
    []
  );

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        item.url.toLowerCase().includes(filter) ||
        item.headline.toLowerCase().includes(filter) ||
        (item.meeting_info.meeting_type || '').toLowerCase().includes(filter) ||
        (item.meeting_info.date || '').toLowerCase().includes(filter) ||
        (item.meeting_info.session || '').toLowerCase().includes(filter) ||
        (item.meeting_info.decision || '').toLowerCase().includes(filter)
      );
    });
  }, [data, filter]);

  return (
    <Container maxW="container.xl" py={4}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading as="h1" mb={4}>Verfügbare Beschlüsse ({filteredData.length})</Heading>
        <Link href="https://github.com/samsour/it-plr-decision-scraper" isExternal>
          <Image src={githubLogo} alt="GitHub Logo" boxSize="100" objectFit='contain' />
        </Link>
      </Flex>

      <VStack spacing={4} align="stretch" mb={4}>
        <Box>
          <Input
            placeholder='Suchen'
            size='lg'
            type="text"
            id="filter"
            onChange={handleFilterChange}
            fontSize="2xl"
            p={4}
          />
        </Box>
      </VStack>

      <Box overflowX="auto">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Stack spacing={4}>
            {filteredData.reverse().map((item, index) => (
              <Link href={item.url} target="_blank" rel="noopener noreferrer" colorScheme='teal' variant='outline' key={index}>
                <Card>
                  <CardHeader>
                    <Stack direction='row'>
                      <Badge colorScheme='green'>{item.meeting_info.decision}</Badge>
                      <Badge colorScheme='red'>{item.meeting_info.meeting_type}</Badge>
                      <Badge colorScheme='purple'>{item.meeting_info.session}</Badge>
                    </Stack>
                    <Stat>
                      <StatNumber>{item.headline}</StatNumber>
                      <StatHelpText>{item.meeting_info.date}</StatHelpText>
                    </Stat>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default App;
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('available_links.json')
      .then(response => response.json())
      .then(data => setData(data));
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

  const showArticle = (articleHtml) => {
    const articleWindow = window.open('', '_blank');
    articleWindow.document.write(articleHtml);
    articleWindow.document.close();
  };

  return (
    <Container maxW="container.xl" py={4}>
      <Heading as="h1" mb={4}>Verfügbare Beschlüsse</Heading>
      <VStack spacing={4} align="stretch" mb={4}>
        <Box>
          <Input
            type="text"
            id="filter"
            placeholder="Suchen"
            onChange={handleFilterChange}
            fontSize="2xl"
            p={4}
          />
        </Box>
      </VStack>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Link</Th>
              <Th>Headline</Th>
              <Th>Meeting Type</Th>
              <Th>Date</Th>
              <Th>Session</Th>
              <Th>Decision</Th>
              <Th>Article</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.reverse().map((item, index) => (
              <Tr key={index}>
                <Td><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></Td>
                <Td>{item.headline}</Td>
                <Td>{item.meeting_info.meeting_type || ''}</Td>
                <Td>{item.meeting_info.date || ''}</Td>
                <Td>{item.meeting_info.session || ''}</Td>
                <Td>{item.meeting_info.decision || ''}</Td>
                <Td>{item.article_html ? <Button onClick={() => showArticle(item.article_html)}>Show Article</Button> : ''}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}

export default App;
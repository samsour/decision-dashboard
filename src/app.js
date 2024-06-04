import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('available_links.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(item => {
    return (
      item.url.toLowerCase().includes(filter) ||
      item.headline.toLowerCase().includes(filter) ||
      (item.meeting_info.meeting_type || '').toLowerCase().includes(filter) ||
      (item.meeting_info.date || '').toLowerCase().includes(filter) ||
      (item.meeting_info.session || '').toLowerCase().includes(filter) ||
      (item.meeting_info.decision || '').toLowerCase().includes(filter)
    );
  });

  const showArticle = (articleHtml) => {
    const articleWindow = window.open('', '_blank');
    articleWindow.document.write(articleHtml);
    articleWindow.document.close();
  };

  return (
    <Container maxW="container.xl" py={4}>
      <Heading as="h1" mb={4}>Verfügbare Beschlüsse</Heading>
      <Input
        type="text"
        id="filter"
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
        mb={4}
      />
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
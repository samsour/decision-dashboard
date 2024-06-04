import React, { useState, useEffect } from 'react';
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
    <div className="App">
      <h1>Verfügbare Beschlüsse</h1>
      <input
        type="text"
        id="filter"
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
      />
      <table id="beschluesseTable">
        <thead>
          <tr>
            <th>Link</th>
            <th>Headline</th>
            <th>Meeting Type</th>
            <th>Date</th>
            <th>Session</th>
            <th>Decision</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></td>
              <td>{item.headline}</td>
              <td>{item.meeting_info.meeting_type || ''}</td>
              <td>{item.meeting_info.date || ''}</td>
              <td>{item.meeting_info.session || ''}</td>
              <td>{item.meeting_info.decision || ''}</td>
              <td>{item.article_html ? <button onClick={() => showArticle(item.article_html)}>Show Article</button> : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
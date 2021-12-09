import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
      axios.get('http://localhost:8080/hello')
      .then(res => setData(res.data))
  })
  return (
    <div>
      {data && <textarea rows={7} value={JSON.stringify(data)}></textarea>}
    </div>
  );
}

export default App;

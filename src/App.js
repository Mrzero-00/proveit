import './App.css';
import './css/styled.css'; 
import Root from './Router/Root';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Root></Root>
      </BrowserRouter>
  );
}

export default App;

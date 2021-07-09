import './App.css';
import './css/styled.css'; 
import Root from './Router/Root';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './Redux/rootReducer';

function App() {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Root></Root>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

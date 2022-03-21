import './css/common.css'; 
import './css/styled.css'; 
import './css/styled_tablet.css'; 
import './css/styled_tablet_small.css'; 
import './css/styled_mobile.css'; 
import './css/styled_mobile_small.css'; 
import Root from './Router/Root';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
  //   <WebView
  //   source={{uri:'https://www.proveit.co.kr'}}
  //   userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36' 
  //   sharedCookiesEnabled={true} 
  //   thirdPartyCookiesEnabled={true}
  // />
      <BrowserRouter>
        <Root></Root>
      </BrowserRouter>
    
  );
}

export default App;

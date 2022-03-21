import React from 'react';
import { WebView } from 'react-native-webview';

const Webview = ()=>{
  return(
  <WebView
    source={{uri:'https://www.proveit.co.kr'}}
    userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36' 
    sharedCookiesEnabled={true} 
    thirdPartyCookiesEnabled={true}
  />
  ) 
}

export default Webview;
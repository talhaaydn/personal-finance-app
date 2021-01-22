import React from 'react';
import {WebView} from 'react-native-webview';

const NewsWebView = ({route, navigation}) => {
  const {url} = route.params;
  return <WebView source={{uri: url}} />;
};

export default NewsWebView;

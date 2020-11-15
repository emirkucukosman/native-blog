import 'react-native-gesture-handler';
import React from 'react'

import { Provider } from 'react-redux'
import store from './redux/store'

import Home from './Home'

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;

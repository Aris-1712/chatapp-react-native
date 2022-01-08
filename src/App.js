import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Signin from './Views/Signin';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import RootStack from './Routes/StackNavigator';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './Global/Reducer';
import thunk from 'redux-thunk'

const store = createStore(Reducer,applyMiddleware(thunk));

const App = props => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack></RootStack>
        </NavigationContainer>
      </Provider>
      <Toast></Toast>
    </SafeAreaProvider>
  );
};

export default App;

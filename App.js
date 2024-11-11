import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/Redux_Store';
import Screen_02 from './src/screens/Screen_02';
import Screen_03 from './src/screens/Screen_03';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen_02">
          <Stack.Screen name="Screen_02" component={Screen_02} />
          <Stack.Screen name="Screen_03" component={Screen_03} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

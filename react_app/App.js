import React from 'react';
import{ NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TableEx from './components/table.js'
import ViewScreen from './components/viewScreen.js';
import EditScreen from './components/edit.js';
import AddScreen from './components/add.js'

const Stack = createNativeStackNavigator();
const App = () => {
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="TableEx" component={TableEx} />
        <Stack.Screen name="ViewScreen" component={ViewScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  };

export default App


  

  

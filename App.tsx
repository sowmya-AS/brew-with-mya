import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import coffeeReducer from './src/redux/coffeeSlice';
import Home from './src/screens/Home';
import CoffeeTypes from './src/screens/CoffeeTypes';
import CoffeeSizes from './src/screens/CoffeeSizes';
import Extras from './src/screens/Extras';
import Overview from './src/screens/Overview';
import CustomHeader from './src/components/CustomHeader'; 

const Stack = createStackNavigator();
const store = configureStore({
  reducer: {
    coffee: coffeeReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            header: () => {
              const title =  "Brew with Mya";
              return <CustomHeader title={title} />;
            },
          })}
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="CoffeeTypes" component={CoffeeTypes} />
          <Stack.Screen name="Sizes" component={CoffeeSizes} />
          <Stack.Screen name="Extras" component={Extras} />
          <Stack.Screen name="Overview" component={Overview} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

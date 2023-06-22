import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GALLERY, IMAGE_FULL_SCREEN} from './constants/screens';
import {Gallery, ImageFullScreen} from './screens';
import {store} from './store/store';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={GALLERY} component={Gallery} />
            <Stack.Screen
              options={{
                gestureEnabled: true,
                presentation: 'modal',
                headerShown: false,
              }}
              name={IMAGE_FULL_SCREEN}
              component={ImageFullScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;

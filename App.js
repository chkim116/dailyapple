import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './page/Main';
import {useAuth} from './util/stroage';
import Setting from './page/Setting';
import Home from './page/Home';
import HeaderRight from './components/HeaderRight';
import {useDispatch, useSelector} from 'react-redux';
import {saveUser} from './modules/user';

const Stack = createStackNavigator();

const App = () => {
  const {isLogin} = useSelector(state => state.user);
  const user = useAuth();
  const dispatch = useDispatch();
  if (user) dispatch(saveUser(user));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin ? (
            <Stack.Screen component={Main} name="Daily Apple" />
          ) : (
            <>
              <Stack.Screen
                component={Home}
                name="Day f"
                options={{
                  title: 'Daily Apple',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerRight: () => <HeaderRight />,
                  headerRightContainerStyle: {
                    marginRight: 12,
                  },
                }}
              />
              <Stack.Screen component={Setting} name="Setting" />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;

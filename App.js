import React, {useCallback, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './page/Main';
import Home from './page/Home';
import Setting from './page/Setting';
import HeaderRight from './components/HeaderRight';
import {getStorage} from './util/stroage';
import {useDispatch, useSelector} from 'react-redux';
import {saveUser} from './modules/user';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);

  // 유저 데이터 불러오기
  useEffect(() => {
    const get = async () => dispatch(saveUser(await getStorage('couple')));
    get();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          {userData ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
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
              <Stack.Screen name="Setting" component={Setting} />
            </>
          ) : (
            <Stack.Screen name="Daily Apple" component={Main} />
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

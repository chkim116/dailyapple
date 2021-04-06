import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AniversaryList from './AniversaryList';
import DayList from './DayList';
import Icon from 'react-native-vector-icons/AntDesign';

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="기념일"
        component={AniversaryList}
        options={{
          tabBarLabel: '기념일',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="데이챙기기"
        options={{
          tabBarLabel: '데이챙기기',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar" color={color} size={25} />
          ),
        }}
        component={DayList}
      />
    </Tabs.Navigator>
  );
};

export default Home;

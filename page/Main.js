import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import UserInput from '../components/UserInput';

const Main = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <UserInput />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;

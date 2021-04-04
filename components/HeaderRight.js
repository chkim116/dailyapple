import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {Text} from 'react-native';

const HeaderRight = () => {
  const navigation = useNavigation();

  const handleGoToSetting = useCallback(() => {
    navigation.navigate('Setting');
  }, [navigation]);

  return <Text onPress={handleGoToSetting}>Setting</Text>;
};

export default HeaderRight;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveUser} from '../modules/user';

export const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const useAuth = () => {
  const [user, setUser] = useState();

  const getStorage = useCallback(async () => {
    const item = await AsyncStorage.getItem('couple');
    const res = JSON.parse(item);
    if (res) setUser(res);
    else setUser(null);
  }, []);

  useEffect(() => {
    getStorage();
  }, []);

  return user;
};

export const saveStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

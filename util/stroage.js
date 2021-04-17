import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

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

  return user ? user : null;
};

export const useGetStorage = key => {
  const [item, setItem] = useState();

  const getStorage = async itemKey => {
    try {
      const res = await AsyncStorage.getItem(itemKey);
      if (res) setItem(JSON.parse(res));
      else setItem(null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStorage(key);
  }, []);

  return item;
};

export const saveStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

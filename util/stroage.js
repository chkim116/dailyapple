import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const getStorage = async key => {
  try {
    const item = await AsyncStorage.getItem(key);
    const res = JSON.parse(item);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const saveStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import Button from '../components/Button';
import {resetUser} from '../modules/user';
import {removeStorage} from '../util/stroage';
import CheckBox from '@react-native-community/checkbox';

const Setting = () => {
  const data = [
    {id: '1', desc: '기념일 알람'},
    {id: '2', desc: '데이 리스트 알람'},
  ];
  const dispatch = useDispatch();

  const handleRemoveUser = useCallback(() => {
    removeStorage('couple');
    dispatch(resetUser());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({item}) => (
          <View style={styles.checkboxContainer}>
            <Text style={styles.flatListData}>{item.desc}</Text>
            <CheckBox
              style={styles.checkbox}
              boxType="square"
              disabled={false}
            />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Text>다시 정보를 입력하고 싶으신가요?</Text>
        <Button styles={styles.removeButton} onPress={handleRemoveUser}>
          정보삭제
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginLeft: 12,
    marginBottom: 12,
  },
  flatList: {
    padding: 15,
  },
  flatListData: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    borderColor: '#dbdbdb',
    borderTopWidth: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 16,
  },
  removeButton: {
    width: 90,
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#d05148',
  },
});

export default Setting;

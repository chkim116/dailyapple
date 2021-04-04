import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import Button from '../components/Button';
import {resetUser} from '../modules/user';
import {removeStorage} from '../util/stroage';

const Setting = () => {
  const data = [
    {id: '1', desc: '0일부터 시작'},
    {id: '2', desc: '위젯 내보내기'},
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
          <Text style={styles.flatListData}>{item.desc}</Text>
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

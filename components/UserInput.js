import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import {saveStorage} from '../util/stroage';
import Icon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {saveUser} from '../modules/user';

const UserInput = () => {
  const [isPicker, setIsPicker] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [coupleData, setCoupleData] = useState({
    me: '',
    you: '',
    date: new Date(),
  });
  const dispatch = useDispatch();

  const handleMeChange = useCallback(value => {
    setCoupleData(prev => ({...prev, me: value}));
  }, []);

  const handleYouChange = useCallback(value => {
    setCoupleData(prev => ({...prev, you: value}));
  }, []);

  const handleDateChange = useCallback(date => {
    setCoupleData(prev => ({...prev, date}));
  }, []);

  const handleNextStatePicker = useCallback(() => {
    if (coupleData.me && coupleData.you) {
      setIsPicker(() => true);
      return;
    }

    console.log('다입력해야죠.');
  }, [coupleData]);

  const handlePrevStageUser = useCallback(() => {
    setIsPicker(() => false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (coupleData.date) {
      setIsFinish(() => true);
    }
  }, [coupleData]);

  const handleFinish = useCallback(() => {
    const year = coupleData.date.getFullYear();
    const month = coupleData.date.getMonth() + 1;
    const day = coupleData.date.getDate();
    const data = `${year}년 ${month}월 ${day}일`;

    Alert.alert(
      '완료 확인',
      `${coupleData.me}😍${coupleData.you} ${data} 맞으신가요?`,
      [
        {text: '예', onPress: handleConfirm},
        {text: '아니요', style: 'cancel'},
      ],
    );
  }, [coupleData, handleConfirm]);

  if (isFinish) dispatch(saveUser(coupleData));

  useEffect(() => {
    if (!isFinish) return;
    saveStorage('couple', coupleData);
  }, [isFinish, coupleData]);

  return (
    <>
      <Icon name="heart" size={30} color="red" style={styles.heartIcon} />
      <Text style={styles.title}>
        Daily Apple <FontIcon name="apple" size={24} color="#d05148" />
      </Text>
      {!isPicker ? (
        <View style={styles.main}>
          <TextInput
            style={styles.nameInput}
            type="text"
            placeholder="본인의 이름을 입력하세요"
            onChangeText={handleMeChange}
          />
          <TextInput
            style={styles.nameInput}
            type="text"
            placeholder="상대방의 이름을 입력하세요"
            onChangeText={handleYouChange}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={handleNextStatePicker}>다음</Button>
          </View>
        </View>
      ) : (
        <>
          <DatePicker
            mode="date"
            locale="ko"
            date={new Date()}
            onDateChange={handleDateChange}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={handlePrevStageUser}>이전</Button>
            <Button onPress={handleFinish}>완료</Button>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    position: 'absolute',
    top: 30,
  },
  heartIcon: {
    marginBottom: 36,
  },
  main: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  nameInput: {
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 12,
    width: 250,
    marginBottom: 8,
  },
});

export default UserInput;

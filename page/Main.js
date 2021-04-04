import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {saveStorage} from '../util/stroage';
import Icon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {saveUser} from '../modules/user';

const Main = () => {
  const [isPicker, setIsPicker] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [coupleData, setCoupleData] = useState({me: '', you: '', date: ''});
  const dispatch = useDispatch();

  const handleMeChange = useCallback(value => {
    setCoupleData(prev => ({...prev, me: value}));
  }, []);

  const handleYouChange = useCallback(value => {
    setCoupleData(prev => ({...prev, you: value}));
  }, []);

  const handleDateChange = useCallback(date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setCoupleData(prev => ({...prev, date: `${year}년 ${month}월 ${day}일`}));
  }, []);

  const handleNextStatePicker = useCallback(() => {
    setIsPicker(() => true);
  }, []);

  const handlePrevStageUser = useCallback(() => {
    setIsPicker(() => false);
  }, []);

  const handleConfirm = useCallback(() => {
    setIsFinish(() => true);
  }, []);

  const handleFinish = useCallback(() => {
    Alert.alert(
      '완료 확인',
      `${coupleData.me}😍${coupleData.you} ${coupleData.date} 맞으신가요?`,
      [
        {text: '예', onPress: handleConfirm},
        {text: '아니요', style: 'cancel'},
      ],
    );
  }, [coupleData]);

  useEffect(() => {
    if (!isFinish) return;
    saveStorage('couple', coupleData);
    dispatch(saveUser(coupleData));
  }, [isFinish]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
              onDateChange={handleDateChange}
            />
            <View style={styles.buttonContainer}>
              <Button onPress={handlePrevStageUser}>이전</Button>
              <Button onPress={handleFinish}>완료</Button>
            </View>
          </>
        )}
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default Main;

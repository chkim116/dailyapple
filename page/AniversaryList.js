import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useMeetDate} from '../util/hook';

export const getTiem = () => {
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  const kTime = new Date(utc + KR_TIME_DIFF);

  return kTime;
};

// 100, 365일 단위로 배열에 넣기
export const newAniversary = () => {
  let day = 0;
  let year = 0;
  let res = [];
  while (day < 3600) {
    day += 100;
    res.push(day);
  }

  while (year <= 3285) {
    year += 365;
    res.push(year);
  }

  return res;
};

//  데이터를 년-월-일로 포매팅
export const dateFormat = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = date.getDay();
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];

  return `${year}년 ${month}월 ${day}일 (${weekName[week]})`;
};

//  기념일대로 싸라라~~
const renderAniversaryDay = ({item}) => (
  <View style={item.behind ? styles.behindContainer : styles.dayContainer}>
    <Text style={styles.dayTitle}>
      {item.title % 365 === 0 ? `${item.title / 365}주년` : `${item.title}일`}
    </Text>
    <Text style={styles.dayDesc}>{item.desc}</Text>
  </View>
);

const AniversaryList = () => {
  const userData = useSelector(state => state.user.userData);
  const list = useRef();
  const [data, setData] = useState();
  const [calcDay, diffDay, meetTime] = useMeetDate();

  useEffect(() => {
    setData(() =>
      newAniversary()
        .sort((a, b) => a - b)
        .map(number => ({
          id: number,
          title: number,
          desc: dateFormat(
            number % 365 === 0
              ? calcDay(number).getDate() === meetTime.getDate()
                ? calcDay(number)
                : new Date(
                    calcDay(number).getFullYear(),
                    calcDay(number).getMonth(),
                    meetTime.getDate(),
                  )
              : calcDay(number - 1),
          ),
          behind: calcDay(number) < getTiem() ? true : false,
        })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {data && (
        <FlatList
          initialScrollIndex={Math.ceil(diffDay / 100)}
          getItemLayout={(item, index) => ({
            length: item.length,
            offset: index === 1 ? 1 : 80 * index,
            index,
          })}
          ref={list}
          data={data}
          ListHeaderComponent={
            <Text style={styles.textSmall}>
              {dateFormat(new Date(userData.date))}부터 1일이에오😍
            </Text>
          }
          renderItem={renderAniversaryDay}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  textSmall: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  bannerImg: {
    opacity: 0.85,
  },

  dayContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    height: 80,
  },
  behindContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    opacity: 0.3,
    height: 80,
  },
  dayTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  dayDesc: {
    fontSize: 14,
    color: '#333',
  },
});

export default AniversaryList;

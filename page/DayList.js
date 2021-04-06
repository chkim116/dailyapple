import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';

const renderAniversaryDay = ({item}) => (
  <View style={styles.dayContainer}>
    <Text style={styles.dayTitle}>{item.day}</Text>
    <Text style={styles.dayDesc}>{item.desc}</Text>
    <View>
      <Text style={styles.dayTodo}>{item.todo}</Text>
    </View>
  </View>
);

const DayList = () => {
  const data = [
    {
      day: '1월',
      desc: '다이어리데이',
      todo: '서로 일기장을 선물하는 날',
    },
    {
      day: '2월',
      desc: '발렌타인데이',
      todo: '여성이 남성에게 초콜릿을 주는 날',
    },
    {
      day: '3월',
      desc: '화이트데이',
      todo: '남성이 여성에게 사탕 주는 날',
    },
    {
      day: '5월',
      desc: '로즈데이',
      todo: '연인끼리 꽃을 선물하는 날',
    },
    {
      day: '6월',
      desc: '키스데이',
      todo: '연인끼리 입맞추는 날',
    },
    {
      day: '7월',
      desc: '실버데이',
      todo: '은반지(은제품)를 선물하는 날',
    },
    {
      day: '8월',
      desc: '그린데이',
      todo: '산림욕으로 무더위를 달래는 날',
    },
    {
      day: '9월',
      desc: '포토데이',
      todo: '기념사진 찍는 날',
    },
    {
      day: '10월',
      desc: '와인데이',
      todo: '함께 포도주를 마시는 날',
    },
    {
      day: '11월',
      desc: '무비데이',
      todo: '함께 영화 보는 날',
    },
    {
      day: '12월',
      desc: '허그데이',
      todo: '서로를 안아 주는 날',
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>사소한 데이도 센스있게</Text>
            <Text style={styles.textSmall}>매달 14일입니다.</Text>
          </View>
        }
        renderItem={renderAniversaryDay}
        keyExtractor={item => item.day}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
  },
  textContainer: {
    fontWeight: 'bold',
    height: 200,
    width: '100%',
    justifyContent: 'center',
  },
  textContainerScroll: {
    fontWeight: 'bold',
    height: 140,
    width: '100%',
    justifyContent: 'center',
  },

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

  dayContainer: {
    padding: 12,
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  dayTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  dayDesc: {
    fontSize: 16,
    color: '#333',
  },
  dayTodo: {
    marginTop: 6,
  },
});

export default DayList;

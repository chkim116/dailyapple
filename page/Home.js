import React, {useCallback, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const newAniversary = () => {
  let i = 0;
  let res = [];
  while ((i += 5 < 10000)) {
    if (i % 100 === 0) {
      res.push(i);
    }
    if (i % 365 === 0) {
      res.push(i);
    }
  }

  return res;
};

const dateFormat = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const renderAniversaryDay = ({item}) => (
  <View style={styles.dayContainer}>
    <Text style={styles.dayTitle}>
      {item.title % 365 === 0 ? `${item.title / 365}주년` : `${item.title}일`}
    </Text>
    <Text style={styles.dayDesc}>{item.desc}</Text>
  </View>
);

const Home = () => {
  const {userData} = useSelector(state => state.user);
  const [bannerImg, setBannerImg] = useState(
    'https://akm-img-a-in.tosshub.com/sites/dailyo/fb_feed_images/story_image/201901/couple-fb_012119080453.jpg',
  );
  const [scrollList, setScrollList] = useState(false);
  const meetTime = new Date(userData.date);
  // ex 20.04.04 - 21.04.04

  const meetYear = meetTime.getFullYear();
  const meetMonth = meetTime.getMonth();
  const meetDay = meetTime.getDate();

  const firstTime = new Date(meetYear, meetMonth, meetDay).getTime();
  const today = Date.now();
  const oneDay = 86400000;

  const diffDay = Math.floor((today - firstTime) / oneDay);
  // const diffMonth = Math.floor((today - firstTime) / (oneDay * 30));
  // const diffYear = Math.floor((today - firstTime) / (oneDay * 30 * 12));

  const calcDay = days => new Date(firstTime + days * oneDay);

  const data = newAniversary().map(number => ({
    id: number,
    title: number,
    desc: dateFormat(
      number % 365 === 0
        ? calcDay(number).getDate() === 14
          ? calcDay(number)
          : new Date(
              calcDay(number).getFullYear(),
              calcDay(number).getMonth(),
              14,
            )
        : calcDay(number - 1),
    ),
  }));

  const handleTouchScrollLIst = useCallback(e => {
    const y = e.nativeEvent.contentOffset.y;

    if (y > 0) setScrollList(true);
    else setScrollList(false);
  }, []);

  return (
    <View>
      <ImageBackground
        style={styles.bannerImg}
        imageStyle={styles.bannerImg}
        source={{
          url: bannerImg,
        }}>
        <View
          style={scrollList ? styles.textContainerScroll : styles.textContainer}
          onTouchEnd={e => console.log('이미지 불러와보쟈')}>
          <Text style={styles.text}>
            {userData.me}♥{userData.you}
          </Text>
          <Text style={styles.text}>
            우리 오늘 만난지 {diffDay + 1}일 되는 날♥
          </Text>
        </View>
      </ImageBackground>
      <View>
        <FlatList
          onScroll={handleTouchScrollLIst}
          data={data}
          ListHeaderComponent={
            <Text style={styles.textSmall}>
              {dateFormat(new Date(userData.date))}부터 1일이에오😍
            </Text>
          }
          renderItem={renderAniversaryDay}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  bannerImg: {
    opacity: 0.85,
  },

  dayContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
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

export default Home;

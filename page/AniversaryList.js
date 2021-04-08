import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import {saveStorage, useGetStorage} from '../util/stroage';

// 100, 365일 단위로 배열에 넣기
const newAniversary = () => {
  let i = 0;
  let res = [];
  while (i < 5000) {
    i += 5;
    if (i % 100 === 0) {
      res.push(i);
    }
    if (i % 365 === 0) {
      res.push(i);
    }
  }

  return res;
};

//  데이터를 년-월-일로 포매팅
const dateFormat = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
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

  const img = useGetStorage('img');
  const [bannerImg, setBannerImg] = useState(
    img ??
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
  const calcDay = days => new Date(firstTime + days * oneDay);

  const handleLoadImg = useCallback(() => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      width: '100%',
    };
    ImagePicker.launchImageLibrary(options, res => {
      if (res.error) {
        console.log('LaunchImageLibrary Error: ', res.error);
      } else {
        setBannerImg(() => res.uri);
      }
    });
  }, []);

  useEffect(() => {
    if (img) {
      setBannerImg(() => img);
    }
  }, [img]);

  useEffect(() => {
    saveStorage('img', bannerImg);
  }, [bannerImg]);

  useEffect(() => {
    setData(() =>
      newAniversary().map(number => ({
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
        behind: calcDay(number) < new Date() ? true : false,
      })),
    );
  }, []);

  const handleTouchScrollLIst = useCallback(e => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > 100 * Math.ceil(diffDay / 100)) setScrollList(true);
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
          onTouchEnd={handleLoadImg}>
          <Text style={styles.text}>
            {userData.me}♥{userData.you}
          </Text>
          <Text style={styles.text}>
            우리 오늘 만난지 {diffDay + 1}일 되는 날♥
          </Text>
        </View>
      </ImageBackground>
      <View>
        {data && (
          <FlatList
            initialScrollIndex={Math.ceil(diffDay / 100)}
            getItemLayout={(data, index) => ({
              length: data.length,
              offset: 80 * index,
              index,
            })}
            ref={list}
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
        )}
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

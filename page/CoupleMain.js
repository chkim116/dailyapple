import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {saveStorage, useGetStorage} from '../util/stroage';
import {dateFormat, getTiem, newAniversary} from './AniversaryList';
import {useMeetDate} from '../util/hook';
import Icon from 'react-native-vector-icons/FontAwesome';

const restDate = f => {
  const array = newAniversary().sort((a, b) => a - b);
  let res;
  for (const a of array) {
    if (!f(a)) {
      res = a;
      break;
    }
  }
  return res;
};

const CoupleMain = () => {
  const {userData} = useSelector(state => state.user);
  const [calcDay, diffDay] = useMeetDate();
  const restNextDay = restDate(number => calcDay(number) < getTiem());
  const rest = restNextDay - diffDay - 1;
  const percent = 100 - rest;
  const img = useGetStorage('img');
  const [bannerImg, setBannerImg] = useState(
    img ??
      'https://akm-img-a-in.tosshub.com/sites/dailyo/fb_feed_images/story_image/201901/couple-fb_012119080453.jpg',
  );

  const handleLoadImg = useCallback(() => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      width: '100%',
    };
    ImagePicker.launchImageLibrary(options, res => {
      if (res.error) {
        return console.log('LaunchImageLibrary Error: ', res.error);
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

  return (
    <>
      <Text style={styles.imgButton} onPress={handleLoadImg}>
        <Icon name="image" size={20} color="#fafbfc" />
      </Text>
      <ImageBackground
        style={styles.bannerImgBox}
        imageStyle={styles.bannerImgBox}
        source={{
          url: bannerImg,
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {userData.me}♥{userData.you}
          </Text>
          <Text style={styles.text}>
            우리 오늘 만난지 {diffDay + 1}일 되는 날♥
          </Text>
          <Text style={styles.betweenText}>
            {dateFormat(new Date(userData.date))}부터 1일이에오😍
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.toAniversary}>
        <View style={styles.toAniversaryToDay}>
          <Text style={styles.toAniversaryToDayText}>
            다음 기념일은 {restNextDay}일
          </Text>
          <View style={styles.nextAniversaryContainer}>
            <View style={styles.nextAniversary}>
              <View
                style={{
                  position: 'absolute',
                  width: `${percent}%`,
                  height: 2,
                  backgroundColor: '#f8f5f1',
                  zIndex: 2,
                  top: 0,
                }}
              />
            </View>
          </View>
          <Text style={styles.restDay}>{rest}일 남았어요!</Text>
        </View>
        <View>
          <Text style={styles.toAniversaryToDayText}>
            이번달 14일의 데이는 ~~데이
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imgButton: {
    position: 'absolute',
    backgroundColor: '#333',
    zIndex: 3,
    top: 4,
    right: 8,
    paddingHorizontal: 2,
  },
  bannerImgBox: {
    opacity: 0.85,
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    fontWeight: 'bold',
    height: 200,
    width: '100%',
    justifyContent: 'center',
  },

  text: {
    marginTop: 8,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  betweenText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  toAniversary: {
    flex: 0.3,
    backgroundColor: '#ffc2b4',
    padding: 12,
    alignItems: 'center',
  },
  toAniversaryToDay: {
    marginBottom: 24,
  },
  toAniversaryToDayText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 20,
  },
  nextAniversaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextAniversary: {
    width: 200,
    textAlign: 'center',
    height: 2,
    backgroundColor: '#e9896a',
    position: 'relative',
  },
  restDay: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 5,
  },
});

export default CoupleMain;

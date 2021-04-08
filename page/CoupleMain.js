import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {saveStorage, useGetStorage} from '../util/stroage';
import {dateFormat} from './AniversaryList';

const CoupleMain = () => {
  const {userData} = useSelector(state => state.user);
  const meetTime = new Date(userData.date);
  // ex 20.04.04 - 21.04.04

  const meetYear = meetTime.getFullYear();
  const meetMonth = meetTime.getMonth();
  const meetDay = meetTime.getDate();

  const firstTime = new Date(meetYear, meetMonth, meetDay).getTime();
  const today = Date.now();
  const oneDay = 86400000;

  const diffDay = Math.floor((today - firstTime) / oneDay);

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
      <ImageBackground
        style={styles.bannerImgBox}
        imageStyle={styles.bannerImgBox}
        source={{
          url: bannerImg,
        }}>
        <View style={styles.textContainer} onTouchEnd={handleLoadImg}>
          <Text style={styles.text}>
            {userData.me}♥{userData.you}
          </Text>
          <Text style={styles.text}>
            우리 오늘 만난지 {diffDay + 1}일 되는 날♥
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.textSmall}>
        {dateFormat(new Date(userData.date))}부터 1일이에오😍
      </Text>
      <View style={styles.toAniversary}>
        <View style={styles.toAniversaryToDay}>
          <Text>다음 기념일까지 ~~~ 일</Text>
        </View>
        <View>
          <Text>이번달 14일의 데이는 ~~데이 </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  textSmall: {
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'yellow',
  },
  toAniversary: {
    flex: 0.3,
    backgroundColor: 'red',
    padding: 12,
    alignItems: 'center',
  },
  toAniversaryToDay: {
    marginBottom: 24,
  },
});

export default CoupleMain;

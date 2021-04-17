import {View, ImageBackground, StyleSheet, Text, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {saveStorage, useGetStorage} from '../util/stroage';
import {dateFormat, getTiem, newAniversary} from './AniversaryList';
import {useMeetDate} from '../util/hook';
import Icon from 'react-native-vector-icons/FontAwesome';
import {dayListData} from './DayList';

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

const nextDayLIst = () => {
  let res;
  const month = new Date().getMonth() + 1;
  for (const a of dayListData) {
    const monthNumber = a.day.replace('월', '');
    if (month === 4) {
      res = '로즈데이';
      break;
    }
    if (month === +monthNumber) {
      res = a.desc;
      break;
    }
  }

  return res;
};

const CoupleMain = () => {
  const {userData, isLogin} = useSelector(state => state.user);

  const [calcDay, diffDay] = useMeetDate();
  const restNextDay = restDate(number => calcDay(number) < getTiem());
  const rest = restNextDay - diffDay - 1;
  const percent = 100 - rest;
  const img = useGetStorage('img');
  const me = useGetStorage('me');
  const you = useGetStorage('you');

  const [meImg, setMeImg] = useState(
    me
      ? me
      : 'https://png.pngtree.com/png-clipart/20190115/ourmid/pngtree-red-heart-png-image_319448.jpg',
  );
  const [youImg, setYouImg] = useState(
    you
      ? you
      : 'https://png.pngtree.com/png-clipart/20190115/ourmid/pngtree-red-heart-png-image_319448.jpg',
  );
  const [bannerImg, setBannerImg] = useState(
    img
      ? img
      : 'https://akm-img-a-in.tosshub.com/sites/dailyo/fb_feed_images/story_image/201901/couple-fb_012119080453.jpg',
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

  const handleMeIcon = useCallback(() => {
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
        setMeImg(() => res.uri);
      }
    });
  }, []);

  const handleYouIcon = useCallback(() => {
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
        setYouImg(() => res.uri);
      }
    });
  }, []);

  useEffect(() => {
    if (img) {
      setBannerImg(() => img);
    }
  }, [img]);

  useEffect(() => {
    if (me) {
      setMeImg(() => me);
    }
  }, [me]);

  useEffect(() => {
    if (you) {
      setYouImg(() => you);
    }
  }, [you]);

  useEffect(() => {
    saveStorage('img', bannerImg);
  }, [bannerImg]);

  useEffect(() => {
    saveStorage('me', meImg);
  }, [meImg]);

  useEffect(() => {
    saveStorage('you', youImg);
  }, [youImg]);

  if (!isLogin) {
    return null;
  }

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
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Text>
              <Text onPress={handleMeIcon}>
                <Image style={styles.meImg} source={{url: meImg}} />
              </Text>
              <View style={{padding: 6}}>
                <Text style={{color: '#ffffff', fontSize: 20}}>
                  {userData.me} ♥ {userData.you}
                </Text>
              </View>
              <Text onPress={handleYouIcon}>
                <Image style={styles.youImg} source={{url: youImg}} />
              </Text>
            </Text>
          </View>
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
            다음 기념일은{' '}
            {restNextDay % 365 === 0
              ? `${restNextDay / 365}주년`
              : `${restNextDay}일`}
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
          <Text style={styles.restDay}>
            <>
              {rest === 0
                ? restNextDay % 365 === 0
                  ? `${restNextDay / 365}주년 축하드려요`
                  : `${restNextDay}일 축하드려요`
                : `${dateFormat(
                    calcDay(restNextDay),
                  )} 까지 ${rest}일 남았어요!`}
            </>
          </Text>
        </View>

        <View>
          <Text style={styles.toAniversaryToDayText}>
            {new Date().getMonth() + 1 === 4 ? 5 : new Date().getMonth() + 1}월
            14일에 챙길 데이는{' '}
            <Text style={styles.nextDayText}>{nextDayLIst()} !</Text>
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
    backgroundColor: '#b0b0b0',
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
  meImg: {
    width: 20,
    height: 20,
    borderRadius: 50,
    margin: 10,
    borderColor: '#dbdbdb',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    zIndex: 55,
  },
  youImg: {
    width: 20,
    height: 20,
    borderRadius: 50,
    margin: 10,
    zIndex: 55,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    marginBottom: 18,
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
    marginTop: 35,
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
    marginTop: 14,
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
  nextDayText: {
    fontSize: 22,
  },
  restDay: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 5,
  },
});

export default CoupleMain;

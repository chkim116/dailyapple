import React from 'react';
import {useSelector} from 'react-redux';

export const useMeetDate = () => {
  const userData = useSelector(state => state.user.userData);

  const meetTime = new Date(userData.date);
  // ex 20.04.04 - 21.04.04

  const meetYear = meetTime.getFullYear();
  const meetMonth = meetTime.getMonth();
  const meetDay = meetTime.getDate();

  const firstTime = new Date(meetYear, meetMonth, meetDay).getTime();
  const today = Date.now();
  const oneDay = 86400000;

  const diffDay = Math.floor((today - firstTime) / oneDay); // 현재까지 만난 날짜.
  const calcDay = days => new Date(firstTime + days * oneDay); // 100일을 넣으면 만난 날짜에서 100일 후 날짜를 출력

  return [calcDay, diffDay, meetTime];
};

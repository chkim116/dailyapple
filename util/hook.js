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

  const diffDay = Math.floor((today - firstTime) / oneDay);
  const calcDay = days => new Date(firstTime + days * oneDay);

  return [calcDay, diffDay];
};

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import CountDown from 'react-native-countdown-component';

const CountdownTimer = ({ targetTime }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const newRemainingTime = Math.max(targetTime - currentTime, 0);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === 0) {
        clearInterval(interval);
        setShow(false)
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    };
  }, [targetTime]);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentTime = new Date().getTime();
  //     const timeDifference = targetTime - currentTime;
  //     showTimer(timeDifference > 0 ? true : false)
  //     setRemainingTime(timeDifference > 0 ? timeDifference : 0);
  //   }, 1000);

  //   return () => interval && clearInterval(interval);
  // }, [targetTime]);

  const padNumber = (number) => (number < 10 ? `0${number}` : number);

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <View>
      {show &&
      <CountDown
        until={remainingTime / 1000} // `until` prop takes time in seconds
        size={20}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{ h: 'Hours', m: 'Minutes', s: 'Seconds' }}
        onFinish={() => setShow(false)}
      />}
      {/* <Text>{`${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`}</Text> */}
    </View>
  );
};

export default CountdownTimer;

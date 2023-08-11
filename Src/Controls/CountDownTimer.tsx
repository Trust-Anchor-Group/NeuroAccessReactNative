import { TextLabel, TextLabelVariants } from '@Controls/TextLabel';
import { ThemeContext } from '@Theme/Provider';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { CountDownTimerStyle } from './Styles';

const CountdownTimer = ({ targetTime }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [show, setShow] = useState(false);
  const { themeColors } = useContext(ThemeContext);

  useEffect(() => {}, [show]);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const newRemainingTime = Math.max(targetTime - currentTime, 0);
      setRemainingTime(newRemainingTime);
      setShow(true);

      if (newRemainingTime === 0) {
        clearInterval(interval);
        setShow(false);
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [targetTime]);

  const padNumber = (number) => (number < 10 ? `0${number}` : number);

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <View style={CountDownTimerStyle(themeColors).container}>
      {show ? (
        <View style={CountDownTimerStyle(themeColors).timmer}>
          <TextLabel
            style={{ color: 'white' }}
            variant={TextLabelVariants.HEADER}
          >
            <Text style={{ color: 'white' }}>{`${padNumber(hours)}:${padNumber(
              minutes
            )}:${padNumber(seconds)}`}</Text>
          </TextLabel>
          <Text
            style={{ color: 'orange' }}
          >{`    H    :    M   :    S    `}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CountdownTimer;

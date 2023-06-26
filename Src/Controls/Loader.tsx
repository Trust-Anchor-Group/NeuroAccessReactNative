import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, ModalBaseProps} from 'react-native';

interface Props extends ModalBaseProps {
  loading: boolean
}
export const Loader = (props: Props) => {
  const {loading, ...attributes} = props;
  console.log('loading ===> ', loading);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#50998C',
    height: 40,
    width: 40,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { ShowAlertMessageStyle as styles } from './Styles/ShowAlertMessageStyle';
import { useTranslation } from 'react-i18next';
interface ModalViewProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export const ShowAlertMessage: React.FC<ModalViewProps> = ({
  visible,
  onClose,
  message,
}) => {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.innerView}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('buttonLabel.close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CountryItem } from '@Services/Data/CountryCode';
import { CountryDialogStyle as styles } from './Styles';
import { useTranslation } from 'react-i18next';

interface SearchModalProps {
  isVisible: boolean;
  closeModal: () => void;
  data: CountryItem[];
  onItemSelected: (selectedItem: any) => void;
}

export const CountryDialog: React.FC<SearchModalProps> = ({
  isVisible,
  closeModal,
  data,
  onItemSelected,
}) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<CountryItem[]>(data);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredItems = data.filter((item) => item.name['en'].includes(text));
    setFilteredData(filteredItems);
  };

  const handleItemSelect = (item: any) => {
    onItemSelected(item);
    closeModal();
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemSelect(item)}
    >
      <View style={styles.item}>
        <Text style={styles.flag}>{item?.flag}</Text>
        <Text style={styles.code}>{item?.dial_code}</Text>
        <Text style={styles.name}>{item?.name['en']}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={t('buttonLabel.search')}
              value={searchText}
              onChangeText={handleSearch}
            />

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text>{t('buttonLabel.close')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

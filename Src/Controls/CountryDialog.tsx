import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { CountryItem } from '@Helpers/CountryCode';

interface SearchModalProps {
  isVisible: boolean;
  closeModal: () => void;
  data: CountryItem[];
  onItemSelected: (selectedItem: any) => void;
}

export const CountryDialog: React.FC<SearchModalProps> = ({ isVisible, closeModal, data, onItemSelected }) => {
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
    
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(item)}>
      <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
      <Text style={{flex:.12}}>{item?.flag}</Text>
      <Text style={{flex:.2}}>{item?.dial_code}</Text>
      <Text style={{flex:.68}}>{item?.name['en']}</Text>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          {/* <Icon name="search" size={20} style={styles.searchIcon} /> */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  itemContainer: {
    paddingVertical: 8,
  },
};

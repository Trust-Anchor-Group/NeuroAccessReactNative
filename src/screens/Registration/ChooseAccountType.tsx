import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ChooseNeuroAccessAppContext } from '@src/components/ChooseNeuroAccessAppContext';
import { ContextType, chooseActionTypeData } from '@src/services/Data';

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const [selected, setSelected] = useState<ContextType>();

  return (
    <View>
      <ChooseNeuroAccessAppContext
        label="Select Item"
        data={chooseActionTypeData}
        onSelect={setSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

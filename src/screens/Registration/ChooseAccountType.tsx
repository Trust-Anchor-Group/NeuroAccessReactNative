import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ChooseNeuroAccessAppContext } from '@src/components/ChooseNeuroAccessAppContext';
import { ContextType, chooseActionTypeData } from '@src/services/Data';
import { ActionButton } from '@src/components/ActionButton';

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const [selected, setSelected] = useState<ContextType>();

  return (
    <View style={{ flex: 1 }}>
      <ChooseNeuroAccessAppContext
        label="Select Item"
        data={chooseActionTypeData}
        onSelect={setSelected}
      />
      <View
        style={{
          bottom: 48,
          position: 'absolute',
          width: '100%',
        }}
      >
        <ActionButton
          title="Continue"
          onPress={() => navigation.navigate('EnterEmail')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

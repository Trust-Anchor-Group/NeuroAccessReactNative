import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface CustomInputBoxProps {
  label1: string;
  label2: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const MobileInputView: React.FC<CustomInputBoxProps> = ({
  label1,
  label2,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label1}</Text>
        <Text style={styles.label}>{label2}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="xxxxxxxxxx"
          placeholderTextColor="#181F2580"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

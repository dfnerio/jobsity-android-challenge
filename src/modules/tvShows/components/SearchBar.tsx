import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
    width: '100%',
  },
  searchBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
});

interface SearchBarProps {
  onChange: (text: string) => void;
}

export const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <View style={styles.searchBar}>
      <Icon name="magnifying-glass" size={16} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={'lightgrey'}
        style={styles.textInput}
        onChange={event => onChange(event.nativeEvent.text)}
      />
    </View>
  );
};

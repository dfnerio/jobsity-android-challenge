import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { debounceEventWrapper } from '../../../utils/debounceEventWrapper';

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
  const onTextChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    onChange(event.nativeEvent.text);
  };

  return (
    <View style={styles.searchBar}>
      <Icon name="magnifying-glass" size={16} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={'lightgrey'}
        style={styles.textInput}
        onChange={debounceEventWrapper(onTextChange, 300)}
      />
    </View>
  );
};

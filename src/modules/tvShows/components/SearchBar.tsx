import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: '#EEE',
  },
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
    borderRadius: 10,
    width: '100%',
  },
});

interface SearchBarProps {
  onChange: (text: string) => void;
}

export const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="magnifying-glass" />
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          onChange={event => onChange(event.nativeEvent.text)}
        />
      </View>
    </View>
  );
};

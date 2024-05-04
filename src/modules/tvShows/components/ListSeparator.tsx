import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  item: {
    height: 1,
    width: '100%',
    backgroundColor: 'ghostwhite',
  },
});

export const ListSeparator = () => {
  return <View style={styles.item} />;
};

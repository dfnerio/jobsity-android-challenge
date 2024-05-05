import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../../style/Theme';
import { Person } from '../types/Person';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PeopleStackParams } from '../../../navigation/types/navigationTypes';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 100,
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: 75,
    resizeMode: 'stretch',
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: Theme.fontSize.title,
    color: 'black',
  },
  subtitle: {
    fontSize: Theme.fontSize.subtitle,
    color: 'grey',
    flexWrap: 'wrap',
  },
  genreList: {
    flexGrow: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.pad,
    gap: Theme.spacing.pad2,
  },
});

interface PersonCardProps {
  person: Person;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  const navigation: NavigationProp<PeopleStackParams> = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate('PersonDetails', { person });
  }, [navigation, person]);

  return (
    <TouchableOpacity
      style={[styles.container, styles.row]}
      onPress={handleOnPress}
    >
      <Image style={styles.image} src={person.image && person.image.medium} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{person.name}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevron-right" size={18} />
      </View>
    </TouchableOpacity>
  );
};

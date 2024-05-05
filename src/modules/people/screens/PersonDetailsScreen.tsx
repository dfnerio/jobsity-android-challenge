import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PeopleStackScreenProps } from '../../../navigation/types/navigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../../../style/Theme';
import { InfoRow } from '../components/InfoRow';
import { AppearsOn } from '../components/AppearsOn';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Theme.spacing.pad2,
  },
  image: {
    aspectRatio: 1,
    width: '50%',
    margin: Theme.spacing.pad2,
    marginTop: Theme.spacing.pad,
    borderWidth: 5,
    borderColor: 'lightgrey',
    resizeMode: 'cover',
    borderRadius: 250,
  },
  headline: {
    fontSize: Theme.fontSize.headline,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: Theme.spacing.pad,
  },
  genreList: {
    flexGrow: 0,
  },
  subheader: {
    fontSize: Theme.fontSize.subheader,
    color: 'grey',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subContainer: {
    padding: Theme.spacing.pad2,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    padding: Theme.spacing.pad2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.pad3,
  },
});

export const PersonDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<PeopleStackScreenProps<'PersonDetails'>['route']>();
  const { person } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: person.name,
    });
  }, [navigation, person.name]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {person.image && (
            <Image style={styles.image} src={person.image.original} />
          )}
          <View style={styles.subContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headline}>{person.name}</Text>
              <InfoRow title="Country" value={person.country?.name} />
              <InfoRow title="Born" value={person.birthday} />
              <InfoRow title="Died" value={person.deathday ?? 'No'} />
              <InfoRow title="Gender" value={person.gender} />
            </View>
          </View>
        </View>
        <AppearsOn personId={person.id} disableScroll />
      </ScrollView>
    </SafeAreaView>
  );
};

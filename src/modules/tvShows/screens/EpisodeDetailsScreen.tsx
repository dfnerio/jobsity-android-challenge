import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../../../navigation/types/navigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { htmlToMarkup } from '../utils/htmlToMarkup';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Theme } from '../../../style/Theme';

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.pad,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: Theme.spacing.pad,
    borderWidth: 5,
    borderColor: 'lightgrey',
  },
  subheader: {
    fontWeight: 'bold',
    fontSize: Theme.fontSize.subheader,
  },
  headline: {
    color: 'black',
    fontSize: Theme.fontSize.headline,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.pad3,
  },
  headerContainer: {
    marginBottom: Theme.spacing.pad2,
  },
});

export function EpisodeDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RootStackScreenProps<'EpisodeDetails'>['route']>();
  const { episode } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `E${episode.number}: ${episode.name}` });
  }, [navigation, episode]);

  return (
    <SafeAreaView style={styles.container}>
      {episode.image && (
        <Image style={styles.image} src={episode.image.medium} />
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.headline}>{episode.name}</Text>
        <Text style={styles.subheader}>
          SEASON {episode.season} • EPISODE {episode.number}
        </Text>
        <View style={styles.row}>
          {episode.rating.average && (
            <>
              <Text>{episode.rating.average}</Text>
              <Icon name="star" solid />
            </>
          )}
          <Text>{episode.runtime} min.</Text>
        </View>
      </View>
      {episode.summary && <Text>{htmlToMarkup(episode.summary)}</Text>}
    </SafeAreaView>
  );
}

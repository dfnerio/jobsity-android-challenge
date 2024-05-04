import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackScreenProps } from '../../../navigation/types/navigationTypes';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Episodes } from '../components/Episodes';
import { htmlToMarkup } from '../utils/htmlToMarkup';
import { Theme } from '../../../style/Theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Theme.spacing.pad2,
  },
  image: {
    aspectRatio: 0.75,
    width: '50%',
    margin: Theme.spacing.pad2,
    marginTop: Theme.spacing.pad,
    borderWidth: 5,
    borderColor: 'lightgrey',
  },
  headline: {
    fontSize: Theme.fontSize.headline,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
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

export function TvShowDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RootStackScreenProps<'TvShowDetails'>['route']>();
  const { tvShow } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: tvShow.name });
  }, [navigation, tvShow]);

  const airsAt = useMemo(() => {
    const { time, days } = tvShow.schedule;
    return (
      'Airs ' +
      days.map((day, index) => {
        return (index ? ' ' : '') + day;
      }) +
      ' at ' +
      time
    );
  }, [tvShow.schedule]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {tvShow.image && (
            <Image style={styles.image} src={tvShow.image.original} />
          )}
          <View style={styles.subContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headline}>{tvShow.name}</Text>
              <Text style={styles.subheader}>{airsAt}</Text>
              <FlatList
                data={tvShow.genres}
                horizontal
                style={styles.genreList}
                renderItem={({ item, index }) => (
                  <Text key={index}>{item}</Text>
                )}
                ItemSeparatorComponent={() => <Text> · </Text>}
              />
              <View style={styles.row}>
                {tvShow.rating.average && (
                  <>
                    <Text>{tvShow.rating.average}</Text>
                    <Icon name="star" solid />
                  </>
                )}
                <Text>{tvShow.language}</Text>
              </View>
            </View>
            {tvShow.summary && (
              <Markdown>{htmlToMarkup(tvShow.summary)}</Markdown>
            )}
          </View>
        </View>
        <Episodes showId={tvShow.id} disableScroll />
      </ScrollView>
    </SafeAreaView>
  );
}

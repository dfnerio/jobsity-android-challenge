import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TvShowsStackScreenProps } from '../../../navigation/types/navigationTypes';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Episodes } from '../components/Episodes';
import { htmlToMarkup } from '../utils/htmlToMarkup';
import { Theme } from '../../../style/Theme';
import { FavoriteButton } from '../components/FavoriteButton';
import { useRootDispatch, useRootSelector } from '../../redux/hooks';
import { getFavorites } from '../../favorites/selectors/getFavorites';
import { addFavorite, removeFavoriteById } from '../../redux/slices/favorites';
import React from 'react';

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
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  const route = useRoute<TvShowsStackScreenProps<'TvShowDetails'>['route']>();
  const favorites = useRootSelector(getFavorites);

  const { tvShow } = route.params;

  const isFavorite = useMemo(() => {
    return !!favorites.find(favorite => favorite.id === tvShow.id);
  }, [favorites, tvShow]);

  const handleOnPressFavorite = useCallback(() => {
    dispatch(isFavorite ? removeFavoriteById(tvShow.id) : addFavorite(tvShow));
  }, [dispatch, isFavorite, tvShow]);

  useEffect(() => {
    navigation.setOptions({
      title: tvShow.name,
      headerRight: () => (
        <FavoriteButton selected={isFavorite} onPress={handleOnPressFavorite} />
      ),
    });
  }, [navigation, tvShow, isFavorite, handleOnPressFavorite]);

  const airsAt = useMemo(() => {
    const { time, days } = tvShow.schedule;
    return `Airs${days && days.map(day => ' ' + day + 's')}${
      time && ' at ' + time
    }`;
  }, [tvShow.schedule]);

  const listSeparator = () => {
    return <Text> · </Text>;
  };

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
                ItemSeparatorComponent={listSeparator}
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

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TvShow } from '../types/tvShow';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { Theme } from '../../../style/Theme';
import {
  FavoritesStackParams,
  TvShowsStackParams,
} from '../../../navigation/types/navigationTypes';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 100,
    flexWrap: 'wrap',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: '100%',
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
  caption: {
    fontSize: Theme.fontSize.caption,
    color: 'grey',
  },
  genreList: {
    flexGrow: 0,
    width: '100%',
    flexWrap: 'wrap',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.pad,
    gap: Theme.spacing.pad2,
  },
});

interface TvShowCardProps {
  tvShow: TvShow;
  isFavorite?: boolean;
}

export const TvShowCard = ({ tvShow, isFavorite = false }: TvShowCardProps) => {
  const navigation: CompositeNavigationProp<
    NativeStackNavigationProp<TvShowsStackParams>,
    NativeStackNavigationProp<FavoritesStackParams>
  > = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate('TvShowDetails', { tvShow });
  }, [navigation, tvShow]);

  const listSeparator = () => {
    return <Text> · </Text>;
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles.row]}
      onPress={handleOnPress}
      testID={`tvShowCard-${tvShow.id}`}
    >
      <Image style={styles.image} src={tvShow.image && tvShow.image.medium} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tvShow.name}</Text>
        <FlatList
          data={tvShow.genres}
          horizontal
          style={styles.genreList}
          renderItem={({ item, index }) => (
            <Text style={styles.caption} key={index}>
              {item}
            </Text>
          )}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
      <View style={styles.iconContainer}>
        {isFavorite && (
          <Icon
            name="star"
            size={18}
            solid
            testID={`tvShowCard-${tvShow.id}-favorite-icon`}
          />
        )}
        <Icon
          name="chevron-right"
          size={18}
          testID={`tvShowCard-${tvShow.id}-chevron-icon`}
        />
      </View>
    </TouchableOpacity>
  );
};

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

interface TvShowCardProps {
  tvShow: TvShow;
  isFavorite: boolean;
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
    >
      {tvShow.image && <Image style={styles.image} src={tvShow.image.medium} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tvShow.name}</Text>
        <FlatList
          data={tvShow.genres}
          horizontal
          style={styles.genreList}
          renderItem={({ item, index }) => (
            <Text style={styles.subtitle} key={index}>
              {item}
            </Text>
          )}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
      <View style={styles.iconContainer}>
        {isFavorite && <Icon name="star" size={18} solid />}
        <Icon name="chevron-right" size={18} />
      </View>
    </TouchableOpacity>
  );
};

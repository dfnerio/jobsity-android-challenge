import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TvShow } from '../types/tvShow';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Theme } from '../../../style/Theme';

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
  chevronIcon: {
    padding: 16,
  },
});

interface TvShowCardProps {
  tvShow: TvShow;
}

export const TvShowCard = ({ tvShow }: TvShowCardProps) => {
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate('TvShowDetails', { tvShow });
  }, [navigation, tvShow]);

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
          ItemSeparatorComponent={() => <Text> · </Text>}
        />
      </View>
      <Icon name="chevron-right" size={18} style={styles.chevronIcon} />
    </TouchableOpacity>
  );
};

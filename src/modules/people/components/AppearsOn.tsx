import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListSeparator } from '../../tvShows/components/ListSeparator';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Appearance } from '../types/Appearance';
import { PeopleStackParams } from '../../../navigation/types/navigationTypes';
import { Theme } from '../../../style/Theme';
import { useGetAppearances } from '../api/useGetAppearances';
import { useGetTvShowByUrl } from '../../tvShows/api/useGetTvShowByUrl';

const styles = StyleSheet.create({
  row: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headline: {
    color: 'black',
    fontSize: Theme.fontSize.headline2,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: Theme.spacing.pad,
  },
  subheader: {
    fontSize: Theme.fontSize.subheader,
    fontWeight: 'bold',
    padding: 16,
  },
  subtitle: {
    fontSize: Theme.fontSize.subtitle,
    fontWeight: 'bold',
  },
});

interface AppearsOnProps {
  personId: number;
  disableScroll?: boolean;
}

export const AppearsOn = ({
  personId,
  disableScroll = false,
}: AppearsOnProps) => {
  const navigation: NavigationProp<PeopleStackParams> = useNavigation();
  const { data: appearances } = useGetAppearances({ personId });
  const { getTvShowByUrl } = useGetTvShowByUrl();

  const handleOnAppearancePress = useCallback(
    async (appearance: Appearance) => {
      const tvShow = await getTvShowByUrl(appearance._links.show.href);
      navigation.navigate('TvShowDetails', { tvShow });
    },
    [navigation, getTvShowByUrl],
  );

  const renderItem = useCallback(
    ({ item }: { item: Appearance; index: number }) => {
      return (
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleOnAppearancePress(item)}
        >
          <View>
            <Text style={styles.subtitle}>{item._links.show.name}</Text>
            <Text>as {item._links.character.name}</Text>
          </View>
          <Icon name="chevron-right" />
        </TouchableOpacity>
      );
    },
    [handleOnAppearancePress],
  );

  return (
    <View>
      <Text style={styles.headline}>Appears On</Text>
      <FlatList
        data={appearances}
        scrollEnabled={!disableScroll}
        renderItem={renderItem}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

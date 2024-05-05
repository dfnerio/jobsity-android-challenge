import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetEpisodesByShowId } from '../api/useGetEpisodesByShowId';
import { useCallback, useMemo } from 'react';
import { Episode } from '../types/Episode';
import { ListSeparator } from './ListSeparator';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '../../../style/Theme';
import { TvShowsStackParams } from '../../../navigation/types/navigationTypes';
import React from 'react';

interface EpisodesProps {
  showId: number;
  disableScroll: boolean;
}

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
  },
  subheader: {
    fontSize: Theme.fontSize.subheader,
    fontWeight: 'bold',
    padding: 16,
  },
});

export const Episodes = ({ showId, disableScroll = false }: EpisodesProps) => {
  const navigation: NavigationProp<TvShowsStackParams> = useNavigation();
  const { data: episodes } = useGetEpisodesByShowId({
    showId,
  });

  const episodesBySeason = useMemo(() => {
    const seasons: number[] = [
      ...new Set(episodes.map(episode => episode.season)),
    ];
    return seasons.map(season => ({
      title: season,
      data: episodes.filter(episode => episode.season === season),
    }));
  }, [episodes]);

  const handleOnEpisodePress = useCallback(
    (episode: Episode) => {
      navigation.navigate('EpisodeDetails', { episode });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Episode; index: number }) => {
      return (
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleOnEpisodePress(item)}
        >
          <Text>
            E{item.number} - {item.name}
          </Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
      );
    },
    [handleOnEpisodePress],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: number } }) => {
      return <Text style={styles.subheader}>SEASON {section.title}</Text>;
    },
    [],
  );

  return (
    <View>
      <Text style={styles.headline}>Episodes</Text>
      <SectionList
        sections={episodesBySeason}
        scrollEnabled={!disableScroll}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRootSelector } from '../../../redux/hooks';
import { getFavorites } from '../selectors/getFavorites';
import { useCallback } from 'react';
import { TvShow } from '../../tvShows/types/tvShow';
import { TvShowCard } from '../../tvShows/components/TvShowCard';
import { Theme } from '../../../style/Theme';
import React from 'react';

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.pad,
  },
  caption: {
    fontSize: Theme.fontSize.caption,
    flexWrap: 'wrap',
  },
});

export function FavoritesScreen() {
  const favorites = useRootSelector(getFavorites);

  const renderItem = useCallback(({ item }: { item: TvShow }) => {
    return <TvShowCard tvShow={item} key={item.id} />;
  }, []);

  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.caption}>
          Your favorite shows will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList data={favorites} renderItem={renderItem} />
    </View>
  );
}

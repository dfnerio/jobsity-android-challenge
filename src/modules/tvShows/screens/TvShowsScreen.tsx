import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { TvShow } from '../types/tvShow';
import { TvShowCard } from '../components/TvShowCard';
import { ListSeparator } from '../components/ListSeparator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { useGetTvShows } from '../api/useGetTvShows';
import { useRootSelector } from '../../../redux/hooks';
import { getFavorites } from '../../favorites/selectors/getFavorites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    backgroundColor: 'white',
    margin: 4,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  paginationContainer: {
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'whitesmoke',
  },
});

export function TvShowsScreen() {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const favorites = useRootSelector(getFavorites);
  const {
    data: tvShows,
    loading,
    reloadData,
  } = useGetTvShows({
    page,
    query,
  });

  useEffect(() => {
    reloadData();
  }, [page, query, reloadData]);

  const handleOnChangePage = useCallback(
    (pageChange: number) => {
      setPage(page + pageChange);
    },
    [page],
  );

  const renderItem = useCallback(
    ({ item }: { item: TvShow }) => {
      const isFavorite = !!favorites.find(favorite => favorite.id === item.id);
      return <TvShowCard tvShow={item} key={item.id} isFavorite={isFavorite} />;
    },
    [favorites],
  );

  const isPageButtonDisabled = useMemo(() => {
    return !!query || loading;
  }, [query, loading]);

  const pageText = useMemo(() => {
    if (query) {
      return null;
    }

    return loading ? <Text>Loading...</Text> : <Text>Page {page}</Text>;
  }, [query, loading, page]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onChange={setQuery} />
      <FlatList
        data={tvShows}
        renderItem={renderItem}
        ItemSeparatorComponent={ListSeparator}
      />
      <View style={styles.paginationContainer}>
        <Button
          title="Back"
          color={'purple'}
          disabled={isPageButtonDisabled || page === 1}
          onPress={() => handleOnChangePage(-1)}
        />
        {pageText}
        <Button
          title="Next"
          color={'purple'}
          disabled={isPageButtonDisabled}
          onPress={() => handleOnChangePage(1)}
        />
      </View>
    </SafeAreaView>
  );
}

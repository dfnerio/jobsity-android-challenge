import { NavigatorScreenParams } from '@react-navigation/native';
import { TvShow } from '../../modules/tvShows/types/tvShow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Episode } from '../../modules/tvShows/types/episode';

export type RootStackParams = {
  TvShows: NavigatorScreenParams<TvShowsStackParams>;
  Favorites: NavigatorScreenParams<FavoritesStackParams>;
};

export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

export type TvShowsStackParams = {
  TvShowsList: undefined;
  TvShowDetails: {
    tvShow: TvShow;
  };
  EpisodeDetails: {
    episode: Episode;
  };
};

export type FavoritesStackParams = {
  FavoritesList: undefined;
  TvShowDetails: {
    tvShow: TvShow;
  };
  EpisodeDetails: {
    episode: Episode;
  };
};

export type TvShowsStackScreenProps<T extends keyof TvShowsStackParams> =
  NativeStackScreenProps<TvShowsStackParams, T>;

export type FavoritesStackScreenProps<T extends keyof FavoritesStackParams> =
  NativeStackScreenProps<FavoritesStackParams, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

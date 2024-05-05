import { NavigatorScreenParams } from '@react-navigation/native';
import { TvShow } from '../../modules/tvShows/types/tvShow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Episode } from '../../modules/tvShows/types/Episode';
import { Person } from '../../modules/people/types/Person';

export type RootStackParams = {
  TvShows: NavigatorScreenParams<TvShowsStackParams>;
  Favorites: NavigatorScreenParams<FavoritesStackParams>;
  People: NavigatorScreenParams<PeopleStackParams>;
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

export type PeopleStackParams = {
  PeopleList: undefined;
  PersonDetails: {
    person: Person;
  };
  TvShowDetails: {
    tvShow: TvShow;
  };
};

export type TvShowsStackScreenProps<T extends keyof TvShowsStackParams> =
  NativeStackScreenProps<TvShowsStackParams, T>;

export type FavoritesStackScreenProps<T extends keyof FavoritesStackParams> =
  NativeStackScreenProps<FavoritesStackParams, T>;

export type PeopleStackScreenProps<T extends keyof PeopleStackParams> =
  NativeStackScreenProps<PeopleStackParams, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

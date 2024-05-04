import { NavigatorScreenParams } from '@react-navigation/native';
import { TvShow } from '../../modules/tvShows/types/tvShow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Episode } from '../../modules/tvShows/types/episode';

export type RootStackParamList = {
  TvShows: undefined;
  TvShowDetails: {
    tvShow: TvShow;
  };
  EpisodeDetails: {
    episode: Episode;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

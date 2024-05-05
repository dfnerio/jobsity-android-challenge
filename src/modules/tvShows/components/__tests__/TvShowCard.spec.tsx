import React from 'react';
import { TvShowCard } from '../TvShowCard';
import { render } from '@testing-library/react-native';
import { MOCK_TV_SHOW_1 } from '../../mocks/mockTvShows';
import { NavigationContainer } from '@react-navigation/native';

describe('TvShowCard', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <NavigationContainer>
        <TvShowCard tvShow={MOCK_TV_SHOW_1} />,
      </NavigationContainer>,
    );

    expect(getByTestId(`tvShowCard-${MOCK_TV_SHOW_1.id}`)).toBeDefined();
    expect(getByText(MOCK_TV_SHOW_1.name)).toBeDefined();
    MOCK_TV_SHOW_1.genres.forEach(genre =>
      expect(getByText(genre)).toBeDefined(),
    );
    expect(
      queryByTestId(`tvShowCard-${MOCK_TV_SHOW_1.id}-favorite-icon`),
    ).toBeFalsy();
    expect(
      getByTestId(`tvShowCard-${MOCK_TV_SHOW_1.id}-chevron-icon`),
    ).toBeDefined();
  });

  it('should render correctly if is favorite', () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <TvShowCard tvShow={MOCK_TV_SHOW_1} isFavorite />,
      </NavigationContainer>,
    );

    expect(getByTestId(`tvShowCard-${MOCK_TV_SHOW_1.id}`)).toBeDefined();
    expect(getByText(MOCK_TV_SHOW_1.name)).toBeDefined();
    MOCK_TV_SHOW_1.genres.forEach(genre =>
      expect(getByText(genre)).toBeDefined(),
    );
    expect(
      getByTestId(`tvShowCard-${MOCK_TV_SHOW_1.id}-favorite-icon`),
    ).toBeDefined();
    expect(
      getByTestId(`tvShowCard-${MOCK_TV_SHOW_1.id}-chevron-icon`),
    ).toBeDefined();
  });
});

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { TvShowsScreen } from '../TvShowsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { mockSuccesfulResponse } from '../../mocks/mockFetchRequest';
import { MOCK_TV_SHOWS_LIST } from '../../mocks/mockTvShows';
import { Provider } from 'react-redux';
import { rootStore } from '../../../../redux/store';

describe('TvShowsScreen', () => {
  it('should render correctly', async () => {
    expect.assertions(2);
    mockSuccesfulResponse({ returnBody: MOCK_TV_SHOWS_LIST });

    const { getByTestId } = render(
      <Provider store={rootStore}>
        <NavigationContainer>
          <TvShowsScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => {
      MOCK_TV_SHOWS_LIST.forEach(mockTvShow =>
        expect(getByTestId(`tvShowCard-${mockTvShow.id}`)).toBeDefined(),
      );
    });
  });
});

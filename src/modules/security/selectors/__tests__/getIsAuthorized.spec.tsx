import { getIsAuthorized } from '../getIsAuthorized';

describe(getIsAuthorized, () => {
  it('should return correct value if user is authorized', () => {
    const result = getIsAuthorized({
      security: {
        isAuthorized: true,
        isPinEnabled: false,
        pin: null,
      },
      favorites: {
        value: [],
      },
    });

    expect(result).toBeTruthy();
  });

  it('should return correct value if user is not authorized', () => {
    const result = getIsAuthorized({
      security: {
        isAuthorized: false,
        isPinEnabled: false,
        pin: null,
      },
      favorites: {
        value: [],
      },
    });

    expect(result).toBeFalsy();
  });
});

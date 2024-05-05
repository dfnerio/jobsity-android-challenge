import { getShouldAskForAuthentication } from '../getShouldAskForAuthentication';

describe(getShouldAskForAuthentication, () => {
  it('should return true if user has pin enabled and is not authenticated', () => {
    const result = getShouldAskForAuthentication({
      security: {
        isAuthorized: false,
        isPinEnabled: true,
        pin: null,
      },
      favorites: {
        value: [],
      },
    });

    expect(result).toBeTruthy();
  });

  it('should return false if user has pin enabled and is authenticated', () => {
    const result = getShouldAskForAuthentication({
      security: {
        isAuthorized: true,
        isPinEnabled: true,
        pin: null,
      },
      favorites: {
        value: [],
      },
    });

    expect(result).toBeFalsy();
  });

  it('should return false if user is not authenticated but does not have a pin enabled', () => {
    const result = getShouldAskForAuthentication({
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

import React, { useCallback, useMemo, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Theme } from '../../../style/Theme';
import { useRootSelector } from '../../../redux/hooks';
import { getIsPinEnabled } from '../selectors/getIsPinEnabled';
import { EnterPinBottomSheet } from '../components/EnterPinBottomSheet';
import { getShouldAskForAuthentication } from '../selectors/getShouldAskForAuthentication';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.pad,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: Theme.spacing.pad,
  },
  title: {
    fontSize: Theme.fontSize.title,
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export function ManageSecurityScreen() {
  const isPinEnabled = useRootSelector(getIsPinEnabled);
  const shouldAskForAuthorization = useRootSelector(
    getShouldAskForAuthentication,
  );
  const [pinBottomSheetOpen, setPinBottomSheetOpen] = useState(
    shouldAskForAuthorization,
  );

  const pinSubtitle = useMemo(() => {
    return isPinEnabled
      ? 'Your session is now secure. You will need to enter your PIN every time you open the app.'
      : 'Enabling a security PIN will require you to enter it every time you open the app.';
  }, [isPinEnabled]);

  const handleOnPinButtonPress = useCallback(() => {
    setPinBottomSheetOpen(true);
  }, [setPinBottomSheetOpen]);

  const handleOnPinBottomSheetClose = useCallback(() => {
    setPinBottomSheetOpen(false);
  }, [setPinBottomSheetOpen]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, styles.textCenter]}>
          PIN: {isPinEnabled ? 'enabled' : 'disabled'}
        </Text>
        <Text style={styles.textCenter}>{pinSubtitle}</Text>
      </View>
      <Button
        title={`${isPinEnabled ? 'Disable' : 'Enable'} PIN`}
        color={'purple'}
        onPress={handleOnPinButtonPress}
      />
      <EnterPinBottomSheet
        open={pinBottomSheetOpen}
        isAuthorizing={shouldAskForAuthorization}
        onClose={handleOnPinBottomSheetClose}
      />
    </View>
  );
}

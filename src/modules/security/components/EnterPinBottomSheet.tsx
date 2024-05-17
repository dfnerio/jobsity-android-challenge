import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Theme } from '../../../style/Theme';
import { useRootDispatch, useRootSelector } from '../../../redux/hooks';
import { usePinValidation } from '../hooks/usePinValidation';
import {
  setIsAuthorized,
  setIsPinEnabled,
  setPin,
} from '../../../redux/slices/security';
import { getIsPinEnabled } from '../selectors/getIsPinEnabled';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Theme.spacing.pad,
    justifyContent: 'space-between',
    flex: 1,
  },
  headline: {
    fontSize: Theme.fontSize.headline,
    fontWeight: 'bold',
    color: 'black',
  },
  subheader: {
    fontSize: Theme.fontSize.subtitle,
    textAlign: 'center',
  },
  textInput: {
    fontSize: Theme.fontSize.headline,
    margin: Theme.spacing.pad,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    textAlign: 'center',
    width: '50%',
  },
  pinContainer: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    padding: Theme.spacing.pad,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 10,
    flex: 1,
  },
  doneButton: {
    backgroundColor: 'purple',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  disabledButton: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Theme.fontSize.subtitle,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    height: 50,
    gap: Theme.spacing.pad,
  },
  errorLabel: {
    color: 'red',
    textAlign: 'center',
  },
});

interface EnterPinBottomSheetProps {
  open: boolean;
  isAuthorizing: boolean;
  onClose: () => void;
}

export const EnterPinBottomSheet = ({
  open,
  isAuthorizing,
  onClose,
}: EnterPinBottomSheetProps) => {
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const textInputRef = useRef<TextInput>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const { isPinValid } = usePinValidation();
  const isPinEnabled = useRootSelector(getIsPinEnabled);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, [bottomSheetRef]);

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.present();
      textInputRef.current?.focus();
      setValue('');
    } else {
      closeBottomSheet();
    }
  }, [
    open,
    bottomSheetRef,
    textInputRef,
    closeBottomSheet,
    setValue,
    isAuthorizing,
  ]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        pressBehavior={'none'}
      />
    ),
    [],
  );

  const handleOnChangeValue = useCallback(
    (newValue: string) => {
      setValue(newValue.length <= 4 ? newValue : value);
      setError(false);

      if (isAuthorizing && newValue.length === 4) {
        const isPinCorrect = isPinValid(newValue);

        if (isPinCorrect) {
          dispatch(setIsAuthorized(true));
          closeBottomSheet();
          navigation.navigate('TvShows', { screen: 'TvShowsList' });
        } else {
          setError(true);
        }
      }
    },
    [
      navigation,
      setValue,
      value,
      dispatch,
      closeBottomSheet,
      setError,
      isAuthorizing,
      isPinValid,
    ],
  );

  const onPressCancel = useCallback(() => {
    closeBottomSheet();
  }, [closeBottomSheet]);

  const onPressDone = useCallback(() => {
    if (isPinEnabled) {
      const isPinCorrect = isPinValid(value);

      if (isPinCorrect) {
        dispatch(setIsAuthorized(false));
        dispatch(setIsPinEnabled(false));
        closeBottomSheet();
      } else {
        setError(true);
      }
    } else {
      dispatch(setIsAuthorized(true));
      dispatch(setIsPinEnabled(true));
      dispatch(setPin(value));
      closeBottomSheet();
    }
  }, [isPinEnabled, value, dispatch, setError, closeBottomSheet, isPinValid]);

  const titletext = useMemo(() => {
    if (isAuthorizing || isPinEnabled) {
      return 'Enter your PIN';
    }

    return 'Set up your PIN';
  }, [isAuthorizing, isPinEnabled]);

  const subtitletext = useMemo(() => {
    if (isAuthorizing) {
      return 'Please enter the 4-digit PIN you entered previously';
    } else if (isPinEnabled) {
      return 'Please enter your current 4-digit PIN to disable it';
    } else {
      return 'Enter a 4-digit numeric PIN';
    }
  }, [isAuthorizing, isPinEnabled]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['90%']}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={!isAuthorizing}
      onDismiss={onClose}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.pinContainer}>
          <Text style={styles.headline}>{titletext}</Text>
          <Text style={styles.subheader}>{subtitletext}</Text>
          <TextInput
            ref={textInputRef}
            placeholder="****"
            placeholderTextColor={'lightgrey'}
            style={styles.textInput}
            keyboardType="number-pad"
            onChange={event => handleOnChangeValue(event.nativeEvent.text)}
            value={value}
          />
          {error && <Text style={styles.errorLabel}>Incorrect PIN</Text>}
        </View>
        {!isAuthorizing && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onPressCancel}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.doneButton,
                ...[!value ? styles.disabledButton : null],
              ]}
              onPress={onPressDone}
              disabled={!value}
            >
              <Text style={styles.buttonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

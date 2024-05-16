import React from 'react';
import { Provider } from 'react-redux';
import { rootPersistor, rootStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Navigator from './src/navigation';

export default function App() {
  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={rootPersistor}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Navigator />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

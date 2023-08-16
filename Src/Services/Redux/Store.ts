import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import EncryptedStorage from 'react-native-encrypted-storage';
import { rootReducer } from './RootReducers';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  whitelist: ['user', 'domain', 'identity', 'crypto','peerReview'],
  blackList: [],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
    logger,
  ],
});

export const persistor = persistStore(Store);

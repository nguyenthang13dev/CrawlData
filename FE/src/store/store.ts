import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

// Tạo một storage động dựa trên môi trường
let reduxStorage

if (typeof window !== 'undefined') {
  // Client-side: sử dụng localStorage
  const storage = require('redux-persist/lib/storage').default
  reduxStorage = storage
} else {
  // Server-side: tạo một storage giả không thực hiện gì cả
  reduxStorage = {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  }
}

import counterReducer from './counter/counterSlice'
import CustomizerReducer from './customizer/CustomizerSlice'
import authReducer from './auth/AuthSlice'
import generalReducer from './general/GeneralSlice'
import menuReducer from './menu/MenuSlice'
import themeReducer from './theme/themeSlice'

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  // Chỉ lưu trữ những reducer cần thiết
  whitelist: ['customizer']
}

const persistedCustomizerReducer = persistReducer<any>(persistConfig, CustomizerReducer)

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customizer: persistedCustomizerReducer,
    auth: authReducer,
    general: generalReducer,
    menu: menuReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false
    }),
})

const rootReducer = combineReducers({
  counter: counterReducer,
  customizer: CustomizerReducer,
  auth: authReducer,
  general: generalReducer,
  menu: menuReducer,
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof rootReducer>
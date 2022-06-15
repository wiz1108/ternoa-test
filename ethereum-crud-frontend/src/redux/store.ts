import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import GlobalReducer from './reducers'
import MartReducer from '../pages/Frontend/MartPage/reducer'

export const store = configureStore({
    reducer: {
        global: GlobalReducer,
        mart: MartReducer,
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })]
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

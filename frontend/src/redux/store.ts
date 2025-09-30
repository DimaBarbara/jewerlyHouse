import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./users/UserApi";
import { itemAPI } from "./items/ItemApi";
import { orderAPI } from "./orders/OrderApi";
import { categoryAPI } from "./categories/CategoryApi";
import { collectionAPI } from "./collections/CollectionApi";
import { uploadApi } from "./uploads/UploadApi";

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [itemAPI.reducerPath]: itemAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [collectionAPI.reducerPath]: collectionAPI.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userAPI.middleware,
        itemAPI.middleware,
        orderAPI.middleware,
        categoryAPI.middleware,
        collectionAPI.middleware,
        uploadApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

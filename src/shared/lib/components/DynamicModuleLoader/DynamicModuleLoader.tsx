import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from "@/app/providers/StoreProvider";

import React, { ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducerList;
  removeAfterUnmount?: boolean;
}

const DynamicModuleLoader: React.FC<DynamicModuleLoaderProps> = ({
  children,
  reducers,
  removeAfterUnmount,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, []);

  return <>{children}</>;
};

export default DynamicModuleLoader;

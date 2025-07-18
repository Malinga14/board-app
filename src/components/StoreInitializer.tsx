"use client";

import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export const StoreInitializer = () => {
  const initializeApp = useAppStore(state => state.initializeApp);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return null;
};

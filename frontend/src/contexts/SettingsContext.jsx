import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SETTINGS } from '../config/defaults';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Storage keys
const STORAGE_KEYS = {
  MAX_TOKENS: 'twodelta_settings_max_tokens',
  TEMPERATURE: 'twodelta_settings_temperature',
  BASELINE_MODEL_JSON: 'twodelta_settings_baseline_model_json',
  TWO_DELTA_MODEL_JSON: 'twodelta_settings_two_delta_model_json',
};

// Utility functions for localStorage with error handling
const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving ${key} to localStorage:`, error);
  }
};

export const SettingsProvider = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [maxTokens, setMaxTokens] = useState(() =>
    loadFromStorage(STORAGE_KEYS.MAX_TOKENS, DEFAULT_SETTINGS.MAX_TOKENS.default)
  );
  const [temperature, setTemperature] = useState(() =>
    loadFromStorage(STORAGE_KEYS.TEMPERATURE, DEFAULT_SETTINGS.TEMPERATURE.default)
  );
  const [baselineModelJson, setBaselineModelJson] = useState(() =>
    loadFromStorage(STORAGE_KEYS.BASELINE_MODEL_JSON, '')
  );
  const [twoDeltaModelJson, setTwoDeltaModelJson] = useState(() =>
    loadFromStorage(STORAGE_KEYS.TWO_DELTA_MODEL_JSON, '')
  );

  // Save to localStorage whenever settings change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MAX_TOKENS, maxTokens);
  }, [maxTokens]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TEMPERATURE, temperature);
  }, [temperature]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BASELINE_MODEL_JSON, baselineModelJson);
  }, [baselineModelJson]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TWO_DELTA_MODEL_JSON, twoDeltaModelJson);
  }, [twoDeltaModelJson]);

  const settings = {
    maxTokens,
    temperature,
    baselineModelJson,
    twoDeltaModelJson,
  };

  const setters = {
    setMaxTokens,
    setTemperature,
    setBaselineModelJson,
    setTwoDeltaModelJson,
  };

  const resetSettings = () => {
    const defaults = {
      maxTokens: DEFAULT_SETTINGS.MAX_TOKENS.default,
      temperature: DEFAULT_SETTINGS.TEMPERATURE.default,
      baselineModelJson: '',
      twoDeltaModelJson: '',
    };

    // Update state (which will trigger useEffect to save to localStorage)
    setMaxTokens(defaults.maxTokens);
    setTemperature(defaults.temperature);
    setBaselineModelJson(defaults.baselineModelJson);
    setTwoDeltaModelJson(defaults.twoDeltaModelJson);
  };

  const value = {
    settings,
    setters,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
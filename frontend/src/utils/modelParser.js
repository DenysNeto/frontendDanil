/**
 * Utility functions for parsing model configurations from settings JSON
 */

/**
 * Parse models from settings JSON for a specific model type
 * @param {Object} settings - The settings object containing JSON configurations
 * @param {string} modelType - Either 'baseline' or 'twodelta'
 * @returns {Array} Array of model objects formatted for ModelSelector
 */
export const parseModelsFromSettings = (settings, modelType) => {
  if (!settings) {
    return [];
  }

  const jsonKey = modelType === 'baseline' ? 'baselineModelJson' : 'twoDeltaModelJson';
  const jsonString = settings[jsonKey];

  if (!jsonString || jsonString.trim() === '') {
    return [];
  }

  try {
    const parsed = JSON.parse(jsonString);

    // Handle both single object and array formats
    const modelsArray = Array.isArray(parsed) ? parsed : [parsed];

    return modelsArray.map(model => ({
      value: model.name || model.model || 'Unknown Model',
      label: model.name || model.model || 'Unknown Model',
      description: modelType === 'baseline' ? 'Custom Baseline Model' : 'Custom Two Delta Model',
      endpoint: model.endpoint || '',
      type: modelType
    })).filter(model => model.endpoint); // Only include models with endpoints

  } catch (error) {
    console.warn(`Error parsing ${modelType} model JSON:`, error);
    return [];
  }
};

/**
 * Get all models for both baseline and twodelta types
 * @param {Object} settings - The settings object containing JSON configurations
 * @returns {Object} Object with baseline and twodelta model arrays
 */
export const getAllModelsFromSettings = (settings) => {
  return {
    baseline: parseModelsFromSettings(settings, 'baseline'),
    twodelta: parseModelsFromSettings(settings, 'twodelta')
  };
};
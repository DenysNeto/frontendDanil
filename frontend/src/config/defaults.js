export const DEFAULT_SETTINGS = {
  MAX_TOKENS: {
    default: 1000,
    min: 100,
    max: 5000,
    step: 100
  },
  TEMPERATURE: {
    default: 0.7,
    min: 0,
    max: 1,
    step: 0.1
  },

    BASELINE_MODEL_JSON  :   [
      {
          "name": "DeepSeek-R1-Distill-Qwen-1.5B",
          "endpoint": "bright-wildcat.tdops.net"
      },
          {
              "name": "DeepSeek-R1-Distill-Qwen-7B",
              "endpoint": "semantic-kite.tdops.net"
          },
          {
              "name": "DeepSeek-R1-Distill-Qwen-32B-2D",
              "endpoint": "ridiculous-primate.tdops.net"
          },
          {
              "name": "DeepSeek-R1-Distill-Qwen-32B-2D-V2",
              "endpoint": "certain-centipede.tdops.net"
          }
      ]
};

const devConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://47.236.25.128",
};

const prodConfig = {
  baseURL: "Your production url",
};

export const config = devConfig;

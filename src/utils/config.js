const devConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://ssprojectbeauty.com",
};

const prodConfig = {
  baseURL: "Your production url",
};

export const config = devConfig;

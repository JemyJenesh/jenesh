import a from "axios";

export const axiosInstance = a.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    config.headers = config.headers || {};
    (config.headers as Record<string, string>)["Cookie"] =
      cookieStore.toString();
    return config;
  }

  return config;
});

import Axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  // Always set Basic Auth credentials (admin:securepassword123)
  const credentials = btoa('admin:securepassword123');
  config.headers.Authorization = `Basic ${credentials}`;

  config.headers.Accept = 'application/json';
  return config;
};

const responseInterceptor = (response: AxiosResponse) => response.data;

const errorInterceptor = (error: AxiosError) => {
  if (!error.response) {
    // Handle network/server issues
    if (error.code !== 'ERR_CANCELED') {
      toast.error('Server or network error occurred');
    }
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

const paramsSerializer = (params: { [key: string]: string }) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&');
};

export const adminAxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL_ADMIN,
  timeout: 300000, // Set timeout to 5 minutes (300,000 milliseconds)
  timeoutErrorMessage: 'timeoutErrorMessage: Request took too long to complete',
});

adminAxiosInstance.defaults.paramsSerializer = paramsSerializer;
adminAxiosInstance.interceptors.request.use(authRequestInterceptor);
adminAxiosInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);

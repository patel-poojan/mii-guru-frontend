import Axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Get the current URL or path
  const requestUrl = config.url || '';

  // Define the api routes where the token should NOT be passed
  const noAuthPages = [
    '/signup',
    '/login',
    '/forgetpassword',
    '/resetpassword',
  ];

  // Check if the request URL matches any of the noAuthPages
  const shouldSkipAuth =
    requestUrl === '/' || noAuthPages.some((page) => requestUrl.includes(page));

  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  if (!shouldSkipAuth) {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else {
      config.headers.Authorization = '';
    }
  }

  config.headers.Accept = 'application/json';
  return config;
};

// const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
//   const authToken = Cookies.get("authToken");
//   config.headers = config.headers ?? {};

//   if (authToken) {
//     config.headers.Authorization = `Bearer ${authToken}`;
//   }
//   config.headers.Accept = "application/json";

//   return config;
// };
const responseInterceptor = (response: AxiosResponse) => {
  if (response.config.responseType === 'blob') {
    return response;
  }
  if(
    response.config.url?.includes('/syllabus/presentation') ){
    return response;
  }
  return response.data ?? response;
};

const errorInterceptor = (error: AxiosError) => {
  if (!error.response) {
    // Handle network/server issues
    if (error.code !== 'ERR_CANCELED') {
      toast.error('Server or network error occurred');
    }
    return Promise.reject(error);
  }

  // if (error.response.status === 401 || error.response.status === 403) {
  //   window.location.replace('/login');
  //   toast.error('Authentication required, please log in');
  // }
  return Promise.reject(error);
};

const paramsSerializer = (params: { [key: string]: string }) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&');
};

export const axiosInstance = Axios.create({
  baseURL: 'https://api.miiguru.com',
  timeout: 300000, // Set timeout to 5 minutes (300,000 milliseconds)
  timeoutErrorMessage: 'timeoutErrorMessage: Request took too long to complete',
});

axiosInstance.defaults.paramsSerializer = paramsSerializer;
axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

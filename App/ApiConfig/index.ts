import Config from 'react-native-config';

const baseUrl = Config.API_URL!;

const baseUrlApi = `${baseUrl}/`;

let ApiConfig = {
  baseUrl,
  baseUrlApi,
  token: null as string | null,
  login: `${baseUrlApi}login`,
  user: `${baseUrlApi}users`,
  posts: `${baseUrlApi}posts`,
};

export { ApiConfig };

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://academics.newtonschool.co/api/v1',
});

instance.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('token');
    const projectID = 'f104bi07c490';

    // Always add the projectID header
    config.headers['projectID'] = projectID;

    // If the token exists, add the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default instance;
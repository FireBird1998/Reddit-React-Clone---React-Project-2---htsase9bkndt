import axios from 'axios';

const serverInstance = axios.create({
  baseURL: 'https://academics.newtonschool.co/api/v1',
});

serverInstance.interceptors.request.use(
  config => {
    const projectID = 'f104bi07c490';

    // Always add the projectID header
    config.headers['projectID'] = projectID;

    return config;
  },
  error => Promise.reject(error)
);

export default serverInstance;
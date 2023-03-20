const axios = require('axios');

const vlcUrl = 'http://127.0.0.1:8080';
const password = '1234'; // Replace this with the password you set in VLC settings

const getStatus = async () => {
  try {
    const response = await axios.get(`${vlcUrl}/requests/status.json`, {
      auth: {
        username: '',
        password: password
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

getStatus();

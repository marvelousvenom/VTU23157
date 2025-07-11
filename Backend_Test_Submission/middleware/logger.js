const axios = require('axios');

const Log = async (stack, level, packageName, message) => {
  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: packageName,
      message,
    });
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
};

module.exports = Log

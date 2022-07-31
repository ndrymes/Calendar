const app = require('./app')
const Logger = require('./utils/logger');

const port = process.env.PORT || 3000;

app.listen(port, function () {
  Logger.info(`Service is running on ${port}`);
});
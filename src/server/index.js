require('@babel/register');
const app = require('./app');
const port = app.get('port');

// Start server
app.listen(port, () => {
  console.log(`Frontend Server has started on port ${port}`);
});

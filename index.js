// Global variables
const server = require('./server.js');
const port = 3000;
// start server listening on port 3000
server.listen(port, () =>
  console.log("Server running on http://localhost:" ,port)
);


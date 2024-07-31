import http from 'http';
import app from './app';

const server = http.createServer(app);

const PORT = 3000;

async function startServer() {
  server.listen(PORT, () => {
    console.log(`index.ts listening on port ${PORT}`);
  });
}

startServer();

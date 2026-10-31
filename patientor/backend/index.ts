import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged');
  res.send('pong');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

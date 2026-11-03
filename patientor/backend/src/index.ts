import express, { type ErrorRequestHandler } from 'express';
import diagnoseRouter from './routes/diagnoses.ts';
import patientRouter from './routes/patients.ts';

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: 'Something went wrong. ' + error.message });
  }

  console.error(error);

  return res.status(500).json({
    error: 'internal server error'
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

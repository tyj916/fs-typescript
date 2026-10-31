import express from 'express';
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

import { Box, Paper, TextField, Stack, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";

const EntryForm = ({ error, createEntry, hideForm }: { 
  error: string;
  createEntry: (object: EntryWithoutId) => void;
  hideForm: () => void ;
}) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [codes, setCodes] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isHealthCheckRating = (value: number): value is HealthCheckRating => {
      return Object.values(HealthCheckRating).includes(value as HealthCheckRating);
    };

    const healthCheckRating = Number(rating);

    if (!isHealthCheckRating(healthCheckRating)) {
      throw new Error('Invalid health check rating');
    }

    const enteredCodes: Array<Diagnosis['code']> = codes
      .replace(' ', '').split(',').filter(Boolean);

    createEntry({
      date,
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes: enteredCodes,
      type: "HealthCheck",
    });

    setDate('');
    setDescription('');
    setSpecialist('');
    setRating('');
    setCodes('');
  };

  const commonFieldProps = {
    size: "small" as const,
    fullWidth: true,
  };

  return (
    <Box component={Paper} variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h4" component="h3" sx={{ mb: 2 }}>New entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField 
            type="date"
            name="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
            {...commonFieldProps}
          />
          <TextField 
            name="description" 
            label="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            {...commonFieldProps}
          />
          <TextField 
            name="specialist" 
            label="Specialist" 
            value={specialist} 
            onChange={(e) => setSpecialist(e.target.value)} 
            required 
            {...commonFieldProps}
          />
          <TextField 
            type="number"
            name="rating" 
            label="Health Check Rating (0-3)" 
            value={rating} 
            slotProps={{
              htmlInput: {
                min: 0,
                max: 3,
                step: 1,
              }
            }}
            onChange={(e) => setRating(e.target.value)} 
            required 
            {...commonFieldProps}
          />
          <TextField 
            name="codes" 
            label="Diagnosis Codes (comma-separated)" 
            value={codes} 
            onChange={(e) => setCodes(e.target.value)}  
            {...commonFieldProps}
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">add</Button>
            <Button onClick={() => hideForm()} variant="outlined">cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default EntryForm;

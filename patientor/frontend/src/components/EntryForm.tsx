import { 
  Box, 
  Paper, 
  TextField, 
  Stack, 
  Button, 
  Typography, 
  Alert, 
  Select, 
  SelectChangeEvent,
  MenuItem, 
  InputLabel, 
  FormControl, 
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../types";

const EntryForm = ({ error, createEntry, hideForm }: { 
  error: string;
  createEntry: (object: EntryWithoutId) => void;
  hideForm: () => void ;
}) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState('');
  const [type, setType] = useState<Entry['type']>('HealthCheck');
  const [rating, setRating] = useState<HealthCheckRating>(0);

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
    setRating(0);
    setCodes('');
  };

  const changeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const isHealthCheckRating = (value: number): value is HealthCheckRating => {
      return Object.values(HealthCheckRating).includes(value as HealthCheckRating);
    };

    if (isHealthCheckRating(value)) {
      setRating(value);
    }
  };

  const changeType = (e: SelectChangeEvent) => {
    const value = e.target.value;

    const isEntryType = (value: string): value is Entry['type'] => {
      return (
        value === 'HealthCheck' ||
        value === 'OccupationalHealthcare' ||
        value === 'Hospital'
      );
    };

    if (isEntryType(value)) {
      setType(value);
    }
  };

  const commonFieldProps = {
    size: "small" as const,
    fullWidth: true,
  };

  return (
    <Box component={Paper} variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h4" component="h3" sx={{ mb: 2 }}>New entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <FormControl onSubmit={handleSubmit} fullWidth>
        <Stack spacing={2}>
          <Box>
            <InputLabel id="entry-type-label">Entry type</InputLabel>
            <Select 
              labelId="entry-type-label"
              id="entry-type"
              label="Entry type" 
              value={type} 
              onChange={changeType}
              {...commonFieldProps}
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
          </Box>

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
          {type === 'HealthCheck' &&<TextField 
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
            onChange={changeRating} 
            required 
            {...commonFieldProps}
          />}

          {type === 'Hospital' && <p>Hospital</p>}
          {type === 'OccupationalHealthcare' && <p>OccupationalHealthcare</p>}

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
      </FormControl>
    </Box>
  );
};

export default EntryForm;

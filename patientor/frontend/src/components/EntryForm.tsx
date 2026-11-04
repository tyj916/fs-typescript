import { Box, Paper, TextField, Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Diagnosis, HealthCheckRating, Patient } from "../types";
import patientService from "../services/patients";

const EntryForm = ({ patientId, hideForm }: { 
  patientId: Patient['id'];
  hideForm: () => void ;
}) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [codes, setCodes] = useState('');

  const createEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const enteredCodes: Array<Diagnosis['code']> = codes
      .replace(' ', '').split(',').filter(Boolean);

    const addedEntry = await patientService.createEntry(patientId, {
      date,
      description,
      specialist,
      healthCheckRating: rating,
      diagnosisCodes: enteredCodes,
      type: "HealthCheck",
    });

    console.log(addedEntry);
    setDate('');
    setDescription('');
    setSpecialist('');
    setRating(0);
    setCodes('');
  };

  const commonFieldProps = {
    size: "small" as const,
    fullWidth: true,
  };

  return (
    <Box component={Paper} variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h4" component="h3" sx={{ mb: 2 }}>New entry</Typography>
      <form onSubmit={createEntry}>
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
            onChange={(e) => {
              const { value } = e.target;
              if (typeof value === 'number' && [0, 1, 2, 3].includes(value)) {
                setRating(value);
              }
            }} 
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

import { Box, Paper, TextField, Stack, Button, Typography } from "@mui/material";
import { useState } from "react";

const EntryForm = ({ hideForm }: { hideForm: () => void }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [codes, setCodes] = useState('');

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
            onChange={(e) => setRating(e.target.value)} 
            required 
            {...commonFieldProps}
          />
          <TextField 
            name="codes" 
            label="Diagnosis Codes (comma-separated)" 
            value={codes} 
            onChange={(e) => setCodes(e.target.value)} 
            required 
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

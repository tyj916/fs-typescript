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
            size="small"
            fullWidth
          />
          <TextField 
            name="description" 
            label="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            size="small"
            fullWidth
          />
          <TextField 
            name="specialist" 
            label="Specialist" 
            value={specialist} 
            onChange={(e) => setSpecialist(e.target.value)} 
            required 
            size="small"
            fullWidth
          />
          <TextField 
            name="rating" 
            label="Health Check Rating (0-3)" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            required 
            size="small"
            fullWidth
          />
          <TextField 
            name="codes" 
            label="Diagnosis Codes (comma-separated)" 
            value={codes} 
            onChange={(e) => setCodes(e.target.value)} 
            required 
            size="small"
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained">add</Button>
            <Button variant="outlined" onClick={() => hideForm()}>cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default EntryForm;

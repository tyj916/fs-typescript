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

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value as HealthCheckRating);
};

const HealthCheckField = ({ rating, changeRating, commonFieldProps }: {
  rating: HealthCheckRating;
  changeRating: (e: React.ChangeEvent<HTMLInputElement>) => void;
  commonFieldProps: object
}) => {
  return (
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
      onChange={changeRating} 
      required 
      {...commonFieldProps}
    />
  );
};

const HospitalField = ({
  dischargeDate, 
  dischargeCriteria, 
  changeDischargeDate, 
  changeDischargeCriteria,
  commonFieldProps,
}: {
  dischargeDate: string;
  dischargeCriteria: string;
  changeDischargeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeDischargeCriteria: (e: React.ChangeEvent<HTMLInputElement>) => void;
  commonFieldProps: object;
}) => {
  return (
    <>
      <TextField 
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        name="dischargeDate"
        label="Discharge Date"
        value={dischargeDate}
        onChange={changeDischargeDate}
        required
        {...commonFieldProps}
      />
      <TextField 
        name="dischargeCriteria"
        label="Discharge Criteria"
        value={dischargeCriteria}
        onChange={changeDischargeCriteria}
        required
        {...commonFieldProps}
      />
    </>
  );
};

const OccupationalHealthcareField = ({
  employerName,
  changeEmployerName,
  sickLeaveStart,
  changeSickLeaveStart,
  sickLeaveEnd,
  changeSickLeaveEnd,
  commonFieldProps,
}: {
  employerName: string;
  changeEmployerName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sickLeaveStart: string;
  changeSickLeaveStart: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sickLeaveEnd: string;
  changeSickLeaveEnd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  commonFieldProps: object
}) => {
  return (
    <>
      <TextField 
        name="employerName"
        label="Employer Name"
        value={employerName}
        onChange={changeEmployerName}
        required
        {...commonFieldProps}
      />
      <TextField 
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        name="sickLeaveStart"
        label="Sick Leave Start Date"
        value={sickLeaveStart}
        onChange={changeSickLeaveStart}
        {...commonFieldProps}
      />
      <TextField 
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        name="sickLeaveEnd"
        label="Sick Leave End Date"
        value={sickLeaveEnd}
        onChange={changeSickLeaveEnd}
        {...commonFieldProps}
      />
    </>
  );
};

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

  // HealthCheck
  const [rating, setRating] = useState<HealthCheckRating>(0);

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const diagnosisCodes: Array<Diagnosis['code']> = codes
      .replace(' ', '').split(',').filter(Boolean);

    const baseEntry = {
      date,
      description,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case 'HealthCheck':
        const healthCheckRating = Number(rating);

        if (!isHealthCheckRating(healthCheckRating)) {
          throw new Error('Invalid health check rating');
        }

        createEntry({
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating,
        });

        setRating(0);
        break;

      case 'Hospital':
        const discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };

        createEntry({
          ...baseEntry,
          type: "Hospital",
          discharge,
        });

        setDischargeDate('');
        setDischargeCriteria('');
        break;
    }

    setDate('');
    setDescription('');
    setSpecialist('');
    setCodes('');
  };

  const changeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isHealthCheckRating(value)) {
      setRating(value);
    }
  };

  const changeDischargeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDischargeDate(e.target.value);
  };

  const changeDischargeCriteria = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDischargeCriteria(e.target.value);
  };

  const changeEmployerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployerName(e.target.value);
  };

  const changeSickLeaveStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSickLeaveStart(e.target.value);
  };

  const changeSickLeaveEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSickLeaveEnd(e.target.value);
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
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
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
          </FormControl>

          <TextField 
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            name="date" 
            label="Date"
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
          {type === 'HealthCheck' && <HealthCheckField 
            rating={rating} 
            changeRating={changeRating} 
            commonFieldProps={commonFieldProps} 
          />}

          {type === 'Hospital' && <HospitalField 
            dischargeDate={dischargeDate}
            dischargeCriteria={dischargeCriteria}
            changeDischargeDate={changeDischargeDate}
            changeDischargeCriteria={changeDischargeCriteria}
            commonFieldProps={commonFieldProps}
          />}

          {type === 'OccupationalHealthcare' && <OccupationalHealthcareField 
            employerName={employerName}
            changeEmployerName={changeEmployerName}
            sickLeaveStart={sickLeaveStart}
            changeSickLeaveStart={changeSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            changeSickLeaveEnd={changeSickLeaveEnd}
            commonFieldProps={commonFieldProps}
          />}

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

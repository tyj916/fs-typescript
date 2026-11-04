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
  Chip,
  OutlinedInput, 
} from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../types";
import diagnoseService from "../services/diagnoses";

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value as HealthCheckRating);
};

const HealthCheckField = ({ rating, changeRating, commonFieldProps }: {
  rating: HealthCheckRating;
  changeRating: (e: SelectChangeEvent<HealthCheckRating>) => void;
  commonFieldProps: object
}) => {
  return (
    <FormControl>
      <InputLabel id="health-check-rating-label">Health Check Rating</InputLabel>
      <Select 
        labelId="health-check-rating-label"
        id="health-check-rating"
        label="Health Check Rating" 
        value={rating} 
        onChange={changeRating}
        required
        {...commonFieldProps}
      >
        <MenuItem value={0}>0 - Healthy</MenuItem>
        <MenuItem value={1}>1 - Low Risk</MenuItem>
        <MenuItem value={2}>2 - High Risk</MenuItem>
        <MenuItem value={3}>3 - Critical Risk</MenuItem>
      </Select>
    </FormControl>
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

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
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
  
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

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

      case 'OccupationalHealthcare':
        const sickLeave = (sickLeaveStart && sickLeaveEnd) ? {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        } : undefined;

        createEntry({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave,
        });

        setEmployerName('');
        setSickLeaveStart('');
        setSickLeaveEnd('');
        break;

      default:
        assertNever(type);
    }

    setDate('');
    setDescription('');
    setSpecialist('');
    setDiagnosisCodes([]);
  };

  const changeRating = (e: SelectChangeEvent<HealthCheckRating>) => {
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

  const changeDiagnosisCodes = (event: SelectChangeEvent<Diagnosis['code'][]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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

          <FormControl>
            <InputLabel id="diagnosis-codes-selection-label">Diagnosis Codes</InputLabel>
            <Select
              labelId="diagnosis-codes-selection-label"
              id="diagnosis-codes-selection"
              multiple
              value={diagnosisCodes}
              onChange={changeDiagnosisCodes}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map(diagnose => 
                <MenuItem key={diagnose.code} value={diagnose.code}>
                  {diagnose.code} - {diagnose.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>

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

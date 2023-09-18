import React, { useState } from 'react';
import {
  Box,
  TextField,
  Switch,
  IconButton,
  Select,
  MenuItem,
  Button,
  Paper,
  FormControlLabel
} from '@mui/material';
import { Alarm } from '@mui/icons-material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { styled } from '@mui/system';

const CustomCalendar = styled(Calendar)`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  width: 100%;


  .react-calendar__tile--active {
    background: #1976d2;
    color: white;
    border-radius: 5px;
  }
`;
export default function CreateEventComponent() {
  const [date, setDate] = useState(new Date());

  return (
    <Paper elevation={3} style={{ width: '1058px', height: '550px', padding: '24px', backgroundColor: '#DBE9EE',  border: '1px solid black',   margin: '0 auto'}}>
        Crear Evento

      <Box display="flex" justifyContent="space-between" height="100%">
        {/* Primera columna */}
        <Box display="flex" flexDirection="column" flex="1" pr={2}>
        <TextField label="Nombre del evento" fullWidth margin="normal" />
        <TextField label="Ubicación" fullWidth margin="normal" />
        <TextField label="Enlace" fullWidth margin="normal" />

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Evento Privado"
          />
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton color="primary">
            <Alarm />
          </IconButton>
          <Select
            variant="outlined"
            value="30 minutos antes"
            style={{ marginLeft: '8px' }}
          >
            <MenuItem value="30 minutos antes">30 minutos antes</MenuItem>
            <MenuItem value="5 minutos antes">5 minutos antes</MenuItem>
            <MenuItem value="10 minutos antes">10 minutos antes</MenuItem>
          </Select>
        </Box>
      </Box>

        {/* Segunda columna */}
        <Box flex="1" pl={2}>
          {/* Componente de Calendario */}
          <CustomCalendar 
          onChange={setDate}
          value={date}
          locale="es-ES"
        />

          <Box display="flex" mt={2} justifyContent="space-between">
            <TextField 
              label="Hora Inicial" 
              type="time"
              InputLabelProps={{ shrink: true }}
              sx={{ flex: '1', marginRight: '8px' }}
            />
            <Select
              variant="outlined"
              value="AM"
              style={{ flex: '1', marginRight: '8px' }}
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </Box>
          <Box display="flex" mt={2} justifyContent="space-between">
            <TextField 
              label="Hora Final" 
              type="time"
              InputLabelProps={{ shrink: true }}
              sx={{ flex: '1', marginRight: '8px' }}
            />
            <Select
              variant="outlined"
              value="AM"
              style={{ flex: '1', marginRight: '8px' }}
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '16px', width: '100%', backgroundColor: '#C1FF72', color: 'black' }}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
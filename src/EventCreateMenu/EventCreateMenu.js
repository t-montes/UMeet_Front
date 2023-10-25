import './EventCreateMenu.css';
import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Switch,
  IconButton,
  Select,
  MenuItem,
  Button,
  Paper,
  FormControlLabel,
  useMediaQuery,
  Snackbar
} from '@mui/material';
import { Alarm } from '@mui/icons-material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { styled } from '@mui/system';
import AppContext from '../AppContext';
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon

const CustomCalendar = styled(Calendar)`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  margin: 0 auto;

  .react-calendar__tile--active {
    background: #1976d2;
    color: white;
    border-radius: 5px;
  }
`;

const CreateEventMenu = React.forwardRef(({ onClose }, ref) => {
  const ctx = useContext(AppContext);
  const { langSet, lang } = ctx;

  const [date, setDate] = useState(new Date());

  const isSmallScreen = useMediaQuery('(max-width:992px)');
  const isLargeScreen = useMediaQuery('(max-width:1050px)');

  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [reminder, setReminder] = useState('30 ' + langSet['MinutesBefore']);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(true);

  const [eventNameError, setEventNameError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);

  const validateFields = () => {
    let error = true;

    if (!endTime) {
      setSnackbarMessage(langSet['PleaseSelectEndTime']);
      setSnackbarOpen(true);
      setEndTimeError(true);
      error = false;
    } else {
      setEndTimeError(false);
    }

    if (!startTime) {
      setSnackbarMessage(langSet['PleaseSelectStartTime']);
      setSnackbarOpen(true);
      setStartTimeError(true);
      error = false;
    } else {
      setStartTimeError(false);
    }

    if (!eventName) {
      setSnackbarMessage(langSet['PleaseSelectEventName']);
      setSnackbarOpen(true);
      setEventNameError(true);
      error = false;
    } else {
      setEventNameError(false);
    }

    return error;
  };

  const handleCreateClick = () => {
    if (validateFields()) {
      onClose();
    }
  };

  return (
    <div
      className="event-create-menu"
      style={{
        width: isSmallScreen ? 'auto' : '65%'
      }}
    >
      <style>
        {`
          #event-createmenu-starttime:before {
            content: '${langSet['StartTime']}⠀⠀';
          }

          #event-createmenu-endtime:before {
            content: '${langSet['EndTime']}⠀⠀';
          }
        `}
      </style>
      <div
        className={`event-create-menu-popup ${isLargeScreen ? 'large' : ''}`}
      >
        <button
          onClick={onClose}
          className="close-button createmenu-icon-button createmenu-ib-close"
        >
          <i className="fa fa-times"></i>
        </button>
        <h2>{langSet['CreateEvent']}</h2>
        <div
          style={{
            display: isSmallScreen ? 'block' : 'flex',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <div className="event-createmenu-inputs">
            <input
              type="text"
              label={langSet['EventName']}
              placeholder={langSet['EventName']}
              value={eventName}
              onChange={(e) => {
                setEventName(e.target.value);
                setEventNameError(false);
              }}
              className={eventNameError ? 'error' : ''}
            />
            <input
              type="text"
              label={langSet['Location']}
              placeholder={langSet['Location']}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <input
              type="text"
              label={langSet['Link']}
              placeholder={langSet['Link']}
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <div
              style={{
                display: isSmallScreen ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15%',
                fontWeight: 'bold'
              }}
            >
              <Switch
                color="primary"
                value={isPrivate}
                onChange={(e) => setIsPrivate(!isPrivate)}
              />
              {langSet['PrivateEvent']}
            </div>
            <div
              style={{
                display: isSmallScreen ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%',
                fontWeight: 'bold'
              }}
            >
              <button
                className="createmenu-icon-button createmenu-ib-bell"
                style={{
                  color: showNotifications ? '' : 'gray'
                }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="fa fa-bell"></i>
              </button>
              <select
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                style={{
                  display: showNotifications ? 'block' : 'none',
                  marginLeft: '10px',
                  border: "1px solid var(--black)"
                }}
              >
                <option value={'5 ' + langSet['MinutesBefore']}>
                  5 {langSet['MinutesBefore']}
                </option>
                <option value={'10 ' + langSet['MinutesBefore']}>
                  10 {langSet['MinutesBefore']}
                </option>
                <option value={'30 ' + langSet['MinutesBefore']}>
                  30 {langSet['MinutesBefore']}
                </option>
              </select>
            </div>
          </div>

          <div style={{ flex: '1', paddingLeft: '8px' }}>
            <CustomCalendar onChange={setDate} value={date} locale={lang} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <input
                id="event-createmenu-starttime"
                type="time"
                label={langSet['StartTime']}
                style={{ 
                  flex: '1', 
                }}
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setStartTimeError(false);
                }}
                className={startTimeError ? 'error' : ''}
                step="300"
              />
              <div />
              <input
                id="event-createmenu-endtime"
                type="time"
                label={langSet['EndTime']}
                style={{ 
                  flex: '1', 
                }}
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setEndTimeError(false);
                }}
                className={endTimeError ? 'error' : ''}
                step="300"
              />
            </div>
            <button
              onClick={handleCreateClick}
              style={{
                marginTop: '16px',
                width: '100%',
                backgroundColor: '#C1FF72',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '7px'
              }}
            >
              {langSet['Create']}
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
});

/*<Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 2,
        backgroundColor: "white",
        outline: "none",
        width: isLargeScreen ? "100%" : "auto",
      }}
      className="create-event-menu"
    >
      <Paper
        elevation={3}
        sx={{
          width: isLargeScreen ? "100%" : "1058px",
          height: isLargeScreen ? "auto" : "600px",
          p: 2,
          backgroundColor: "#DBE9EE",
          border: "1px solid black",
          margin: "0 auto",
          overflowY: isLargeScreen ? "auto" : "visible",
        }}
      >
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
        <h2>{langSet["CreateEvent"]}</h2>

        <Box
          sx={{
            display: isSmallScreen ? "block" : "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box display="flex" flexDirection="column" flex="1" pr={2}>
            <TextField label={langSet["EventName"]} fullWidth margin="normal" value={eventName} onChange={(e) => {
              setEventName(e.target.value); 
              setEventNameError(false);
            }} error={eventNameError}/>
            <TextField label={langSet["Location"]} fullWidth margin="normal" value={location} onChange={(e) => 
              setLocation(e.target.value)
            }/>
            <TextField label={langSet["Link"]} fullWidth margin="normal" value={link} onChange={(e) => 
              setLink(e.target.value)
            }/>
            <Box
              sx={{ // privacy checkbox
                display: isSmallScreen ? "none" : "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <FormControlLabel
                control={<Switch color="primary" value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}/>}
                label={langSet["PrivateEvent"]}
              />
            </Box>

            <Box
              sx={{ // notification reminder selector
                display: isSmallScreen ? "none" : "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <IconButton color="primary">
                <Alarm />
              </IconButton>
              <Select
                variant="outlined"
                value= {reminder}
                onChange={(e) => setReminder(e.target.value)}
                style={{ marginLeft: "8px" }}
              >
                <MenuItem value={"5 " + langSet["MinutesBefore"]}>
                  5 {langSet["MinutesBefore"]}
                </MenuItem>
                <MenuItem value={"10 " + langSet["MinutesBefore"]}>
                  10 {langSet["MinutesBefore"]}
                </MenuItem>
                <MenuItem value={"30 " + langSet["MinutesBefore"]}>
                  30 {langSet["MinutesBefore"]}
                </MenuItem>
              </Select>
            </Box>
          </Box>

          <Box flex="1" pl={1}>
            <CustomCalendar onChange={setDate} value={date} locale={lang} />

            <Box display="flex" mt={2} justifyContent="space-between">
              <TextField
                label={langSet["StartTime"]}
                type="time"
                InputLabelProps={{ shrink: true }}
                sx={{ flex: "1", marginRight: "8px" }}
                value={startTime}
                onChange={(e) => {setStartTime(e.target.value); setStartTimeError(false);}} 
                error={startTimeError}
                inputProps={{
                    step: 300, // 5 min
                  }}
              />
              <TextField
                label={langSet["EndTime"]}
                type="time"
                InputLabelProps={{ shrink: true }}
                sx={{ flex: "1", marginRight: "8px" }}
                value={endTime}
                onChange={(e) => {setEndTime(e.target.value); setEndTimeError(false);}} 
                error={endTimeError}
                inputProps={{
                  step: 300, // 5 min
                }}
            />
            </Box>

            <Button
              onClick={handleCreateClick}
              variant="contained"
              color="primary"
              style={{
                marginTop: "16px",
                width: "100%",
                backgroundColor: "#C1FF72",
                color: "black",
              }}
            >
              {langSet["Create"]}
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>*/

export default CreateEventMenu;

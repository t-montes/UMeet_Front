import React, { useState, useContext } from "react";
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
} from "@mui/material";
import { Alarm } from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { styled } from "@mui/system";
import AppContext from "../AppContext";
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon

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

const CreateEventMenu = React.forwardRef(({onClose}, ref) => {
  const ctx = useContext(AppContext);
  const { langSet, lang } = ctx;

  const [date, setDate] = useState(new Date());

  const isSmallScreen = useMediaQuery("(max-width:770px)");
  const isLargeScreen = useMediaQuery("(max-width:1200px)");

  return (
    <Box
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
            <TextField label={langSet["EventName"]} fullWidth margin="normal" />
            <TextField label={langSet["Location"]} fullWidth margin="normal" />
            <TextField label={langSet["Link"]} fullWidth margin="normal" />

            <Box
              sx={{
                display: isSmallScreen ? "none" : "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <FormControlLabel
                control={<Switch color="primary" />}
                label={langSet["PrivateEvent"]}
              />
            </Box>

            <Box
              sx={{
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
                value={"30 " + langSet["MinutesBefore"]}
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
              />
              <Select
                variant="outlined"
                value="AM"
                style={{ flex: "1", marginRight: "8px" }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </Box>
            <Box display="flex" mt={2} justifyContent="space-between">
              <TextField
                label={langSet["EndTime"]}
                type="time"
                InputLabelProps={{ shrink: true }}
                sx={{ flex: "1", marginRight: "8px" }}
              />
              <Select
                variant="outlined"
                value="AM"
                style={{ flex: "1", marginRight: "8px" }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </Box>

            <Button
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
    </Box>
  );
});

export default CreateEventMenu;
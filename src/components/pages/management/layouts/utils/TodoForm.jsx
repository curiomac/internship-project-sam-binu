import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../../../redux/actions/todoAction";
import { CalendarIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getQueryParam } from "../../../../../helpers/getQueryParam";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const btnStyle = {
  height: "50px",
  marginTop: "10px",
  backgroundColor: "var(--cmac-management-bg-4)",
};

const inputStyle = {
  "& label": {
    color: "gray",
  },
  "& label.Mui-focused": {
    color: "var(--cmac-management-bg-4)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#bdbdbd",
    },
    "&:hover fieldset": {
      borderColor: "var(--cmac-management-bg-4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--cmac-management-bg-4)",
    },
  },
};

const badges = ["low", "medium", "high"];

const TodoForm = ({ open, onClose }) => {
  const badge = getQueryParam("priority"); // Getting priority from params
  const duedate = getQueryParam("duedate"); // Getting due date from params
  const [itemData, setItemData] = useState({
    // Initializing new todo item state
    id: Math.random().toString(36), // Generating unique item ID
    title: "",
    description: "",
    badge: "low",
    duedate: new Date(), // Setting default due date
  });
  const dispatch = useDispatch(); // Dispatch function

  // Handling input changes to update state
  const handleChange = (e) => {
    const { name, value } = e.target; // Getting input name and value
    setItemData((prevData) => ({ ...prevData, [name]: value })); // Updating itemData state
  };

  // Handling date changes to update state
  const handleDateChange = (newDate) => {
    setItemData((prevData) => ({ ...prevData, duedate: newDate }));
  };

  // Handling form submission process
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTodo(
        itemData,
        {
          badge,
          duedate: duedate === null ? new Date() : new Date(duedate),
        },
        true
      )
    ); // Dispatching update action
    setItemData({
      // Resetting item data state
      id: Math.random().toString(36), // Generating new unique ID
      title: "",
      description: "",
      badge: "low",
      duedate: new Date(),
    });
    onClose && onClose(); // Closing modal
  };
  return (
    <div>
      <Modal open={open} onClose={() => onClose && onClose()}>
        <Box sx={boxStyle}>
          <Box>
            <Typography variant="h6" component="h2">
              Add To-Do
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              margin="normal"
              name="title"
              label="Title"
              value={itemData.title}
              onChange={handleChange}
              sx={inputStyle}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              name="description"
              rows={4}
              multiline
              label="Description"
              value={itemData.description}
              onChange={handleChange}
              sx={inputStyle}
            />
            <div className="mt-4 mb-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="duedate"
                  label="Due Date"
                  value={itemData.duedate}
                  onChange={handleDateChange}
                  format="yyyy/MM/dd"
                  minDate={new Date()}
                  className="w-full"
                  slotProps={{
                    textField: {
                      placeholder: "dd-mm-yyyy",
                    },
                  }}
                  slots={{ openPickerIcon: CalendarIcon }}
                  sx={inputStyle}
                />
              </LocalizationProvider>
            </div>
            <TextField
              select
              fullWidth
              margin="normal"
              name="badge"
              label="Badge"
              value={itemData.badge}
              onChange={handleChange}
              sx={inputStyle}
              className="capitalize"
            >
              {badges.map((option) => (
                <MenuItem key={option} value={option} className="capitalize">
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" type="submit" fullWidth sx={btnStyle}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TodoForm;

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useState } from "react";

const Add = () => {
  const [meal, setMeal] = useState(0);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meal,
        name,
        calories,
      }),
    });

    const json = await res.json();
    if (res.ok) {
      setError(null);
      setName("");
      setCalories(0);
    } else {
      setError("Error: " + json.message);
    }
  };

  const sx = {
    margin: "1em",
  };
  return (
    <Box>
      <h1 style={{ margin: "rem" }}>What have you Eaten?</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box component="form" noValidate autoComplete="off">
        <Stack spacing={2}>
          <Select
            sx={sx}
            labelId="select-label"
            id="select"
            variant="standard"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          >
            <MenuItem value="0">Breakfast</MenuItem>
            <MenuItem value="1">Lunch</MenuItem>
            <MenuItem value="2">Dinner</MenuItem>
          </Select>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <TextField
              id="standard-basic"
              label="Food Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={sx}
            />
            <TextField
              id="standard-basic"
              label="Calorie Content"
              variant="standard"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              sx={sx}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Add;

import { useState, useEffect, useCallback } from "react";
import { MenuItem, Select, Snackbar, Button } from "@mui/material";
import MealTable from "../components/tables/mealTable";
import { Box } from "@mui/system";
import Link from "next/link";

const View = () => {
  const [meals, setMeals] = useState();
  const [chosenTime, setChosenTime] = useState(0);
  const [createdTime, setCreatedTime] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    const res = await fetch("/api/deleteItem/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const json = await res.json();

    if (res.ok) {
      setError(null);
      setOpen(true);
      setChosenTime(0);
      setMeals(meals.filter((meal) => meal._id !== id));
    } else {
      setError("Error: " + json.message);
    }
  };

  const getDataCallback = useCallback(async () => {
    fetch("http://localhost/api/getMeals").then((res) => {
      res.json().then((json) => {
        setMeals(json.data.meals);
      });
    });
    setCreatedTime(new Date().toUTCString());
  }, []);

  useEffect(() => {
    getDataCallback();
  }, []);

  return (
    <Box>
      <h1>Client Side Hydration</h1>
      <p>
        This page is served statically and will hydrate the table below with
        data queried on the client-side. This is different from a framework such
        as React which serve a bundle which will build the page on the client
        side.
      </p>
      <p>This page got the data at {createdTime && createdTime}</p>
      <Button variant="outlined">
        {" "}
        <Link href="/add">Add More</Link>
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Snackbar
        open={open}
        message="Item Deleted"
        onClose={() => setOpen(false)}
      />

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <Select
          value={chosenTime}
          defaultValue={0}
          onChange={(e) => setChosenTime(e.target.value)}
        >
          <MenuItem value="0">Breakfast</MenuItem>
          <MenuItem value="1">Lunch</MenuItem>
          <MenuItem value="2">Dinner</MenuItem>
        </Select>
      </Box>
      {meals && (
        <MealTable
          meals={meals}
          chosenTime={chosenTime}
          handleDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default View;

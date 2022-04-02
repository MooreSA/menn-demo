import { useState } from "react";
import { MenuItem, Select, Snackbar } from "@mui/material";
import MealTable from "../components/tables/mealTable";
import { Box } from "@mui/system";
import Link from "next/link";
import connect from "../lib/db/connect";
import Meal from "../lib/models/meal";

const View = (props) => {
  const [meals, setMeals] = useState(props.meals);
  const [chosenTime, setChosenTime] = useState(0);
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const { timeCreated } = props;

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

  return (
    <Box>
      <h1>Incremenental Static Regeneration Using Cache Invalidation</h1>
      <p>
        This page is served totally statically. The table below was populated by
        the server. This page is set to invalidate the cache every 30 seconds.
      </p>
      <p>This page was created on {timeCreated}</p>
      <Link href="/add">Add More</Link>
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
          onChange={(e) => setChosenTime(e.target.value)}
        >
          <MenuItem value="0">Breakfast</MenuItem>
          <MenuItem value="1">Lunch</MenuItem>
          <MenuItem value="2">Dinner</MenuItem>
        </Select>
      </Box>
      <MealTable
        meals={meals}
        chosenTime={chosenTime}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export async function getStaticProps() {
  await connect();
  const meals = await Meal.find();
  const timeCreated = new Date().toUTCString();
  return {
    props: {
      meals,
      timeCreated,
    },
    revalidate: 30,
  };
}

export default View;

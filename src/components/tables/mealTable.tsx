import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const MealTable = ({ meals, chosenTime, handleDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ backgroundColor: "black", color: "#fff" }}
              scope="col"
            >
              Food name
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "black", color: "#fff" }}
              scope="col"
              align="right"
            >
              Calories
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "black", color: "#fff" }}
              scope="col"
              align="center"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.length > 0 ? (
            meals.map((meal) => {
              if (meal.meal == chosenTime) {
                return (
                  <TableRow
                    key={meal._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th">{meal.name}</TableCell>
                    <TableCell align="right">{meal.calories}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(meal._id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })
          ) : (
            <TableRow>
              <TableCell>
                There Doesn't seem to be anything here yet! - Try Adding one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MealTable;

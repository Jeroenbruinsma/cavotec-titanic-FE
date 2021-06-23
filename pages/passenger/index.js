import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/dist/client/router";

export default function index({ passengers }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const router = useRouter()

  const navigateTo = (id) => {
    console.log("clicked", id)
    router.push(`/passenger/${id}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengers.map((row) => (
            <TableRow key={row.id} id={row.id} onClick={e => navigateTo(e.target.id)}>
              <TableCell id={row.id} component="th" scope="row" >
                {row.name}
              </TableCell>
              <TableCell id={row.id} align="right">{row.age}</TableCell>
              <TableCell id={row.id} align="right">{row.sex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`http://localhost:5000/people`);
    const data = response.data;
    return { props: { passengers: data } };
  } catch (err) {
    console.log("error", err);
    return { props: { passengers: [] } };
  }
}

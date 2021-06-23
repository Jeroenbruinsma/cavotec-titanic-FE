import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import { useRouter } from 'next/router'
import {backendUrl} from '../../constants'



export default function PassengerDetails({ person }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const {query} = useRouter()
  const router = useRouter()

  const deletePassenger = async () => {
    console.log(query.id)
    try{
        console.log("backend should be at", backendUrl)
        const response = await axios.delete(`${backendUrl}/people/${query.id}`)
        console.log("resp", response)
        router.push(`/passenger`)

    }catch(err){
        console.log("error", err)
    }
  }

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(person).map((property) => {
              return (
                <TableRow key={property.name}>
                  <TableCell component="th" scope="row">
                    {property}
                  </TableCell>
                  <TableCell align="right">
                    {JSON.stringify(person[property])}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={deletePassenger}>Delete this passenger</Button>
    </Fragment>
  );
}

export async function getServerSideProps({res, params }) {
  try {
    const response = await axios.get(
      `http://localhost:5000/people/${params.id}`
    );
    const data = response.data;
    return { props: { person: data } };
  } catch (err) {
    res.setHeader("location", "/passenger");
    res.statusCode = 302;
    res.end();
  }
}

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import { useRouter } from 'next/router'
import {backendUrl} from '../../constants'

export default function PassengerDetails({ person }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    box: {
      height: 50,
      display: "flex",
      marginLeft: "10px"
    },
    rightButton: {
      justifyContent: "flex-end",
      alignItems: "center",
    },
  });
  const classes = useStyles();
  const {query} = useRouter()
  const router = useRouter()

  const deletePassenger = async () => {
    try{
        const response = await axios.delete(`${backendUrl}/people/${query.id}`)
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
      <Box
          component="span"
          m={1} //margin
          className={`${classes.rightButton} ${classes.box}`}
        >
          <Button variant="contained" color="secondary" style={{margin: "10px", backgroundColor: "#a82319"}} onClick={deletePassenger}>Delete this passenger</Button>
          <Button variant="contained" color="primary" onClick={ () => {router.push(`/edit/${query.id}`)} }>Edit this passenger</Button>
        </Box>
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

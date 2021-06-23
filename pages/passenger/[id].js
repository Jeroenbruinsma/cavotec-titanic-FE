import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function index({person}) {
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      const classes = useStyles();
      return (
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
              return(
                <TableRow key={property.name}>
                  <TableCell component="th" scope="row">
                    {property}
                  </TableCell>
                  <TableCell align="right">{JSON.stringify(person[property])}</TableCell>
                </TableRow>
              )})}
                
            </TableBody>
          </Table>
        </TableContainer>
      );
      // return (
    //     <div>
    //        <h1> Name: {person.name}</h1>
    //        <h2> Age: {person.age}</h2>
    //        <h2> Sex: {person.sex}</h2>
    //        <h2> Survived: {person.survived}</h2>
    //        <h2> Class: {person.passengerClass}</h2>
    //        <h2> Parents/Children aboard {person.parentsOrChildrenAboard}</h2>
    //        <h2> Siblings/spouses aboard {person.siblingsOrSpousesAboard}</h2>
    //     </div>
    // )
}

export async function getServerSideProps({ params }) {
    try{
        const response = await axios.get(`http://localhost:5000/people/${params.id}`);
        const data = response.data
        return {props: { person: data }}
    }catch(err){
        console.log("error" , err)
        return {props: { person: []}}
    }

}
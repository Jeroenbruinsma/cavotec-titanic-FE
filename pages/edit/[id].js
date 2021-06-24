import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import EuroIcon from "@material-ui/icons/Euro";
import { backendUrl } from "../../constants";

export default function Index({person}) {
  const [name, setName] = useState(person.name);
  const [sex, setSex] = useState(person.sex);
  const [age, setAge] = useState(person.age);
  const [siblingsOrSpousesAboard, setSiblingsOrSpousesAboard] = useState(person.siblingsOrSpousesAboard);
  const [parentsOrChildrenAboard, setParentsOrChildrenAboard] = useState(person.parentsOrChildrenAboard);
  const [fare, setFare] = useState(person.fare);
  const [passengerClass, setPassengerClass] = useState(person.passengerClass);
  const [survived, setSurvived] = useState(person.survived);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
    submit: {
      "& .MuiTextField-submit": {
        margin: theme.spacing(1),
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    box: {
      height: 50,
      display: "flex",
    },
    rightButton: {
      justifyContent: "flex-end",
      alignItems: "center",
    },
  }));

  const genderOptions = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
  ];
  const passengerClassOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];
  const survivedOptions = [
    { value: true, label: "yes" },
    { value: false, label: "no" },
  ];

  const parseFare = (data) => {
    setFare(data.replace(",", "."));
  };

  const classes = useStyles();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${backendUrl}/people/${person.id}`, {
        name,
        age,
        fare,
        sex,
        siblingsOrSpousesAboard,
        parentsOrChildrenAboard,
        passengerClass,
        survived,
      });
      if (response.status === 200) {
        router.push(`/passenger`);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="nameField"
            label="Name"
            defaultValue=""
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="agefield"
            label="Age"
            type="number"
            defaultValue=""
            variant="filled"
            value={age}
            onChange={(e) => setAge(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <TextField
            id="genderField"
            select
            label="Gender"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            helperText=""
            variant="filled"
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="genderField"
            select
            label="Survived"
            value={survived}
            onChange={(e) => setSurvived(e.target.value)}
            helperText=""
            variant="filled"
            type="number"
          >
            {survivedOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="passengerClass"
            select
            label="passengerClass"
            helperText=""
            variant="filled"
            type="number"
            value={passengerClass}
            onChange={(e) => setPassengerClass(parseFloat(e.target.value))}
          >
            {passengerClassOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="filled-error"
            label="siblingsOrSpousesAboard"
            type="number"
            defaultValue="0"
            variant="filled"
            value={siblingsOrSpousesAboard}
            onChange={(e) =>
              setSiblingsOrSpousesAboard(parseFloat(e.target.value))
            }
          />
        </div>
        <div>
          <TextField
            id="filled-error-helper-text"
            label="parentsOrChildrenAboard"
            type="number"
            defaultValue="0"
            variant="filled"
            value={parentsOrChildrenAboard}
            onChange={(e) =>
              setParentsOrChildrenAboard(parseFloat(e.target.value))
            }
          />
        </div>
        <div>
          <TextField
            id="filled-error"
            label="fare"
            defaultValue=""
            variant="filled"
            value={fare}
            onChange={(e) => parseFare(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EuroIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Box
          component="span"
          m={1} //margin
          className={`${classes.rightButton} ${classes.box}`}
        >
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
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
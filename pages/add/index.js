import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import EuroIcon from "@material-ui/icons/Euro";
import { backendUrl } from "../../constants";

export default function index({ passengers }) {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(18);
  const [siblingsOrSpousesAboard, setSiblingsOrSpousesAboard] = useState(0);
  const [parentsOrChildrenAboard, setParentsOrChildrenAboard] = useState(0);
  const [fare, setFare] = useState(15);
  const [passengerClass, setPassengerClass] = useState(1);
  const [survived, setSurvived] = useState(true);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
      },
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

  const classes = useStyles();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/people`, {
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
            // error
            id="nameField"
            label="Name"
            defaultValue=""
            helperText="Incorrect entry."
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

          <TextField
            id="genderField"
            select
            label="passengerClass"
            onChange={(e) => setGender(e.target.value)}
            helperText=""
            variant="filled"
            type="number"
            value={passengerClass}
            onChange={(e) => setPassengerClass(e.target.value)}
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
            onChange={(e) => setSiblingsOrSpousesAboard(e.target.value)}
          />
          <TextField
            id="filled-error-helper-text"
            label="parentsOrChildrenAboard"
            type="number"
            defaultValue="0"
            helperText="Incorrect entry."
            variant="filled"
            value={parentsOrChildrenAboard}
            onChange={(e) => setParentsOrChildrenAboard(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="filled-error"
            label="fare"
            defaultValue=""
            variant="filled"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EuroIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Container>
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

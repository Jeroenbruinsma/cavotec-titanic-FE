import axios from "axios";

export default function index({person}) {
    console.log("pass", person)
    return (
        <div>
           <h1> Name: {person.name}</h1>
           <h2> Age: {person.age}</h2>
           <h2> Sex: {person.sex}</h2>
           <h2> Survived: {person.survived}</h2>
           <h2> Class: {person.passengerClass}</h2>
           <h2> Parents/Children aboard {person.parentsOrChildrenAboard}</h2>
           <h2> Siblings/spouses aboard {person.siblingsOrSpousesAboard}</h2>
        </div>
    )
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
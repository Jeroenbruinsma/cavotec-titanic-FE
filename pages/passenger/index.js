import axios from "axios";

export default function index({passengers}) {
    console.log("pass", passengers)
    return (
        <div>
           {passengers.map(p => <h1>{p.name}</h1>)}         
        </div>
    )
}

export async function getServerSideProps({ params }) {
    try{
        const response = await axios.get(`http://localhost:5000/people`);
        const data = response.data
        return {props: { passengers: data }}
    }catch(err){
        console.log("error" , err)
        return {props: { passengers: []}}
    }

}
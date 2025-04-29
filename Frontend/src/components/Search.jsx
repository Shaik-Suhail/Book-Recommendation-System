import { useEffect, useState } from "react";
import { Paper, Typography,Card,Button } from '@mui/material';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "./Loading.jsx";



function Search(){
    let { book } = useParams();
    const[searchResults,setSearchResults]=useState(null);
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/books?search=${book}`).then(res => {
        setSearchResults(res.data);
    })
    .catch(e => {
        return <div>
            <h1>Error</h1>
        </div>
    })
    },[])
    
    return searchResults ? <div>
    <div>
    <br />
    <br />
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
    {searchResults.map((book,index) => {
  return <div key={index}>
    <Paper elevation={20}>
    <Card style={{
    margin: 10,
    width: 200,
    height: 400,
    padding: 80
}}> 
<div style={{textAlign:"center"}}>
<img src={book.image_url}width={200} height={300} ></img>

</div>
  <center>
    <Typography textAlign={"center"} variant="subtle1">{book.title}</Typography>
  <Typography textAlign={"center"} variant="subtitle1">{book.author}</Typography>
  <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
  <Button variant="contained" size="large" style={{backgroundColor:"#fccc5d",color:"black"}} onClick={() => {window.location="/" + book.title}}>Recommend</Button>
  </div> 
  </center>
  </Card>
  </Paper>
  </div>
})}
</div>

</div>
</div>
: <Loading/>


}
export default Search;
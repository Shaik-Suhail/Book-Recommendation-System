import { useEffect, useState } from "react";
import {Box, Paper, Typography,Card,Button } from '@mui/material';
import axios from "axios";
import {Loading} from "./Loading.jsx";





function Home(){
    const [popular,setPopular]=useState(null)
    const init= async()=>{
    const response = await axios.get(`http://127.0.0.1:5000/`)
    console.log(response.data.item)
    setPopular(response.data.item)
    }
    useEffect(()=>{
        init();
    },[]);

    return  popular ? <div>
    <center>
  <Paper elevation={3} style={{width:500,
  height:200,
 backgroundColor:"#fccc5d",
 marginTop:"50px"
 }} >
   <Typography variant="h5" fontWeight={"bold"} >Top 50 books</Typography>
 </Paper>
  </center>
  <br />
  <br />
  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
  {popular.map((book,index) => {
    return <div key={index}><Paper elevation={20}>
      <Card style={{
      margin: 10,
      width: 200,
      height: 320,
      padding: 40
  }}> 
<div style={{textAlign:"center"}}>
<img src={book[2]}  ></img>

</div>
    <center>
      <Typography textAlign={"center"} variant="subtle1">{book[0]}</Typography>
    <Typography textAlign={"center"} variant="subtitle1">{book[1]}</Typography>
    <Typography textAlign={"center"} variant="subtitle1">{book[3]}</Typography>
    <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
    <Button variant="contained" size="large" style={{backgroundColor:"#fccc5d",color:"black"}} onClick={() => {window.location="/" + book[0]}}>Recommend</Button>
    </div> 
    </center>
    </Card>
    </Paper>
    </div>

  })}
  </div>
  </div> 
  :
   <Loading/> 
    

}


export default Home;
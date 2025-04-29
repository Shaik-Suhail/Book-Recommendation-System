import { useEffect, useState } from "react";
import { Paper, Typography,Card,Button } from '@mui/material';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading.jsx";



function Recommend(){
    let { bookname } = useParams();
    const [recommends,setRecommends]=useState(null);
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/${bookname}`).then(res => {
            if(res.data.recommend){
                setRecommends(res.data.recommend);
            }else{
                alert(res.data.message);
                window.history.back();
            }
        })
        .catch(e => {
            return <div>
                <h1>Error</h1>
            </div>
        });
    }, []);

    return recommends ? <div>
    <br />
    <br />
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
{recommends.map((book,index) => {
  return <div key={index}><Paper elevation={20}>
    <Card style={{
    margin: 10,
    width: 200,
    height: 400,
    padding: 80
}}> 
<div style={{textAlign:"center"}}>
<img src={book[2]}width={200} height={300} ></img>

</div>
  <center>
    <Typography textAlign={"center"} variant="subtle1">{book[0]}</Typography>
  <Typography textAlign={"center"} variant="subtitle1">{book[1]}</Typography>
  <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
  <Button variant="contained" size="large" style={{backgroundColor:"#fccc5d",color:"black" }} onClick={() => {window.location="/" + book[0]}}>Recommend</Button>
  </div> 
  </center>
  </Card>
  </Paper>
  </div>
})}
</div>

</div>
: <Loading/>



    

}
export default Recommend;
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


function Appbar()
{
    const[search,setSearch]=useState("")
    const navigate = useNavigate()

    return <div><div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1
    }}>
        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => { navigate("/")//window.location="/"
        }}>
            <Typography variant={"h6"}>James Clear</Typography>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight:10}}>
            <center>
           <TextField
                placeholder="Search"
                type="search"
                variant="outlined"
                onChange={(e)=>setSearch(e.target.value)}
                style={{
                 backgroundColor:"white",
                 width:300,
                }}
                size="medium"
                InputProps={{
            startAdornment: (
           <InputAdornment position="start">
              <SearchIcon />
           </InputAdornment>
            ),
         }}
 />
    </center>

            </div>
            <div style={{textAlign:"center",marginTop:10}}>
                <Button variant="contained"  onClick={()=>{
                    if(search.length!=0)
                    {
                        window.location="/books/"+search

                    }
                    else{
                        alert('Enter details correctly!')
                    }
                }}>Search</Button>
            </div>
        </div>
    </div>
    <br />
    
    </div>


}

export default Appbar;
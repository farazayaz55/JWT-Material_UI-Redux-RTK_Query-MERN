import * as React from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DoneIcon  from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect,useState,useRef } from 'react';
import { useDeleteListMutation, useGetListQuery, usePostLISTMutation, useUpdateLISTMutation } from '../Redux/apiCalls';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { useSelector } from 'react-redux';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const  BoxSx =()=> {
    const { user } = useSelector((state) => state.auth)
    const [postLIST]=usePostLISTMutation()
    const [updateLIST]=useUpdateLISTMutation()
    const [deleteList]=useDeleteListMutation()
    const ref=useRef()
    const [list,setList]=useState([]);
    const {isError,isLoading,isFetching,isSuccess,data}= useGetListQuery()
    const deleteEvent =async (id)=>{
      //delete rtk query
      const result=await deleteList({"id":id})
    }
    const markEvent=async (id)=>{
      const result=await updateLIST({"id":id})
    }

    const addTODO=async ()=>{
      const result=await postLIST({
        "name":ref.current.value,
        "user":user.id
    })
      ref.current.value=""
    }
  return (
      data&& <Stack spacing={2}>
          {data.map(
              (item)=>
                  <Item>
                      <IconButton aria-label="add" onClick={()=>markEvent(item._id)}>
                          <DoneIcon />
                      </IconButton>
                      {item.completed? <span style={{textDecoration:'line-through'}}>{item.name}</span>:item.name}
                      <IconButton aria-label="delete" onClick={()=>deleteEvent(item._id)}> 
                      <DeleteIcon />
                      </IconButton>
                  </Item>   
          )
          }
          {/* signin */}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="add"
              label="ADD TODO"
              name="add"
              autoComplete="add"
              autoFocus
              inputRef={ref}
            />
            
        
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 3, mb: 2 }}
              onClick={addTODO}
            >
              ADD TODO
            </Button>

          </Box>
      </Stack>
  );
}
export default BoxSx;
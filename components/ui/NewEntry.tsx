import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState, useContext } from 'react';

import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {

    const {addNewEntry} = useContext(EntriesContext)
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)
    

    const [inputValue, setInputValue] = useState('');
    
    const [touched, setTouched] = useState(false);

    const onTextFielChnges = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if(inputValue.length === 0) return;
        //console.log(inputValue);
        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

  return (
    <Box sx={{marginBottom: 2, paddingX: 1.5}}>

        {
            isAddingEntry? (
                <>
                    <TextField 
                        fullWidth
                        sx={{marginTop: 2, marginBottom:1}}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText= {inputValue.length <=0 && touched && 'Ingrese un Valor'}
                        error={inputValue.length <=0 && touched} 
                        value={inputValue}
                        onChange={ onTextFielChnges }
                        onBlur={()=>setTouched(true)}
                    />

                        <Box display='flex' justifyContent='space-between' >
                            <Button
                                variant='outlined'
                                color='primary'
                                endIcon={ <CancelOutlinedIcon /> }
                                onClick={()=>setIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={ <SaveAltOutlinedIcon /> }
                                onClick={onSave}
                            >
                                Guardar
                            </Button>

                        </Box>
                </>
            ) : (

                <Button
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={()=>setIsAddingEntry(true) }
                >
                    Agregar Tarea    
                </Button>
            )
        }


   


    </Box>
  )
}

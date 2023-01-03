import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField, Radio, IconButton } from '@mui/material';
import {ChangeEvent, useState, useMemo, FC, useContext} from 'react';
import { GetServerSideProps } from 'next';
import { Layout } from '../../components/layouts';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFuntions } from '../../utils';


const validStatus: EntryStatus[]= ['pending','in-progress','finished'];

interface Props{
    entry: Entry
}

export const EntryPage:FC<Props>= ({entry}) => {

    const { updateEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

   const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChange = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged =(event:ChangeEvent<HTMLInputElement>)=>{
       console.log(event.target.value);
       setStatus(event.target.value as EntryStatus);
    }

    const onSave = () =>{
        if(inputValue.trim().length === 0) return;
        const updateEntries:Entry ={
            ...entry,
            status,
            description: inputValue
        }
        updateEntry(updateEntries, true);    
    }

  return (
    <Layout title={inputValue.substring(0,20)+ '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{marginTop:2}}
        >
            <Grid item xs={12} sm={8} md={6} >
                <Card>
                    <CardHeader 
                        title={`Entrada:`} 
                        subheader={`Creada ${ dateFuntions.getFormatDistanceToNow(entry.createAt)}`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{marginTop:2, marginBottom: 1}}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva Entrada"
                            value={inputValue}
                            onBlur={() => setTouched(true)}
                            onChange={onInputValueChange}
                            helperText={isNotValid && touched && 'Ingresar un Valor'}
                            error={isNotValid && touched}
                            
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel 
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent> 
                    <CardActions>
                        <Button
                            startIcon={<SaveAltOutlinedIcon />}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>   
                </Card>
            </Grid>     
        </Grid>
        <IconButton
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              backgroundColor:'error.dark' 
            }}
        >
            <DeleteOutlinedIcon />
        </IconButton>   
    </Layout>
  )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {id} = params as {id:string};

    const entry = await dbEntries.getEntryById(id);

    if(!entry){
        return{
            redirect:{
                destination:'/',
                permanent: false,
            }    
        }
    }

    return {
        props: {
            entry    
        }
    }
}

export default EntryPage;
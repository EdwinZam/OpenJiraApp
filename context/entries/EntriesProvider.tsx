import { FC, useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';


type Props = {
    children? : React.ReactNode
};

export interface EntriesState {
     entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC<Props> = ({ children }) => {

     const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
     const { enqueueSnackbar } = useSnackbar();

     const addNewEntry = async(description: string) =>{
/*         const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createAt: Date.now(),
            status: 'pending'
        } */
        const {data} = await entriesApi.post<Entry>('/entries', {description});
        dispatch({type: 'Entry - Add-Entry', payload: data});

     }
const updateEntry = async({_id, description, status}: Entry, showSnackbar=false) =>{
    try {
        const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status});
        dispatch({type:'Entry - Entry-Updated', payload: data});
        
        //Mostrar snackbar
        if(showSnackbar){
        enqueueSnackbar('Entrada actualizada',{
            variant: 'success',
            autoHideDuration:1500,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            }
         });
        }
    } catch (error) {
        console.log({error});   
    }
    
}

const refreshEntries =async () => {
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: 'Entry - Refresh-Data', payload: data});
        
}

useEffect(() => {
    refreshEntries();
}, []);


return (
    <EntriesContext.Provider value={{
        ...state,
        //methods.
        addNewEntry,
        updateEntry,
    }}>
        {children}
    </EntriesContext.Provider> 
)
};
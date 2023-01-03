import React, { FC, useMemo, DragEvent } from 'react';
import {Paper, List} from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { useContext } from 'react';
import { EntriesContext } from '../../context/entries/';
import { UIContext } from '../../context/ui';
import style from './EntryList.module.css'


interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ( {status} ) => {
    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext)
    const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status) , [entries]);
    const onDropEntry = (event:DragEvent<HTMLDivElement>)=>{
        const id = event.dataTransfer.getData('text');
        //console.log({id});
        const entry = entries.find(e => e._id === id )!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
        
    }
    const allowDrop = (event:DragEvent<HTMLDivElement>) =>{
        event.preventDefault();
    }
  return (
    // TODO: aqui tendremos drop
    <div
        onDrop={ onDropEntry }
        onDragOver={allowDrop}
        className={isDragging? style.dragging : ''}
    >
        <Paper sx={{ height: 'calc(100vh - 200px)', overflow:'scroll', backgroundColor: 'transparent', '&::-webkit-scrollbar': { display: 'none' }, padding: '1px 10px' }}>
            {/* Todo: cambiara dependiendo si esta haciendo drag o no  */}

            <List sx={{opacity: isDragging? 0.2 : 1, transition:'all 0.3s'  }}>
                {
                    entriesByStatus.map(entry =>(
                        <EntryCard key={entry._id} entry={entry} />    
                    ) )
                }

            </List>
        </Paper>
    </div>  
  )
}

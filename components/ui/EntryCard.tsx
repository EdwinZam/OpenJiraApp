import { FC, DragEvent, useContext } from 'react'
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFuntions } from '../../utils';


interface Props {
    entry: Entry;  
}


export const EntryCard:FC<Props> = ({entry}) => {

    const {startDragging, endDragging} = useContext(UIContext);

    const router = useRouter();

    const onDragStart =( event:DragEvent ) =>{
        //console.log(event);
        event.dataTransfer.setData('text', entry._id);
        //Todo: Modificar el esatdo Indicando que estoy haciendo Drag
        startDragging();
    }
    const onDragEnd =()=>{
        //Todo: Fin del Drag
        endDragging();
    }

    const onCLick =()=>{
        router.push(`/entries/${entry._id}`);
    }

  return (
    <Card
        onClick={onCLick}
        sx={{ marginBottom: 1 }}
        //Eventos de Drag
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography> 
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent:'end', paddingRight: 2 }} >
                <Typography variant='body2' > { dateFuntions.getFormatDistanceToNow(entry.createAt) } </Typography>    
            </CardActions>

        </CardActionArea>    

    </Card>    
  )
};

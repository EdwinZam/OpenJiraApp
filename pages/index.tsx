import { Inter } from '@next/font/google'
import { Grid, Card, CardHeader,CardContent } from '@mui/material'
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <Layout title='Home - OpenJira'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{height: 'calc(100vh - 100px)'}}>
              <CardHeader title="Pendientes"/>
                {/* add new Task */}
                {/* Listado de entrads */}
                <NewEntry />
                <EntryList status='pending'/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{height: 'calc(100vh - 100px)'}}>
              <CardHeader title="En Progreso"/>
                {/* add new Task */}
                {/* Listado de entrads */}
                <EntryList status='in-progress' />              
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{height: 'calc(100vh - 100px)'}}>
              <CardHeader title="Completadas"/>
                {/* add new Task */}
                {/* Listado de entrads */}
                <EntryList status='finished' />
            </Card>
          </Grid>
        </Grid>
      </Layout>
  )
}

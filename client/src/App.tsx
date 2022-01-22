import './App.css';
import {Box, Container, Grid} from '@mui/material';
import AutoComplete from './components/AutoComplete';
import Chart from './components/Chart';
import Table from './components/Table';
import {CityProvider} from './contexts/city';

function App() {
  return (
    <div className='App'>
      <CityProvider>
        <Container>
          <Box mb={5}>
            <AutoComplete />
          </Box>
          <Grid container spacing={2} columns={16}>
            <Grid item lg={8} md={8} sm={16}>
              <Chart />
            </Grid>
            <Grid item lg={8} md={8} sm={16}>
              <Table />
            </Grid>
          </Grid>
        </Container>
      </CityProvider>
    </div>
  );
}

export default App;

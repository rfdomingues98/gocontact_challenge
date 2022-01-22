import React from 'react';
import {DataGrid, GridColDef, GridValueFormatterParams} from '@mui/x-data-grid';
import {useCities} from '../contexts/city';
import moment from 'moment';

const columns: GridColDef[] = [
  {field: 'name', headerName: 'City Name', width: 130},
  {
    field: 'temperature',
    headerName: 'Temperature',
    width: 130,
    valueFormatter: (params: GridValueFormatterParams) => {
      return `${params.value as number} °C`;
    },
  },
  {
    field: 'sunrise',
    headerName: 'Sunrise',
    width: 130,
    valueFormatter: (params: GridValueFormatterParams) => {
      return `${moment.unix(params.value as number).format('HH:mm:ss')}`;
    },
  },
  {
    field: 'sunset',
    headerName: 'Sunset',
    width: 130,
    valueFormatter: (params: GridValueFormatterParams) => {
      return `${moment.unix(params.value as number).format('HH:mm:ss')}`;
    },
  },
];

export default function Table() {
  const {data} = useCities();
  return (
    <div style={{height: 400, width: '100%'}}>
      <DataGrid
        rows={data}
        getRowId={(row) => row.name}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

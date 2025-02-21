import { DataSource } from 'typeorm';
import { dataSourceOptions } from './datasource.config';

const datasource = new DataSource(dataSourceOptions);

// datasource
//   .initialize()
//   .then(() => {
//     console.log('data source has been initialized');
//   })
//   .catch((error) => {
//     console.error('error during data source initialization', error);
//   });

export default datasource;

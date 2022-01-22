import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';

const CityContext = createContext();

const URL = 'http://127.0.0.1:3001';

export const CityProvider = ({children}) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getNames();
  }, []);

  const Cities = async (values) => {
    values = values.map((value) => value.trim());
    setSelectedCities(values);
    let response;
    if (values.length === 1) {
      response = [
        (await axios.get(`${URL}/city`, {params: {name: values[0]}})).data,
      ];
    } else {
      response = (
        await axios.get(`${URL}/cities`, {
          params: {names: values.join('|')},
        })
      ).data;
    }
    if (values.length >= 3) {
      setData(response);
    } else {
      setData([]);
    }
  };

  const getNames = async () => {
    setCityNames((await axios.get(`${URL}/citynames`)).data);
  };

  return (
    <CityContext.Provider
      value={{Cities, selectedCities, setSelectedCities, cityNames, data}}
    >
      {children}
    </CityContext.Provider>
  );
};

export function useCities() {
  const context = useContext(CityContext);
  return context;
}

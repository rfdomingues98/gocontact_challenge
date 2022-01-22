import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

class CityController {
  public names = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rawCities = await fs.readFile(path.resolve(__dirname, '../utils/city.list.min.json'), 'utf-8');
      let cities = JSON.parse(rawCities.toString());
      cities = await cities.map(city => city.name);
      res.status(200).json(cities);
    } catch (error) {
      next(error);
    }
  };

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.query;
      const data = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${process.env.API_KEY}`)).data;

      const result = { temperature: data.main.temp, sunrise: data.sys.sunrise, sunset: data.sys.sunset };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMultiple = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { names } = req.query;

      const namesArray = (names as string).split('|');

      const rawCities = await fs.readFile(path.resolve(__dirname, '../utils/city.list.min.json'), 'utf-8');
      let cities = JSON.parse(rawCities.toString());
      cities = cities.filter(city => namesArray.includes(city.name));
      cities = cities.reduce((unique, item) => {
        return unique.map(city => [city.name, city.state, city.country].join(',')).includes([item.name, item.state, item.country].join(','))
          ? unique
          : [...unique, item];
      }, []);
      const ids = cities.map(city => city.id);
      console.log(cities);
      const data = (await axios.get(`https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${process.env.API_KEY}`)).data;

      const result = data.list;
      result.map(city => ({ name: city.name, temperature: city.main.temp, sunrise: city.sys.sunrise, sunset: city.sys.sunset }));

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default CityController;

import { Router } from 'express';
import CityController from '@controllers/city.controller';
import { Routes } from '@interfaces/routes.interface';

class CityRoute implements Routes {
  public path = '/';
  public router = Router();
  public cityController = new CityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}city`, this.cityController.get);
    this.router.get(`${this.path}cities`, this.cityController.getMultiple);
    this.router.get(`${this.path}citynames`, this.cityController.names);
  }
}

export default CityRoute;

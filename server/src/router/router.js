import express from 'express';
import { getAllLocationsController, addNewLocationController} from '../controller/controller.js';

const router = express.Router();

router.get("/locations", getAllLocationsController);

router.post("/location", addNewLocationController);

export { router };
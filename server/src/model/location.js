import {dbInstance as db} from '../config/database.js';

const locationTable = 'locations';

export const getAllLocations = async () => {
  try {
    const locations = await db.any(`SELECT * FROM ${locationTable}`);
    return locations;
  } catch (error) {
    throw error;
  }
};

export const addNewLocation = async (address, lat, lng) => {
  try {
    const query = `
      INSERT INTO ${locationTable} (address, lat, lng)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const savedLocation = await db.one(query, [address, lat, lng]);
    return savedLocation;
  } catch (error) {
    throw error;
  }
};

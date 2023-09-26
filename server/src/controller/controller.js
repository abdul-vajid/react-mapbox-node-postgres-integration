import * as LocationModel from '../model/location.js';

export const getAllLocationsController = async (req, res, next) => {
  try {
    const locations = await LocationModel.getAllLocations();
    return res.status(200).json({
      success: true,
      message: 'Locations retrieved successfully.',
      locations,
    });
  } catch (error) {
    console.error('Error getting locations:', error);
    return next(error);
  }
};

export const addNewLocationController = async (req, res, next) => {
  const { address, lat, lng } = req.body;
  if (!address || !lat || !lng) {
    return res.status(400).json({
      success: false,
      message: 'Properties missing.',
    });
  }
  try {
    const savedLocation = await LocationModel.addNewLocation(address, lat, lng);
    return res.status(201).json({
      success: true,
      message: 'Location added successfully.',
      savedLocation,
    });
  } catch (error) {
    return next(error);
  }
};

import express from 'express';
import drinkController from "../controllers/drink.controller.js";

const router = express.Router();

// Create a new drink
router.post('/drinks', drinkController.createDrink);

// Get a drink by ID
router.get('/drinks/:id', drinkController.getDrinkById);

// Get all drinks
router.get('/drinks', drinkController.getAllDrinks);

// Update a drink by ID
router.put('/drinks/:id', drinkController.updateDrink);

// Delete a drink by ID
router.delete('/drinks/:id', drinkController.deleteDrink);

export default router;

import express from 'express';
import drinkController from "../controllers/drink.controller.js";
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.use(authenticateToken);

// Create a new drink
router.post('/drinks', drinkController.createDrink);

// Get all drinks
router.get('/drinks', drinkController.getAllDrinks);

// Get a drink by ID
router.get('/drinks/:id', drinkController.getDrinkById);

// Get drinks by user ID
router.get('/drinks/user/:userId', drinkController.getDrinksByUser); // Updated route

// Update a drink by ID
router.put('/drinks/:id', drinkController.updateDrink);

// Delete a drink by ID
router.delete('/drinks/:id', drinkController.deleteDrink);

export default router;

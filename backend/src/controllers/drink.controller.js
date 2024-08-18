import DrinkService from "../services/drink.service.js";

export class DrinkController {
  async createDrink(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: 'User is required' });
      }
      const drink = await DrinkService.addDrink(userId);
      return res.status(201).json(drink);
    } catch (error) {
      console.error('Error creating drink:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getDrinkById(req, res) {
    try {
      const { id } = req.params;
      const drink = await DrinkService.findDrinkById(id);
      return res.status(200).json(drink);
    } catch (error) {
      console.error('Error fetching drink by ID:', error);
      if (error.message === 'Drink not found') {
        return res.status(404).json({ message: 'Drink not found' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllDrinks(req, res) {
    try {
      const drinks = await DrinkService.listAllDrinks();
      return res.status(200).json(drinks);
    } catch (error) {
      console.error('Error fetching all drinks:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getDrinksByUser(req, res) {
    try {
      const { userId } = req.params; // Get userId from route parameters
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const drinks = await DrinkService.listDrinksByUser(userId);
      return res.status(200).json(drinks);
    } catch (error) {
      console.error('Error fetching drinks by user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateDrink(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: 'User is required' });
      }
      const updatedDrink = await DrinkService.modifyDrink(id, userId);
      return res.status(200).json(updatedDrink);
    } catch (error) {
      console.error('Error updating drink:', error);
      if (error.message === 'Drink not found for update') {
        return res.status(404).json({ message: 'Drink not found for update' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteDrink(req, res) {
    try {
      const { id } = req.params;
      await DrinkService.removeDrink(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting drink:', error);
      if (error.message === 'Drink not found for deletion') {
        return res.status(404).json({ message: 'Drink not found for deletion' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new DrinkController();

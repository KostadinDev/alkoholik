import DrinkService from "../services/drink.service.js";

export class DrinkController {
  async createDrink(req, res) {
    try {
      const userId = req.user?.email;
      const { type, notes } = req.body;
      console.log(type, notes);
      if (!userId) {
        return res.status(400).json({ message: 'User is required' });
      }
      if (!type) {
        return res.status(400).json({ message: 'Drink type is required' })
      }
      const drink = await DrinkService.addDrink(userId, type, notes);
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

  async getDrinks(req, res) {
    try {
      const { month, userId } = req.query; // Get month from query parameters
      console.log(userId, month, 'DSADDSADASD');
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const drinks = await DrinkService.listDrinksByUser(userId, month);
      return res.status(200).json(drinks);
    } catch (error) {
      console.error('Error fetching drinks by user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateDrink(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.email;
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

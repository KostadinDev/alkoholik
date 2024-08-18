import DrinkRepository from "../repositories/drink.repository.js";

class DrinkService {
  async addDrink(user) {
    try {
      const drink = await DrinkRepository.createDrink(user);
      return drink;
    } catch (error) {
      console.error('Error adding drink:', error);
      throw error;
    }
  }

  async findDrinkById(id) {
    try {
      const drink = await DrinkRepository.getDrinkById(id);
      if (!drink) {
        throw new Error('Drink not found');
      }
      return drink;
    } catch (error) {
      console.error('Error finding drink by ID:', error);
      throw error;
    }
  }

  async listAllDrinks() {
    try {
      const drinks = await DrinkRepository.getAllDrinks();
      return drinks;
    } catch (error) {
      console.error('Error listing all drinks:', error);
      throw error;
    }
  }

  async listDrinksByUser(userId) {
    try {
      const drinks = await DrinkRepository.getDrinksByUser(userId); // Call to repository method
      return drinks;
    } catch (error) {
      console.error('Error listing drinks by user:', error);
      throw error;
    }
  }

  async modifyDrink(id, user) {
    try {
      const updatedDrink = await DrinkRepository.updateDrink(id, user);
      if (!updatedDrink) {
        throw new Error('Drink not found for update');
      }
      return updatedDrink;
    } catch (error) {
      console.error('Error updating drink:', error);
      throw error;
    }
  }

  async removeDrink(id) {
    try {
      const deletedDrink = await DrinkRepository.deleteDrink(id);
      if (!deletedDrink) {
        throw new Error('Drink not found for deletion');
      }
      return deletedDrink;
    } catch (error) {
      console.error('Error deleting drink:', error);
      throw error;
    }
  }
}

export default new DrinkService();

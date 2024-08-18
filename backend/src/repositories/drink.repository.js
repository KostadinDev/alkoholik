import Drink from "../mongo/drinks.mongo.js";

class DrinkRepository {
  async createDrink(user, type, notes, location) {
    try {
      const drink = new Drink({ user, type, notes, location });
      return await drink.save();
    } catch (error) {
      console.error('Error creating drink:', error);
      throw error;
    }
  }

  async getDrinkById(id) {
    try {
      return await Drink.findById(id);
    } catch (error) {
      console.error('Error fetching drink by ID:', error);
      throw error;
    }
  }

  async getAllDrinks() {
    try {
      return await Drink.find({});
    } catch (error) {
      console.error('Error fetching all drinks:', error);
      throw error;
    }
  }

  async getAllDrinksByUser(userId, month = null) {
    try {
      const query = { user: userId };

      if (month) {
        const startOfMonth = new Date(month);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(startOfMonth.getMonth() + 1);

        query.timestamp = {
          $gte: startOfMonth,
          $lt: endOfMonth
        };
      }
      console.log(query);
      return await Drink.find(query); // Query drinks by user ID and optional month filter
    } catch (error) {
      console.error('Error fetching drinks by user:', error);
      throw error;
    }
  }

  async updateDrink(id, user) {
    try {
      return await Drink.findByIdAndUpdate(id, { user }, { new: true });
    } catch (error) {
      console.error('Error updating drink:', error);
      throw error;
    }
  }

  async deleteDrink(id) {
    try {
      return await Drink.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting drink:', error);
      throw error;
    }
  }
}

export default new DrinkRepository();

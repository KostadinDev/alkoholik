import mongoose, { Schema } from 'mongoose';


const drinkSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
});

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;

import mongoose, { Schema } from 'mongoose';


const drinkSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String, defualt: '' }
});

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;

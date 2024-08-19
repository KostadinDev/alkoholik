import mongoose, { Schema } from 'mongoose';

const drinkSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String, default: '' },
  location: {
    longitude: { type: Number, default: null },
    latitude: { type: Number, default: null },
  }
});

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;
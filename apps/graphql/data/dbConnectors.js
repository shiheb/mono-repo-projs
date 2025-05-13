import mongoose from 'mongoose';

import { Sequelize, DataTypes } from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

async function connectMongo() {
  try {
    await mongoose.connect('mongodb://localhost/widgets');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectMongo();

const widgetSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  soldout: String,
  inventory: String,
  stores: Array,
});

const Widgets = mongoose.model('widgets', widgetSchema);

const sequelize = new Sequelize('sqlite::memory:');

const Categories = sequelize.define('Categories', {
  category: DataTypes.STRING,
  description: DataTypes.STRING,
});

async function syncAndSeedCategories() {
  try {
    await sequelize.sync({ force: true });
    console.log('SQLite connection established and Categories synced.');
    await Promise.all(
      _.times(5, () =>
        Categories.create({
          category: casual.text,
          description: casual.description,
        })
      )
    );
    console.log('Categories seeded.');
  } catch (error) {
    console.error('Error syncing Categories:', error);
  }
}

syncAndSeedCategories();
export { Widgets, syncAndSeedCategories };

import { Widgets } from './dbConnectors';
const mongoose = require('mongoose');
class Product {
  constructor(id, { name, price, description, soldout, inventory, stores }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.soldout = soldout;
    this.inventory = inventory;
    this.stores = stores;
  }
}

const productDatabase = {};

const resolvers = {
  /*  getProduct: ({ id }) => {
    return new Product(id, productDatabase[id]);
  }, */
  getProduct: async ({ id }) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid product ID format');
      }
      const product = await Widgets.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error(`Failed to get product: ${error.message}`);
    }
  },
  getAllProducts: async () => {
    try {
      return await Widgets.find({});
    } catch (error) {
      throw new Error(`Failed to get all products: ${error.message}`);
    }
  },
  createProduct: async ({ input }) => {
    /*  const id = require('crypto').randomBytes(12).toString('hex'); */
    /*  const id = new mongoose.Types.ObjectId(); */
    const newWidget = new Widgets({
      name: input.name,
      price: input.price,
      description: input.description,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });
    newWidget.id = newWidget._id;

    try {
      await newWidget.save();
      return newWidget;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  updateProduct: async ({ input }) => {
    try {
      const updateWidget = await Widgets.findOneAndUpdate(
        { _id: input.id },
        input,
        { new: true }
      );
      return updateWidget;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },
  deleteProduct: async ({ id }) => {
    try {
      await Widgets.deleteOne({ _id: id });
      return 'successfully deleted widget';
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },
};

export default resolvers;

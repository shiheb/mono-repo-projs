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
  createProduct: async ({ input }) => {
    /*     let id = require('crypto').randomBytes(12).toString('hex'); */
    const id = new mongoose.Types.ObjectId();
    const newProduct = new Widgets({
      _id: id,
      name: input.name,
      price: input.price,
      description: input.description,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });

    await newProduct.save();

    return {
      id: id.toHexString(),
      ...input,
    };
  },
};

export default resolvers;

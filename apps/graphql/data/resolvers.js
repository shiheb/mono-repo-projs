
class Product {
  constructor(id, { name, price, description, soldout,inventory, stores }) {
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
    getProduct: ({id}) => {return new Product (id, productDatabase[id] ) },
    createProduct: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    productDatabase[id] = input;
    return new Product(id, input);
  },
}

export default resolvers
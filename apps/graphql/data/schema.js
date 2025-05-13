import { buildSchema } from "graphql";

const schema = buildSchema(`
      type Product {
        id: ID
        name: String
        price: Float
        description: String
        soldout: Boolean
    }
    type Query {
       product: Product
    }
`);

export default schema;

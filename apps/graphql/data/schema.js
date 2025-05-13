import { buildSchema } from "graphql";

const schema = buildSchema(`
      type Product {
        id: ID
        name: String
        price: Float
        description: String
        soldout: Soldout
        inventory: Int
        stores : [Store]!
      }
        enum Soldout {
            SOLDOUT
            ONSALE
        }
        type Store {
          store: String

        }
       type Query {
         getProduct(id: ID): Product
       }
       type Mutation {
         createProduct(input: ProductInput): Product
       }
       input ProductInput {
         name: String
         price: Float
         description: String
         soldout: Soldout
         inventory: Int
         stores: [StoreInput]!
       }
       input StoreInput {
         store: String
       }
`);

export default schema;

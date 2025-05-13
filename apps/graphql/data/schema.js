import { buildSchema } from 'graphql';

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
         getAllProducts: [Product]
       }
       type Mutation {
         createProduct(input: ProductInput): Product
         updateProduct(input: ProductInput): Product
         deleteProduct(id: ID!): String
       }
       input ProductInput {
         id: ID
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

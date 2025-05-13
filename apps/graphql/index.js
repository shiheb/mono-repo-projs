import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is amazing!");
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}/graphql`)
);

const root = {
  product: () => {
    return {
      id: 65465486,
      name: "Widget",
      price: 34.99,
      description: "Beautiful widget to use in the garden",
      soldout: false,
    };
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "This is the api of a hackernews clone",
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    fetchLink: (parent, args, context) =>
      context.prisma.link.find({ id: args.id }),
  },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });
      return newLink;
    },
    updateLink: (parent, args) => {
      editLink = links.find((l) => l.id === args.id);
      editLink = Object.assign(editLink, args);
      return editLink;
    },
    deleteLink: (parent, args) => {
      removingLink = links.filter((item) => item.id == args.id)[0];
      links = links.filter((item) => item.id !== args.id);
      return removingLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

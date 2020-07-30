import { ApolloServer } from 'apollo-server'

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
  type Mutation {
    postPhoto(name: String! description: String): Boolean!
  }
`

type photo = {
  name: string
  description: string
}

let photos: photo[] = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
  },

  Mutation: {
    postPhoto(_: any, args: photo) {
      photos.push(args)
      return true
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`))

import {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context.js#Context',
        mappers: {
            Post: '.prisma/client#Post',
            User: '.prisma/client#User',
            Comment: '.prisma/client#Comment',
            Like: '.prisma/client#Like',
          },
          prisma: './prisma/schema.prisma'
      }
    }
  }
}
 
export default config
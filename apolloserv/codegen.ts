import {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: '.context#Context',
        mappers: {
            Post: '.prisma/client#Post',
            User: '.prisma/client#User'
          },
          prisma: './prisma/schema.prisma'
      }
    }
  }
}
 
export default config
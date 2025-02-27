import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: './src/**/*.{gql,ts}',
  generates: {
    './src/lib/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
      config: {
        clientPath: '../api/apollo'
      }
    }
  }
}
export default config
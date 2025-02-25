import { doctorsData } from "./doctorsData.js";

export  const resolvers = {
    Query: {
      doctors: () => doctorsData,
    },
   };


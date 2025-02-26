import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import { createUser } from "./CreateUser.js";
import { SignIn } from "./SignIn.js";

type UserMutations = WithRequired<MutationResolvers, 'createUser' | 'SignIn'>

export const userMutations: UserMutations = {
  createUser,
  SignIn, 
}
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/server"
import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject
}

export async function createContextInner({ auth }: AuthContext) {
  return {
    auth,
  }
}

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  return await createContextInner({ auth: getAuth(opts.req) })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

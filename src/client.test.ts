import { S3Client } from "@aws-sdk/client-s3"
import { createClient, getClient, ClientNotCreated, resetClient } from "./client.js"

describe('client.ts', () => {
  test('getClient should throw an error if called before createClient', async () => {
    resetClient()

    const noClientExists = async () => {
      return getClient()
    }

    expect(noClientExists()).rejects.toThrowError(ClientNotCreated)

    // set client up again
    beforeAll()
  })

  test('should create a client', async () => {
    let client = await createClient({})

    expect(client).toBeDefined()
    expect(client).toBeInstanceOf(S3Client)
  })
})

export const beforeAll = async () => {
  return await createClient({
    endpoint: "http://store.local:9000",
    credentials: {
      accessKeyId: "flex",
      secretAccessKey: "60fbb7713999ac287be814420c77f68214977384"
    },
    forcePathStyle: true
  })
}
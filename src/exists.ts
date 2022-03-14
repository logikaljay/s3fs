import { getClient } from "./client.js"
import { HeadObjectCommand, HeadObjectCommandOutput } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

export async function exists(remotePath: string) {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(remotePath)

  let command = new HeadObjectCommand({
    Bucket,
    Key
  })

  try {
    await client.send(command)
    return true
  } 
  catch (err) {
    if (err.$metadata && err.$metadata.httpStatusCode === 404) {
      return false
    }

    throw new Error(err)
  }
}
import { getClient } from "./client.js"
import { HeadObjectCommand } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"
import { createStat } from "./utils/createStat.js"

export class FileNotFound extends Error {
  constructor(remotePath: string) {
    super(`File not found at path: ${remotePath}`)
    this.name = 'FileNotFound'
  }
}

export async function stat(remotePath: string) {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(remotePath)

  let command = new HeadObjectCommand({
    Bucket,
    Key
  })

  let res
  try {
    res = await client.send(command)
    return createStat({
      ...res,
      path: remotePath
    })
  }
  catch (err) {
    if (err.$metadata && err.$metadata.httpStatusCode === 404) {
      throw new FileNotFound(remotePath)
    }

    throw new Error(`Unknown error: ${err.message}`)
  }
}
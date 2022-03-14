import { getClient } from "./client.js"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

export async function mkdir(path: string) {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(path)

  if (!Key.endsWith('/')) {
    Key = `${Key}/`
  }

  let command = new PutObjectCommand({
    Bucket,
    Key
  })

  let res = await client.send(command)
  return res
}
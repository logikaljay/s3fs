import { getClient } from "./client.js"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

export async function unlink(remotePath: string) {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(remotePath)

  let command = new DeleteObjectCommand({
    Bucket,
    Key
  })

  let res = await client.send(command)
  return res
}

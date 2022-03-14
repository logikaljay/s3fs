import { getClient } from "./client.js"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

export async function createReadStream(path: string): Promise<NodeJS.ReadableStream> {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(path)
  
  let command = new GetObjectCommand({
    Bucket,
    Key,
    
  })

  let res = await client.send(command)
  return res.Body
}
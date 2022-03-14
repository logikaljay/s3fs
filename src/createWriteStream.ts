import { getClient } from "./client.js"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { existsSync, createReadStream } from "node:fs"
import { destructurePath } from "./utils/destructurePath.js"

export async function createWriteStream(localPath: string, remotePath: string) {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(remotePath)

  if (!existsSync(localPath)) {
    throw new Error(`File not found at ${localPath}`)
  }

  let fileStream = createReadStream(localPath)

  let command = new PutObjectCommand({
    Bucket,
    Key,
    Body: fileStream
  })

  await client.send(command)
  return fileStream
}
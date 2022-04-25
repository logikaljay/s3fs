import { getClient } from "./client.js"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

/**
 * @example
 * ```typescript
 * import { getClient } from "@logikaljay/s3fs"
 * 
 * const client = await getClient()
 * await client.unlink('my-bucket/screenshot-to-delete.png')
 * ```
 */
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

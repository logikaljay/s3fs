import { once } from "node:events"
import { getClient } from "./client.js"
import { GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

interface ReadFileOptions {
  start?: number
  end?: number
  range?: string
  encoding?: string
}

export class InvalidRangeError extends Error {
  constructor(range: string) {
    super(`Invalid range format in options. You supplied '${range}', expected: 'bytes=...`)
    this.name = 'InvalidRangeError'
  }
}

export async function readFile(remotePath: string, options: ReadFileOptions = {}): Promise<Buffer> {
  let client = await getClient()
  let { Bucket, Key } = destructurePath(remotePath)

  let getObjectOptions: Partial<GetObjectCommandInput> = {}
  if (options.encoding) {
    getObjectOptions.ResponseContentEncoding = options.encoding
  }

  if (typeof options.start === 'number') {
    getObjectOptions.Range = `bytes=${options.start}-`
  }

  if (typeof options.end === 'number') {
    if (getObjectOptions.Range) {
      getObjectOptions.Range = `${getObjectOptions.Range}${options.end}`
    }
    else {
      getObjectOptions.Range = `bytes=-${options.end}`
    }
  }

  if (options.range) {
    if (/bytes=.*/.test(options.range)) {
      getObjectOptions.Range = options.range
    }
    else {
      throw new InvalidRangeError(options.range)
    }
  }

  let command = new GetObjectCommand({
    Bucket,
    Key,
    ...getObjectOptions
  })

  let res = await client.send(command)
  let buf = Buffer.from('')
  res.Body.on('data', chunk => {
    buf = Buffer.concat([buf, chunk])
  })
  await once(res.Body, 'end')
  return buf
}
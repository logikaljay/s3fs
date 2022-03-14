import { getClient } from "./client.js"
import { ListObjectsCommand } from "@aws-sdk/client-s3"
import { destructurePath } from "./utils/destructurePath.js"

export class Dirent {
  #kType = Symbol('type')
  name: string
  type: Symbol

  constructor(name, type) {
    this.name = name
    this[this.#kType] = type
  }
}

interface ReaddirOptions {
  withFileTypes?: boolean
}

function sanitise(name: string) {
  return name.replace('/', '')
}

export async function readdir(path: string, options?: ReaddirOptions) {
  let client = await getClient()
  let { Bucket } = destructurePath(path)

  options = {
    withFileTypes: false,
    ...(options || {})
  }

  let command = new ListObjectsCommand({
    Bucket,
    Delimiter: '/',
  })

  let result = await client.send(command)
  if (options.withFileTypes) {
    return [
      ...(result.CommonPrefixes || []).map(dir => new Dirent(sanitise(dir.Prefix), 2)),
      ...(result.Contents || []).map(file => new Dirent(file.Key, 1))
    ]
  }

  return [
    ...(result.CommonPrefixes || []).map(dir => sanitise(dir.Prefix)),
    ...(result.Contents || []).map(file => file.Key)
  ]
}
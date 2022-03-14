import { unlink } from "./unlink.js"

export class InvalidPath extends Error {
  constructor(message?) {
    super('The remote path supplied does not contain a valid path. It must be in the format bucketName/path/to/delete/')
    this.name = 'InvalidPath'
  }
}

export async function rmdir(remotePath: string) {
  if (!remotePath.endsWith('/')) {
    throw new InvalidPath()
  }

  if (remotePath.split('/').length <= 2) {
    throw new InvalidPath()
  }

  return await unlink(remotePath)
}

import { HeadObjectCommandOutput } from "@aws-sdk/client-s3";

export class Stat {
  dev: number
  mode: number
  nlink: number
  uid: number
  gid: number
  rdev: number
  blksize: number
  ino: number
  size: number
  blocks: number
  atime: Date
  mtime: Date
  ctime: Date
  birthtime: Date
  #path: string

  getEntry() {
    return this.#path
  }

  static create(object): Stat {
    if (!object || typeof object !== 'object') {
      throw new Error('Object is required to create a Stat class')
    }

    let fileStat = new Stat()
    for (let key of [
      'dev', 'mode', 'nlink', 'uid', 'gid', 'rdev', 'blksize', 'ino', 
      'size', 'blocks', 'atime', 'mtime', 'ctime', 'birthtime'
    ]) {
      fileStat[key] = object[key]
    }

    fileStat.#path = object.path
    fileStat.blksize = 4096
    fileStat.blocks = Math.ceil(fileStat.size / fileStat.blksize)

    return fileStat
  }

  isDirectory() {
    return /\/$/.test(this.getEntry())
  }

  isFile() {
    return !/\/$/.test(this.getEntry())
  }

  isBlockDevice() {
    return false
  }

  isCharacterDevice() {
    return false
  }

  isSymbolicLink() {
    return false
  }

  isFIFO() {
    return false
  }

  isSocket() {
    return false
  }
}

export function createStat({ path, ContentLength, LastModified }: Partial<HeadObjectCommandOutput> & { path: string }) {
  var date = new Date()
  let isDirectory = /\/$/.test(path)
  const baseStat = {
    dev: 0,
    ino: 0,
    mode: 0,
    uid: 0,
    gid: 0,
    rdev: 0,
    size: 0,
    nlink: 0,
    path
  }
  if (isDirectory) {
    return Stat.create({
      ...baseStat,
      nlink: 1,
      atime: date,
      mtime: date,
      ctime: date,
      birthtime: date,
    })
  }
  else {
    return Stat.create({
      ...baseStat,
      size: Number(ContentLength),
      atime: LastModified,
      mtime: LastModified,
      ctime: LastModified,
      birthtime: LastModified,
    })
  }
}
export function destructurePath(path: string) {
  return {
    Bucket: path.split('/').shift(),
    Key: path.split('/').slice(1).join('/')
  }
}
import { beforeAll } from "./client.test.js"
import { createWriteStream } from "./createWriteStream.js"
import { createFile } from "./utils/createFile.js"
import { unlink } from "./unlink.js"
import { exists } from "./exists.js"

beforeAll()

test('Should upload a file', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/test/random-bytes.bin'

  let res = await createWriteStream(localPath, remotePath)

  let fileExists = await exists(remotePath)
  expect(fileExists).toBeTruthy()

  unlink(remotePath)
  destroy()
})

test('Should throw an error if the file at local path does not exist', async () => {
  let localPath = "/file/does/not/exist"
  let remotePath = 'flex/test/file-that-wont-get-uploaded'

  let localFileMissing = async () => {
    await createWriteStream(localPath, remotePath)
  }

  expect(localFileMissing()).rejects.toThrowError()
})
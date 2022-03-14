import { beforeAll } from "./client.test.js"
import { createWriteStream } from "./createWriteStream.js"
import { exists } from "./exists.js"
import { unlink } from "./unlink.js"
import { createFile } from "./utils/createFile.js"

beforeAll()

test('should return true if a file exists', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/random-bytes.bin'

  await createWriteStream(localPath, remotePath)
  let fileExists = await exists(remotePath)
  await unlink(remotePath)

  expect(fileExists).toBeDefined()
  expect(fileExists).toBeTruthy()
  destroy()
})

test('should return false if a file does not exist', async () => {
  let fileExists = await exists('flex/file/does/not/exist.pdf')

  expect(fileExists).toBeDefined()
  expect(fileExists).toBeFalsy()
})
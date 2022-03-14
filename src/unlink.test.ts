import { beforeAll } from "./client.test.js"
import { createWriteStream } from "./createWriteStream.js"
import { unlink } from "./unlink.js"
import { FileNotFound, stat } from "./stat.js"
import { createFile } from "./utils/createFile.js"

beforeAll()

test('unlink should delete a file', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/unlink-delete-file'

  // upload a file
  await createWriteStream(localPath, remotePath)

  // unlink the file
  await unlink(remotePath)

  // stat should throw error
  const fileMustNotExist = async () => {
    await stat(remotePath)
  }

  expect(fileMustNotExist()).rejects.toThrowError(FileNotFound)
  
  destroy()
})

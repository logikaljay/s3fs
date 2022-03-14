import { FileNotFound, stat } from "./stat.js"
import { beforeAll } from "./client.test.js"
import { Stat } from "./utils/createStat.js"
import { createWriteStream } from "./createWriteStream.js"
import { createFile } from "./utils/createFile.js"

beforeAll()

test('should return stats of remote file', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/1-stat-test.bin'

  // upload a file
  await createWriteStream(localPath, remotePath)

  let fileStat = await stat(remotePath)

  expect(fileStat).toBeDefined()
  expect(fileStat).toBeInstanceOf(Stat)
  expect(fileStat.size).toBeGreaterThan(0)
  destroy()
})

test('should throw FileNotFound if the file does not exist', async () => {
  let remotePath = 'flex/does/not/exist.pdf'
  
  const fileNotFound = async () => {
    await stat(remotePath)
  }

  expect(fileNotFound()).rejects.toThrowError(FileNotFound)
})
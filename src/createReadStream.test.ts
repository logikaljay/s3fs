import { createWriteStream as fsCreateWriteStream, existsSync, unlinkSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { once } from "node:events"
import { createReadStream } from "./createReadStream.js"
import { beforeAll } from "./client.test.js"
import { createFile } from "./utils/createFile.js"
import { createWriteStream } from "./createWriteStream.js"

beforeAll()

test('should return a readStream', async () => {
  // firstly, lets create a file
  let { path: localFile, destroy } = await createFile(10000)
  let file = '1-createReadStream-test.bin'
  let newLocalFile = join(tmpdir(), file)
  let remotePath = join('flex', file)
  await createWriteStream(localFile, remotePath)

  let readStream = await createReadStream(remotePath)
  expect(readStream).toBeDefined()

  let writeStream = fsCreateWriteStream(newLocalFile)
  readStream.pipe(writeStream)

  await once(writeStream, 'close')
  expect(existsSync(newLocalFile)).toBeTruthy()

  unlinkSync(newLocalFile)
  destroy()
})
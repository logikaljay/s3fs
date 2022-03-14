import { beforeAll } from "./client.test.js"
import { createWriteStream } from "./createWriteStream.js"
import { readFile, InvalidRangeError } from "./readFile.js"
import { stat } from "./stat.js"
import { unlink } from "./unlink.js"
import { createFile } from "./utils/createFile.js"

beforeAll()

test('should return a complete file', async () => {
  let remotePath = 'flex/1-readFile-test.bin'

  // create a file
  let { path: localPath, destroy } = await createFile(10000)

  // upload a file
  await createWriteStream(localPath, remotePath)

  let fileStat = await stat(remotePath)
  let file = await readFile(remotePath)

  expect(file).toBeDefined()
  expect(file).toBeInstanceOf(Buffer)
  expect(file.byteLength).toBe(fileStat.size)

  // cleanup
  await unlink(remotePath)
  destroy()
})

test('should return a partial file using the start option', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/2-readFile-test.bin'

  await createWriteStream(localPath, remotePath)
  let { size } = await stat(remotePath)
  let file = await readFile(remotePath, {
    start: size - 1000
  })

  expect(file).toBeDefined()
  expect(file).toBeInstanceOf(Buffer)
  expect(file.byteLength).toBe(1000)

  // cleanup
  await unlink(remotePath)
  destroy()
})

test('should return a partial file using the end option', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/3-readFile-test.bin'

  await createWriteStream(localPath, remotePath)
  let size = 1000
  let file = await readFile(remotePath, {
    end: size
  })

  expect(file).toBeDefined()
  expect(file).toBeInstanceOf(Buffer)
  expect(file.byteLength).toBe(size)

  // cleanup
  await unlink(remotePath)
  destroy()
})

test('should return a partial file when using the start and end options', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/4-readFile-test.bin'

  await createWriteStream(localPath, remotePath)
  let size = 1000
  let file = await readFile(remotePath, {
    start: 1,
    end: size
  })

  expect(file).toBeDefined()
  expect(file).toBeInstanceOf(Buffer)
  expect(file.byteLength).toBe(size)

  // cleanup
  await unlink(remotePath)
  destroy()
})

test('should return a partial file using the range option', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/5-readFile-test.bin'

  await createWriteStream(localPath, remotePath)
  let range = `bytes=0-999`
  let file = await readFile(remotePath, {
    range
  })

  expect(file).toBeDefined()
  expect(file).toBeInstanceOf(Buffer)
  expect(file.byteLength).toBe(1000)

  // cleanup
  await unlink(remotePath)
  destroy()
})

test('should return a file when using the encoding option', async () => {
  let { path: localPath, destroy } = await createFile(10000)
  let remotePath = 'flex/6-readFile-test.bin'

  await createWriteStream(localPath, remotePath)
  let file = await readFile(remotePath, {
    encoding: 'utf8'
  })

  expect(file).toBeDefined()
  expect(file).toBeInstanceOf(Buffer)
  
  // cleanup
  await unlink(remotePath)
  destroy()
})

test('should throw InvalidRangeError if you supply a malformed range option', async () => {
  const invalidRange = async () => {
    await readFile('', {
      range: 'foobar=0-999'
    })
  }

  expect(invalidRange()).rejects.toThrowError(InvalidRangeError)
})

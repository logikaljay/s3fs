import { rmdir, InvalidPath } from "./rmdir.js"
import { beforeAll } from "./client.test.js"

beforeAll()

test('should throw an error if the path provided is not a directory', async () => {
  const notDirectory = async () => {
    await rmdir('flex/a-file.mp4')
  }

  expect(notDirectory()).rejects.toThrowError(InvalidPath)
})

test('should throw an error if the path provided is only a bucket', async () => {
  const invalidPath = async () => {
    await rmdir('flex/')
  }

  expect(invalidPath()).rejects.toThrowError(InvalidPath)
})
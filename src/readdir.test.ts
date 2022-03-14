import { beforeAll } from "./client.test.js"
import { Dirent, readdir } from "./readdir.js"

beforeAll()

test('readdir returns an array', async () => {
  let res = await readdir('flex')
  expect(res).toBeDefined()
  expect(res).toBeInstanceOf(Array)
})


test('supplying withFileTypes option should return an array of Dirent class', async () => {
  let files = await readdir('flex', {
    withFileTypes: true
  })

  expect(files).toBeDefined()
  expect(files).toBeInstanceOf(Array)
  expect(files.length).toBeGreaterThan(0)
  expect(files[0]).toBeInstanceOf(Dirent)
})
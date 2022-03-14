import { beforeAll } from "./client.test.js"
import { mkdir } from "./mkdir.js"

beforeAll()

test('should make a directory', async () => {
  let res = await mkdir('flex/my-new-directory')

  // TODO: expect the directory to exist
  expect(true).toBeTruthy()
})
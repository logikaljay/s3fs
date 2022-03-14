import { createStat, Stat } from "./createStat.js"

test('should throw an error if we try to create a stat without an object', async () => {
  let notAnObject = () => {
    return Stat.create('foobar')
  }

  expect(notAnObject).toThrowError()
})

test('createStat should create a valid Stat class', async () => {
  let fileStat = createStat({ 
    path: "somefile.pdf",
    ContentLength: 1024,
    LastModified: new Date()
  })

  expect(fileStat).toBeDefined()
  expect(fileStat).toBeInstanceOf(Stat)
})

test('isDirectory should return true when given a path that looks like a directory', async () => {
  let fileStat = createStat({ 
    path: "some-directory/",
    LastModified: new Date()
  })

  expect(fileStat).toBeDefined()
  expect(fileStat).toBeInstanceOf(Stat)
  expect(fileStat.isDirectory()).toBeTruthy()
})

test('isDirectory should return false when given a path that looks like a file', async () => {
  let fileStat = createStat({ 
    path: "somefile.pdf",
    ContentLength: 1024,
    LastModified: new Date()
  })

  expect(fileStat).toBeDefined()
  expect(fileStat).toBeInstanceOf(Stat)
  expect(fileStat.isDirectory()).toBeFalsy()
})

test('isFile should return false when given a path that looks like a directory', async () => {
  let fileStat = createStat({ 
    path: "some-directory/",
    LastModified: new Date()
  })

  expect(fileStat).toBeDefined()
  expect(fileStat).toBeInstanceOf(Stat)
  expect(fileStat.isFile()).toBeFalsy()
})

test('isFile should return true when given a path that looks like a file', async () => {
  let fileStat = createStat({ 
    path: "somefile.pdf",
    ContentLength: 1024,
    LastModified: new Date()
  })

  expect(fileStat).toBeDefined()
  expect(fileStat).toBeInstanceOf(Stat)
  expect(fileStat.isFile()).toBeTruthy()
})

;['isBlockDevice', 'isCharacterDevice', 'isSymbolicLink', 'isFIFO', 'isSocket'].map(
  key => test(`${key} should return false`, async () => {
    let fileStat = createStat({
      "path": "somefile.pdf",
      ContentLength: 1024,
      LastModified: new Date()
    })

    expect(fileStat[key]).toBeDefined()
    expect(fileStat[key]()).toBeFalsy()
  })
)
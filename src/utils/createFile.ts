import { createWriteStream, unlinkSync } from "node:fs"
import { tmpdir } from "node:os"
import { sep } from "node:path"
import { randomBytes } from "node:crypto"


export async function createFile(size: number): Promise<{ path: string, destroy: () => void}> {
  let fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5)
  let localPath = [tmpdir(), fileName].join(sep)
  const writer = createWriteStream(localPath)

  const step = 1000
  let i = size

  await new Promise(res => {
    function write() {
      let ok = true
      while (i > 0 && ok) {
        const chunkSize = i > step ? step : i;
        const buf = randomBytes(chunkSize)
        i -= chunkSize
        if (i === 0) {
          writer.write(buf, res)
        }
        else {
          ok = writer.write(buf)
        }
      }

      if (i > 0) {
        writer.once('drain', write)
      }
    }

    write()
  })

  return {
    path: localPath,
    destroy: () => {
      unlinkSync(localPath)
    }
  }
}
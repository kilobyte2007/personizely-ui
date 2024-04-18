import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { version } from '../package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const banner =
  "/*!\n" +
  " * Personizely UI v" +
  version +
  " (https://github.com/kilo/keen-ui)\n" +
  " * (c) " +
  new Date().getFullYear() +
  " Sergiu Cazac\n" +
  " * Released under the MIT License.\n" +
  " */"

export default {
  banner,

  paths: {
    output: {
      main: join(__dirname, "..", "dist"),
      docs: join(__dirname, "..", "dist/docs")
    },

    resolve(location: string) {
      return join(__dirname, "..", location);
    }
  }
}

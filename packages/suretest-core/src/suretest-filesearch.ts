import fs = require('fs')
import path = require('path')

export const fileSearch = (filepath=process.env.PWD ?? '' as string) => {
  let filepaths: string[] = []
  let files: string[] | undefined

  try {
    files = fs.readdirSync(filepath);
  } catch (e) {
    console.error(e)
  }

  files?.forEach((file) => {
    const joinedPath = path.join(filepath, file)
    if (/(\w*\.test.\w*)/.test(file)) {
      filepaths.push(joinedPath)
    } else if (fs.statSync(joinedPath).isDirectory() && validFolderToEnter(file)) {
      const rec = fileSearch(joinedPath)
      filepaths = [...filepaths, ...rec]
    }
  })

  return filepaths
}

export const validFolderToEnter = (file: string) => {
  return file !== 'node_modules'
}
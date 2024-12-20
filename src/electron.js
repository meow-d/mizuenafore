import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { app, BrowserWindow } from 'electron'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = 3333
const exApp = express()

exApp.use(express.static(join(__dirname, '../__sapper__/export')))
exApp.listen(PORT)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setMenu(null)

  win.loadURL(`http://localhost:${PORT}`).catch((err) => {
    console.error('Failed to load URL:', err)
  })
}

app.on('ready', createWindow)

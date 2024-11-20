import { app, BrowserWindow } from 'electron'
import express from 'express'

const PORT = 3333
const exApp = express()

exApp.use(express.static('__sapper__/export'))
exApp.listen(PORT)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

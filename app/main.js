const electron = require('electron');
const path = require('path');
const url = require('url');

const {execShellFn} = require('./controller/processController');

const {app, BrowserWindow} = electron;

app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({width: 900, height: 600});
    // Load html in window
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes:true
    }));
    // Quit app when closed
    mainWindow.on('closed', function(){
      execShellFn('exit server');
      app.quit();
      mainWindow = null;
    });

    // mainWindow.setMenuBarVisibility(false);
});
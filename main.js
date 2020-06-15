// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
const iconpath = path.join(__dirname, 'icon.png')
let appIcon = null
let win = null

app.whenReady().then(() => {

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    title: "Google Chat Client",
    icon: iconpath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadURL('https://chat.google.com')
  win.setMenu(null)

  appIcon = new Tray(iconpath)

  var MenuTray = Menu.buildFromTemplate([
    { label: 'Mostrar', click:  function(){
        win.show();
      } },
    { label: 'Cerrar', click:  function(){
        app.isQuiting = true;
        app.quit();
      } }
  ]);

  appIcon.setToolTip("Google Chat Client");
  appIcon.setContextMenu(MenuTray);

  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
  });

  win.on('close', function (event) {
    if(!app.isQuiting){
      event.preventDefault();
      win.hide();
    }
    return false;
  });

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
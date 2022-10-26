
const {app, BrowserWindow, session } = require('electron');
const path = require('path');

const defaultUrl = 'https://www.youtube.com'


function createWindow(){
    const win = new BrowserWindow ({
        width:480,
        height: 800,
        minWidth: 480,
        minHeight: 800,
        header:"YTAdblocker",
        autoHideMenuBar: true,
        show:false,
        webPreferences:
        {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, 'renderer.js')
        }
    });
    win.loadURL(defaultUrl);   
    
    
    win.once('ready-to-show', ()=> {
        win.show();
    });
      
    
};


app.on('ready', function(){
    createWindow();

});

app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin') app.quit();
})

// Adblocking
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const fetch = require("cross-fetch");
ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
  blocker.enableBlockingInSession(session.defaultSession);
});

const {app, BrowserWindow, session } = require('electron');
const { ElectronBlocker, fullLists, Request } = require("@cliqz/adblocker-electron");

const path = require('path');
const fetch = require("cross-fetch");
const {readFileSync, writeFileSync} = require('fs');

const defaultUrl = 'https://www.youtube.com/';
//const defaultUrl = 'https://www.instagram.com/youp_han/';


async function createWindow(){
    const win = new BrowserWindow ({
        width:480,
        height: 800,
        minWidth: 480,
        minHeight: 800,
        header:"YTAdblocker",
        autoHideMenuBar: true,
        //frame: false,
        show:false,
        webPreferences:
        {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            //preload: path.join(__dirname, 'renderer.js')
        }
    });

    win.loadURL(defaultUrl);     
    
    win.once('ready-to-show', ()=> {
        win.show();
    }); 
    
    const blocker = await ElectronBlocker.fromLists(
        fetch, 
        fullLists,
        {
            enableCompression: true,
        },
        {
            path: 'engine.bin',
            read: async (...args) => readFileSync(...args),
            write: async (...args) => writeFileSync(...args),
        },
        );
    
  blocker.enableBlockingInSession(win.webContents.session);

  blocker.on('request-blocked', (Request) => {
    console.log('blocked', Request.tabId, Request.url);
  });

  blocker.on('request-redirected', (Request) => {
    console.log('redirected', Request.tabId, Request.url);
  });

  blocker.on('request-whitelisted', (Request) => {
    console.log('whitelisted', Request.tabId, Request.url);
  });

 
};


app.on('ready', function(){
    createWindow();

});

app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin') app.quit();
})



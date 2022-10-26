//////////////////////////////////////////////////////////////////////////////////////////////////
// app 사용 중 Tray 의 아이콘 메뉴
//////////////////////////////////////////////////////////////////////////////////////////////////

const { Menu, Tray } = require('electron');
const electron = require('electron');
const path = require('path');
const app = electron.app;

var iconPath = path.join(__dirname, '../assets/icons/png/16x16.png')

module.exports ={
    handleTrayMenu: function(win){
        tray = new Tray(iconPath);
        tray.setToolTip('YTAdBlocker');
        

        tray.on('click', () => {
          win.show();

        });


        const menuTemplate = releaseMenu();
        
        function releaseMenu(){
          return [
            
            {
                label: '화면열기', //닫힌 화면 열기
                click() {
                    win.show();    
    
                }
              },
          
              {
                label: '끝내기', 
                click() { 
                    app.exit(0);

                }
              }
          ]
        
        };  
        
        
        const trayMenu = Menu.buildFromTemplate(menuTemplate);
        tray.setContextMenu(trayMenu);
    }
}


// Adblocking
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const fetch = require("cross-fetch");
ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
  blocker.enableBlockingInSession(session.defaultSession);
});
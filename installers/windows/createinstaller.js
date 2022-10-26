const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => 
  {
    console.error(error.message || error)
    process.exit(1)
  });

function getInstallerConfig () 
{
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve(
    {
      appDirectory: path.join(outPath, 'YTDesktopAddBlocker-win32-ia32/'),
      authors: 'JJST Company',
      noMsi: true,
      outputDirectory: path.join(outPath, 'windows-installer'),
      exe: 'YTDesktopAddBlocker.exe',
      setupExe: 'YTDesktopAddBlockerInstaller.exe',
      setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
    }
  )
};


// PS C:\WINDOWS\system32> New-SelfSignedCertificate -Type Custom -Subject "CN=3gLabs, O=Eland, C=KR" -KeyUsage DigitalSignature -FriendlyName "3G Labs" -CertStoreLocation "Cert:\CurrentUser\My" -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3", "2.5.29.19={text}")                                                                                               
// PSParentPath: Microsoft.PowerShell.Security\Certificate::CurrentUser\My
// Thumbprint                                Subject
// ----------                                -------
// DB04AFE568CDE1F0984352F322EBDE1665BB7A20  CN=3gLabs, O=Eland, C=KR
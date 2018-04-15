const Client = require('ftp')

const test = {
  host: '127.0.0.1',
  port: 21,
  password: '123456',
  user: 'root',
}

const user = {
  host: '202.38.246.199',
  port: 2100,
  user: 'wang_li_shi',
  password: '123456'
}

const PATH = './booking/AFM'        // The path on FTP server you want to upload files to
const FILE = './test.txt'           // Local file path you want to upload
const FILENAME = 'wanzi.xls'        // File name you want to be saved on FTP server, which can be different with the file name on your local
const DEBOUNCE = 1000               // Time gap between each try connecting to the wanted path, ms as unit
const SERVER = test                 // The server options you want to connect, user as the formal server

const c = new Client();
c.connect(SERVER);

c.on('ready', function() {
  let tryTimes = 0
  tryConnect(tryTimes)
}); 

function tryConnect(tryTimes) {
  c.cwd(PATH, (err, cur) =>{
    console.log(`try: ${++tryTimes}`)
    if(err) {
      console.log('failed')
      global.setTimeout(() => tryConnect(tryTimes), DEBOUNCE)
      return
    }
    trySucceed()    
  })
}

function trySucceed() {
  c.put(FILE, FILENAME, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('success!')
    }
    c.end()
  })
}
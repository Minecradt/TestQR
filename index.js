
const http = require('http');
const fs = require('fs').promises;
const fs_file = require('fs');
const server = http.createServer(async (req, res) => {
  const data = require('./websites.json');
  if (data.websites.hasOwnProperty(req.url.split('?')[0])){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    async function readFile(filePath) {
      try {
        const data = await fs.readFile(filePath);
        return data.toString()
      } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
      }
    }
    console.log('Request succeded: ' + req.url)
    res.end(await readFile(data.websites[req.url.split('?')[0]]))
  } else if (data.special.hasOwnProperty(req.url.split('?')[0])){
    console.log('Special request from url: ' + req.url)
    if (req.url.split('?')[0]=='/addhash'){
      fs_file.appendFile('tokens.txt',req.url.split('?id=')[1] + '\n',()=>function(){})
    }
  } else {
    console.warn('Request blocked from url: ' + req.url)
    res.statusCode = 404;
  }
});
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:3000/');
});
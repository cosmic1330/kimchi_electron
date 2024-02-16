const express = require('express');
const path = require('path');

const app = express();
const port = 8099;

// 設置靜態文件夾的路徑
const staticFolderPath = path.join(__dirname, '..', 'release', 'build');

// 使用靜態文件夾
app.use(express.static(staticFolderPath));

app.get('/', (req, res) => {
  res.send('<h1>Update Server Running</h1>');
});

// 監聽指定的 port
app.listen(port, () => {
  console.log(`Update Server running at http://localhost:${port}/`);
});

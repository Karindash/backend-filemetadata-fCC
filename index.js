require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: 'uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    res.status(400).json('No file uploaded.');
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

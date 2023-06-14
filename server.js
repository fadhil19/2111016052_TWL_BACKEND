const cors = require("cors");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000; // Ganti dengan port yang Anda inginkan
mongoose.connect('mongodb://127.0.0.1/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const mahasiswaSchema = new Schema({
  name: String,
  nim: String,
  birthdate: Date,
  address: String
});
const mahasiswaModel = mongoose.model('Mahasiswa', mahasiswaSchema);

let products = ['tt','ii'];

// Menggunakan middleware bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());app.use(cors({origin:"*"}));

app.get('/mahasiswa', async  (req, res) => {
  const mahasiswa = await mahasiswaModel.find();
  res.json(mahasiswa);
  });
  
app.get('/mahasiswa/:nim', async (req, res) => {
    const nim = req.params.nim;
    const mahasiswa = await mahasiswaModel.find({nim:nim});
    if (mahasiswa) {
      res.json(mahasiswa);
    } else {
      res.status(404).json({ error: 'Mahasiswa tidak ada!' });
    }
  });

  app.post('/mahasiswa', async (req, res) => {
    const newMahasiswa = new mahasiswaModel(req.body);
    await newMahasiswa.save();
    res.json(newMahasiswa);
  });
  
  // Update data by NIM
  app.put('/mahasiswa/:nim', async (req, res) => {
  const { nim } = req.params;
  const newMahasiswa = req.body;

  try {
    const updatedData = await mahasiswaModel.findOneAndUpdate({ nim: nim }, newMahasiswa, { new: true });
    res.json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the data' });
  }
});
  
  app.delete('/mahasiswa/:nim', async (req, res) => {
    const { nim } = req.params;

    try {
      await mahasiswaModel.findOneAndDelete({ nim: nim });
      res.json({ message: 'Data deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the data' });
    }
  });
  
  function generateId() {
    const timestamp = Date.now().toString(); // Mendapatkan timestamp saat ini
    const randomNum = Math.floor(Math.random() * 1000).toString(); // Mendapatkan angka acak antara 0-999
    const uniqueId = timestamp + randomNum; // Menggabungkan timestamp dan angka acak
    return uniqueId;
  }
  


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

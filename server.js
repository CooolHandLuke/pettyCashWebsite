const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const imagesDir = path.join(__dirname, 'projectImages');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/projectImages', express.static(imagesDir));

app.get('/api/images', async (req, res) => {
  try {
    const shootDirs = await fs.readdir(imagesDir);
    const imagePaths = [];

    for (let dir of shootDirs) {
      const images = await fs.readdir(path.join(imagesDir, dir));
      if (images.length) {
        // Assuming images are .jpg but adjust if different.
        // Take the first image from each directory.
        imagePaths.push(`/projectImages/${dir}/${images[0]}`);
      }
    }
    res.json(imagePaths);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

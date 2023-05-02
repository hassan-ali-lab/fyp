const express = require('express');
const multer = require('multer');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const port = 3000;

// Set up multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up a route to handle POST requests to /convert
app.post('/convert', upload.single('image'), async (req, res) => {
    try {
        // Load the image from the request
        const image = await loadImage(req.file.buffer);


        // Create a new canvas to draw the converted image on
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the converted image onto the canvas
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(0, 0, image.width, image.height);

        // Convert the canvas to a base64-encoded PNG and send it in the response
        const base64Image = canvas.toDataURL('image/png');
        res.send(base64Image);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error converting image');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

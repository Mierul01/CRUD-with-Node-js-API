// Import required modules
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library
const app = express();
const PORT = 3000;

// Log the directory serving static files
console.log("Serving static files from:", path.join(__dirname, 'public'));

// Serve static files from the 'public' and 'images' directories
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve images

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load data from data.json file
function loadData() {
    const data = fs.readFileSync('./data.json', 'utf8');
    return JSON.parse(data);
}

// Save data to data.json file
function saveData(data) {
    try {
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
        console.log("Data successfully saved to data.json");
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

// GET - Retrieve all data
app.get('/api/data', (req, res) => {
    const data = loadData();
    res.json(data);
});

// GET - Retrieve data by ID
app.get('/api/data/:id', (req, res) => {
    const id = req.params.id; // Use the ID as a string
    const data = loadData();
    const entry = data.find(item => item.id === id);

    if (entry) {
        res.json({ Code: 200, ...entry });
    } else {
        res.status(404).json({ Code: 404, Message: 'Data not found' });
    }
});

// POST - Create new data
app.post('/api/data', (req, res) => {
    const { first_name, last_name, email_value } = req.body;

    if (!first_name || !last_name || !email_value) {
        return res.status(400).json({ Code: 400, Message: 'Missing required fields' });
    }

    const data = loadData();
    const newEntry = {
        id: uuidv4(), // Generate a unique UUID for each new entry
        first_name,
        last_name,
        email_value,
        Code: 200,
        Description: "New entry added successfully"
    };

    data.push(newEntry);
    saveData(data);
    res.status(201).json(newEntry);
});

// PUT - Update data by ID
app.put('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log("Received update for ID:", id, "with data:", updatedData);

    const data = loadData();
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        data[index] = { ...data[index], ...updatedData, id: id };
        console.log("Updated entry:", data[index]);

        saveData(data);
        res.json({ Code: 200, Message: "Data updated successfully", data: data[index] });
    } else {
        console.error("Data not found for ID:", id);
        res.status(404).json({ Code: 404, Message: 'Data not found' });
    }
});

// DELETE - Delete data by ID
app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    let data = loadData();
    const initialLength = data.length;
    data = data.filter(item => item.id !== id);

    if (data.length < initialLength) {
        saveData(data);
        res.json({ Code: 200, Message: 'Data deleted successfully' });
    } else {
        res.status(404).json({ Code: 404, Message: 'Data not found' });
    }
});

// Serve the CreateData.html file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'CreateData.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

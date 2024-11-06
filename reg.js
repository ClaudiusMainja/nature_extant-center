const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/submit_application', (req, res) => {
    const { first_name, last_name, email, phone, education, institution, modules, statement } = req.body;
    // Process the application, e.g., store in a database or send email
    res.send('Application submitted successfully!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

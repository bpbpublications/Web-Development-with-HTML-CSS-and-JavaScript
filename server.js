const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML form file when accessing the root URL
        fs.readFile('book.html', (err, data) => { // Updated file name to 'book.html'
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading the form.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        // Handle the form submission
        let body = '';

        // Collect data chunks from the form submission
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // When all data is received, process it
        req.on('end', () => {
            const formData = querystring.parse(body);
            console.log('Form Data Received:', formData);

            // Send a response back to the client
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h1>Booking Confirmed</h1>
                <p>Your book has been confirmed. We look forward to welcoming you.</p>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Date:</strong> ${formData.date}</p>
                <p><strong>Time:</strong> ${formData.time}</p>
                <p><strong>Number of Guests:</strong> ${formData.guests}</p>
            `);
        });
    } else {
        // Handle 404 Not Found for any other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

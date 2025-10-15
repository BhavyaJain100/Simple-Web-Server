// server.js
// Assignment 6 - Simple Web Server using Node.js
// Author: [Your Name]
// Description: This Node.js server serves different HTML pages based on routes using the 'http' module.

const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const PORT = 3000;

// Helper function to serve HTML files asynchronously
const servePage = (filePath, res, statusCode = 200) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
};

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;

  // Log each request to the console
  console.log(`Request for: ${url}`);

  // Routing
  if (url === '/' || url === '/home') {
    servePage(path.join(__dirname, 'pages', 'home.html'), res);
  } else if (url === '/about') {
    servePage(path.join(__dirname, 'pages', 'about.html'), res);
  } else if (url === '/contact') {
    servePage(path.join(__dirname, 'pages', 'contact.html'), res);
  } else if (url === '/style.css') {
    // Serve CSS file
    fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('CSS file not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else {
    // 404 Page
    servePage(path.join(__dirname, 'pages', '404.html'), res, 404);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

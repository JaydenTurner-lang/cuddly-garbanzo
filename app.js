const http = require('http');
const url = require('url');

// Data structures
let availableTimes = {
  Monday: ["9:00", "10:00", "11:00"],
  Tuesday: ["9:00", "10:00", "11:00"],
  Wednesday: ["9:00", "10:00", "11:00"],
  Thursday: ["9:00", "10:00", "11:00"],
  Friday: ["9:00", "10:00", "11:00"]
};

let appointments = [];

// Helper to send responses
function sendResponse(res, status, message) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(message);
}

// Route: /schedule
function schedule(res, query) {
  const { name, day, time } = query;
  if (!name || !day || !time) {
    return sendResponse(res, 400, "Missing parameters");
  }
  if (availableTimes[day] && availableTimes[day].includes(time)) {
    // Reserve it
    availableTimes[day] = availableTimes[day].filter(t => t !== time);
    appointments.push({ name, day, time });
    sendResponse(res, 200, "Appointment reserved");
  } else {
    sendResponse(res, 200, "Appointment not available");
  }
}

// Route: /cancel
function cancel(res, query) {
  const { name, day, time } = query;
  if (!name || !day || !time) {
    return sendResponse(res, 400, "Missing parameters");
  }
  const index = appointments.findIndex(a => a.name === name && a.day === day && a.time === time);
  if (index !== -1) {
    appointments.splice(index, 1);
    availableTimes[day].push(time);
    sendResponse(res, 200, "Appointment has been canceled");
  } else {
    sendResponse(res, 404, "Appointment not found");
  }
}

// Route: /check
function check(res, query) {
  const { day, time } = query;
  if (!day || !time) {
    return sendResponse(res, 400, "Missing parameters");
  }
  if (availableTimes[day] && availableTimes[day].includes(time)) {
    sendResponse(res, 200, "Available");
  } else {
    sendResponse(res, 200, "Not available");
  }
}

// Create server
http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === "/schedule") {
    schedule(res, query);
  } else if (pathname === "/cancel") {
    cancel(res, query);
  } else if (pathname === "/check") {
    check(res, query);
  } else {
    sendResponse(res, 404, "Invalid route");
  }
}).listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});


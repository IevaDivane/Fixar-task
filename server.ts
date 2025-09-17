import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
interface LogEntry {
  id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  logText: string;
}

let logs: LogEntry[] = [
  {
    id: '1',
    owner: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    logText: 'Initial log entry for testing'
  }
];

// Routes

// GET /logs - Fetch all logs
app.get('/logs', (req, res) => {
  try {
    res.json({
      success: true,
      data: logs,
      count: logs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch logs'
    });
  }
});

// POST /logs - Create a new log
app.post('/logs', (req, res) => {
  try {
    const { owner, logText } = req.body;

    // Validation
    if (!owner || !logText) {
      return res.status(400).json({
        success: false,
        error: 'Owner and logText are required'
      });
    }

    const newLog: LogEntry = {
      id: uuidv4(),
      owner: owner.trim(),
      logText: logText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    logs.push(newLog);

    res.status(201).json({
      success: true,
      data: newLog,
      message: 'Log created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create log'
    });
  }
});

// PUT /logs/:id - Update a log
app.put('/logs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { owner, logText } = req.body;

    // Find the log
    const logIndex = logs.findIndex(log => log.id === id);
    
    if (logIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Log not found'
      });
    }

    // Validation
    if (!owner || !logText) {
      return res.status(400).json({
        success: false,
        error: 'Owner and logText are required'
      });
    }

    // Update the log
    logs[logIndex] = {
      ...logs[logIndex],
      owner: owner.trim(),
      logText: logText.trim(),
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: logs[logIndex],
      message: 'Log updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update log'
    });
  }
});

// DELETE /logs/:id - Delete a log
app.delete('/logs/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Find the log
    const logIndex = logs.findIndex(log => log.id === id);
    
    if (logIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Log not found'
      });
    }

    // Remove the log
    const deletedLog = logs.splice(logIndex, 1)[0];

    res.json({
      success: true,
      data: deletedLog,
      message: 'Log deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete log'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    /logs     - Fetch all logs`);
  console.log(`   POST   /logs     - Create a new log`);
  console.log(`   PUT    /logs/:id - Update a log`);
  console.log(`   DELETE /logs/:id - Delete a log`);
  console.log(`   GET    /health   - Health check`);
});

export default app;

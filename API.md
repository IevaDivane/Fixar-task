# Logs API Documentation

## Base URL
```
http://localhost:3001
```

## Endpoints

### GET /logs
Fetch all logs

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "owner": "string",
      "createdAt": "ISO 8601 string",
      "updatedAt": "ISO 8601 string",
      "logText": "string"
    }
  ],
  "count": number
}
```

### POST /logs
Create a new log

**Request Body:**
```json
{
  "owner": "string",
  "logText": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "owner": "string",
    "createdAt": "ISO 8601 string",
    "updatedAt": "ISO 8601 string",
    "logText": "string"
  },
  "message": "Log created successfully"
}
```

### PUT /logs/:id
Update a log

**Request Body:**
```json
{
  "owner": "string",
  "logText": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "owner": "string",
    "createdAt": "ISO 8601 string",
    "updatedAt": "ISO 8601 string",
    "logText": "string"
  },
  "message": "Log updated successfully"
}
```

### DELETE /logs/:id
Delete a log

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "owner": "string",
    "createdAt": "ISO 8601 string",
    "updatedAt": "ISO 8601 string",
    "logText": "string"
  },
  "message": "Log deleted successfully"
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "ISO 8601 string"
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common HTTP Status Codes:**
- `400` - Bad Request (missing required fields)
- `404` - Not Found (log doesn't exist)
- `500` - Internal Server Error

## Example Usage

### Create a new log
```bash
curl -X POST http://localhost:3001/logs \
  -H "Content-Type: application/json" \
  -d '{"owner": "John Doe", "logText": "This is a test log entry"}'
```

### Get all logs
```bash
curl http://localhost:3001/logs
```

### Update a log
```bash
curl -X PUT http://localhost:3001/logs/1 \
  -H "Content-Type: application/json" \
  -d '{"owner": "Jane Doe", "logText": "Updated log entry"}'
```

### Delete a log
```bash
curl -X DELETE http://localhost:3001/logs/1
```

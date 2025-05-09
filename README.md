# Quote Service

A simple Node.js Express microservice that returns random quotes.

## Features

- RESTful API endpoint `/quote` that returns random quotes
- Containerized with Docker
- Unit tests with Jest
- CI/CD pipeline with GitHub Actions

## Prerequisites

- Node.js 18 or higher
- npm
- Docker (optional, for containerization)

## Team Roles
- [Friend's Name]: Initial Developer (Setup basic service, tests, initial CI)
- [M]: Project Manager / Documentation Lead (GitHub Projects, README, Final Report compilation)
- [M]: CI/CD Engineer (Refined CI/CD workflow, Docker push, GHCR)
- [M]: Developer / QA Analyst (Ensured Dockerfile, test coverage, QA checks, assisted with report)


## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd quote-service
```

2. Install dependencies:
```bash
npm install
```

## Running the Service

### Local Development

```bash
npm run dev
```

The service will be available at `http://localhost:3000`

### Production

```bash
npm start
```

### Using Docker

Build the Docker image:
```bash
docker build -t quote-service .
```

Run the container:
```bash
docker run -p 3000:3000 quote-service
```

## Testing

Run the test suite:
```bash
npm test
```

## API Endpoints

### GET /quote

Returns a random quote in JSON format.

Example response:
```json
{
  "quote": "The only way to do great work is to love what you do. - Steve Jobs"
}
```

## License

MIT 
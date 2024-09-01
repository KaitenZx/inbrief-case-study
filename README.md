# News Aggregator Application

This project is a news aggregator that combines news from various sources and allows users to personalize their news feed.

## Getting Started

To use the application, you need API keys for accessing news data from various sources. Follow the steps below to set up the required environment variables.

### Step 1: Obtain API Keys

You will need API keys from the following services:

- **NewsAPI**: [Get your API key here](https://newsapi.org/)
- **The Guardian API**: [Get your API key here](https://open-platform.theguardian.com/access/)
- **The New York Times API**: [Get your API key here](https://developer.nytimes.com/get-started)

### Step 2: Create a `.env` File

1. Create a new file named `.env` in the root directory of the project.

2. Add the following environment variables to your `.env` file:

    ```env
    REACT_APP_NEWSAPI_KEY=your_news_api_key_here
    REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key_here
    REACT_APP_NYT_API_KEY=your_nyt_api_key_here
    ```

    Replace `your_news_api_key_here`, `your_guardian_api_key_here`, and `your_nyt_api_key_here` with your actual API keys.

## Running the Application in a Docker Container

To run the application in a Docker container, follow the steps below.

### Prerequisites

Ensure you have the following installed on your machine:

- **Docker** (version 20.10 or higher recommended)
- **Docker Compose** (version 1.29 or higher recommended)

### Clone the Repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```


### Build the Docker Image:

Use the following command to build the Docker image for the application:

docker-compose build

This command will read the Dockerfile and docker-compose.yml files and build the necessary Docker images for the application.

### Run the Application:

After the build process is complete, you can start the application with:

docker-compose up
This will start the application along with any other services defined in the docker-compose.yml file, such as a database or a backend API service.

### Access the Application:

Once the application is running, you can access it in your web browser at:

http://localhost:3000
(Assuming that the application is configured to run on port 3000 in your Docker setup. You can adjust this according to your Docker configuration.)

### Stopping the Application:

To stop the application, press Ctrl + C in the terminal where docker-compose up is running, or use:

docker-compose down
This command will stop all running containers associated with the application and remove them.





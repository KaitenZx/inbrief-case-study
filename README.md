#  InBrief News Aggregator Application

Welcome to the InBrief Case Study project! This application aggregates news articles from multiple sources to provide a personalized news feed experience. With customizable filters and a user-friendly interface, you can easily stay updated on the topics that matter most to you.
Happy testing!


## Features

- Aggregate news from multiple sources: NewsAPI, The Guardian, and The New York Times.
- Personalize your news feed based on preferred sources, categories, and authors.
- Search functionality to find specific news articles.
- Easy filtering by category, source, and date range.
- Responsive design for seamless experience on all devices.

## Usage

### Personalization

Customize your news feed by selecting preferred sources, categories, and authors from the Personalization panel. Your choices will be saved locally, so your preferences are retained even after you close the app.

### Searching

Use the search bar to find articles based on keywords. The search results will be filtered according to your selected categories, sources, and date range.

### Filtering

You can refine your news feed by applying filters for specific sources, categories, and date ranges. The filters are easily accessible from the Filters panel.



## Getting Started

To use the application, you need API keys for accessing news data from various sources. Follow the steps below to set up the required environment variables.

### Step 1: Obtain API Keys

You will need API keys from the following services:

- **NewsAPI**: [Get your API key here](https://newsapi.org/)
- **The Guardian API**: [Get your API key here](https://open-platform.theguardian.com/access/)
- **The New York Times API**: [Get your API key here](https://developer.NYTimes.com/get-started)

### Step 2: Create a `.env` File

1. Create a new file named `.env` in the root directory of the project.

2. Add the following environment variables to your `.env` file:

    ```env
    REACT_APP_NEWSAPI_KEY=your_news_api_key_here
    REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key_here
    REACT_APP_NYT_API_KEY=your_NYT_api_key_here
    ```

    Replace `your_news_api_key_here`, `your_guardian_api_key_here`, and `your_NYT_api_key_here` with your actual API keys.

## Running the Application in a Docker Container

To run the application in a Docker container, follow the steps below.

### Prerequisites

Ensure you have the following installed on your machine:

- **Docker** (version 20.10 or higher recommended)
- **Docker Compose** (version 1.29 or higher recommended)

### Clone the Repository:

```bash
git clone https://github.com/KaitenZx/inbrief-case-study.git
cd inbrief-case-study
```


### Build the Docker Image:

Use the following command to build the Docker image for the application:

```bash
docker-compose build
```


This command will read the Dockerfile and docker-compose.yml files and build the necessary Docker images for the application.

### Run the Application:

After the build process is complete, you can start the application with:

```bash
docker-compose up
```
This will start the application along with any other services defined in the docker-compose.yml file, such as a database or a backend API service.

### Access the Application:

Once the application is running, you can access it in your web browser at:

http://localhost:3000
(Assuming that the application is configured to run on port 3000 in your Docker setup. You can adjust this according to your Docker configuration.)

### Stopping the Application:

To stop the application, press Ctrl + C in the terminal where docker-compose up is running, or use:
```bash
docker-compose down
```
This command will stop all running containers associated with the application and remove them.





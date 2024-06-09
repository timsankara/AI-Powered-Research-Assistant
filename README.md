# Scientific Paper Recommender System

This project is a scientific paper recommender system designed to help users find relevant research papers based on their queries. The core functionality involves leveraging embeddings, which are stored in a DynamoDB table, to find and recommend papers.

## How It Works

- **Embeddings Generation:** Embeddings are created using the OpenAI embeddings API.
- **Query Processing:** When a user enters a search query, the application compares this query to the stored embeddings using cosine similarity.
- **Recommendations:** The system identifies and returns the 5 most similar embeddings (and thus papers) from the database.
- **User Requirements:** It is assumed that users have their own embeddings to compare against those in the database.

In this example, the database contains embeddings for over 60,000 arXiv papers. If you need access to this test data, please reach out.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/timsankara/scientific-paper-recommender.git
   cd scientific-paper-recommender
   ```

2. **Create a DynamoDB Table:**

   Ensure you have a DynamoDB table set up to store your embeddings.

3. **Set up Environment Variables:**

   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```plaintext
   REACT_APP_AWS_KEY_ID=""
   REACT_APP_AWS_ACCESS_KEY=""
   REACT_APP_region=""
   GENERATE_SOURCEMAP=false
   API_KEY=""
   ```

   Replace the placeholder values with your actual AWS credentials and OpenAI API key.

4. **Install Dependencies:**

   Ensure you have Node.js version 16 installed. Then, run the following command to install the required modules:

   ```bash
   npm install
   ```

5. **Run the Application:**

   Start the application using the following command:

   ```bash
   npm run start
   ```

## Usage

1. **Enter a Query:**

   Open your browser and navigate to the running application. Enter a query in the search box.

2. **View Results:**

   The application will compare your query to the embeddings in the DynamoDB table and display the 5 most similar scientific papers based on cosine similarity.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- `REACT_APP_AWS_KEY_ID` - Your AWS Key ID
- `REACT_APP_AWS_ACCESS_KEY` - Your AWS Access Key
- `REACT_APP_region` - Your AWS region
- `GENERATE_SOURCEMAP` - Set to `false`
- `API_KEY` - Your OpenAI API Key

Example `.env` file:

```plaintext
REACT_APP_AWS_KEY_ID="your-aws-key-id"
REACT_APP_AWS_ACCESS_KEY="your-aws-access-key"
REACT_APP_region="your-aws-region"
GENERATE_SOURCEMAP=false
API_KEY="your-openai-api-key"
```

## License

MIT License

```
MIT License

Copyright (c) 2024 Rookih (https://www.rookih.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit others to whom the Software is provided, to use the Software freely and as they see fit, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

Feel free to reach out if you need any further assistance or access to the test data.
But you can also use this repo [ArxivPaperEmbeddings](https://github.com/timsankara/ArxivPaperEmbeddings) to retrieve, embed, and store your own arXiv papers.

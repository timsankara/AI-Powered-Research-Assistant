# Scientific Paper Recommender

This project is a scientific paper recommender that leverages embeddings stored in a DynamoDB table. The embeddings are created using the OpenAI embeddings API. When a user enters a query in the search box, the application compares the query using cosine similarity to the 5 most similar embeddings stored in the database. The application assumes the user already has their own embeddings that they want to compare their query to.

In this example, over 60,000 arXiv papers are stored in DynamoDB. If you need access to this test data, please feel free to reach out.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/scientific-paper-recommender.git
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

Copyright (c) 2021 Rookih (https://www.rookih.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit others to whom the Software is provided, to use the Software freely and as they see fit, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

Feel free to reach out if you need any further assistance or access to the test data.
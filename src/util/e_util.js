const AWS = require('aws-sdk')
var similarity = require( 'compute-cosine-similarity' );

AWS.config.update({
    region: process.env.REACT_APP_region,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const dynamodb = new AWS.DynamoDB();
const TABLE_NAME = "rookih_arxiv_embeddings"

const getAlLEmbeddings = async () => {
    const params = {
        TableName: TABLE_NAME,
    }
    const users = await dynamoClient.scan(params).promise()

    return users.Items
}

export const getTableItemCount = async () => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const data = await dynamodb.describeTable(params).promise();
        return data.Table.ItemCount;
    } catch (error) {
        console.error(`Error fetching item count for table ${TABLE_NAME}:`, error);
        throw error;
    }
};


// function that takes in an array of embeddings, does cosine similarity, and returns the top 5 most similar items from the database
export const getSimilarItems = async (embedding_array) => {
    // get all the embeddings from the database
    const all_embeddings = await getAlLEmbeddings()

    // compare the embedding_array with all the embeddings in the database using cosine similarity and return the top 5 most similar items
    let similarity_array = []
    let similarity_json = {}
    for (let i = 0; i < all_embeddings.length; i++) {
        const embedding = all_embeddings[i];
        similarity_json = {
            "id": embedding._id,
            "similarity": similarity(embedding_array, embedding.embedding),
            "title": embedding.title,
            "abstract": embedding.abstract,
            "authors": embedding.author,
            "link": embedding.links[0],
            date: embedding.date_published
        }
        similarity_array.push(similarity_json)
    }

    let sorted_similarity_array = similarity_array.sort((a, b) => (a.similarity < b.similarity) ? 1 : -1)
    let top_5_similar_items = sorted_similarity_array.slice(0, 10)

    return top_5_similar_items
}
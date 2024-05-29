const AWS = require('aws-sdk')
var similarity = require('compute-cosine-similarity');

AWS.config.update({
    region: process.env.REACT_APP_region,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = "rookih_bioarxiv_embeddings"

const getAlLEmbeddings = async () => {
    const params = {
        TableName: TABLE_NAME,
    }
    const users = await dynamoClient.scan(params).promise()
    // console.log("Embeddings: ", users.Items)

    return users.Items
}

export const getSimilarMedicalPapers = async (embedding_array) => {
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
            "authors": embedding.authors,
            "link": embedding.item_url,
            "category": embedding.category,
            "date": embedding.date_published
        }
        similarity_array.push(similarity_json)
    }

    let sorted_similarity_array = similarity_array.sort((a, b) => (a.similarity < b.similarity) ? 1 : -1)
    let top_5_similar_items = sorted_similarity_array.slice(0, 10)

    return top_5_similar_items
}

// func to get all the categories from the database and return them as a set to the frontend
export const fetchAllCategories = async () => {
    const params = {
        TableName: TABLE_NAME,
    }
    const users = await dynamoClient.scan(params).promise()
    // console.log("Embeddings: ", users.Items)

    let categories = new Set()
    for (let i = 0; i < users.Items.length; i++) {
        const embedding = users.Items[i];
        categories.add(embedding.category)
    }

    // return the set of categories as a json array with the label and value
    let categories_json = []
    let category_json = {}
    categories.forEach(category => {
        category_json = {
            "label": category,
            "value": category
        }
        categories_json.push(category_json)
    });

    return categories_json
}
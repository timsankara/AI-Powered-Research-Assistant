const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.REACT_APP_region,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = "rookih_instruct"

export const createInstruction = async (instruction) => {
    const params = {
        TableName: TABLE_NAME,
        Item: instruction
    }
    return await dynamoClient.put(params).promise()
}
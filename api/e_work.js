// this api will embed the text that is passed to it

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    try {
        // a function that takes in input from the body and embeds it using the openai api
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: req.body.prompt,
        });

        // return the embedding
        return res.send(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}
import cohere from 'cohere-ai';
import errorHandler from '../helpers/dbErrorHandler';
import Post from '../models/post.model';
cohere.init('yOSC0kT99E1wzbS2IHb6VLvs4ceyj8qYnM0S4WXf'); // This is your trial API key

const text = async (req, res) => {
  const promptText = req.body.text;
  try {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: promptText,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });
    console.log(`Prediction: ${response.body.generations[0].text}`);
    const aiPost = new Post(response.body.generations[0]);
    res.json(aiPost);  
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    });
  }
}

export default { text };
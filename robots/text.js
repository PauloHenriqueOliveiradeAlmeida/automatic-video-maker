const algorithmia = require('algorithmia');
const AlgorithmiaApiKey = require('../credentials/algorithmia.json').apiKey;
function robot(content) {
  fetchContentFromWikipedia(content);
  //sanitizeContent(content);
  //breakContentIntoSentences(content);
  async function fetchContentFromWikipedia(content) {
    const algorithmiaAuthenticated = algorithmia(AlgorithmiaApiKey);
    const WikipediaInput = {
      "articleName": content.searchTerm,
      "lang": "pt"
    };
    const WikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2");
    const WikipediaResponde = await WikipediaAlgorithm.pipe(WikipediaInput);
    const WikipediaContent = WikipediaResponde.get();
    console.log(WikipediaContent);
  }
}
module.exports = robot;

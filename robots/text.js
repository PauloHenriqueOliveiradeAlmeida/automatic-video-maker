const algorithmia = require('algorithmia');
const AlgorithmiaApiKey = require('../credentials/algorithmia.json').apiKey;
const sentencesBoundaryDetection = require('sbd');
async function robot(content) {
  await fetchContentFromWikipedia(content);
  sanitizeContent(content);
  breakContentIntoSentences(content);
  async function fetchContentFromWikipedia(content) {
    const algorithmiaAuthenticated = algorithmia(AlgorithmiaApiKey);
    const WikipediaInput = {
      "articleName": content.searchTerm,
      "lang": "pt"
    };
    const WikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2");
    const WikipediaResponde = await WikipediaAlgorithm.pipe(WikipediaInput);
    const WikipediaContent = WikipediaResponde.get();
    content.sourceContentOriginal = WikipediaContent.content;
  }
  function sanitizeContent(content) {
    const withoutBlankLinesandMarkdown = removeBlankLinesandMarkdown(content.sourceContentOriginal);
    const withoutDatesinParentheses = removeDatesinParentheses(withoutBlankLinesandMarkdown);
    content.sourceContentSanitize = withoutDatesinParentheses;
    function removeBlankLinesandMarkdown(text) {
      const allLines = text.split("\n");
      const withoutBlankLinesandMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.startsWith("=")) {
          return false;
        }
        return true;
      });
      return withoutBlankLinesandMarkdown.join(" ");
    }
    function removeDatesinParentheses(text) {
      return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, " ");
    }
  }
  function breakContentIntoSentences(content) {
    content.sentences = [];
    const sentences = sentencesBoundaryDetection.sentences(content.sourceContentSanitize);
    sentences.forEach((sentence) => {
      content.sentences.push({
        text: sentence,
        keywords: [],
        images: []
      });
    });

  }
}
module.exports = robot;

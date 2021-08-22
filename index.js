const READLINE = require('readline-sync');
const ROBOTS = {
  text: require("./robots/text.js")
};
async function start() {
  const CONTENT = {};

  CONTENT.searchTerm = askAndReturnSearchTerm();
  CONTENT.prefix = askAndReturnPrefix();

  await ROBOTS.text(CONTENT);

  function  askAndReturnSearchTerm() {
    return READLINE.question("Qual Termo Deseja Buscar na Wikipédia? ");
  }
  function askAndReturnPrefix() {
    const PREFIXES = ["Quem é", "O que é", "História"];
    const SELECTEDPREFIXINDEX = READLINE.keyInSelect(PREFIXES, " Escolha uma Opção");
    const SELECTEDPREFIXTEXT = PREFIXES[SELECTEDPREFIXINDEX];

    return SELECTEDPREFIXTEXT;
  }

  console.log(CONTENT);
}
start();

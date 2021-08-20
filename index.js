const READLINE = require('readline-sync');
function start() {
  const CONTENT = {};

  CONTENT.searchTerm = askAndReturnSearchTerm();
  CONTENT.prefix = askAndReturnPrefix();

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

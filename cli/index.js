const args = process.argv.slice(2);
const command = args[0];
const mainHelp = './cmd/help.js';

try {
  if (!command || command.startsWith('--')) {
    return require(mainHelp);
  }

  if (command && args.includes('--help')) {
    return require(`./cmd/${command}/help.js`);
  }

  require(`./cmd/${command}/cli.js`)(args);
} catch(error) {
  console.error(`${error}\n`);
  require(mainHelp);
}
  

const path = require('path');
const args = process.argv.slice(2);
const command = args[0];

try {
  if (!command || command.startsWith('--')) {
    return require(path.resolve(__dirname, 'cmd', 'help', 'cli'))();
  }

  if (command && args.includes('--help')) {
    return require(`./cmd/${command}/help.js`);
  }

  require(`./cmd/${command}/cli.js`)(args);
} catch(error) {
  console.error(`Fatal Error: Command not found: "${command}".\nUse --verbose option to see a detailed error output.`);

  if (args.includes('--verbose')) {
    console.error(`\n${error}`);
  }
}
  

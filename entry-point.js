const path = require("path");

module.exports = ({ CommandBase, commands }) => {
  const scripts = path.join(__dirname, "scripts");

  const PipeCommand = commands.pipe;

  class LintRulesCommand extends CommandBase {
    async run(args) {
      if (args[0] === "js") {
        if (args[1] === "init") {
          return await this._initializeJs();
        }

        if (args[1] === "update") {
          await this._update();
          return await this._copyEslintFile();
        }

        if (args[1] === "copy") {
          return await this._copyEslintFile();
        }
      }

      return this.codes.invalidArguments;
    }

    async _initializeJs() {
      const env = this.environment.fork();
      const pipe = new PipeCommand(env);
      env.setVariable("lint-rules-dir", __dirname);
      await pipe.loadFromFile(path.join(scripts, "eslint-install.cmd"));
      return this.codes.success;
    }

    async _update() {
      const env = this.environment.fork(__dirname);
      const pipe = new PipeCommand(env);
      await pipe.loadFromFile(path.join(scripts, "repo-update.cmd"));
      return this.codes.success;
    }

    async _copyEslintFile() {
      const env = this.environment.fork();
      const pipe = new PipeCommand(env);
      env.setVariable("lint-rules-dir", __dirname);
      await pipe.loadFromFile(path.join(scripts, "eslint-copy.cmd"));
      return this.codes.success;
    }
  }

  return LintRulesCommand;
};

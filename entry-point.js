const path = require("path");

module.exports = ({ CommandBase, commands }) => {
  const scripts = path.join(__dirname, "scripts");

  const PipeCommand = commands.pipe;

  class LintRulesCommand extends CommandBase {
    async run(args) {
      if (args[i] === "--help" || args[i] === "-h") {
        return this._showHelp();
      }

      if (args[0] === "install") {
        if (!args[1] || args[1] === "") {
          return this.code.missingArguments;
        }

        this.environment.setVariable("rule-name", args[1]);
        return await this._initializeJs();
      }

      if (args[0] === "update") {
        let forced;
        let rule;

        if (args[1] === "-f" || args[1] === "--force") {
          forced = args[1];
          rule = args[2];
        }
        else {
          forced = "";
          rule = args[1];
        }

        this.environment.setVariable("force", forced);
        let result = await this._update();

        if (rule && rule !== "") {
          this.environment.setVariable("rule-name", rule);
          return await this._copyEslintFile();
        }

        return result;
      }

      if (args[0] === "copy") {
        if (!args[1] || args[1] === "") {
          return this.code.missingArguments;
        }

        this.environment.setVariable("rule-name", args[1]);
        return await this._copyEslintFile();
      }

      return this.codes.invalidArguments;
    }

    _showHelp() {
      console.log("Lint Rules");
      console.log("install <rule name>\t\tInstalls all the node dependencies and copies the rules file");
      console.log("update [-f or --force]\t\tUpdates the rules");
      console.log("copy <rule name>\t\tCopies the rules file");
      return this.codes.success;
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

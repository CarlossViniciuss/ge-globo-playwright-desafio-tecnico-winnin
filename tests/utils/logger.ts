import chalk from 'chalk';

class Logger {
  private isCI: boolean;

  constructor() {
    this.isCI = process.env.CI === 'true';
  }

  info(message: string) {
    if (this.isCI) {
      console.log(`ℹ️ INFO: ${message}`);
    } else {
      console.log(chalk.blue(`ℹ️ INFO: ${message}`));
    }
  }

  success(message: string) {
    if (this.isCI) {
      console.log(`✅ SUCCESS: ${message}`);
    } else {
      console.log(chalk.green(`✅ SUCCESS: ${message}`));
    }
  }

  error(message: string) {
    if (this.isCI) {
      console.log(`❌ ERROR: ${message}`);
    } else {
      console.log(chalk.red(`❌ ERROR: ${message}`));
    }
  }

  warning(message: string) {
    if (this.isCI) {
      console.log(`⚠️ WARNING: ${message}`);
    } else {
      console.log(chalk.yellow(`⚠️ WARNING: ${message}`));
    }
  }

  step(message: string) {
    if (this.isCI) {
      console.log(`🔹 STEP: ${message}`);
    } else {
      console.log(chalk.cyan(`🔹 STEP: ${message}`));
    }
  }

  debug(message: string) {
    if (process.env.DEBUG === 'true') {
      if (this.isCI) {
        console.log(`🔍 DEBUG: ${message}`);
      } else {
        console.log(chalk.gray(`🔍 DEBUG: ${message}`));
      }
    }
  }
}

export const logger = new Logger(); 
import winston from 'winston';
import configs from '../configs/configs';

export default class Logger {
  private static logger: winston.Logger;

  private static getLogger(): winston.Logger {
    if(!this.logger) {
      this.logger = winston.createLogger({
        level: configs.logLevel(),
        format: winston.format.json(),
        transports: [
          new winston.transports.Console()
        ]
      });
    }

    return this.logger;
  }

  static info(message: any, payload?: any) {
    if(payload) {
      message = `${message} - ${JSON.stringify(payload)}`;
    }
    
    this.getLogger().info(message);
  } 

  static error(message: any, payload?: any) {
    if(payload) {
      message = `${message} - ${JSON.stringify(payload)}`;
    }
    
    this.getLogger().error(message);
  }
}
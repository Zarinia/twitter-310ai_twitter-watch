import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';

@Injectable()
export class PythonService {
  private readonly options: {};

  constructor() {
    this.options = {
      mode: 'text',
      // pythonPath: 'scripts/python/venv/bin/python',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'scripts/python/src',
      args: []
    };
  }

  run(name: string, lastTweetId: string = null, count: number = 1) {
    return new Promise(async (resolve, reject) => {
      try {
        let args = {
          username: name,
          sinceId: lastTweetId,
          count: count
        };
        this.options['args'] = [JSON.stringify(args)];
        // @ts-ignore
        PythonShell.run('get-tweets.py', this.options).then(messages => {
          resolve(messages);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  fetchUser(username: string, create: number) {
    return new Promise(async (resolve, reject) => {
      try {
        let args = {
          username: username,
          count: 1,
          create: create
        };
        this.options['args'] = [JSON.stringify(args)];
        // @ts-ignore
        PythonShell.run('get-user.py', this.options).then(messages => {
          let result = JSON.parse(messages[0]);
          if (result['errors']) {
            reject(result);
          }
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  test() {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        PythonShell.run('test.py', this.options).then(messages => {
          let result = JSON.parse(messages[0]);
          if (result['errors']) {
            reject(result);
          }
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

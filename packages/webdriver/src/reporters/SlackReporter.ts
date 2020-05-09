import WDIOReporter from '@wdio/reporter';
import {IncomingWebhook} from '@slack/webhook';

const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

const successColor = '#36a64f';
const failedColor = '#E51670';

export default class SlackReporter extends WDIOReporter {
  constructor(options) {
    options = Object.assign(options, {stdout: true});
    super(options);
  }

  async sendMessage(body) {
    await webhook.send(body);
  }

  async sendPreMessage(suite) {
    const env = process.env.ENV || 'default';
    const preMsg = `*Running tests for '${suite}' in environment \`${env.toLocaleUpperCase()}\`*`;
    const preBody = {
      text: preMsg,
    };
    await this.sendMessage(preBody);
  }

  async sendPostMessage(results) {
    const failed = results.failed > 0;
    const postMsg = `*Number of Tests: ${results.finished}*\n*Passed: ${results.passed}; Failed: ${results.failed};*`;
    const color = failed ? failedColor : successColor;

    const postBody = {
      text: failed ? '<!channel>' : '',
      attachments: [
        {
          text: postMsg,
          color: color,
          attachment_type: 'default',
        },
      ],
    };

    await this.sendMessage(postBody);
  }

  onTestPass(test) {
    this['write'](`Congratulations! Your test "${test.title}" passed 👏`);
  }
}

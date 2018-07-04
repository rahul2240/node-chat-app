const expect = require('expect');

var {generateMessage} = require('./message');

describe('generate message', () => {
  it('should genetare a new message',() => {

    var from = 'rahu@gma';
    var text = 'hello';

    var message = generateMessage(from, text);

    // expect(message.createdAt).toBe('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);

  });
});

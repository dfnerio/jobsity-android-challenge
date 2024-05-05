import { htmlToMarkup } from '../htmlToMarkup';

describe(htmlToMarkup, () => {
  it('should convert the text correctly', () => {
    const htmlText = '<p>Text</p> in <b>bold</b> and <i>italic</i>';
    const expectedResult = 'Text in **bold** and *italic*';

    expect(htmlToMarkup(htmlText)).toBe(expectedResult);
  });
});

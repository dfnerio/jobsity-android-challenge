export const htmlToMarkup = (html: string) => {
  return html
    .replace('<b>', '**')
    .replace('</b>', '**')
    .replace('<i>', '*')
    .replace('</i>', '*')
    .replace('<p>', '')
    .replace('</p>', '');
};

export const htmlToMarkup = (html: string) => {
  return html
    .replaceAll('<b>', '**')
    .replaceAll('</b>', '**')
    .replaceAll('<i>', '*')
    .replaceAll('</i>', '*')
    .replaceAll('<p>', '')
    .replaceAll('</p>', '');
};

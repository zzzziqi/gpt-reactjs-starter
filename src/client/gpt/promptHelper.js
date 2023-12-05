const sanitize = (response, responseType = undefined) => {
  const startIndex = responseType === 'array' ? response.indexOf('[') : response.indexOf('{');
  const endIndex = responseType === 'array' ? response.lastIndexOf(']') : response.lastIndexOf('}');

  const replaced = response
    .slice(startIndex, endIndex + 1)
    .replaceAll(/\n/g, '')
    .replaceAll(/\t/g, '')
    .replaceAll(/,\\n/g, ',')
    .replaceAll(/\{\\n/g, '{')
    .replaceAll(/\\n\{/g, '{')
    .replaceAll(/\\n\}/g, '}')
    .replaceAll(/,\}/g, '}')
    .replaceAll(/\[\\n/g, '[')
    .replaceAll(/\\n\]/g, ']')
    .replaceAll(/\\n\"/g, '"')
    .replaceAll(/\"\\n/g, '"')
    .replaceAll(/”/g, '"');

  return replaced;
};

export { sanitize };

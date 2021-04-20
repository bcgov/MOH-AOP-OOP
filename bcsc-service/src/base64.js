
const decode = function (b64) {
  if (!b64) {
    return;
  }

  const buffer = new Buffer.from(b64, 'base64');
  const text = buffer && buffer.toString();
  return text;
};

module.exports = { decode };
const Document = require("../model/document");

const defaultValue = "Welcome";
const findOrCreateDocument = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
};

module.exports = findOrCreateDocument;

module.exports = {
  bunsenUrl: process.env.BUNSEN_URI || 'http://127.0.0.1:9000/',
  userUrl: (process.env.BUNSEN_URI || 'http://127.0.0.1:9000/') + 'user/v1',
  notebookUrl: (process.env.BUNSEN_URI || 'http://127.0.0.1:9000/') + 'notebook/v1',
  marketplaceUrl: (process.env.BUNSEN_URI || 'http://127.0.0.1:9000/') + 'marketplace/v1'
};

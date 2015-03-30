module.exports = {
  bunsenUrl: 'http://' + (process.env.HOSTNAME || 'localhost:9000') + '/',
  marketplaceUrl: 'http://' + (process.env.MARKETPLACE_HOST || 'localhost') +
    ':' + (process.env.MARKETPLACE_PORT || '8444') + '/marketplace/v1'
};

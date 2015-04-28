module.exports = {
  bunsenUrl: 'http://' + (process.env.HOSTNAME || 'localhost:9000') + '/',
  marketplaceUrl: 'http://' + (process.env.MARKETPLACE_HOST || 'localhost') +
    ':' + (process.env.MARKETPLACE_PORT || '8444') + '/marketplace/v1',
  publicationsUrl: 'http://' + (process.env.PUBLICATIONS_HOST || 'localhost') +
    ':9000/publications/v1',
  userUrl: 'http://' + (process.env.USER_HOST || 'localhost') + ':9000/user/v1'
};

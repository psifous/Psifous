const routes = require('next-routes')();

routes
  .add('/dashboard', '/dashboard')
  .add('/dashboard/elections/add', '/dashboard/elections/add')
  .add('/dashboard/elections/:address', '/dashboard/elections/show')
  .add(
    '/dashboard/elections/:address/candidates/add',
    '/dashboard/elections/:address/candidates/add'
  );

module.exports = routes;

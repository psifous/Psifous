const routes = require('next-routes')();

routes
  .add('/dashboard', '/dashboard')
  .add('/dashboard/elections/add', '/dashboard/elections/add')
  .add(
    'electionAdmin',
    '/dashboard/elections/:address',
    '/dashboard/elections/show'
  )
  .add(
    'addCandidate',
    '/dashboard/elections/:address/candidates/add',
    '/dashboard/elections/candidates/add'
  );

module.exports = routes;

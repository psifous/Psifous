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
  )
  .add('/home', '/home')
  .add(
    'communityPage',
    '/home/communities/:communityid',
    '/home/communities/index'
  )
  .add(
    'electionPage',
    '/home/communities/:communityid/elections/:electionid',
    '/home/communities/election/index'
  )
  .add(
    'voteBoothPage',
    '/home/communities/:communityid/elections/:electionid/vote-booth',
    '/home/communities/election/vote-booth/index'
  );

module.exports = routes;

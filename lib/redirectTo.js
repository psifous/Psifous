import { Router } from '../routes';

export default function redirectTo(destination, { res, status } = {}) {
  if (res) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else {
    Router.push(destination);
  }
}

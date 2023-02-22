import {server} from './server/Server';

server.listen(8080, () => {
  console.log('Server running at port http://localhost:8080/');
});
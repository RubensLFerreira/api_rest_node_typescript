import {server} from './server/Server';

server.listen(process.env.PORT||8080, () => {
  console.log(`Server running at port http://localhost:${process.env.PORT}/`);
});
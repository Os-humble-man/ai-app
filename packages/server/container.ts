import { Container } from 'inversify';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
const container = new Container();

container
   .bind<UserRepository>('UserRepository')
   .to(UserRepository)
   .inSingletonScope();
container.bind<UserController>('UserController').to(UserController);
container.bind<UserService>('UserService').to(UserService).inSingletonScope();

export { container };

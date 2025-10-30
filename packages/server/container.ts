import { Container } from 'inversify';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ConversationRepository } from './repositories/conversation.repository';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
const container = new Container();

container
   .bind<UserRepository>('UserRepository')
   .to(UserRepository)
   .inSingletonScope();
container.bind<UserController>('UserController').to(UserController);
container.bind<UserService>('UserService').to(UserService).inSingletonScope();
container
   .bind<ConversationRepository>('ConversationRepository')
   .to(ConversationRepository);
container.bind<ChatService>('ChatService').to(ChatService).inSingletonScope();
container.bind<ChatController>('ChatController').to(ChatController);

export { container };

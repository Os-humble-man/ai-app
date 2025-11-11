import { Container } from 'inversify';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ConversationRepository } from './repositories/conversation.repository';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { MailService } from './services/mail.service';
import { FolderController } from './controllers/folder.controller';
import { FolderService } from './services/folder.service';
import { FolderRepository } from './repositories/folder.repository';
import { DocumentRepository } from './repositories/document.repository';
import { RagService } from './services/rag.service';
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

container.bind<AuthService>('AuthService').to(AuthService).inSingletonScope();
container.bind<AuthController>('AuthController').to(AuthController);
container.bind<MailService>('MailService').to(MailService).inSingletonScope();

container
   .bind<FolderService>('FolderService')
   .to(FolderService)
   .inSingletonScope();
container.bind<FolderController>('FolderController').to(FolderController);
container.bind<FolderRepository>('FolderRepository').to(FolderRepository);

container.bind<DocumentRepository>('DocumentRepository').to(DocumentRepository);

container.bind<RagService>('RagService').to(RagService).inSingletonScope();

export { container };

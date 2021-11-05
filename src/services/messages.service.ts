import { MessageDao } from '../dao/messages.dao';
import { MessageModel } from '../models/message.model';

export class MessagesService {
    private messageDAO: MessageDao = new MessageDao()

    public getAllMessages(): MessageModel[] {
        return this.messageDAO.list()
    }

}
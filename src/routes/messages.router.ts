import { Router } from 'express';
import { MessagesService } from '../services/messages.service';
const messagesRouter = Router();

const messagesService = new MessagesService();


/**
 * @openapi
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 */
 messagesRouter.get('/', (req, res) => {
    const messages = messagesService.getAllMessages();
    res.status(200).send(messages);
})

export default messagesRouter;
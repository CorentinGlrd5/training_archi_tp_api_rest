import { MessageModel } from '../models/message.model'
import { DatabaseConnection } from './database-connection'
import { JsonDB } from 'node-json-db';

export class MessageDao {

    private databaseConnection: JsonDB

    constructor() {
        // initialize database connection
        this.databaseConnection = DatabaseConnection.getConnection();
    }

    public list(): MessageModel[] {
        return this.databaseConnection.getData('/messages');
    }
}
import DomainEvent from "../../domain/event/DomainEvent";
import Queue from "./Queue";
import amqp, { Connection } from "amqplib";

export default class RabbitMQAdapter implements Queue {
    connection: Connection | undefined;

    async connect(): Promise<void> {
        this.connection = await amqp.connect(
            "amqp://admin:admin@rabbitmq:5672"
        );
    }

    async close(): Promise<void> {
        if (!this.connection)
            throw new Error("Amqp Connection not established");
        await this.connection.close();
    }

    async consume(eventName: string, callback: Function): Promise<void> {
        if (!this.connection)
            throw new Error("Amqp Connection not established");
        const channel = await this.connection.createChannel();
        await channel.assertQueue(eventName, { durable: true });
        await channel.consume(
            eventName,
            async function (msg: any) {
                await callback(JSON.parse(msg.content.toString()));
            },
            { noAck: true }
        );
    }

    async publish(domainEvent: DomainEvent): Promise<void> {
        if (!this.connection)
            throw new Error("Amqp Connection not established");
        const channel = await this.connection.createChannel();
        await channel.assertQueue(domainEvent.name, { durable: true });
        channel.sendToQueue(
            domainEvent.name,
            Buffer.from(JSON.stringify(domainEvent))
        );
    }
}

import DomainEvent from "../../domain/event/DomainEvent";
import Queue from "./Queue";

export default class MemoryQueueAdapter implements Queue {
    consumers: Consumer[] = [];

    connect(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    close(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async consume(eventName: string, callback: Function): Promise<void> {
        this.consumers.push({ eventName, callback });
    }

    async publish(domainEvent: DomainEvent): Promise<void> {
        for (const consumer of this.consumers) {
            if (consumer.eventName === domainEvent.name) {
                await consumer.callback(domainEvent);
            }
        }
    }
}

type Consumer = {
    eventName: string;
    callback: Function;
};

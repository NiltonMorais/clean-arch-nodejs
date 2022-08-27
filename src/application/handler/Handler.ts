import DomainEvent from "../../domain/event/DomainEvent";

export default interface Handler {
    handle(domainEvent: DomainEvent): Promise<void>;
}

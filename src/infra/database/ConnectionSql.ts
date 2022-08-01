export default interface ConnectionSql {
    query(statement: string, params: any): Promise<any>;
    close(): Promise<void>;
}

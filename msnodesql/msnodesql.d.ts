// Type definitions for msnodesql 0.2
// Project: https://github.com/WindowsAzure/node-sqlserver
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


///<reference path='../node/node.d.ts' />

declare module "msnodesql" {
    export function open(connectionString: string, callback?: OpenCallback): Connection;

    export function query(connectionString: string, query: string, callback?: QueryCallback): StreamEvents;
    export function query(connectionString: string, query: string, params: any[], callback?: QueryCallback): StreamEvents;

    export function queryRaw(connectionString: string, query: string, callback?: QueryRawCallback): StreamEvents;
    export function queryRaw(connectionString: string, query: string, params: any[], callback?: QueryRawCallback): StreamEvents;

    interface OpenCallback {
        (err?: Error, connection?: Connection): void;
    }

    interface QueryCallback {
        (err?: Error, results?: any[], more?: bool): void;
    }

    interface QueryRawCallback {
        (err?: Error, results?: QueryRawResult, more?: bool): void;
    }

    interface QueryRawResult {
        meta: QueryRawColumn[];
        rows: any[][];
    }

    interface QueryRawColumn {
        name?: string;
    }

    interface ErrorCallback {
        (err: Error): void;
    }

    interface Connection {
        queryRaw(query: string, callback?: QueryCallback): StreamEvents;
        queryRaw(query: string, params: any[], callback?: QueryCallback): StreamEvents;

        query(query: string, callback?: QueryRawCallback): StreamEvents;
        query(query: string, params: any[], callback?: QueryRawCallback): StreamEvents;

        beginTransaction(callback?: ErrorCallback);
        commit(callback?: ErrorCallback);
        rollback(callback?: ErrorCallback);

        close(callback?: ErrorCallback);
        close(immediately: bool, callback?: ErrorCallback);
    }

    interface StreamEvents extends EventEmitter { }
}
/// <reference types="node" />
import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions, PaginationCallback, LocationsClient, LocationProtos } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/firestore_v1_proto_api';
/**
 *  The Cloud Firestore service.
 *
 *  Cloud Firestore is a fast, fully managed, serverless, cloud-native NoSQL
 *  document database that simplifies storing, syncing, and querying data for
 *  your mobile, web, and IoT apps at global scale. Its client libraries provide
 *  live synchronization and offline support, while its security features and
 *  integrations with Firebase and Google Cloud Platform accelerate building
 *  truly serverless apps.
 * @class
 * @memberof v1
 */
export declare class FirestoreClient {
    private _terminated;
    private _opts;
    private _providedCustomServicePath;
    private _gaxModule;
    private _gaxGrpc;
    private _protos;
    private _defaults;
    auth: gax.GoogleAuth;
    descriptors: Descriptors;
    warn: (code: string, message: string, warnType?: string) => void;
    innerApiCalls: {
        [name: string]: Function;
    };
    locationsClient: LocationsClient;
    firestoreStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of FirestoreClient.
     *
     * @param {object} [options] - The configuration object.
     * The options accepted by the constructor are described in detail
     * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
     * The common options are:
     * @param {object} [options.credentials] - Credentials object.
     * @param {string} [options.credentials.client_email]
     * @param {string} [options.credentials.private_key]
     * @param {string} [options.email] - Account email address. Required when
     *     using a .pem or .p12 keyFilename.
     * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
     *     .p12 key downloaded from the Google Developers Console. If you provide
     *     a path to a JSON file, the projectId option below is not necessary.
     *     NOTE: .pem and .p12 require you to specify options.email as well.
     * @param {number} [options.port] - The port on which to connect to
     *     the remote host.
     * @param {string} [options.projectId] - The project ID from the Google
     *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
     *     the environment variable GCLOUD_PROJECT for your project ID. If your
     *     app is running in an environment which supports
     *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
     *     your project ID will be detected automatically.
     * @param {string} [options.apiEndpoint] - The domain name of the
     *     API remote host.
     * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
     *     Follows the structure of {@link gapicConfig}.
     * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
     *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
     *     For more information, please check the
     *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
     * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
     *     need to avoid loading the default gRPC version and want to use the fallback
     *     HTTP implementation. Load only fallback version and pass it to the constructor:
     *     ```
     *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
     *     const client = new FirestoreClient({fallback: 'rest'}, gax);
     *     ```
     */
    constructor(opts?: ClientOptions, gaxInstance?: typeof gax | typeof gax.fallback);
    /**
     * Initialize the client.
     * Performs asynchronous operations (such as authentication) and prepares the client.
     * This function will be called automatically when any class method is called for the
     * first time, but if you need to initialize it before calling an actual method,
     * feel free to call initialize() directly.
     *
     * You can await on this method if you want to make sure the client is initialized.
     *
     * @returns {Promise} A promise that resolves to an authenticated service stub.
     */
    initialize(): Promise<{
        [name: string]: Function;
    }>;
    /**
     * The DNS address for this API service.
     * @returns {string} The DNS address for this service.
     */
    static get servicePath(): string;
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     * @returns {string} The DNS address for this service.
     */
    static get apiEndpoint(): string;
    /**
     * The port for this API service.
     * @returns {number} The default port for this service.
     */
    static get port(): number;
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     * @returns {string[]} List of default scopes.
     */
    static get scopes(): string[];
    getProjectId(): Promise<string>;
    getProjectId(callback: Callback<string, undefined, undefined>): void;
    /**
     * Gets a single document.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The resource name of the Document to get. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     * @param {google.firestore.v1.DocumentMask} request.mask
     *   The fields to return. If not set, returns all fields.
     *
     *   If the document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {Buffer} request.transaction
     *   Reads the document in a transaction.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads the version of the document at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.firestore.v1.Document | Document}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.get_document.js</caption>
     * region_tag:firestore_v1_generated_Firestore_GetDocument_async
     */
    getDocument(request?: protos.google.firestore.v1.IGetDocumentRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.IDocument,
        protos.google.firestore.v1.IGetDocumentRequest | undefined,
        {} | undefined
    ]>;
    getDocument(request: protos.google.firestore.v1.IGetDocumentRequest, options: CallOptions, callback: Callback<protos.google.firestore.v1.IDocument, protos.google.firestore.v1.IGetDocumentRequest | null | undefined, {} | null | undefined>): void;
    getDocument(request: protos.google.firestore.v1.IGetDocumentRequest, callback: Callback<protos.google.firestore.v1.IDocument, protos.google.firestore.v1.IGetDocumentRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Updates or inserts a document.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.firestore.v1.Document} request.document
     *   Required. The updated document.
     *   Creates the document if it does not already exist.
     * @param {google.firestore.v1.DocumentMask} request.updateMask
     *   The fields to update.
     *   None of the field paths in the mask may contain a reserved name.
     *
     *   If the document exists on the server and has fields not referenced in the
     *   mask, they are left unchanged.
     *   Fields referenced in the mask, but not present in the input document, are
     *   deleted from the document on the server.
     * @param {google.firestore.v1.DocumentMask} request.mask
     *   The fields to return. If not set, returns all fields.
     *
     *   If the document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {google.firestore.v1.Precondition} request.currentDocument
     *   An optional precondition on the document.
     *   The request will fail if this is set and not met by the target document.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.firestore.v1.Document | Document}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.update_document.js</caption>
     * region_tag:firestore_v1_generated_Firestore_UpdateDocument_async
     */
    updateDocument(request?: protos.google.firestore.v1.IUpdateDocumentRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.IDocument,
        protos.google.firestore.v1.IUpdateDocumentRequest | undefined,
        {} | undefined
    ]>;
    updateDocument(request: protos.google.firestore.v1.IUpdateDocumentRequest, options: CallOptions, callback: Callback<protos.google.firestore.v1.IDocument, protos.google.firestore.v1.IUpdateDocumentRequest | null | undefined, {} | null | undefined>): void;
    updateDocument(request: protos.google.firestore.v1.IUpdateDocumentRequest, callback: Callback<protos.google.firestore.v1.IDocument, protos.google.firestore.v1.IUpdateDocumentRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes a document.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The resource name of the Document to delete. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     * @param {google.firestore.v1.Precondition} request.currentDocument
     *   An optional precondition on the document.
     *   The request will fail if this is set and not met by the target document.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.protobuf.Empty | Empty}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.delete_document.js</caption>
     * region_tag:firestore_v1_generated_Firestore_DeleteDocument_async
     */
    deleteDocument(request?: protos.google.firestore.v1.IDeleteDocumentRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.firestore.v1.IDeleteDocumentRequest | undefined,
        {} | undefined
    ]>;
    deleteDocument(request: protos.google.firestore.v1.IDeleteDocumentRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.firestore.v1.IDeleteDocumentRequest | null | undefined, {} | null | undefined>): void;
    deleteDocument(request: protos.google.firestore.v1.IDeleteDocumentRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.firestore.v1.IDeleteDocumentRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Starts a new transaction.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.database
     *   Required. The database name. In the format:
     *   `projects/{project_id}/databases/{database_id}`.
     * @param {google.firestore.v1.TransactionOptions} request.options
     *   The options for the transaction.
     *   Defaults to a read-write transaction.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.firestore.v1.BeginTransactionResponse | BeginTransactionResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.begin_transaction.js</caption>
     * region_tag:firestore_v1_generated_Firestore_BeginTransaction_async
     */
    beginTransaction(request?: protos.google.firestore.v1.IBeginTransactionRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.IBeginTransactionResponse,
        protos.google.firestore.v1.IBeginTransactionRequest | undefined,
        {} | undefined
    ]>;
    beginTransaction(request: protos.google.firestore.v1.IBeginTransactionRequest, options: CallOptions, callback: Callback<protos.google.firestore.v1.IBeginTransactionResponse, protos.google.firestore.v1.IBeginTransactionRequest | null | undefined, {} | null | undefined>): void;
    beginTransaction(request: protos.google.firestore.v1.IBeginTransactionRequest, callback: Callback<protos.google.firestore.v1.IBeginTransactionResponse, protos.google.firestore.v1.IBeginTransactionRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Commits a transaction, while optionally updating documents.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.database
     *   Required. The database name. In the format:
     *   `projects/{project_id}/databases/{database_id}`.
     * @param {number[]} request.writes
     *   The writes to apply.
     *
     *   Always executed atomically and in order.
     * @param {Buffer} request.transaction
     *   If set, applies all writes in this transaction, and commits it.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.firestore.v1.CommitResponse | CommitResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.commit.js</caption>
     * region_tag:firestore_v1_generated_Firestore_Commit_async
     */
    commit(request?: protos.google.firestore.v1.ICommitRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.ICommitResponse,
        protos.google.firestore.v1.ICommitRequest | undefined,
        {} | undefined
    ]>;
    commit(request: protos.google.firestore.v1.ICommitRequest, options: CallOptions, callback: Callback<protos.google.firestore.v1.ICommitResponse, protos.google.firestore.v1.ICommitRequest | null | undefined, {} | null | undefined>): void;
    commit(request: protos.google.firestore.v1.ICommitRequest, callback: Callback<protos.google.firestore.v1.ICommitResponse, protos.google.firestore.v1.ICommitRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Rolls back a transaction.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.database
     *   Required. The database name. In the format:
     *   `projects/{project_id}/databases/{database_id}`.
     * @param {Buffer} request.transaction
     *   Required. The transaction to roll back.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.protobuf.Empty | Empty}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.rollback.js</caption>
     * region_tag:firestore_v1_generated_Firestore_Rollback_async
     */
    rollback(request?: protos.google.firestore.v1.IRollbackRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.firestore.v1.IRollbackRequest | undefined,
        {} | undefined
    ]>;
    rollback(request: protos.google.firestore.v1.IRollbackRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.firestore.v1.IRollbackRequest | null | undefined, {} | null | undefined>): void;
    rollback(request: protos.google.firestore.v1.IRollbackRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.firestore.v1.IRollbackRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Applies a batch of write operations.
     *
     * The BatchWrite method does not apply the write operations atomically
     * and can apply them out of order. Method does not allow more than one write
     * per document. Each write succeeds or fails independently. See the
     * {@link google.firestore.v1.BatchWriteResponse|BatchWriteResponse} for the
     * success status of each write.
     *
     * If you require an atomically applied set of writes, use
     * {@link google.firestore.v1.Firestore.Commit|Commit} instead.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.database
     *   Required. The database name. In the format:
     *   `projects/{project_id}/databases/{database_id}`.
     * @param {number[]} request.writes
     *   The writes to apply.
     *
     *   Method does not apply writes atomically and does not guarantee ordering.
     *   Each write succeeds or fails independently. You cannot write to the same
     *   document more than once per request.
     * @param {number[]} request.labels
     *   Labels associated with this batch write.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.firestore.v1.BatchWriteResponse | BatchWriteResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.batch_write.js</caption>
     * region_tag:firestore_v1_generated_Firestore_BatchWrite_async
     */
    batchWrite(request?: protos.google.firestore.v1.IBatchWriteRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.IBatchWriteResponse,
        protos.google.firestore.v1.IBatchWriteRequest | undefined,
        {} | undefined
    ]>;
    batchWrite(request: protos.google.firestore.v1.IBatchWriteRequest, options: CallOptions, callback: Callback<protos.google.firestore.v1.IBatchWriteResponse, protos.google.firestore.v1.IBatchWriteRequest | null | undefined, {} | null | undefined>): void;
    batchWrite(request: protos.google.firestore.v1.IBatchWriteRequest, callback: Callback<protos.google.firestore.v1.IBatchWriteResponse, protos.google.firestore.v1.IBatchWriteRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates a new document.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource. For example:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}`
     * @param {string} request.collectionId
     *   Required. The collection ID, relative to `parent`, to list. For example:
     *   `chatrooms`.
     * @param {string} request.documentId
     *   The client-assigned document ID to use for this document.
     *
     *   Optional. If not specified, an ID will be assigned by the service.
     * @param {google.firestore.v1.Document} request.document
     *   Required. The document to create. `name` must not be set.
     * @param {google.firestore.v1.DocumentMask} request.mask
     *   The fields to return. If not set, returns all fields.
     *
     *   If the document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.firestore.v1.Document | Document}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.create_document.js</caption>
     * region_tag:firestore_v1_generated_Firestore_CreateDocument_async
     */
    createDocument(request?: protos.google.firestore.v1.ICreateDocumentRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.IDocument,
        protos.google.firestore.v1.ICreateDocumentRequest | undefined,
        {} | undefined
    ]>;
    createDocument(request: protos.google.firestore.v1.ICreateDocumentRequest, options: CallOptions, callback: Callback<protos.google.firestore.v1.IDocument, protos.google.firestore.v1.ICreateDocumentRequest | null | undefined, {} | null | undefined>): void;
    createDocument(request: protos.google.firestore.v1.ICreateDocumentRequest, callback: Callback<protos.google.firestore.v1.IDocument, protos.google.firestore.v1.ICreateDocumentRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets multiple documents.
     *
     * Documents returned by this method are not guaranteed to be returned in the
     * same order that they were requested.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.database
     *   Required. The database name. In the format:
     *   `projects/{project_id}/databases/{database_id}`.
     * @param {string[]} request.documents
     *   The names of the documents to retrieve. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   The request will fail if any of the document is not a child resource of the
     *   given `database`. Duplicate names will be elided.
     * @param {google.firestore.v1.DocumentMask} request.mask
     *   The fields to return. If not set, returns all fields.
     *
     *   If a document has a field that is not present in this mask, that field will
     *   not be returned in the response.
     * @param {Buffer} request.transaction
     *   Reads documents in a transaction.
     * @param {google.firestore.v1.TransactionOptions} request.newTransaction
     *   Starts a new transaction and reads the documents.
     *   Defaults to a read-only transaction.
     *   The new transaction ID will be returned as the first response in the
     *   stream.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits {@link google.firestore.v1.BatchGetDocumentsResponse | BatchGetDocumentsResponse} on 'data' event.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.batch_get_documents.js</caption>
     * region_tag:firestore_v1_generated_Firestore_BatchGetDocuments_async
     */
    batchGetDocuments(request?: protos.google.firestore.v1.IBatchGetDocumentsRequest, options?: CallOptions): gax.CancellableStream;
    /**
     * Runs a query.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {google.firestore.v1.StructuredQuery} request.structuredQuery
     *   A structured query.
     * @param {Buffer} request.transaction
     *   Run the query within an already active transaction.
     *
     *   The value here is the opaque transaction ID to execute the query in.
     * @param {google.firestore.v1.TransactionOptions} request.newTransaction
     *   Starts a new transaction and reads the documents.
     *   Defaults to a read-only transaction.
     *   The new transaction ID will be returned as the first response in the
     *   stream.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits {@link google.firestore.v1.RunQueryResponse | RunQueryResponse} on 'data' event.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.run_query.js</caption>
     * region_tag:firestore_v1_generated_Firestore_RunQuery_async
     */
    runQuery(request?: protos.google.firestore.v1.IRunQueryRequest, options?: CallOptions): gax.CancellableStream;
    /**
     * Runs an aggregation query.
     *
     * Rather than producing {@link google.firestore.v1.Document|Document} results like
     * {@link google.firestore.v1.Firestore.RunQuery|Firestore.RunQuery}, this API
     * allows running an aggregation to produce a series of
     * {@link google.firestore.v1.AggregationResult|AggregationResult} server-side.
     *
     * High-Level Example:
     *
     * ```
     * -- Return the number of documents in table given a filter.
     * SELECT COUNT(*) FROM ( SELECT * FROM k where a = true );
     * ```
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {google.firestore.v1.StructuredAggregationQuery} request.structuredAggregationQuery
     *   An aggregation query.
     * @param {Buffer} request.transaction
     *   Run the aggregation within an already active transaction.
     *
     *   The value here is the opaque transaction ID to execute the query in.
     * @param {google.firestore.v1.TransactionOptions} request.newTransaction
     *   Starts a new transaction as part of the query, defaulting to read-only.
     *
     *   The new transaction ID will be returned as the first response in the
     *   stream.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Executes the query at the given timestamp.
     *
     *   Requires:
     *
     *   * Cannot be more than 270 seconds in the past.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits {@link google.firestore.v1.RunAggregationQueryResponse | RunAggregationQueryResponse} on 'data' event.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.run_aggregation_query.js</caption>
     * region_tag:firestore_v1_generated_Firestore_RunAggregationQuery_async
     */
    runAggregationQuery(request?: protos.google.firestore.v1.IRunAggregationQueryRequest, options?: CallOptions): gax.CancellableStream;
    /**
     * Streams batches of document updates and deletes, in order. This method is
     * only available via gRPC or WebChannel (not REST).
     *
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which is both readable and writable. It accepts objects
     *   representing {@link google.firestore.v1.WriteRequest | WriteRequest} for write() method, and
     *   will emit objects representing {@link google.firestore.v1.WriteResponse | WriteResponse} on 'data' event asynchronously.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#bi-directional-streaming)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.write.js</caption>
     * region_tag:firestore_v1_generated_Firestore_Write_async
     */
    write(options?: CallOptions): gax.CancellableStream;
    /**
     * Listens to changes. This method is only available via gRPC or WebChannel
     * (not REST).
     *
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which is both readable and writable. It accepts objects
     *   representing {@link google.firestore.v1.ListenRequest | ListenRequest} for write() method, and
     *   will emit objects representing {@link google.firestore.v1.ListenResponse | ListenResponse} on 'data' event asynchronously.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#bi-directional-streaming)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.listen.js</caption>
     * region_tag:firestore_v1_generated_Firestore_Listen_async
     */
    listen(options?: CallOptions): gax.CancellableStream;
    /**
     * Lists documents.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {string} [request.collectionId]
     *   Optional. The collection ID, relative to `parent`, to list.
     *
     *   For example: `chatrooms` or `messages`.
     *
     *   This is optional, and when not provided, Firestore will list documents
     *   from all collections under the provided `parent`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of documents to return in a single response.
     *
     *   Firestore may return fewer than this value.
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListDocuments` response.
     *
     *   Provide this to retrieve the subsequent page. When paginating, all other
     *   parameters (with the exception of `page_size`) must match the values set
     *   in the request that generated the page token.
     * @param {string} [request.orderBy]
     *   Optional. The optional ordering of the documents to return.
     *
     *   For example: `priority desc, __name__ desc`.
     *
     *   This mirrors the {@link google.firestore.v1.StructuredQuery.order_by|`ORDER BY`}
     *   used in Firestore queries but in a string representation. When absent,
     *   documents are ordered based on `__name__ ASC`.
     * @param {google.firestore.v1.DocumentMask} [request.mask]
     *   Optional. The fields to return. If not set, returns all fields.
     *
     *   If a document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {Buffer} request.transaction
     *   Perform the read as part of an already active transaction.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Perform the read at the provided time.
     *
     *   This may not be older than 270 seconds.
     * @param {boolean} request.showMissing
     *   If the list should show missing documents.
     *
     *   A document is missing if it does not exist, but there are sub-documents
     *   nested underneath it. When true, such missing documents will be returned
     *   with a key but will not have fields,
     *   {@link google.firestore.v1.Document.create_time|`create_time`}, or
     *   {@link google.firestore.v1.Document.update_time|`update_time`} set.
     *
     *   Requests with `show_missing` may not specify `where` or `order_by`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link google.firestore.v1.Document | Document}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listDocumentsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listDocuments(request?: protos.google.firestore.v1.IListDocumentsRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.IDocument[],
        protos.google.firestore.v1.IListDocumentsRequest | null,
        protos.google.firestore.v1.IListDocumentsResponse
    ]>;
    listDocuments(request: protos.google.firestore.v1.IListDocumentsRequest, options: CallOptions, callback: PaginationCallback<protos.google.firestore.v1.IListDocumentsRequest, protos.google.firestore.v1.IListDocumentsResponse | null | undefined, protos.google.firestore.v1.IDocument>): void;
    listDocuments(request: protos.google.firestore.v1.IListDocumentsRequest, callback: PaginationCallback<protos.google.firestore.v1.IListDocumentsRequest, protos.google.firestore.v1.IListDocumentsResponse | null | undefined, protos.google.firestore.v1.IDocument>): void;
    /**
     * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {string} [request.collectionId]
     *   Optional. The collection ID, relative to `parent`, to list.
     *
     *   For example: `chatrooms` or `messages`.
     *
     *   This is optional, and when not provided, Firestore will list documents
     *   from all collections under the provided `parent`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of documents to return in a single response.
     *
     *   Firestore may return fewer than this value.
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListDocuments` response.
     *
     *   Provide this to retrieve the subsequent page. When paginating, all other
     *   parameters (with the exception of `page_size`) must match the values set
     *   in the request that generated the page token.
     * @param {string} [request.orderBy]
     *   Optional. The optional ordering of the documents to return.
     *
     *   For example: `priority desc, __name__ desc`.
     *
     *   This mirrors the {@link google.firestore.v1.StructuredQuery.order_by|`ORDER BY`}
     *   used in Firestore queries but in a string representation. When absent,
     *   documents are ordered based on `__name__ ASC`.
     * @param {google.firestore.v1.DocumentMask} [request.mask]
     *   Optional. The fields to return. If not set, returns all fields.
     *
     *   If a document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {Buffer} request.transaction
     *   Perform the read as part of an already active transaction.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Perform the read at the provided time.
     *
     *   This may not be older than 270 seconds.
     * @param {boolean} request.showMissing
     *   If the list should show missing documents.
     *
     *   A document is missing if it does not exist, but there are sub-documents
     *   nested underneath it. When true, such missing documents will be returned
     *   with a key but will not have fields,
     *   {@link google.firestore.v1.Document.create_time|`create_time`}, or
     *   {@link google.firestore.v1.Document.update_time|`update_time`} set.
     *
     *   Requests with `show_missing` may not specify `where` or `order_by`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link google.firestore.v1.Document | Document} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listDocumentsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listDocumentsStream(request?: protos.google.firestore.v1.IListDocumentsRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listDocuments`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {string} [request.collectionId]
     *   Optional. The collection ID, relative to `parent`, to list.
     *
     *   For example: `chatrooms` or `messages`.
     *
     *   This is optional, and when not provided, Firestore will list documents
     *   from all collections under the provided `parent`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of documents to return in a single response.
     *
     *   Firestore may return fewer than this value.
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListDocuments` response.
     *
     *   Provide this to retrieve the subsequent page. When paginating, all other
     *   parameters (with the exception of `page_size`) must match the values set
     *   in the request that generated the page token.
     * @param {string} [request.orderBy]
     *   Optional. The optional ordering of the documents to return.
     *
     *   For example: `priority desc, __name__ desc`.
     *
     *   This mirrors the {@link google.firestore.v1.StructuredQuery.order_by|`ORDER BY`}
     *   used in Firestore queries but in a string representation. When absent,
     *   documents are ordered based on `__name__ ASC`.
     * @param {google.firestore.v1.DocumentMask} [request.mask]
     *   Optional. The fields to return. If not set, returns all fields.
     *
     *   If a document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {Buffer} request.transaction
     *   Perform the read as part of an already active transaction.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Perform the read at the provided time.
     *
     *   This may not be older than 270 seconds.
     * @param {boolean} request.showMissing
     *   If the list should show missing documents.
     *
     *   A document is missing if it does not exist, but there are sub-documents
     *   nested underneath it. When true, such missing documents will be returned
     *   with a key but will not have fields,
     *   {@link google.firestore.v1.Document.create_time|`create_time`}, or
     *   {@link google.firestore.v1.Document.update_time|`update_time`} set.
     *
     *   Requests with `show_missing` may not specify `where` or `order_by`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.firestore.v1.Document | Document}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.list_documents.js</caption>
     * region_tag:firestore_v1_generated_Firestore_ListDocuments_async
     */
    listDocumentsAsync(request?: protos.google.firestore.v1.IListDocumentsRequest, options?: CallOptions): AsyncIterable<protos.google.firestore.v1.IDocument>;
    /**
     * Partitions a query by returning partition cursors that can be used to run
     * the query in parallel. The returned partition cursors are split points that
     * can be used by RunQuery as starting/end points for the query results.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents`.
     *   Document resource names are not supported; only database resource names
     *   can be specified.
     * @param {google.firestore.v1.StructuredQuery} request.structuredQuery
     *   A structured query.
     *   Query must specify collection with all descendants and be ordered by name
     *   ascending. Other filters, order bys, limits, offsets, and start/end
     *   cursors are not supported.
     * @param {number} request.partitionCount
     *   The desired maximum number of partition points.
     *   The partitions may be returned across multiple pages of results.
     *   The number must be positive. The actual number of partitions
     *   returned may be fewer.
     *
     *   For example, this may be set to one fewer than the number of parallel
     *   queries to be run, or in running a data pipeline job, one fewer than the
     *   number of workers or compute instances available.
     * @param {string} request.pageToken
     *   The `next_page_token` value returned from a previous call to
     *   PartitionQuery that may be used to get an additional set of results.
     *   There are no ordering guarantees between sets of results. Thus, using
     *   multiple sets of results will require merging the different result sets.
     *
     *   For example, two subsequent calls using a page_token may return:
     *
     *    * cursor B, cursor M, cursor Q
     *    * cursor A, cursor U, cursor W
     *
     *   To obtain a complete result set ordered with respect to the results of the
     *   query supplied to PartitionQuery, the results sets should be merged:
     *   cursor A, cursor B, cursor M, cursor Q, cursor U, cursor W
     * @param {number} request.pageSize
     *   The maximum number of partitions to return in this call, subject to
     *   `partition_count`.
     *
     *   For example, if `partition_count` = 10 and `page_size` = 8, the first call
     *   to PartitionQuery will return up to 8 partitions and a `next_page_token`
     *   if more results exist. A second call to PartitionQuery will return up to
     *   2 partitions, to complete the total of 10 specified in `partition_count`.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link google.firestore.v1.Cursor | Cursor}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `partitionQueryAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    partitionQuery(request?: protos.google.firestore.v1.IPartitionQueryRequest, options?: CallOptions): Promise<[
        protos.google.firestore.v1.ICursor[],
        protos.google.firestore.v1.IPartitionQueryRequest | null,
        protos.google.firestore.v1.IPartitionQueryResponse
    ]>;
    partitionQuery(request: protos.google.firestore.v1.IPartitionQueryRequest, options: CallOptions, callback: PaginationCallback<protos.google.firestore.v1.IPartitionQueryRequest, protos.google.firestore.v1.IPartitionQueryResponse | null | undefined, protos.google.firestore.v1.ICursor>): void;
    partitionQuery(request: protos.google.firestore.v1.IPartitionQueryRequest, callback: PaginationCallback<protos.google.firestore.v1.IPartitionQueryRequest, protos.google.firestore.v1.IPartitionQueryResponse | null | undefined, protos.google.firestore.v1.ICursor>): void;
    /**
     * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents`.
     *   Document resource names are not supported; only database resource names
     *   can be specified.
     * @param {google.firestore.v1.StructuredQuery} request.structuredQuery
     *   A structured query.
     *   Query must specify collection with all descendants and be ordered by name
     *   ascending. Other filters, order bys, limits, offsets, and start/end
     *   cursors are not supported.
     * @param {number} request.partitionCount
     *   The desired maximum number of partition points.
     *   The partitions may be returned across multiple pages of results.
     *   The number must be positive. The actual number of partitions
     *   returned may be fewer.
     *
     *   For example, this may be set to one fewer than the number of parallel
     *   queries to be run, or in running a data pipeline job, one fewer than the
     *   number of workers or compute instances available.
     * @param {string} request.pageToken
     *   The `next_page_token` value returned from a previous call to
     *   PartitionQuery that may be used to get an additional set of results.
     *   There are no ordering guarantees between sets of results. Thus, using
     *   multiple sets of results will require merging the different result sets.
     *
     *   For example, two subsequent calls using a page_token may return:
     *
     *    * cursor B, cursor M, cursor Q
     *    * cursor A, cursor U, cursor W
     *
     *   To obtain a complete result set ordered with respect to the results of the
     *   query supplied to PartitionQuery, the results sets should be merged:
     *   cursor A, cursor B, cursor M, cursor Q, cursor U, cursor W
     * @param {number} request.pageSize
     *   The maximum number of partitions to return in this call, subject to
     *   `partition_count`.
     *
     *   For example, if `partition_count` = 10 and `page_size` = 8, the first call
     *   to PartitionQuery will return up to 8 partitions and a `next_page_token`
     *   if more results exist. A second call to PartitionQuery will return up to
     *   2 partitions, to complete the total of 10 specified in `partition_count`.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link google.firestore.v1.Cursor | Cursor} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `partitionQueryAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    partitionQueryStream(request?: protos.google.firestore.v1.IPartitionQueryRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `partitionQuery`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents`.
     *   Document resource names are not supported; only database resource names
     *   can be specified.
     * @param {google.firestore.v1.StructuredQuery} request.structuredQuery
     *   A structured query.
     *   Query must specify collection with all descendants and be ordered by name
     *   ascending. Other filters, order bys, limits, offsets, and start/end
     *   cursors are not supported.
     * @param {number} request.partitionCount
     *   The desired maximum number of partition points.
     *   The partitions may be returned across multiple pages of results.
     *   The number must be positive. The actual number of partitions
     *   returned may be fewer.
     *
     *   For example, this may be set to one fewer than the number of parallel
     *   queries to be run, or in running a data pipeline job, one fewer than the
     *   number of workers or compute instances available.
     * @param {string} request.pageToken
     *   The `next_page_token` value returned from a previous call to
     *   PartitionQuery that may be used to get an additional set of results.
     *   There are no ordering guarantees between sets of results. Thus, using
     *   multiple sets of results will require merging the different result sets.
     *
     *   For example, two subsequent calls using a page_token may return:
     *
     *    * cursor B, cursor M, cursor Q
     *    * cursor A, cursor U, cursor W
     *
     *   To obtain a complete result set ordered with respect to the results of the
     *   query supplied to PartitionQuery, the results sets should be merged:
     *   cursor A, cursor B, cursor M, cursor Q, cursor U, cursor W
     * @param {number} request.pageSize
     *   The maximum number of partitions to return in this call, subject to
     *   `partition_count`.
     *
     *   For example, if `partition_count` = 10 and `page_size` = 8, the first call
     *   to PartitionQuery will return up to 8 partitions and a `next_page_token`
     *   if more results exist. A second call to PartitionQuery will return up to
     *   2 partitions, to complete the total of 10 specified in `partition_count`.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.firestore.v1.Cursor | Cursor}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.partition_query.js</caption>
     * region_tag:firestore_v1_generated_Firestore_PartitionQuery_async
     */
    partitionQueryAsync(request?: protos.google.firestore.v1.IPartitionQueryRequest, options?: CallOptions): AsyncIterable<protos.google.firestore.v1.ICursor>;
    /**
     * Lists all the collection IDs underneath a document.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent document. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {number} request.pageSize
     *   The maximum number of results to return.
     * @param {string} request.pageToken
     *   A page token. Must be a value from
     *   {@link google.firestore.v1.ListCollectionIdsResponse|ListCollectionIdsResponse}.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of string.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listCollectionIdsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listCollectionIds(request?: protos.google.firestore.v1.IListCollectionIdsRequest, options?: CallOptions): Promise<[
        string[],
        protos.google.firestore.v1.IListCollectionIdsRequest | null,
        protos.google.firestore.v1.IListCollectionIdsResponse
    ]>;
    listCollectionIds(request: protos.google.firestore.v1.IListCollectionIdsRequest, options: CallOptions, callback: PaginationCallback<protos.google.firestore.v1.IListCollectionIdsRequest, protos.google.firestore.v1.IListCollectionIdsResponse | null | undefined, string>): void;
    listCollectionIds(request: protos.google.firestore.v1.IListCollectionIdsRequest, callback: PaginationCallback<protos.google.firestore.v1.IListCollectionIdsRequest, protos.google.firestore.v1.IListCollectionIdsResponse | null | undefined, string>): void;
    /**
     * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent document. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {number} request.pageSize
     *   The maximum number of results to return.
     * @param {string} request.pageToken
     *   A page token. Must be a value from
     *   {@link google.firestore.v1.ListCollectionIdsResponse|ListCollectionIdsResponse}.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing string on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listCollectionIdsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listCollectionIdsStream(request?: protos.google.firestore.v1.IListCollectionIdsRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listCollectionIds`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent document. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {number} request.pageSize
     *   The maximum number of results to return.
     * @param {string} request.pageToken
     *   A page token. Must be a value from
     *   {@link google.firestore.v1.ListCollectionIdsResponse|ListCollectionIdsResponse}.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 270 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   string. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/firestore.list_collection_ids.js</caption>
     * region_tag:firestore_v1_generated_Firestore_ListCollectionIds_async
     */
    listCollectionIdsAsync(request?: protos.google.firestore.v1.IListCollectionIdsRequest, options?: CallOptions): AsyncIterable<string>;
    /**
     * Gets information about a location.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Resource name for the location.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html | CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link google.cloud.location.Location | Location}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example
     * ```
     * const [response] = await client.getLocation(request);
     * ```
     */
    getLocation(request: LocationProtos.google.cloud.location.IGetLocationRequest, options?: gax.CallOptions | Callback<LocationProtos.google.cloud.location.ILocation, LocationProtos.google.cloud.location.IGetLocationRequest | null | undefined, {} | null | undefined>, callback?: Callback<LocationProtos.google.cloud.location.ILocation, LocationProtos.google.cloud.location.IGetLocationRequest | null | undefined, {} | null | undefined>): Promise<LocationProtos.google.cloud.location.ILocation>;
    /**
     * Lists information about the supported locations for this service. Returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   The resource that owns the locations collection, if applicable.
     * @param {string} request.filter
     *   The standard list filter.
     * @param {number} request.pageSize
     *   The standard list page size.
     * @param {string} request.pageToken
     *   The standard list page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link google.cloud.location.Location | Location}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example
     * ```
     * const iterable = client.listLocationsAsync(request);
     * for await (const response of iterable) {
     *   // process response
     * }
     * ```
     */
    listLocationsAsync(request: LocationProtos.google.cloud.location.IListLocationsRequest, options?: CallOptions): AsyncIterable<LocationProtos.google.cloud.location.ILocation>;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("messaging", title, details);
const serviceBus =
  "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions";
const rabbitReliability = "https://www.rabbitmq.com/docs/reliability";

export const messagingTopics = [
  topic("Azure Service Bus Queues", {
    summary: "A queue holds work until one worker can process it.",
    definition:
      "A Service Bus queue stores messages for a group of workers. Workers can share the work. In peek-lock mode, a worker locks a message, processes it, then completes it or returns it for more handling.",
    purpose:
      "Separate the system that sends work from the worker that does it, and smooth out changes in their speed.",
    usedWhen:
      "Use a queue for commands or tasks that one worker should complete. Use a topic when several independent systems each need a copy.",
    why: "The sender can continue when the worker is offline, and more workers can be added as needed. A message may arrive more than once, so workers must handle duplicates.",
    example:
      "An order API adds a CreateShipment message to the queue. A worker locks it, creates the shipment, saves the result, and then completes the message.",
    operatorNote:
      "Compare queue size and oldest-message age with arrival and completion rates. Check expired locks, delivery count, worker capacity, and response time from the next service. Do not purge a queue to fix a backlog.",
    sources: [{ label: "Service Bus queues, topics, and subscriptions", url: serviceBus }],
  }),
  topic("Topics and Subscriptions", {
    summary: "A topic sends a copy of a message to each matching subscription.",
    definition:
      "A Service Bus topic accepts a message and copies it to each matching subscription. Rules can filter or change the copy. Each subscription has its own backlog and message status.",
    purpose:
      "Let several systems respond to one business event without making the sender contact each system.",
    usedWhen:
      "Use a topic when separate teams or services need the same event. Add filters when a subscriber only needs certain event types or customers.",
    why: "A slow subscriber does not stop the others, and each subscriber can be managed on its own. Each copy needs its own owner and retention rules.",
    example:
      "Publish ShipmentDispatched. Billing, customer notices, and analytics each get a copy. A rule can exclude test-customer messages from analytics.",
    operatorNote:
      "Check the topic and each subscription's active, dead-letter, and transfer counts. If a subscriber gets no messages, check its filters, expiry, and forwarding settings.",
    sources: [{ label: "Service Bus queues, topics, and subscriptions", url: serviceBus }],
  }),
  topic("Dead-Letter Queues (DLQs)", {
    summary: "A separate queue for messages that need review or planned recovery.",
    definition:
      "Service Bus has a dead-letter queue for each queue and topic subscription. A message can go there after too many failed deliveries, expiry, or a receiver's rejection. It stays there until a process or operator handles it.",
    purpose:
      "Keep messages that cannot be processed out of the normal flow and available for review.",
    usedWhen:
      "Use a dead-letter queue for permanent data errors, retries that ran out, or messages a receiver chose to reject.",
    why: "A dead-letter queue keeps bad messages from blocking normal work. It also keeps details about why the message was moved there.",
    example:
      "A shipment with an unknown partner code is moved to the dead-letter queue with the reason PartnerProfileMissing. After the partner profile is fixed, an operator checks and resubmits it.",
    operatorNote:
      "Check the reason, description, original queue, arrival time, delivery count, and business IDs. Service Bus does not clear these queues automatically. Set an owner, retention rule, alert, and reviewed replay steps.",
    sources: [
      {
        label: "Service Bus dead-letter queues",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
      },
    ],
  }),
  topic("Handling messages that keep failing", {
    summary: "Stop a message that keeps failing from using worker time again and again.",
    definition:
      "A poison message fails each time because of its data, rules, or processing result. Separate permanent faults, such as a bad schema, from temporary faults, such as a short network outage.",
    purpose:
      "Keep one bad message from using worker time forever or blocking other valid messages.",
    usedWhen:
      "Use a limited number of retries for temporary faults. Move permanent or repeatedly failing messages to a dead-letter queue with a clear reason.",
    why: "Repeatedly sending a message with the same error creates a loop. Deleting it loses business work. Keeping it aside preserves the details needed to fix and replay it.",
    example:
      "A parser rejects an unsupported EDI version once, records the partner and control number, and moves it to the dead-letter queue. A database timeout gets a few delayed retries.",
    operatorNote:
      "Keep the original message or a secure link to it, error type, error details, attempt count, and correlation ID. Do not put private document contents in general logs.",
    sources: [
      {
        label: "Service Bus dead-letter queues",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
      },
      {
        label: "Transient fault handling",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("Delivery count / Max delivery count", {
    summary: "The number of delivery attempts and the limit before a message is dead-lettered.",
    definition:
      "Service Bus increases a message's delivery count when a worker abandons it or its peek-lock expires. If the count passes the queue's configured limit, Service Bus moves the message to its dead-letter queue.",
    purpose: "Stop repeated failures from using the normal queue forever.",
    usedWhen:
      "Check the count to find repeated processing or lock problems. Set the limit to fit the worker's retry plan and the business need.",
    why: "A low limit can move temporary failures to the dead-letter queue too soon. A high limit can keep a permanently bad message in a failure loop.",
    example:
      "The count rises each time a worker abandons a message after a failed service call. When it passes the set limit, check the message in the dead-letter queue.",
    operatorNote:
      "Look for expired locks, worker timeouts, work that takes longer than the lock, abandon calls, and the dead-letter reason. Do not resend the message until the cause is fixed.",
    sources: [
      {
        label: "Service Bus dead-letter queues: maximum delivery count",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
      },
    ],
  }),
  topic("Message retries and reprocessing", {
    summary: "A retry repeats work automatically; reprocessing deliberately resends it later.",
    definition:
      "A retry repeats an operation a limited number of times when a fault may be temporary. Reprocessing is a later, deliberate replay, often from a dead-letter queue or archive, after someone checks the failure and selects messages to resend.",
    purpose:
      "Recover from short outages automatically and keep recovery from permanent faults under review.",
    usedWhen:
      "Retry brief service failures. Reprocess after fixing a schema, partner rule, sign-in detail, or code problem and checking that the replay is safe.",
    why: "This keeps automatic retries from becoming an endless recovery loop and lets an operator check business effects before resending.",
    example:
      "Retry a 503 response after its Retry-After delay a few times. Later, replay a dead-lettered message after deploying the missing partner map.",
    operatorNote:
      "Before replay, check whether the send or receive completed, current business status, duplicate protection, destination, and selected messages. Record who replayed the message, when, why, and its original ID.",
    sources: [
      {
        label: "Transient fault handling",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("RabbitMQ", {
    summary: "A message broker that routes messages through exchanges to queues.",
    definition:
      "RabbitMQ supports messaging protocols such as AMQP 0-9-1. Senders publish to exchanges, which route messages to queues. Receiver acknowledgments and sender confirmations report different steps.",
    purpose:
      "Route and hold work between senders and receivers, with controls for message delivery.",
    usedWhen:
      "Use it when a system already uses RabbitMQ or needs its routing and queue features in a managed or self-managed setup.",
    why: "Exchange types and bindings can route messages by exact key, topic pattern, headers, or to every matching queue. A receiver can acknowledge a message after processing it.",
    example:
      "Send a persistent shipment.status message to a topic exchange with routing key shipment.delivered. A queue bound to shipment.* receives it and acknowledges after saving it.",
    operatorNote:
      "Check sender confirms, unrouted messages, queue durability and type, receiver acknowledgment mode, prefetch, connection errors, and dead-letter routing. A receiver acknowledgment does not confirm that the business task succeeded.",
    sources: [
      { label: "RabbitMQ reliability guide", url: rabbitReliability },
      {
        label: "Consumer acknowledgments and publisher confirms",
        url: "https://www.rabbitmq.com/docs/confirms",
      },
    ],
  }),
  topic("RabbitMQ-to-Azure-Service Bus integration", {
    summary: "A bridge that moves messages between RabbitMQ and Service Bus.",
    definition:
      "A bridge receives a message from RabbitMQ, changes its headers or format if needed, and sends it to Service Bus. Each broker tracks its own messages. By default, they do not share one transaction that completes both steps together.",
    purpose:
      "Connect existing RabbitMQ systems to Azure workers during a gradual move or extension.",
    usedWhen:
      "Use a bridge during a staged migration or when systems in different environments need to exchange work.",
    why: "One adapter can handle format changes, sign-in, and monitoring. It also creates a point where messages can be lost or sent twice unless the handoff is controlled.",
    example:
      "The bridge receives a RabbitMQ message but does not acknowledge it. It sends the converted message to Service Bus and waits for confirmation, then acknowledges RabbitMQ. If it stops after sending but before acknowledging, it may send the message twice.",
    operatorNote:
      "Use stable message IDs, confirm sends, delay the source acknowledgment, and make receivers safe for duplicates. Set retry limits and a quarantine path. Watch both queue sizes, bridge delay, and each forwarding result.",
    sources: [
      { label: "RabbitMQ reliability guide", url: rabbitReliability },
      {
        label: "Azure Service Bus overview",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview",
      },
    ],
  }),
  topic("Publish / Subscribe architecture", {
    summary: "One sender publishes an event, and each subscriber receives its own copy.",
    definition:
      "In publish/subscribe, a sender publishes an event to a broker instead of naming each receiver. The broker sends matching copies to subscriber-specific destinations. In a work queue, workers share one delivery instead.",
    purpose:
      "Let several systems respond to a business fact without making the sending system coordinate each action.",
    usedWhen:
      "Use it for events, notices, and independently managed views or workflows. Use a command queue when one worker should perform a requested action.",
    why: "Senders and receivers can change separately. They still need shared event rules, subscription owners, retention, and duplicate handling.",
    example:
      "Publish OrderShipped once. Tracking, customer notices, and analytics each receive a copy. A stopped subscriber builds its own backlog.",
    operatorNote:
      "Check the topic or exchange binding, filter, subscriber destination, receiver health, backlog, schema version, and duplicate handling. A published event may match no subscriber.",
    sources: [
      { label: "Service Bus queues, topics, and subscriptions", url: serviceBus },
      { label: "RabbitMQ exchanges", url: "https://www.rabbitmq.com/tutorials/amqp-concepts" },
    ],
  }),
  topic("Asynchronous messaging", {
    summary: "A sender hands off work and continues before the receiver finishes it.",
    definition:
      "An asynchronous exchange puts work or an event in a broker or other durable store so it can be processed later. The sender may get confirmation that the work was accepted before the business task is complete.",
    purpose: "Let callers continue when a receiving service is slow or unavailable.",
    usedWhen:
      "Use it for background tasks, partner exchanges, multiple subscribers, long-running work, or bursts that another service must process at its own pace.",
    why: "A queue can absorb bursts and separate the sender from receivers. The design also needs a way to report completion, handle duplicates, and manage ordering.",
    example:
      "The order API returns 202 Accepted and an operation ID after it adds an order to a queue. The client checks a status page until the order is validated and fulfilled.",
    operatorNote:
      "Tell callers what acceptance means, where to check success or failure, how long work may take, and how duplicates are handled. Watch queue age as well as API success.",
    sources: [
      {
        label: "Basic enterprise integration on Azure",
        url: "https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/enterprise-integration/basic-enterprise-integration",
      },
    ],
  }),
  topic("Retry patterns", {
    summary: "Rules for what to retry, how long to wait, and when to stop.",
    definition:
      "A retry policy sets which temporary failures to retry, how long each try can run, how many attempts to make, how long to wait, and what to do when attempts end. Match it to the service, operation, and business deadline.",
    purpose:
      "Recover from temporary faults without making an outage worse or repeating an unsafe action.",
    usedWhen:
      "Retry likely temporary faults, such as throttling or short outages. For invalid input or denied access, fix the cause before trying again.",
    why: "Limited retries can recover from brief faults. Endless or immediate retries can overload a service and delay a clear error.",
    example:
      "For HTTP 429, wait at least as long as Retry-After says. For a temporary network break, wait and retry a few times. Do not retry unchanged input that fails validation.",
    operatorNote:
      "Log the attempt number, wait, error type, and total time. Count retries at every layer so the client, workflow, SDK, and broker do not multiply attempts unexpectedly.",
    sources: [
      {
        label: "Transient fault handling",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("Exponential backoff", {
    summary: "Wait longer between each retry so a failing service has time to recover.",
    definition:
      "Exponential backoff increases the wait after each temporary failure, up to a limit. A small random wait, called jitter, stops many clients from retrying at the same time.",
    purpose: "Reduce pressure on a service while a background task waits to try again.",
    usedWhen:
      "Use it for limited retries when the task is safe to repeat. Follow the service's Retry-After value when provided, and set a maximum total wait.",
    why: "Longer waits send fewer requests during an outage than a fast repeat loop. Keep the total wait within the business deadline.",
    example:
      "With a two-second starting wait, retries could wait about two, four, and eight seconds, with a little random variation. Stop at the configured limit.",
    operatorNote:
      "Check the wait limit, random variation, attempt count, timeout per attempt, and total time. Look for many clients retrying together or several retry rules adding up.",
    sources: [
      {
        label: "Transient fault handling: exponential backoff",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("Safe retries and idempotency", {
    summary: "Protection that stops a repeated request from making the same business change twice.",
    definition:
      "An idempotent operation recognizes repeated work and prevents a duplicate business change. A common method is to save a unique business key and its result in the same transaction as the business update.",
    purpose:
      "Make retries and redelivered messages safe when the sender cannot tell if an earlier attempt finished.",
    usedWhen:
      "Use it for payments, orders, message receivers, webhooks, replay tools, and any action that might repeat after a timeout.",
    why: "A receiver may save a change but lose the success reply. Duplicate protection lets it report the saved result without making the change again.",
    example:
      "A payment service saves the partner's unique payment reference in the same transaction as the ledger update. If the same reference arrives again, it returns the saved result.",
    operatorNote:
      "Choose a key for one business action and decide how long to keep it. Define what happens if the same key arrives with different data. Broker duplicate checks do not protect every external action.",
    sources: [
      {
        label: "Azure Service Bus duplicate detection",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection",
      },
    ],
  }),
  topic("Correlation IDs", {
    summary: "An ID that helps follow related work across services and retries.",
    definition:
      "A correlation ID is an application ID copied into related work, messages, logs, and traces. It groups related activity but may not identify one message or one attempt.",
    purpose: "Link a request to its later work, service calls, alerts, and support records.",
    usedWhen:
      "Use it across APIs, workflows, queues, EDI processing, and support tickets. Keep trace data too when distributed tracing is enabled.",
    why: "Responders can find related work without searching only by time or private customer data.",
    example:
      "An order request uses correlation ID ord-2026-0042. Its messages and monitoring records keep that ID, while each message has its own ID and attempt count.",
    operatorNote:
      "Pass the same ID to each system instead of making a new one at every step. Add it to structured logs and check missing or invalid values. Do not put private data or secrets in it.",
    sources: [
      {
        label: "Application Insights distributed tracing",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/distributed-trace-data",
      },
    ],
  }),
  topic("Message ID / Interface ID", {
    summary: "A message ID identifies one message; an interface ID names its integration rules.",
    definition:
      "A message ID identifies one message for duplicate checks, audit, or replay. An interface ID is a name chosen by an organization for an integration route or contract. It is not a standard broker field, so document its version and owner.",
    purpose:
      "Show which message arrived and which partner map or integration rules should process it.",
    usedWhen:
      "Use both in messages and logs when there are several partners or interfaces. Also keep the correlation ID and the business ID from the source system.",
    why: "The IDs answer different questions: which message is this, and which integration rules apply?",
    example:
      "messageId=7c2, interfaceId=retailer-x-856-v3, and correlationId=shipment-8841 identify a message, its mapping rules, and the wider business flow.",
    operatorNote:
      "Set rules for uniqueness, letter case, retention, and where IDs must be copied. Keep partner control numbers as source IDs; do not replace them with an internal ID.",
    sources: [
      {
        label: "Azure Service Bus message properties",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messages-payloads",
      },
    ],
  }),
  topic("Large messages with the claim-check pattern", {
    summary: "Store a large file separately and send its address through the broker.",
    definition:
      "The sender stores a large payload in object storage and sends a small message with a link and details such as its hash and type. The receiver uses its own permission or a short-lived access link to get the file.",
    purpose: "Keep broker messages small while still processing large documents or attachments.",
    usedWhen:
      "Use it when a file is too large for the broker or when several receivers would otherwise each get a large copy.",
    why: "The broker carries a small control message, and storage keeps the file. The sender and receiver must manage access, availability, cleanup, and replay time.",
    example:
      "Upload a 20 MB shipment archive to a private blob, calculate its SHA-256 hash, and send the blob address, hash, file type, and message ID. The worker checks the hash before reading it.",
    operatorNote:
      "Do not use permanent public links. Check access and expiry, file existence, hash, encryption, retention, cleanup owner, and whether replay can still get the file.",
    sources: [
      {
        label: "Azure Storage introduction",
        url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction",
      },
    ],
  }),
];

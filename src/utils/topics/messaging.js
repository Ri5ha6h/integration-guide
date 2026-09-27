export const messagingTopics = [
  {
    "group": "messaging",
    "title": "Azure Service Bus Queues",
    "summary": "A one-to-one work buffer for competing consumers.",
    "definition": "A Service Bus queue stores messages until a receiver accepts and completes them; multiple receivers can compete for work.",
    "purpose": "Hold commands or jobs until a worker is ready to process each one.",
    "usedWhen": "Use queues when each work item should normally be handled by one consumer group.",
    "why": "Producers and consumers can scale and recover independently, and the queue absorbs temporary load differences.",
    "operatorNote": "Monitor active count and oldest-message age; settle messages only after the work is safely committed."
  },
  {
    "group": "messaging",
    "title": "Topics and Subscriptions",
    "summary": "A fan-out pattern that gives each subscriber its own view of published messages.",
    "definition": "A Service Bus topic accepts messages; subscriptions are virtual queues that receive copies, optionally filtered by rules.",
    "purpose": "Distribute an event to multiple independent consumers without having the publisher know each one.",
    "usedWhen": "Use topics when several systems need the same business event, possibly with different filters.",
    "why": "Each subscription tracks delivery and failure independently, so one slow consumer does not block all others.",
    "operatorNote": "Check each subscription's active and dead-letter counts, filters, forwarding settings, and consumer health."
  },
  {
    "group": "messaging",
    "title": "Dead-Letter Queues (DLQs)",
    "summary": "A holding area for messages the broker cannot or should not deliver normally.",
    "definition": "A dead-letter subqueue stores messages moved aside after delivery limits, expiry, explicit rejection, or configured broker conditions.",
    "purpose": "Isolate failures so they can be inspected and handled without endless redelivery.",
    "usedWhen": "Use it when a message is malformed, repeatedly fails, expires, or needs an operator decision.",
    "why": "Dead-lettering preserves evidence and keeps a bad message from blocking ordinary processing.",
    "operatorNote": "Inspect dead-letter reason and description, preserve original metadata, and reprocess only after the cause is understood."
  },
  {
    "group": "messaging",
    "title": "Poison-message handling",
    "summary": "A safe response to a message that repeatedly causes processing to fail.",
    "definition": "A poison message is one that cannot be processed successfully under current conditions, often because its payload or assumptions are invalid.",
    "purpose": "Prevent repeated failures from consuming capacity or blocking a partition or consumer.",
    "usedWhen": "Use it in queue consumers and event handlers with bounded retries and a quarantine or dead-letter path.",
    "why": "Isolation protects healthy traffic and gives support a reproducible failure to investigate.",
    "operatorNote": "Capture payload reference, exception, attempt count, and correlation context; avoid editing business data silently."
  },
  {
    "group": "messaging",
    "title": "Delivery count / Max delivery count",
    "summary": "A broker counter and threshold for repeated delivery attempts.",
    "definition": "Delivery count tracks how many times a broker has delivered a message without it being completed; a configured maximum can move it to a dead-letter queue.",
    "purpose": "Bound automatic redelivery when a consumer repeatedly abandons, times out, or fails on a message.",
    "usedWhen": "Use it to identify poison messages and control how long transient errors retry automatically.",
    "why": "A finite threshold balances recovery from brief faults with protection from retry loops.",
    "operatorNote": "A high count can indicate a slow consumer, lock expiry, or repeated exception; interpret it alongside message age and logs."
  },
  {
    "group": "messaging",
    "title": "Message retries and reprocessing",
    "summary": "Two separate recovery actions for work that failed once or remains unfinished.",
    "definition": "A retry is another processing attempt, usually automatic and soon after failure. Reprocessing is a deliberate replay of a retained or repaired message.",
    "purpose": "Recover transient failures automatically and provide a controlled route for messages that need later attention.",
    "usedWhen": "Use bounded retries for temporary dependency errors; use reprocessing after fixing data, code, or configuration.",
    "why": "Separating transient recovery from operator replay reduces duplicate work and makes recovery auditable.",
    "operatorNote": "Keep the original message ID and correlation data, record each replay, and confirm downstream operations are safe to repeat."
  },
  {
    "group": "messaging",
    "title": "RabbitMQ",
    "summary": "An open-source message broker implementing AMQP and related protocols.",
    "definition": "RabbitMQ routes messages through exchanges to queues using bindings, and supports acknowledgements, competing consumers, and pub/sub patterns.",
    "purpose": "Connect producers and consumers through broker-managed routing and buffering.",
    "usedWhen": "Use it in existing applications, self-managed platforms, or environments standardized on RabbitMQ protocols and operations.",
    "why": "It provides flexible routing patterns and a mature broker ecosystem.",
    "operatorNote": "Monitor queue depth, unacked messages, consumer count, memory, disk alarms, and broker availability."
  },
  {
    "group": "messaging",
    "title": "RabbitMQ-to-Azure-Service Bus integration",
    "summary": "A bridge that moves messages between a RabbitMQ estate and Azure's managed broker.",
    "definition": "An integration flow that consumes or forwards RabbitMQ messages and publishes corresponding messages to Service Bus, or the reverse.",
    "purpose": "Connect workloads during cloud migration, hybrid operation, or gradual broker modernization.",
    "usedWhen": "Use it when producers and consumers cannot all move at once or when Azure services need brokered work from RabbitMQ.",
    "why": "A bridge lets systems interoperate while migration happens in controlled stages.",
    "operatorNote": "Define acknowledgement boundaries, routing and header mapping, retry ownership, duplicate handling, and dead-letter behavior explicitly."
  },
  {
    "group": "messaging",
    "title": "Publish / Subscribe architecture",
    "summary": "Publishers emit events while subscribers independently receive the events they need.",
    "definition": "A communication pattern where producers publish to a broker or event channel and subscribers register interest without a direct call from the producer.",
    "purpose": "Fan out information to multiple consumers while keeping producers loosely coupled.",
    "usedWhen": "Use it for business events, notifications, cache updates, and integrations with independently deployed consumers.",
    "why": "Teams can add or change consumers without rewriting every publisher-to-consumer connection.",
    "operatorNote": "Design event contracts and subscription ownership; do not assume every subscriber processes at the same speed."
  },
  {
    "group": "messaging",
    "title": "Asynchronous messaging",
    "summary": "Communication where the sender does not wait for the receiver to finish the work.",
    "definition": "A producer hands a message to a broker or durable channel and continues; a consumer processes it later.",
    "purpose": "Move slow, bursty, or failure-prone work out of a synchronous request path.",
    "usedWhen": "Use it for background jobs, long-running operations, and systems with different availability or scaling needs.",
    "why": "It improves isolation and lets services absorb work at their own pace.",
    "operatorNote": "A successful send means accepted by the broker, not completed by a business consumer; expose status where users need it."
  },
  {
    "group": "messaging",
    "title": "Retry patterns",
    "summary": "Rules for deciding whether and when failed work should run again.",
    "definition": "A retry policy specifies retryable failures, attempt limits, delays, and what happens after the final attempt.",
    "purpose": "Recover from temporary errors without hiding permanent data or configuration problems.",
    "usedWhen": "Use for transient network, throttling, or dependency failures where another attempt can plausibly succeed.",
    "why": "Clear retry rules prevent both premature failure and unbounded loops.",
    "operatorNote": "Classify errors; honor service retry hints, cap attempts, and send exhausted messages to an observable recovery path."
  },
  {
    "group": "messaging",
    "title": "Exponential backoff",
    "summary": "A retry delay that grows after each failed attempt.",
    "definition": "An algorithm increases the wait between retries, commonly multiplying the previous delay and sometimes adding jitter.",
    "purpose": "Reduce pressure on a failing dependency while leaving time for it to recover.",
    "usedWhen": "Use it for network calls and message consumers facing temporary overload or service interruptions.",
    "why": "Spreading retries over time avoids a synchronized storm of clients repeating work at once.",
    "operatorNote": "Set a maximum delay and total retry window; jitter delays when many workers may retry together."
  },
  {
    "group": "messaging",
    "title": "Idempotency",
    "summary": "A property that makes repeating an operation safe.",
    "definition": "An idempotent operation produces the same intended result when the same request is applied more than once.",
    "purpose": "Protect business outcomes when messages or requests may be delivered again after uncertain failures.",
    "usedWhen": "Use it for payment-like actions, order updates, provisioning, and replayable consumers.",
    "why": "At-least-once delivery and timeouts make duplicates possible; idempotency turns them into safe repeats.",
    "operatorNote": "Use a stable deduplication key and persist the outcome atomically with the business change."
  },
  {
    "group": "messaging",
    "title": "Correlation IDs",
    "summary": "Identifiers that connect related work across service boundaries.",
    "definition": "A correlation ID is propagated through requests, messages, and logs to associate records that belong to one business flow.",
    "purpose": "Trace a transaction through asynchronous steps and multiple systems.",
    "usedWhen": "Use it in distributed integrations, support investigations, and replay workflows.",
    "why": "A shared identifier lets responders find related events without relying on timestamps alone.",
    "operatorNote": "Preserve it across retries and transformations; distinguish a flow correlation ID from a unique message ID."
  },
  {
    "group": "messaging",
    "title": "Message ID / Interface ID",
    "summary": "Identifiers for one message and the contract or integration route it follows.",
    "definition": "A Message ID uniquely identifies an individual message; an Interface ID names the interface, feed, or contract context that produced or handled it.",
    "purpose": "Support deduplication, audit, routing, and operational reporting across integrations.",
    "usedWhen": "Use stable identifiers in envelopes, logs, dashboards, and support tickets.",
    "why": "Consistent IDs make it possible to locate a message and understand which integration rules apply.",
    "operatorNote": "Agree field meaning and uniqueness scope across teams; never reuse an interface label as a per-message dedupe key."
  },
  {
    "group": "messaging",
    "title": "Claim-check pattern",
    "summary": "A way to send a reference to a large payload instead of the payload itself.",
    "definition": "The producer stores a large document in durable storage and places a claim-check reference and metadata in the message.",
    "purpose": "Keep broker messages small while still moving large files or documents through an asynchronous workflow.",
    "usedWhen": "Use it when payload size approaches broker limits or when large content needs separate retention and access control.",
    "why": "The queue carries lightweight routing information, while storage handles the large object efficiently.",
    "operatorNote": "Secure the referenced object, define its lifetime, and ensure the consumer can retrieve it before the link expires."
  }
];

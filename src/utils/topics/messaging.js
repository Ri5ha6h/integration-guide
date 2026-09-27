import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("messaging", title, details);
const serviceBus =
  "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions";
const rabbitReliability = "https://www.rabbitmq.com/docs/reliability";

export const messagingTopics = [
  topic("Azure Service Bus Queues", {
    summary: "A point-to-point buffer where competing consumers share work.",
    definition:
      "A Service Bus queue stores messages for one logical receiver group. Multiple consumers can compete for deliveries; in peek-lock mode a receiver locks a message, processes it, then completes, abandons, defers, or dead-letters it.",
    purpose:
      "Separate a producer from the worker that performs one unit of work and smooth differences in their processing rates.",
    usedWhen:
      "Use a queue for commands and tasks that should be handled once by one successful consumer, rather than copied to several independent subscribers.",
    why: "The sender does not have to wait for the worker to be online, and worker instances can scale independently. At-least-once redelivery means processing must tolerate duplicates.",
    example:
      "An order API enqueues `CreateShipment`; one of several workers locks the message, creates the shipment, and completes only after its durable processing record is written.",
    operatorNote:
      "Compare active count and oldest age with arrival/completion rates, then check lock loss, delivery count, consumer concurrency, and downstream response time. Don't purge a queue as a first response to backlog.",
    sources: [{ label: "Service Bus queues, topics, and subscriptions", url: serviceBus }],
  }),
  topic("Topics and Subscriptions", {
    summary: "Durable publish/subscribe fan-out with a separate queue for each subscriber.",
    definition:
      "A Service Bus topic accepts a published message and routes a copy to each matching subscription. Subscription rules can filter or transform delivery so each downstream system maintains its own backlog and settlement state.",
    purpose:
      "Let multiple consumers react independently to one business event without making the publisher call each of them directly.",
    usedWhen:
      "Use a topic when separate teams or services need the same event, with optional filters for only the event types or tenants each one owns.",
    why: "One slow subscriber does not hold up the others, and new consumers can be added behind their own subscription. Each copy needs its own retention and operational ownership.",
    example:
      "Publish `ShipmentDispatched`; billing, customer notification, and analytics subscriptions each receive a copy, while a rule lets analytics discard test-tenant events.",
    operatorNote:
      "Inspect topic ingress plus each subscription's active, dead-letter, and transfer counts; verify filter rules and subscription expiration/forwarding configuration when a consumer sees no messages.",
    sources: [{ label: "Service Bus queues, topics, and subscriptions", url: serviceBus }],
  }),
  topic("Dead-Letter Queues (DLQs)", {
    summary: "A secondary queue for messages that need investigation or controlled recovery.",
    definition:
      "Service Bus creates a dead-letter subqueue for each queue or topic subscription. Messages can be moved there after delivery limits, expiration, or explicit application rejection; they remain until an operator or process retrieves and settles them.",
    purpose:
      "Keep unprocessable or repeatedly failing work available for diagnosis instead of retrying it forever or silently discarding it.",
    usedWhen:
      "Use the DLQ as an exception path for permanent validation failures, exhausted transient retries, or messages explicitly dead-lettered by a consumer.",
    why: "A DLQ isolates poison work from the live flow and retains broker properties and dead-letter reason/description that help explain how it arrived there.",
    example:
      "A shipment with an unknown partner code is dead-lettered with reason `PartnerProfileMissing`; after the profile is corrected, an operator validates and resubmits the message.",
    operatorNote:
      "Check reason, description, original entity, enqueued time, delivery count, and business identifiers. Service Bus does not automatically clean DLQs; set ownership, retention, alert thresholds, and a reviewed replay procedure.",
    sources: [
      {
        label: "Service Bus dead-letter queues",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
      },
    ],
  }),
  topic("Poison-message handling", {
    summary: "Classifying a repeatedly failing message and taking it out of the hot retry loop.",
    definition:
      "A poison message is one whose content, contract, or processing outcome causes repeat failure. A safe handler distinguishes permanent faults (invalid schema, unsupported partner) from transient faults (temporary network or dependency outage).",
    purpose:
      "Prevent one bad message from consuming worker time indefinitely or blocking unrelated valid messages.",
    usedWhen:
      "Use bounded retries for transient failures and dead-letter/quarantine plus an actionable reason for permanent or exhausted failures.",
    why: "Blindly requeueing a deterministic failure creates a retry loop; discarding it loses business work. Quarantine preserves the evidence needed to fix and replay it.",
    example:
      "A parser rejects an unsupported EDI version once, records the interchange control reference and partner, and dead-letters it; a database timeout uses a limited delayed retry instead.",
    operatorNote:
      "Retain the original payload or a secure reference, error category, stack/validation detail, attempt count, and correlation ID. Avoid logging sensitive document contents into general telemetry.",
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
    summary: "A receive-attempt counter and configured limit for repeated delivery.",
    definition:
      "Service Bus increments a message's delivery count when it is abandoned or its peek lock expires. When the entity's configured maximum is exceeded, the broker moves the message to its dead-letter subqueue.",
    purpose:
      "Bound redelivery attempts so a repeatedly failing delivery stops consuming the normal queue's capacity.",
    usedWhen:
      "Use the counter during triage to tell a first failure from repeated settlement or lock problems; tune the maximum to the consumer's retry behavior and business tolerance.",
    why: "The threshold is a safety boundary, not an automatic retry strategy: choosing it too low sends transient failures to the DLQ, while too high can prolong a poison loop.",
    example:
      "A message's count rises after the worker abandons it on each failed dependency attempt; once it exceeds the entity's configured limit, inspect it from the DLQ.",
    operatorNote:
      "Look for repeated lock expiry, handler timeouts, slow work exceeding lock duration, abandon calls, and DLQ reason. Do not redrive the same message without fixing the underlying processing condition.",
    sources: [
      {
        label: "Service Bus dead-letter queues: maximum delivery count",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
      },
    ],
  }),
  topic("Message retries and reprocessing", {
    summary: "Automatic attempts during processing and deliberate replay after diagnosis.",
    definition:
      "A retry repeats an operation under a bounded policy when the fault may be transient. Reprocessing is an explicit later replay—often from a DLQ or archive—after an operator or workflow has understood the failure and chosen the messages to resubmit.",
    purpose:
      "Recover transient interruptions automatically while keeping permanent-failure repair deliberate and auditable.",
    usedWhen:
      "Retry brief dependency failures; reprocess after correcting a schema, partner configuration, credentials, or code defect and confirming replay is safe.",
    why: "Separating the two avoids turning manual recovery into an infinite automatic loop and preserves operator control over business side effects.",
    example:
      "Retry a 503 after the service's `Retry-After` interval for a few attempts; later replay a DLQ message only after the missing partner mapping is deployed.",
    operatorNote:
      "Before replay, confirm the send/receive outcome, business status, idempotency protection, destination, and replay selection. Record who replayed it, when, why, and the original message identity.",
    sources: [
      {
        label: "Transient fault handling",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("RabbitMQ", {
    summary: "A message broker built around exchanges, routing, queues, and acknowledgments.",
    definition:
      "RabbitMQ implements messaging protocols including AMQP 0-9-1. Publishers send to exchanges, bindings route messages to queues, and consumers receive deliveries; publisher confirms and consumer acknowledgments cover different broker handoffs.",
    purpose:
      "Route and buffer work between producers and consumers with broker-level delivery controls.",
    usedWhen:
      "Use it in systems that already depend on RabbitMQ protocols or need its routing and queueing model in a self-managed or hosted deployment.",
    why: "Exchange types and bindings support direct, fanout, topic-pattern, and header-based routing; manual acknowledgments let a consumer settle work after processing.",
    example:
      "Publish a persistent `shipment.status` message to a topic exchange with routing key `shipment.delivered`; a queue bound to `shipment.*` receives it and acknowledges after durable storage.",
    operatorNote:
      "Check publisher confirms, unroutable returns, queue durability/type, consumer acknowledgment mode, prefetch, connection/channel errors, and dead-letter routing. A consumer ack does not tell the original publisher that the business transaction succeeded.",
    sources: [
      { label: "RabbitMQ reliability guide", url: rabbitReliability },
      {
        label: "Consumer acknowledgments and publisher confirms",
        url: "https://www.rabbitmq.com/docs/confirms",
      },
    ],
  }),
  topic("RabbitMQ-to-Azure-Service Bus integration", {
    summary: "A bridge that forwards messages across two brokers with explicit delivery semantics.",
    definition:
      "A broker bridge consumes or receives from RabbitMQ, maps the envelope and headers to the target contract, and publishes to Service Bus. Each broker manages its own state; there is no shared transaction that atomically settles both sides by default.",
    purpose:
      "Connect an existing RabbitMQ producer/consumer estate to Azure-hosted workers while migrating or extending integrations incrementally.",
    usedWhen:
      "Use it for hybrid transition, staged modernization, or routing workloads across environments when replacing every producer at once is impractical.",
    why: "A controlled adapter centralizes protocol conversion, authentication, mapping, and observability, but it introduces a second queue and a duplicate/loss boundary to manage.",
    example:
      "The bridge receives a RabbitMQ delivery without acking, publishes the mapped message to Service Bus and waits for send confirmation, then acknowledges RabbitMQ; if it crashes between publish and ack, the message may be published twice.",
    operatorNote:
      "Use stable message IDs, publisher/send confirmation, delayed source acknowledgment, idempotent consumers, bounded retries, and a quarantine path. Monitor source depth, target depth, bridge lag, and per-message forwarding outcomes.",
    sources: [
      { label: "RabbitMQ reliability guide", url: rabbitReliability },
      {
        label: "Azure Service Bus overview",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview",
      },
    ],
  }),
  topic("Publish / Subscribe architecture", {
    summary: "Publishers emit an event while independent subscribers consume their own copies.",
    definition:
      "In publish/subscribe, a publisher addresses an event to a broker or event channel instead of naming each consumer. The broker fans out matching events to subscriber-specific destinations; this differs from a work queue where competing consumers divide one delivery.",
    purpose:
      "Let multiple systems respond to a business fact without making the originating service coordinate every downstream action.",
    usedWhen:
      "Use it for event fan-out, notifications, and independently owned projections or workflows. Use a command queue when one worker should own a requested action.",
    why: "Producer and consumers can evolve separately, but event contracts, subscription lifecycle, retention, and duplicate handling become shared design concerns.",
    example:
      "`OrderShipped` is published once and separately delivered to tracking, customer notifications, and analytics; a consumer outage creates backlog only on that subscription.",
    operatorNote:
      "Verify topic/exchange binding, filter, subscriber-specific queue, consumer health, backlog, schema version, and duplicate-safe handling. A successfully published event may still match no subscription.",
    sources: [
      { label: "Service Bus queues, topics, and subscriptions", url: serviceBus },
      { label: "RabbitMQ exchanges", url: "https://www.rabbitmq.com/tutorials/amqp-concepts" },
    ],
  }),
  topic("Asynchronous messaging", {
    summary: "A sender hands off work without waiting for the receiver to finish it.",
    definition:
      "An asynchronous exchange places work or an event in a broker, store, or durable handoff and lets processing continue independently. The sender may receive a transport or acceptance response before the business operation is complete.",
    purpose:
      "Decouple response time and availability so transient downstream slowness does not block every caller.",
    usedWhen:
      "Use it for background jobs, partner integrations, fan-out, long-running work, and bursts that a downstream service should process at its own pace.",
    why: "Buffering and independent consumers improve resilience and throughput control, while adding eventual completion, duplicate handling, ordering, and status-reporting requirements.",
    example:
      "The order API returns `202 Accepted` with an operation ID after enqueueing an order; the client checks a status endpoint until validation and fulfillment finish.",
    operatorNote:
      "Tell callers what acceptance means, where to find completion/failure status, expected delay, and how duplicates are handled. Monitor queue age as well as API response success.",
    sources: [
      {
        label: "Basic enterprise integration on Azure",
        url: "https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/enterprise-integration/basic-enterprise-integration",
      },
    ],
  }),
  topic("Retry patterns", {
    summary: "A policy for deciding which failures to retry, how long to wait, and when to stop.",
    definition:
      "A retry policy defines transient-fault detection, timeout, attempt count or time budget, delay strategy, and the final fallback. It should match the called service's behavior and the operation's idempotency and end-to-end latency needs.",
    purpose:
      "Recover automatically from temporary failures without amplifying an outage or repeating unsafe side effects.",
    usedWhen:
      "Retry likely transient faults such as throttling or temporary unavailability; usually fail fast for invalid input or authorization errors until the cause changes.",
    why: "Bounded, classified retries improve resilience; unbounded immediate retries can create a retry storm and delay useful failure reporting.",
    example:
      "For HTTP 429, wait at least the supplied `Retry-After`; for a transient network reset, use a short bounded backoff; for a 400 validation error, route to correction instead of retrying unchanged input.",
    operatorNote:
      "Include attempt count, delay, failure class, and total elapsed time in telemetry. Account for retries at every layer so client, workflow, SDK, and broker do not multiply into an unexpectedly long retry chain.",
    sources: [
      {
        label: "Transient fault handling",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("Exponential backoff", {
    summary: "Increasing retry delays that give a failing dependency room to recover.",
    definition:
      "Exponential backoff increases the delay after successive transient failures, often with a maximum delay and random jitter. Jitter prevents many clients that failed together from retrying in lockstep.",
    purpose:
      "Reduce pressure on a dependency while allowing a background operation to recover automatically.",
    usedWhen:
      "Use it for bounded background retries where the operation is safe to repeat; use service-provided `Retry-After` when present and include a maximum elapsed time.",
    why: "A rising wait reduces request volume during an outage compared with a tight fixed loop, but the total retry budget still must fit the business deadline.",
    example:
      "With a 2-second base, retries might wait about 2, 4, and 8 seconds plus small random jitter, capped by a configured maximum and then dead-lettered.",
    operatorNote:
      "Check the actual configured cap, jitter, number of retries, timeout per attempt, and total duration. Look for many clients retrying in sync or several nested retry policies multiplying attempts.",
    sources: [
      {
        label: "Transient fault handling: exponential backoff",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("Idempotency", {
    summary: "A repeated request or message produces the intended business effect once.",
    definition:
      "An idempotent operation recognizes a repeat of the same logical work and prevents duplicate side effects. It is commonly implemented with a stable business key and an inbox/deduplication record committed with the business change.",
    purpose:
      "Make retries and at-least-once delivery safe when the caller cannot tell whether a prior attempt completed.",
    usedWhen:
      "Use it for payment/order creation, message consumers, webhook receivers, replay tools, and any side effect that may be repeated after timeout or redelivery.",
    why: "A sender may lose the success response after the receiver committed the change; idempotency resolves the uncertainty without assuming the request was lost.",
    example:
      "A payment handler inserts the partner's unique `paymentReference` into an inbox table with a uniqueness constraint in the same transaction as the ledger entry; a repeat returns the recorded outcome.",
    operatorNote:
      "Choose a key that represents one business action, define how long it is retained, and handle same-key/different-payload conflicts explicitly. Broker duplicate detection is useful but cannot replace application-level protection for external side effects.",
    sources: [
      {
        label: "Azure Service Bus duplicate detection",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection",
      },
    ],
  }),
  topic("Correlation IDs", {
    summary: "Identifiers that let operators follow related work across services and retries.",
    definition:
      "A correlation ID is an application-level identifier propagated through a business flow, logs, traces, and messages. It groups related operations but does not necessarily uniquely identify each individual message or attempt.",
    purpose:
      "Connect one caller's request to asynchronous work, downstream dependencies, alerts, and support records.",
    usedWhen:
      "Use it across APIs, workflows, broker messages, EDI processing, and ITSM tickets; preserve trace context as well when distributed tracing is configured.",
    why: "Operators can pivot across systems without relying only on timestamps or searching by customer data that may be sensitive.",
    example:
      "An order request carries `correlationId=ord-2026-0042`; its messages and telemetry retain that value while each has a distinct message ID and retry attempt number.",
    operatorNote:
      "Propagate rather than regenerate the ID at every hop, record it in structured telemetry, and validate missing/invalid values. Do not place personal data or secrets inside identifiers.",
    sources: [
      {
        label: "Application Insights distributed tracing",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/distributed-trace-data",
      },
    ],
  }),
  topic("Message ID / Interface ID", {
    summary:
      "A unique message identifier and a separate label for the contract or integration route.",
    definition:
      "A message ID identifies one message instance for duplicate detection, audit, or replay. An interface ID is an application or organization-defined label for the integration contract/route; it is not a universal broker-standard field and should be documented with its version and ownership.",
    purpose:
      "Make each delivery traceable while also identifying which mapping, partner flow, or contract rules should process it.",
    usedWhen:
      "Use both in envelopes and logs when the system has multiple interfaces or partners; pair them with correlation IDs and the source system's business key.",
    why: "Separate identifiers answer different questions: “which copy?” versus “which integration contract?” and reduce ambiguous support searches.",
    example:
      "`messageId=7c2…`, `interfaceId=retailer-x-856-v3`, and `correlationId=shipment-8841` identify a delivery, its mapping contract, and its wider business flow.",
    operatorNote:
      "Define uniqueness scope, casing/normalization, retention, and propagation rules. Preserve partner control numbers as source identifiers rather than replacing them with a generated internal ID.",
    sources: [
      {
        label: "Azure Service Bus message properties",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messages-payloads",
      },
    ],
  }),
  topic("Claim-check pattern", {
    summary: "Store a large payload separately and send a secure reference through the broker.",
    definition:
      "The producer stores a payload in durable object storage and publishes a small claim/check message containing a reference plus integrity and routing metadata. The consumer retrieves the object using its own authorized identity or a narrowly scoped, expiring access token.",
    purpose:
      "Keep broker messages small while preserving the ability to process a large document or attachment asynchronously.",
    usedWhen:
      "Use it when payload size, broker limits, or repeated fan-out of large content makes inline message bodies inefficient.",
    why: "The broker carries lightweight control data and the payload has its own lifecycle, but producers and consumers must coordinate storage availability, access, cleanup, and replay retention.",
    example:
      "Upload a 20 MB ASN archive to a private blob, compute a SHA-256 checksum, and publish `{blobUri, checksum, contentType, messageId}`; the worker verifies the checksum before parsing.",
    operatorNote:
      "Avoid public permanent URLs. Check authorization scope/expiry, object existence, checksum, encryption, retention, cleanup ownership, and whether a replay can still access the referenced object.",
    sources: [
      {
        label: "Azure Storage introduction",
        url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction",
      },
    ],
  }),
];

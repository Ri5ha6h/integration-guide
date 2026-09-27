import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("platform", title, details);

export const azureIntegrationTopics = [
  topic("Azure Logic Apps", {
    summary: "A managed workflow service for connecting systems and coordinating steps.",
    definition:
      "A Logic App runs a workflow made of a trigger and one or more actions. Managed and built-in connectors let the workflow call services, move data, and respond to events; Consumption and Standard use different hosting and billing models.",
    purpose:
      "Make integration flow visible and operable: receive work, validate or transform it, call downstream systems, and handle branches, waits, and failures.",
    usedWhen:
      "Use it for connector-heavy workflows, scheduled synchronization, approval flows, and B2B orchestration. Choose the hosting model after checking networking, isolation, runtime features, and cost requirements.",
    why: "The run history records trigger and action outcomes, which helps an operator locate the failing step. Connectors reduce bespoke protocol code, though they do not remove the need to understand connector limits and retry behavior.",
    example:
      "A new order arrives over HTTPS, the workflow validates its partner and required fields, writes the original document to Blob Storage, then sends a normalized order to a Service Bus queue.",
    operatorNote:
      "Check whether the trigger fired, the exact failed action, connector authentication, throttling, and retry history. Before resubmitting a run, confirm whether earlier actions already made external changes.",
    sources: [
      {
        label: "What is Azure Logic Apps?",
        url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-what-are-logic-apps",
      },
    ],
  }),
  topic("Azure Functions / Function Apps", {
    summary: "Event-driven code for integration steps that need custom logic.",
    definition:
      "Azure Functions runs code in response to a trigger such as HTTP, a timer, or a brokered message. A Function App is the hosting and configuration boundary for one or more functions, which share settings, deployment, and a hosting plan.",
    purpose:
      "Add a small, independently deployable code step for validation, enrichment, protocol adaptation, or computation that is awkward to express as workflow actions.",
    usedWhen:
      "Use it for event handlers, queue consumers, scheduled jobs, and API endpoints where managed event-based scaling fits. Use an API or longer-running compute service when the request needs a consistently low-latency response or substantial long-lived processing.",
    why: "The function keeps custom code close to the event source and can scale independently from its producer. That boundary is useful only when timeouts, concurrency, and downstream capacity are designed together.",
    example:
      "A queue-triggered function validates an incoming shipment message, adds a canonical correlation ID, stores a processing record, then completes or dead-letters the delivery according to the result.",
    operatorNote:
      "Inspect invocation failures alongside host health, trigger configuration, app settings, scale/concurrency, and dependency errors. Check whether a timed-out invocation may have completed its side effect before it retried.",
    sources: [
      {
        label: "Azure Functions overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
      },
    ],
  }),
  topic("Azure Service Bus", {
    summary: "A durable enterprise broker that separates message producers from consumers.",
    definition:
      "Azure Service Bus provides managed queues and topics for asynchronous business messaging. It supports brokered delivery controls such as peek-lock, scheduled delivery, sessions, duplicate detection, and dead-letter subqueues, subject to entity and tier capabilities.",
    purpose:
      "Accept work durably, absorb bursts, and let receivers process at a pace the downstream system can sustain.",
    usedWhen:
      "Use it for commands, work items, and business messages that need durable handoff, retry, and controlled settlement. Choose a queue for competing workers or a topic when independent subscribers need their own copy.",
    why: "A broker reduces time coupling: the sender can finish after the broker accepts a message instead of waiting for every downstream dependency. Delivery is commonly at least once, so consumers must tolerate duplicates.",
    example:
      "An order API sends `OrderAccepted` with a stable `MessageId`; billing and fulfillment each receive their own subscription copy and process independently.",
    operatorNote:
      "Watch active and dead-letter counts, oldest-message age, incoming versus completed rate, throttling, and consumer exceptions. A rising backlog can mean insufficient capacity or a stalled dependency, not simply a broker issue.",
    sources: [
      {
        label: "Service Bus queues, topics, and subscriptions",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions",
      },
    ],
  }),
  topic("Azure API Management (APIM)", {
    summary: "A governed gateway and lifecycle platform for publishing APIs.",
    definition:
      "API Management combines a request gateway with a management plane and developer portal. The gateway routes calls to backends and can enforce authentication, quotas, rate limits, transformations, and observability through policies.",
    purpose:
      "Give consumers a stable, governed API surface while backend services evolve behind it.",
    usedWhen:
      "Use it when APIs need consistent access control, versioning, partner products, request shaping, or usage visibility across one or more backends.",
    why: "Shared policies put cross-cutting controls in one place and the facade prevents consumers from depending directly on every backend address and implementation.",
    example:
      "A partner presents an Entra-issued token to `/orders`; APIM checks the JWT, limits requests for the partner product, routes to the current order service, and records the request ID.",
    operatorNote:
      "Separate gateway rejection from backend failure. Trace the API operation, policy result, request ID, backend URL/status, and timeout before changing a policy or retrying a request.",
    sources: [
      {
        label: "API Management key concepts",
        url: "https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts",
      },
    ],
  }),
  topic("Azure Front Door Premium", {
    summary: "A global HTTP(S) edge for routing users to healthy application origins.",
    definition:
      "Front Door is a global layer-7 application delivery service. A profile contains endpoints and routes; origin groups define backends and health probes. Premium adds capabilities such as Private Link connectivity to supported origins and managed WAF rule sets.",
    purpose:
      "Resolve the public application entry point, route requests by host/path, and keep traffic on healthy origins while applying edge controls.",
    usedWhen:
      "Use it for internet-facing web apps and APIs serving multiple geographies or requiring edge routing, TLS termination, health-based failover, caching, or private origin access.",
    why: "Clients use one global entry point while origin selection and health decisions happen at the edge. Private origin connectivity can reduce direct public exposure, but the origin still needs to reject unintended traffic paths.",
    example:
      "`api.example.com/v1/*` routes to a primary regional APIM origin; a health probe marks it unhealthy and Front Door selects the configured secondary origin.",
    operatorNote:
      "Follow the whole chain: DNS, endpoint/domain, route match, origin group, probe path/status, WAF policy association, and origin Private Link approval. Test host headers and health paths from the configured probe context.",
    sources: [
      {
        label: "Azure Front Door documentation",
        url: "https://learn.microsoft.com/en-us/azure/frontdoor/",
      },
    ],
  }),
  topic("Azure Web Application Firewall (WAF)", {
    summary: "Layer-7 rules that inspect web requests before they reach an application.",
    definition:
      "A WAF policy applies custom match or rate-limit rules and, where supported, managed rule sets to HTTP(S) traffic. With Front Door Premium, the policy can be associated with a profile, domain, or route.",
    purpose:
      "Detect or block request patterns associated with common web exploits, unwanted methods, IP ranges, or abusive request rates.",
    usedWhen:
      "Use it for public web applications and APIs at Front Door or Application Gateway, with rules scoped to actual routes and application behavior.",
    why: "The edge can reject unwanted requests before they consume backend resources. WAF is one layer of defense; application authorization and input validation still belong in the application.",
    example:
      "Begin in Detection mode, review a managed-rule match against the API's JSON body, add a narrow exclusion only if the request is legitimate, then validate the change before Prevention mode.",
    operatorNote:
      "For a blocked request, capture policy, rule ID, match variable/value, action, host/path, and request correlation data. Check false-positive scope before disabling a rule broadly.",
    sources: [
      {
        label: "WAF on Azure Front Door",
        url: "https://learn.microsoft.com/en-us/azure/frontdoor/web-application-firewall",
      },
    ],
  }),
  topic("Azure Integration Account", {
    summary: "A managed collection of reusable artifacts for Logic Apps B2B workflows.",
    definition:
      "An Integration Account stores enterprise integration artifacts such as partner identities, agreements, schemas, maps, and certificates. Logic Apps can use linked artifacts for X12, EDIFACT, AS2, and related B2B processing.",
    purpose:
      "Keep partner contracts and shared B2B definitions separate from the workflow steps that process each message.",
    usedWhen:
      "Use it when exchanges need schema validation, EDI encoding/decoding, partner-specific agreements, or shared artifact management across workflows.",
    why: "A centrally governed artifact set makes partner behavior easier to review and update than duplicating maps and identifiers inside each flow.",
    example:
      "An AS2 agreement identifies sender and receiver, selects the X12 850 schema and acknowledgment rules, and routes the decoded purchase order to the relevant Logic App workflow.",
    operatorNote:
      "Verify the workflow-to-account link, region/subscription compatibility, artifact version, sender/receiver identifiers, agreement direction, certificate validity, and control-number state.",
    sources: [
      {
        label: "Create and manage integration accounts",
        url: "https://learn.microsoft.com/en-us/azure/logic-apps/enterprise-integration/create-integration-account",
      },
    ],
  }),
  topic("Azure Storage", {
    summary: "Cloud object, file, queue, and table storage for integration workloads.",
    definition:
      "A storage account provides namespace and configuration for services such as Blob Storage, Azure Files, Queue Storage, and Table Storage. These services have different access patterns and semantics; Queue Storage is not the same broker as Service Bus.",
    purpose:
      "Persist payloads, files, checkpoints, logs, and lightweight coordination data independently of compute instances.",
    usedWhen:
      "Use blobs for documents and large objects, Files for shared file access, Tables for simple key/attribute data, and Queue Storage for basic storage-backed work queues where its feature set fits.",
    why: "Storage provides durable data outside an individual workflow or function's lifecycle, making replay and audit possible when retention and access controls are designed intentionally.",
    example:
      "Store the raw partner EDI file in a private blob container with a content hash and received timestamp; put only its blob URI and business key on the processing queue.",
    operatorNote:
      "Check the specific service endpoint, authorization mode, network rules/private endpoint DNS, redundancy, lifecycle/retention rules, and capacity/transaction metrics. Avoid exposing account keys in run history.",
    sources: [
      {
        label: "Introduction to Azure Storage",
        url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction",
      },
    ],
  }),
  topic("Azure SQL Managed Instance", {
    summary: "A managed SQL Server database environment designed for migration compatibility.",
    definition:
      "SQL Managed Instance is a platform-as-a-service database engine that automates infrastructure tasks such as patching, backups, and much of high availability, while retaining broad SQL Server engine compatibility and instance-level features.",
    purpose:
      "Run relational workloads that need SQL Server behavior and managed operations without maintaining the database host and operating system yourself.",
    usedWhen:
      "Use it for compatible line-of-business databases, migration targets, and transactional integration state. Confirm feature compatibility, network placement, sizing, and licensing/cost before selection.",
    why: "It reduces infrastructure maintenance while preserving many SQL Server application assumptions. It is not identical to an on-premises server, and it is not a substitute for choosing a database by workload shape.",
    example:
      "An integration worker writes a unique external message key and processing status in a transaction, so a replay can detect that the same order was already committed.",
    operatorNote:
      "Check instance health, compute/storage pressure, connection limits, query waits, private DNS, firewall path, and whether the caller is reaching the expected database. Correlate SQL failures with the message attempt.",
    sources: [
      {
        label: "What is Azure SQL Managed Instance?",
        url: "https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview",
      },
    ],
  }),
  topic("Application Insights", {
    summary:
      "Application performance monitoring for requests, dependencies, exceptions, and traces.",
    definition:
      "Application Insights is an application-monitoring feature of Azure Monitor. Instrumentation collects application telemetry and can connect related requests and dependencies into an end-to-end operation view.",
    purpose:
      "Show how an application behaved from a caller's request through internal work and outbound dependencies.",
    usedWhen:
      "Use it for web APIs, Functions, and services where latency, failure rates, dependency calls, and distributed traces help diagnose production behavior.",
    why: "A correlated trace can distinguish a slow app from a slow database, broker, or remote API and can make error patterns searchable over time.",
    example:
      "Search a failed order operation by its operation ID, then compare the incoming API request duration with its SQL and Service Bus dependency spans.",
    operatorNote:
      "Check instrumentation status, sampling, operation/correlation IDs, dependency telemetry, exception details, and ingestion delay. Confirm that sensitive payloads and headers are not being collected inadvertently.",
    sources: [
      {
        label: "Application Insights overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview",
      },
    ],
  }),
  topic("Log Analytics", {
    summary: "A workspace-backed experience for collecting and querying Azure Monitor logs.",
    definition:
      "Log Analytics is the Azure portal tool used to explore Azure Monitor Logs in a Log Analytics workspace. Tables contain records from configured Azure resources and agents; retention and ingestion depend on workspace/table settings.",
    purpose:
      "Bring operational records together so responders can filter, join, summarize, and investigate them with KQL.",
    usedWhen:
      "Use it for cross-resource investigation, long-term operational queries, dashboards, and log-based alert conditions.",
    why: "A shared query environment makes it possible to compare events across services, provided the right diagnostics are enabled and records carry consistent identifiers.",
    example:
      "Query API failures and broker dead-letter events over the same 30-minute interval, then join or group them by a propagated correlation ID.",
    operatorNote:
      "Check the workspace and table first, then confirm diagnostic settings, ingestion latency, table retention, access permissions, and query time range before concluding that no events exist.",
    sources: [
      {
        label: "Azure Monitor log queries",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview",
      },
    ],
  }),
  topic("Kusto Query Language (KQL)", {
    summary: "A pipe-based query language for filtering and analyzing telemetry tables.",
    definition:
      "KQL expresses read-oriented data queries as a sequence of tabular operators. Azure Monitor Logs uses KQL, with table names and some supported behavior depending on the data source.",
    purpose:
      "Turn raw telemetry into a focused answer: identify failures, calculate rates, group by time or dimension, and inspect representative records.",
    usedWhen:
      "Use it in Log Analytics and Application Insights investigations, dashboards, and log-search alert rules.",
    why: "Composable operators let an investigator start with a time window, narrow to a service or result, and then summarize the signal without exporting the dataset.",
    example:
      "`AppRequests | where TimeGenerated > ago(1h) | summarize failures=countif(Success == false) by bin(TimeGenerated, 5m)` shows failed requests per five-minute interval when that table schema is available.",
    operatorNote:
      "Start with a bounded time range and `take` a few rows to learn the schema. Check table, timestamp column, casing, sampling, and ingestion delay before treating a zero result as proof of no traffic.",
    sources: [
      {
        label: "KQL in Azure Monitor Logs",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview",
      },
    ],
  }),
  topic("Azure Monitor / alerting concepts", {
    summary: "Signals, alert rules, and action groups that detect and route service conditions.",
    definition:
      "Azure Monitor brings together metrics, logs, traces, and platform activity. An alert rule evaluates a signal against a condition and scope; an action group defines notifications or automated actions when the rule fires.",
    purpose:
      "Surface actionable symptoms early, route them to an owner, and initiate a documented response.",
    usedWhen:
      "Use metric alerts for numeric signals and log alerts for query-based conditions; select an appropriate evaluation period, threshold, severity, and routing action.",
    why: "The alert rule turns telemetry into a response trigger, while a reusable action group centralizes who is notified and what automation runs.",
    example:
      "Alert when the oldest Service Bus message exceeds the agreed processing target for two evaluation periods, then route the alert to the integration on-call action group.",
    operatorNote:
      "An alert is evidence to investigate, not proof of root cause. Check scope, signal, evaluation window, dimensions, state, suppression/processing rules, action-group delivery, and an actionable runbook.",
    sources: [
      {
        label: "Azure Monitor alerts overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview",
      },
      {
        label: "Action groups",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups",
      },
    ],
  }),
];

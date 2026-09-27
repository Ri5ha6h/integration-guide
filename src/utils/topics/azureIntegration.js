export const azureIntegrationTopics = [
  {
    "group": "platform",
    "title": "Azure Logic Apps",
    "summary": "A visual workflow engine for connecting systems and coordinating steps.",
    "definition": "A cloud service for building workflows from triggers and actions, with a large connector ecosystem and built-in orchestration.",
    "purpose": "Coordinate multi-step integrations, approvals, schedules, and event-driven work without writing every connector from scratch.",
    "usedWhen": "Use it when the work is mostly moving, transforming, or routing data across services and the flow benefits from visible run history.",
    "why": "The workflow makes integration logic easier to inspect and change, while managed connectors reduce custom plumbing.",
    "operatorNote": "Check the run history, trigger conditions, connector authentication, and retry settings before replaying a failed run."
  },
  {
    "group": "platform",
    "title": "Azure Functions / Function Apps",
    "summary": "Run small pieces of custom code in response to events or requests.",
    "definition": "Azure Functions is an event-driven serverless compute service. A Function App is the Azure resource that hosts one or more functions and shares their configuration and hosting plan.",
    "purpose": "Add code where a workflow needs custom validation, mapping, enrichment, or a specialized protocol step.",
    "usedWhen": "Use it for short event handlers, HTTP endpoints, scheduled jobs, queue consumers, and custom integration logic.",
    "why": "It fills the gap between configurable workflow steps and a full application, with hosting and scaling managed by Azure.",
    "operatorNote": "Keep functions stateless where possible; inspect host health, bindings, app settings, scale limits, and dependency failures together."
  },
  {
    "group": "platform",
    "title": "Azure Service Bus",
    "summary": "A durable broker that buffers work between producers and consumers.",
    "definition": "A fully managed enterprise message broker supporting queues and publish/subscribe topics, with features such as dead-lettering, sessions, and duplicate detection.",
    "purpose": "Decouple services so a producer can hand off work while a consumer processes it independently.",
    "usedWhen": "Use it for business-critical commands, background work, and integration events that need durable delivery and controlled consumption.",
    "why": "The broker absorbs bursts and provides a clear place to inspect, retry, and isolate messages when downstream systems are unavailable.",
    "operatorNote": "Watch active, scheduled, and dead-letter message counts together with age of oldest message and consumer errors."
  },
  {
    "group": "platform",
    "title": "Azure API Management (APIM)",
    "summary": "A managed front door for publishing, protecting, and observing APIs.",
    "definition": "A gateway and API management platform that can expose APIs, apply policies, manage products and subscriptions, and provide a developer portal.",
    "purpose": "Give internal or external consumers a consistent API endpoint and govern how they access backend services.",
    "usedWhen": "Use it when APIs need authentication, throttling, transformation, versioning, routing, or usage visibility.",
    "why": "Policies centralize common controls so each backend does not need to implement them independently.",
    "operatorNote": "Trace a request through gateway policy execution and backend response; separate gateway errors from backend errors."
  },
  {
    "group": "platform",
    "title": "Azure Front Door Premium",
    "summary": "Global edge routing for web applications, APIs, and private origins.",
    "definition": "A global layer-7 application delivery service that routes HTTP(S) traffic using edge points of presence and supports private origin connectivity in its Premium tier.",
    "purpose": "Direct users to healthy origins, accelerate global access, and apply edge security close to the client.",
    "usedWhen": "Use it for internet-facing services that need global routing, origin health probes, caching, or a private connection to origins.",
    "why": "It can reduce latency and keep origin services less directly exposed to the public internet.",
    "operatorNote": "Check endpoint, route, origin group, health probe, DNS, and private link approval state as one path."
  },
  {
    "group": "platform",
    "title": "Azure Web Application Firewall (WAF)",
    "summary": "Rules that inspect web requests and block common application attacks.",
    "definition": "A managed firewall capability for HTTP(S) traffic, available with services such as Front Door and Application Gateway.",
    "purpose": "Filter malicious or out-of-policy requests before they reach an application.",
    "usedWhen": "Use it for public web applications and APIs where traffic should be checked against managed or custom rules.",
    "why": "It adds a layer of defense against common exploits and gives teams a place to tune web traffic controls.",
    "operatorNote": "Start with detection and logs when tuning rules; inspect rule ID, matched field, action, and false-positive scope."
  },
  {
    "group": "platform",
    "title": "Azure Integration Account",
    "summary": "A store for reusable B2B integration artifacts used by Logic Apps.",
    "definition": "A resource that holds artifacts such as schemas, maps, partners, agreements, and certificates for enterprise integration workflows.",
    "purpose": "Manage trading-partner definitions and message contracts separately from individual workflows.",
    "usedWhen": "Use it for EDI and B2B flows where parties exchange structured messages under agreed schemas and protocols.",
    "why": "Shared artifacts make partner integrations more consistent and easier to govern as the number of exchanges grows.",
    "operatorNote": "Confirm the workflow is linked to the correct account and that agreement, identity, and artifact versions match the partner."
  },
  {
    "group": "platform",
    "title": "Azure Storage",
    "summary": "Durable cloud storage for blobs, files, queues, and tables.",
    "definition": "A family of managed storage services that exposes several data models and access patterns under an Azure Storage account.",
    "purpose": "Hold files, payloads, checkpoints, and lightweight state used by applications and integration flows.",
    "usedWhen": "Use Blob Storage for objects and archives, Files for shared file access, Queues for simple storage queues, and Tables for key-value data.",
    "why": "Storage is a scalable, durable building block that keeps large or long-lived data outside an application process.",
    "operatorNote": "Review network rules, identity permissions, lifecycle policies, retention, and access-key use when diagnosing access issues."
  },
  {
    "group": "platform",
    "title": "Azure SQL Managed Instance",
    "summary": "A managed SQL Server environment with broad engine compatibility.",
    "definition": "A platform-as-a-service database offering that brings many SQL Server instance-level features into Azure while Microsoft manages much of the infrastructure.",
    "purpose": "Run relational workloads that rely on SQL Server behavior while reducing server maintenance work.",
    "usedWhen": "Use it for migrations and line-of-business systems that need a familiar SQL Server engine and network-isolated deployment.",
    "why": "It can shorten migration paths and provide managed backups, patching, and availability features.",
    "operatorNote": "Check private network routes, DNS resolution, firewall rules, capacity, and SQL connectivity separately."
  },
  {
    "group": "platform",
    "title": "Application Insights",
    "summary": "Application performance monitoring for application requests and dependencies.",
    "definition": "An application telemetry service within Azure Monitor that collects traces, requests, exceptions, dependencies, and custom events.",
    "purpose": "Understand how an application behaves and where a request failed or slowed down.",
    "usedWhen": "Use it when operators need request-level diagnostics, dependency timing, exception details, or distributed traces.",
    "why": "Connected telemetry helps turn a vague symptom into a failing operation and its dependency chain.",
    "operatorNote": "Use operation and correlation identifiers to follow one request across services; confirm sampling and telemetry configuration."
  },
  {
    "group": "platform",
    "title": "Log Analytics",
    "summary": "A workspace for collecting and querying operational log data.",
    "definition": "An Azure Monitor capability that stores logs in a workspace and lets teams explore them with Kusto Query Language.",
    "purpose": "Centralize diagnostic records from Azure resources, agents, and applications for investigation and alerting.",
    "usedWhen": "Use it for cross-resource troubleshooting, retention-based log analysis, and log-based alert rules.",
    "why": "Shared queryable logs let responders compare signals across a system instead of opening every resource separately.",
    "operatorNote": "Check the workspace, table, time range, ingestion delay, and access role before concluding that an event is absent."
  },
  {
    "group": "platform",
    "title": "Kusto Query Language (KQL)",
    "summary": "A readable query language for exploring telemetry and log tables.",
    "definition": "A pipe-based language for filtering, shaping, aggregating, and joining time-oriented data in Azure Monitor and other data services.",
    "purpose": "Turn raw events into focused evidence, trends, and alert conditions.",
    "usedWhen": "Use it in Log Analytics and Application Insights to find errors, measure latency, or correlate activity over time.",
    "why": "A repeatable query is faster to share and refine than manually scanning large log streams.",
    "operatorNote": "Start with a narrow time range and table, then add filters; use the correct timestamp and normalize identifiers before joining."
  },
  {
    "group": "platform",
    "title": "Azure Monitor / alerting concepts",
    "summary": "The shared signals, rules, and notifications used to detect service conditions.",
    "definition": "Azure Monitor gathers metrics and logs. Alert rules evaluate signals against conditions and can trigger action groups or automated responses.",
    "purpose": "Detect changes that need investigation or action and route them to the right responders.",
    "usedWhen": "Use metric alerts for fast numeric signals and log alerts for conditions found by querying event data.",
    "why": "Alerts reduce time spent discovering outages when thresholds represent actionable symptoms.",
    "operatorNote": "Tune severity, evaluation window, dimensions, suppression, and action group; alert on user impact rather than noisy internals."
  }
];

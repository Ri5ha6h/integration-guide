import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("platform", title, details);

export const azureIntegrationTopics = [
  topic("Azure Logic Apps", {
    summary: "A workflow service that connects systems and runs business steps.",
    definition:
      "A Logic App runs a workflow. A trigger starts it; actions then call services, move data, or respond to events. Consumption and Standard are two hosting and billing options.",
    purpose:
      "Use a visible workflow to receive work, check or change data, call other systems, and handle branches, waits, and errors.",
    usedWhen:
      "Choose Logic Apps for workflows that use connectors, run on a schedule, need approvals, or coordinate business-to-business exchanges. Choose a hosting option after you check network, isolation, features, and cost.",
    why: "Run history shows which trigger and action ran or failed. Connectors reduce custom connection code, but each connector has limits and retry rules.",
    example:
      "A workflow receives an order over HTTPS, checks the partner and required fields, saves the original document in Blob Storage, then sends a standard order to a Service Bus queue.",
    operatorNote:
      "Check whether the trigger ran, which action failed, connector sign-in, throttling, and retry history. Before you submit the run again, check whether an earlier step already changed another system.",
    sources: [
      {
        label: "What is Azure Logic Apps?",
        url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-what-are-logic-apps",
      },
    ],
  }),
  topic("Azure Functions / Function Apps", {
    summary: "Code that runs when an event or schedule starts it.",
    definition:
      "Azure Functions runs code after a trigger, such as an HTTP request, timer, or message. A Function App hosts one or more functions and holds their settings and hosting plan.",
    purpose:
      "Add one small code step for a check, data enrichment, protocol conversion, or calculation that is hard to build with workflow actions.",
    usedWhen:
      "Use Functions for event handlers, queue workers, scheduled jobs, or APIs that can use event-based scaling. For steady low response times or long-running work, choose a service built for those needs.",
    why: "A function runs near the event and can scale apart from the sender. Set timeouts and parallel work to match the capacity of the services it calls.",
    example:
      "A queue-triggered function checks a shipment message, adds a correlation ID, saves a processing record, then completes or dead-letters the message based on the result.",
    operatorNote:
      "Check failed runs, host health, trigger settings, app settings, scale and concurrency, and dependency errors. A timed-out run may have changed another system before it retried.",
    sources: [
      {
        label: "Azure Functions overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
      },
    ],
  }),
  topic("Azure Service Bus", {
    summary: "A message broker that holds work until receivers can process it.",
    definition:
      "Azure Service Bus provides managed queues and topics for business messages. Features include peek-lock, scheduled delivery, sessions, duplicate detection, and dead-letter queues. Available features depend on the entity and service tier.",
    purpose:
      "Store work safely, absorb bursts, and let receivers process it at a pace the next system can handle.",
    usedWhen:
      "Use it for commands, work items, and business messages that need a reliable handoff, retries, or controlled completion. Choose a queue for competing workers, or a topic when separate subscribers each need a copy.",
    why: "The sender can finish after Service Bus accepts a message instead of waiting for every receiving system. Messages can be delivered more than once, so receivers must handle duplicates.",
    example:
      "An order API sends an OrderAccepted message with a stable message ID. Billing and fulfillment each receive their own subscription copy and process it independently.",
    operatorNote:
      "Watch active and dead-letter counts, oldest-message age, incoming and completed rates, throttling, and consumer errors. A growing backlog can mean workers lack capacity or a dependency has stopped responding.",
    sources: [
      {
        label: "Service Bus queues, topics, and subscriptions",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions",
      },
    ],
  }),
  topic("Azure API Management (APIM)", {
    summary: "A gateway for publishing, protecting, and managing APIs.",
    definition:
      "API Management includes a gateway, a management service, and a developer portal. The gateway sends calls to backend services and can apply sign-in checks, quotas, rate limits, data changes, and monitoring rules called policies.",
    purpose:
      "Give API users one stable, controlled way to reach services while the services behind it can change.",
    usedWhen:
      "Use it when APIs need shared access rules, versions, partner plans, request changes, or usage reports across one or more backend services.",
    why: "Shared policies keep common controls in one place. The gateway also means API users do not need to depend on each backend address or design.",
    example:
      "A partner sends an Entra access token to the orders API. APIM checks the token, limits the partner's requests, sends the call to the current order service, and records a request ID.",
    operatorNote:
      "Find out whether APIM or the backend rejected the call. Check the API operation, policy result, request ID, backend address and status, and timeout before changing a policy or retrying.",
    sources: [
      {
        label: "API Management key concepts",
        url: "https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts",
      },
    ],
  }),
  topic("Azure Front Door Premium", {
    summary: "A global service that sends web requests to healthy application servers.",
    definition:
      "Front Door routes web traffic around the world. Routes match a host name and path; origin groups list backend services and health checks. Premium can connect to supported backends through Private Link and use managed WAF rules.",
    purpose:
      "Provide one public address for an application, choose a healthy backend, and apply controls near the user.",
    usedWhen:
      "Use it for public websites and APIs that serve different regions or need edge routing, TLS, failover, caching, or private backend access.",
    why: "Clients use one global address while Front Door checks backend health and chooses where to send each request. Private Link reduces public exposure, but the backend must still block unwanted paths.",
    example:
      "Requests for api.example.com/v1 go to the main regional APIM service. If its health check fails, Front Door sends requests to the configured backup.",
    operatorNote:
      "Check DNS, the endpoint and domain, route match, origin group, health-check path and result, WAF policy, and Private Link approval. Test the host name and health path from the health check location.",
    sources: [
      {
        label: "Azure Front Door documentation",
        url: "https://learn.microsoft.com/en-us/azure/frontdoor/",
      },
    ],
  }),
  topic("Azure Web Application Firewall (WAF)", {
    summary: "Rules that check web requests before they reach an application.",
    definition:
      "A WAF policy uses custom rules and, where supported, managed rule sets to check web traffic. A rule can match request details or limit request rates. With Front Door Premium, attach the policy to a profile, domain, or route.",
    purpose:
      "Find or block common web attacks, unwanted methods, selected IP addresses, or excessive request rates.",
    usedWhen:
      "Use it to protect public websites and APIs at Front Door or Application Gateway. Match rules to the routes and requests your application uses.",
    why: "A WAF can block unwanted requests before they use backend resources. The application must still check user access and validate input.",
    example:
      "Start in Detection mode. Review a managed-rule match against a valid API request, add a narrow exception if needed, and check the change before switching to Prevention mode.",
    operatorNote:
      "For a blocked request, record the policy, rule ID, matched field and value, action, host, path, and request ID. Check the scope of a false positive before disabling a rule.",
    sources: [
      {
        label: "WAF on Azure Front Door",
        url: "https://learn.microsoft.com/en-us/azure/frontdoor/web-application-firewall",
      },
    ],
  }),
  topic("Azure Integration Account", {
    summary: "A shared store for B2B partner details and EDI rules used by Logic Apps.",
    definition:
      "An Integration Account stores partner identities, agreements, schemas, maps, and certificates. Logic Apps can use these items to process X12, EDIFACT, AS2, and other B2B exchanges.",
    purpose:
      "Keep shared partner rules and documents separate from the workflow steps that process each message.",
    usedWhen:
      "Use it when partner exchanges need schema checks, EDI conversion, partner agreements, or shared artifacts across workflows.",
    why: "A shared set of partner rules is easier to review and update than copies of maps and IDs inside many workflows.",
    example:
      "An AS2 agreement names the sender and receiver, selects the X12 850 schema and acknowledgment rules, then sends the decoded purchase order to a Logic App.",
    operatorNote:
      "Check the workflow link, region and subscription, artifact version, partner IDs, agreement direction, certificate expiry, and control-number state.",
    sources: [
      {
        label: "Create and manage integration accounts",
        url: "https://learn.microsoft.com/en-us/azure/logic-apps/enterprise-integration/create-integration-account",
      },
    ],
  }),
  topic("Azure Storage", {
    summary: "Cloud storage for objects, shared files, simple tables, and basic queues.",
    definition:
      "A storage account provides Blob Storage, Azure Files, Queue Storage, and Table Storage. Each service works differently. Queue Storage is a basic storage queue, not the same message broker as Service Bus.",
    purpose:
      "Keep documents, files, checkpoints, logs, and small coordination records outside a workflow or function.",
    usedWhen:
      "Use Blob Storage for documents and large objects, Azure Files for shared files, Tables for simple key-value records, and Queue Storage for basic work queues when its features are enough.",
    why: "Data remains available after a workflow or function stops. This supports replay and audit when access and retention rules are set.",
    example:
      "Save the original partner EDI file in a private blob with its hash and received time. Put only the blob address and business key on the processing queue.",
    operatorNote:
      "Check the service address, sign-in method, network rules and private DNS, data copies, retention rules, and capacity or transaction measures. Keep account keys out of run history.",
    sources: [
      {
        label: "Introduction to Azure Storage",
        url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction",
      },
    ],
  }),
  topic("Azure SQL Managed Instance", {
    summary: "A managed SQL Server database service for workloads that need SQL Server features.",
    definition:
      "SQL Managed Instance is a managed database service. Microsoft handles tasks such as patching and backups, while the service keeps many SQL Server features used by existing applications.",
    purpose:
      "Run business databases without managing the database server and operating system yourself.",
    usedWhen:
      "Use it for compatible business databases, migrations, and integration records. Check feature support, network location, size, and cost before you choose it.",
    why: "It reduces server maintenance and keeps many SQL Server features. It still differs from a local SQL Server, so match the database to the workload.",
    example:
      "An integration worker saves a message ID and its processing status in one transaction. On replay, it can check whether the order was already saved.",
    operatorNote:
      "Check instance health, CPU and storage pressure, connection limits, query waits, private DNS, firewall route, and target database. Match SQL errors to the message attempt.",
    sources: [
      {
        label: "What is Azure SQL Managed Instance?",
        url: "https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview",
      },
    ],
  }),
  topic("Application Insights", {
    summary: "Monitoring for application requests, dependencies, errors, and traces.",
    definition:
      "Application Insights is part of Azure Monitor. It collects application monitoring data and can link related requests and service calls into one trace.",
    purpose:
      "Show what happened from a user's request through the application and the services it called.",
    usedWhen:
      "Use it for web APIs, Functions, and services where response time, failures, service calls, and traces help explain production problems.",
    why: "A linked trace can show whether a slow response came from the app, database, message broker, or another API. It also makes error patterns easier to search.",
    example:
      "Find a failed order by its operation ID, then compare the API request time with its SQL and Service Bus calls.",
    operatorNote:
      "Check that monitoring is enabled, how data is sampled, operation IDs, service-call data, errors, and how long records take to appear. Make sure logs do not collect private message data or headers.",
    sources: [
      {
        label: "Application Insights overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview",
      },
    ],
  }),
  topic("Log Analytics", {
    summary: "A tool for searching and comparing Azure Monitor logs.",
    definition:
      "Log Analytics is the Azure portal tool for querying Azure Monitor Logs in a workspace. Configured resources and agents send records to a workspace. Diagnostic settings control which records are sent; workspace and table settings control how long they are kept.",
    purpose: "Search records from different services together to investigate an issue with KQL.",
    usedWhen:
      "Use it to investigate several resources, write repeatable queries, build dashboards, and create alerts from logs.",
    why: "One query space lets responders compare events across services when logging is enabled and records share useful IDs.",
    example:
      "Search API errors and broker dead-letter events from the same 30 minutes, then group them by correlation ID.",
    operatorNote:
      "Check the workspace and table, logging settings, time before records appear, retention, access, and time range before deciding that no records exist.",
    sources: [
      {
        label: "Azure Monitor log queries",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview",
      },
    ],
  }),
  topic("Kusto Query Language (KQL)", {
    summary: "A query language for filtering and summarizing monitoring data.",
    definition:
      "KQL queries use steps to read and analyze tables. Azure Monitor Logs uses KQL, but table names and fields depend on the data source.",
    purpose:
      "Find errors, calculate rates, group events by time or type, and inspect example records.",
    usedWhen:
      "Use it in Log Analytics and Application Insights to investigate issues, build dashboards, and create log alerts.",
    why: "You can start with a time range, narrow the data to a service or result, then summarize it without exporting the records.",
    example:
      "The query AppRequests | where TimeGenerated > ago(1h) | summarize failures=countif(Success == false) by bin(TimeGenerated, 5m) shows failed requests per five minutes when those fields exist.",
    operatorNote:
      "Start with a short time range and view a few rows to learn the table fields. Check the table, time field, spelling, sampling, and time before records appear before treating an empty result as proof that no requests occurred.",
    sources: [
      {
        label: "KQL in Azure Monitor Logs",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview",
      },
    ],
  }),
  topic("Azure Monitor / alerting concepts", {
    summary:
      "Monitoring data, alert rules, and actions that bring service problems to an owner's attention.",
    definition:
      "Azure Monitor collects metrics, logs, traces, and resource activity. An alert rule checks a signal against a condition and scope. An action group lists who or what to notify when the rule fires.",
    purpose:
      "Find important service problems early, send them to an owner, and start a known response.",
    usedWhen:
      "Use metric alerts for numbers and log alerts for query results. Choose a time window, limit, severity, and notification route that fit the signal.",
    why: "An alert rule turns monitoring data into a response. Action groups keep notification and automation settings in one place.",
    example:
      "Alert when the oldest Service Bus message stays above the agreed processing limit for two checks, then notify the integration on-call team.",
    operatorNote:
      "Treat an alert as a reason to investigate. Check its scope, signal, time window, dimensions, state, suppression rules, notification delivery, and response guide.",
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

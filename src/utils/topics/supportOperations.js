export const supportOperationsTopics = [
  {
    "group": "operations",
    "title": "ServiceNow",
    "summary": "An IT service management platform for recording and coordinating operational work.",
    "definition": "ServiceNow provides workflows for incidents, requests, changes, knowledge, and other service processes.",
    "purpose": "Give support teams a shared system of record for issues, ownership, communication, and resolution history.",
    "usedWhen": "Use it to route incidents and service requests, coordinate escalations, and report operational performance.",
    "why": "A consistent record keeps handoffs, decisions, and service commitments visible.",
    "operatorNote": "Keep the ticket actionable: service, impact, timestamps, owner, evidence, and next update should be clear."
  },
  {
    "group": "operations",
    "title": "Incident Management",
    "summary": "The process for restoring a service after an unplanned interruption.",
    "definition": "Incident management logs, classifies, prioritizes, assigns, communicates, and resolves service disruptions.",
    "purpose": "Restore service quickly and give affected users accurate updates while the cause is investigated.",
    "usedWhen": "Use it for outages, degradation, failed integrations, security events, and recurring operational faults.",
    "why": "A common workflow coordinates responders and preserves a timeline of impact and action.",
    "operatorNote": "Record symptoms and scope separately from the suspected root cause; link related alerts, changes, and incidents."
  },
  {
    "group": "operations",
    "title": "Service Request handling",
    "summary": "The process for fulfilling a standard user request.",
    "definition": "A service request is a request for a known service or access action that follows an established fulfillment path.",
    "purpose": "Deliver repeatable services such as access, information, or standard configuration changes.",
    "usedWhen": "Use it for routine work that is not an interruption or fault and can follow an agreed catalog workflow.",
    "why": "A defined request path improves consistency, approval, and completion tracking.",
    "operatorNote": "Clarify requester, approval, fulfillment owner, expected timing, and evidence of completion."
  },
  {
    "group": "operations",
    "title": "P1 / P2 / P3 / P4 classification",
    "summary": "A shared urgency scale for prioritizing service incidents.",
    "definition": "Priority levels classify incidents using organizational rules, commonly combining impact and urgency; exact definitions vary by service.",
    "purpose": "Direct response effort and escalation according to the size and immediacy of user impact.",
    "usedWhen": "Use the service's documented matrix when logging and reviewing an incident.",
    "why": "Consistent priority helps responders agree on response expectations and communication cadence.",
    "operatorNote": "Base priority on demonstrated impact and urgency, then reclassify as facts change; do not assume universal P1–P4 meanings."
  },
  {
    "group": "operations",
    "title": "SLA tracking",
    "summary": "Tracking whether service commitments are met over time.",
    "definition": "A service-level agreement defines measurable service expectations; tracking compares actual response or resolution events to those targets.",
    "purpose": "Make service performance and operational commitments visible to customers and teams.",
    "usedWhen": "Use it for incident response and resolution targets, request fulfillment, and service reporting.",
    "why": "Timely visibility helps teams act before commitments are missed and learn where capacity is needed.",
    "operatorNote": "Know which clock applies, when it pauses, business hours, priority rules, and the authoritative timestamps."
  },
  {
    "group": "operations",
    "title": "Major Incident Management",
    "summary": "A coordinated response for an incident with broad or severe impact.",
    "definition": "A major-incident process brings responders, service owners, and communications together under a clear command structure.",
    "purpose": "Restore high-impact services quickly while keeping decisions and updates coordinated.",
    "usedWhen": "Use it when impact crosses a defined threshold such as widespread users, critical business functions, or severe risk.",
    "why": "A focused response reduces conflicting work and gives stakeholders a reliable update channel.",
    "operatorNote": "Assign an incident lead, technical workstreams, and communications owner; keep a timestamped decision log."
  },
  {
    "group": "operations",
    "title": "Monitoring and alert triage",
    "summary": "The first assessment of an alert to determine whether action is needed.",
    "definition": "Triage validates a monitoring signal, its scope, severity, recent changes, and the appropriate response path.",
    "purpose": "Separate actionable incidents from expected behavior, duplicates, and noisy alerts.",
    "usedWhen": "Use it whenever a monitoring notification reaches an on-call or support queue.",
    "why": "Fast, evidence-based triage reduces both response delay and alert fatigue.",
    "operatorNote": "Check the affected service, time window, customer impact, recent changes, and correlated signals before routing."
  },
  {
    "group": "operations",
    "title": "L1 / L2 troubleshooting",
    "summary": "Frontline diagnosis using runbooks, known fixes, and service context.",
    "definition": "L1 typically performs intake and basic checks; L2 applies deeper service or platform troubleshooting within documented operational boundaries.",
    "purpose": "Resolve common issues quickly and gather useful evidence when specialist help is needed.",
    "usedWhen": "Use it for initial incident diagnosis, routine queue issues, connectivity checks, and known recovery procedures.",
    "why": "Clear support layers make first response efficient and escalations more informative.",
    "operatorNote": "Follow approved runbooks, record what was checked, and preserve message or request identifiers for the next team."
  },
  {
    "group": "operations",
    "title": "L3 escalation",
    "summary": "A handoff to engineering or a specialist for complex product or code issues.",
    "definition": "L3 is an escalation level that investigates problems requiring deeper design, code, platform, or vendor expertise; exact ownership differs by organization.",
    "purpose": "Bring a difficult issue to the team that can diagnose or change the underlying implementation.",
    "usedWhen": "Use it after standard operational checks fail or when evidence points to a code defect, design limit, or platform issue.",
    "why": "Specialists can address systemic causes that frontline support cannot safely change.",
    "operatorNote": "Provide impact, timeline, reproduction details, correlation and message IDs, logs, changes, and actions already attempted."
  },
  {
    "group": "operations",
    "title": "Standard message reprocessing",
    "summary": "A controlled replay of an individual message after its failure cause is resolved.",
    "definition": "Standard reprocessing selects a known message and returns it to the normal consumer path using an approved procedure.",
    "purpose": "Recover a single failed transaction while preserving its traceability and expected contract.",
    "usedWhen": "Use it for a transient or corrected failure when the message is safe to process again.",
    "why": "A consistent procedure limits accidental data changes and makes the recovery auditable.",
    "operatorNote": "Confirm root cause, deduplication behavior, target environment, payload integrity, and the result after replay."
  },
  {
    "group": "operations",
    "title": "Bulk reprocessing concepts",
    "summary": "A governed way to replay a bounded set of failed messages.",
    "definition": "Bulk reprocessing selects messages by defined criteria and replays them in controlled batches with progress and outcome tracking.",
    "purpose": "Recover a backlog after a common fault has been corrected.",
    "usedWhen": "Use it when many messages share a verified cause and individual replay would be too slow or inconsistent.",
    "why": "Batching makes recovery more efficient while allowing operators to limit downstream load.",
    "operatorNote": "Preview the selection, preserve an audit list, rate-limit batches, watch downstream health, and stop safely on new failures."
  },
  {
    "group": "operations",
    "title": "Queue administration",
    "summary": "Operational control of queue health, access, and message recovery.",
    "definition": "Queue administration includes monitoring depth and age, managing configuration and permissions, and handling dead-letter or stuck messages.",
    "purpose": "Keep brokered work flowing and make exceptional recovery safe and accountable.",
    "usedWhen": "Use it during backlog response, consumer outages, access changes, and planned maintenance.",
    "why": "A named operating process prevents ad hoc destructive actions and surfaces capacity problems early.",
    "operatorNote": "Prefer peek and inspect before receive or purge; coordinate with consumer owners before changing locks or replaying work."
  },
  {
    "group": "operations",
    "title": "Monitoring administration",
    "summary": "Maintaining the rules and routes that turn telemetry into operational action.",
    "definition": "Monitoring administration covers data sources, dashboards, alert rules, action groups, ownership, and noise management.",
    "purpose": "Keep operational signals accurate, actionable, and delivered to the right support path.",
    "usedWhen": "Use it when onboarding services, tuning alert thresholds, changing ownership, or reviewing alert gaps.",
    "why": "Well-maintained monitoring reduces missed incidents and unnecessary pages.",
    "operatorNote": "Version alert changes, test routing, set clear owners, and review whether each alert leads to a defined action."
  },
  {
    "group": "operations",
    "title": "Certificate monitoring",
    "summary": "Tracking certificate validity and renewal readiness for every service endpoint.",
    "definition": "Certificate monitoring records expiry dates and related health signals, then alerts owners before trust chains become invalid.",
    "purpose": "Give service owners time to renew, deploy, and verify certificates without interrupting traffic.",
    "usedWhen": "Use it for API gateways, websites, partner links, internal TLS, and certificate-based identities.",
    "why": "An early warning turns a sudden outage into planned maintenance.",
    "operatorNote": "Alert at multiple lead times, include the endpoint and owner, and verify the live served certificate after renewal."
  }
];

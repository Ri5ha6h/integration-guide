import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("operations", title, details);
const incidentDocs =
  "https://www.servicenow.com/docs/r/it-service-management/incident-management/c_IncidentManagement.html";

export const supportOperationsTopics = [
  topic("ServiceNow", {
    summary: "A platform for recording and coordinating IT support work.",
    definition:
      "ServiceNow is a configurable business platform. Its IT support features include incidents, service requests, problems, changes, knowledge, and service targets. Each organization can set up its own records, fields, routing, and automation.",
    purpose: "Keep support work, owners, status, communication, and evidence in one shared place.",
    usedWhen:
      "Use it to record service interruptions, fulfill standard requests, manage escalations, link changes to affected services, and report service results.",
    why: "A shared ticket shows who owns the work and what has happened. It does not replace monitoring data, a runbook, or a checked technical fix.",
    example:
      "A Service Bus backlog alert creates or updates an incident with the namespace, queue, oldest message age, affected integration, and runbook link.",
    operatorNote:
      "Keep the owner group, affected service or configuration item, priority, customer impact, times, updates, and evidence current. Follow the local workflow because each organization can set up ServiceNow differently.",
    sources: [{ label: "ServiceNow Incident Management", url: incidentDocs }],
  }),
  topic("Incident Management", {
    summary: "The work to restore a service after an unplanned interruption.",
    definition:
      "Incident Management records, prioritizes, investigates, and resolves an unplanned service interruption. Its first goal is to restore service and reduce impact. A separate problem review can continue to find the root cause.",
    purpose: "Restore service safely and keep users and responders informed.",
    usedWhen:
      "Use it for an outage, slow service, repeated integration failure, harmful queue delay, or security or availability event that needs a coordinated response.",
    why: "One incident record shows the impact, owner, priority, timeline, related alerts, and current recovery work.",
    example:
      "When an APIM dependency failure blocks all order submissions, create an incident, link the alert and recent change, assign the integration team, and record recovery updates.",
    operatorNote:
      "Record user impact, start time, scope, workaround, and priority. Update them when facts change. Service can be restored before the team finds the full cause.",
    sources: [{ label: "ServiceNow Incident Management", url: incidentDocs }],
  }),
  topic("Service Request handling", {
    summary: "A process for completing a planned, standard request.",
    definition:
      "A service request asks for an approved service, information, or access. An incident reports an unplanned interruption or drop in service.",
    purpose:
      "Handle routine user and partner needs with the right approvals, identity checks, and completion record.",
    usedWhen:
      "Use it for planned access, onboarding, dashboard access, permission to read a queue, or certificate renewal through an approved process.",
    why: "A request process makes routine work predictable and keeps it separate from work to restore an outage.",
    example:
      "A partner requests an APIM subscription. The request records the API product, technical owner, business approval, and intended expiry before access is set up.",
    operatorNote:
      "Check who made the request, required approvals, scope, security rules, and completion steps. If the request reports a current service failure, link or create an incident.",
    sources: [
      {
        label: "ServiceNow IT Service Management",
        url: "https://www.servicenow.com/products/itsm.html",
      },
    ],
  }),
  topic("P1 / P2 / P3 / P4 classification", {
    summary: "Priority levels based on business impact and urgency.",
    definition:
      "Priority levels use an organization's impact and urgency rules to order incident work. P1 to P4 labels and exact limits differ between organizations. Use the approved local definitions.",
    purpose:
      "Set response effort, notifications, escalation, and update frequency in a consistent way.",
    usedWhen:
      "Use the agreed priority rules when creating or updating an incident. Review the priority if impact, scope, or workaround changes.",
    why: "Shared impact rules help teams coordinate. Choose priority based on the effect on the business, not only on a technical alert.",
    example:
      "A full outage that blocks all partner orders may meet the local P1 definition. A delayed report with a working manual option may have lower priority if local rules say so.",
    operatorNote:
      "Record the impact, urgency, affected business process, number of affected users or partners, and workaround. Use local definitions for P1 to P4 and response targets.",
    sources: [
      {
        label: "ServiceNow Incident Management overview",
        url: "https://www.servicenow.com/products/itsm/what-is-incident-management.html",
      },
    ],
  }),
  topic("Service-level agreement (SLA) tracking", {
    summary: "Tracking response, restoration, and request targets in a service agreement.",
    definition:
      "A service-level agreement (SLA) sets service targets and how to measure elapsed time. A ticket may start, pause, resume, or stop its SLA clock based on priority, work hours, status, and agreement rules.",
    purpose:
      "Show whether support targets are being met and warn the team before a target is missed.",
    usedWhen:
      "Use it for agreed incident response and repair times, or service request completion targets.",
    why: "Visible timers help teams act in time when they know how the clock and exceptions work.",
    example:
      "A P2 incident has a four-business-hour response target. The timer uses the service calendar, and the assigned team records its first useful response.",
    operatorNote:
      "Check which SLA applies, clock start and stop rules, priority changes, work calendar and time zone, and breach warnings. A wrong ticket type or field can make the clock wrong.",
    sources: [{ label: "ServiceNow Incident Management reporting", url: incidentDocs }],
  }),
  topic("Major Incident Management", {
    summary: "A faster, coordinated response to a disruption with major business impact.",
    definition:
      "Major Incident Management uses agreed triggers, roles, updates, and decisions for a disruption that is too large for routine incident handling. The organization may promote an incident or create a related parent record.",
    purpose:
      "Bring responders and decision-makers together quickly and keep one clear record of status and recovery work.",
    usedWhen:
      "Use it for severe or widespread loss of an important service or when the organization's impact rules require it.",
    why: "Clear leads, technical work groups, and regular updates reduce repeated investigation and conflicting messages.",
    example:
      "A region-wide integration outage is declared a major incident. The incident lead coordinates updates while network, identity, and integration teams investigate.",
    operatorNote:
      "Use local rules to declare a major incident. Name the incident and technical leads, log decisions with times, share impact and next update time, and link related incidents and changes.",
    sources: [
      {
        label: "Managing major incidents",
        url: "https://www.servicenow.com/docs/r/it-service-management/incident-management/major-incident-management.html",
      },
    ],
  }),
  topic("Monitoring and alert triage", {
    summary: "Check an alert, find who and what it affects, and send it to the right owner.",
    definition:
      "Alert triage checks whether an alert describes a current problem, finds the affected service and scope, compares related events, and chooses the next action.",
    purpose: "Turn a system alert into a useful incident or a clear reason to take no action.",
    usedWhen:
      "Use it for service health, certificate, network, app, queue, and business-flow alerts.",
    why: "Many alerts can describe one incident. Checking related evidence helps prevent duplicate tickets and missed impact.",
    example:
      "Before creating an incident for a dead-letter alert, check recent changes, affected partners, queue age, worker logs, and the alert limit to see if one cause explains the messages.",
    operatorNote:
      "Check the alert scope, time range, state, current measure or query, recent changes, related alerts, customer impact, and first safe checks in the runbook. Keep the alert ID and times.",
    sources: [
      {
        label: "Azure Monitor alerts overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview",
      },
    ],
  }),
  topic("Level 1 and 2 troubleshooting", {
    summary: "First- and second-level checks using service details and approved guides.",
    definition:
      "Level 1 (L1) checks the alert or ticket, user impact, basic service health, and known workarounds. Level 2 (L2) checks service settings, logs, queue or message state, and connected services within its access and guide.",
    purpose:
      "Fix known faults quickly and collect useful evidence when a specialist must take over.",
    usedWhen:
      "Use it for the first incident checks, common sign-in or network problems, settings checks, and approved single-message recovery.",
    why: "A repeatable check order reduces guesswork and gives specialists useful evidence without giving every responder broad production access.",
    example:
      "L1 confirms which partner and service are affected. L2 checks the Logic App run ID, connector status, queue delivery count, and correlation ID with approved read-only tools.",
    operatorNote:
      "Use only approved access. Keep times and IDs, follow change rules, and do not delete or replay messages during diagnosis unless the runbook allows it.",
    sources: [{ label: "ServiceNow Incident Management", url: incidentDocs }],
  }),
  topic("Level 3 escalation", {
    summary: "Send a complex or repeated fault to engineering or a specialist.",
    definition:
      "Level 3 (L3) escalation asks a team with deeper access to inspect code, service settings, vendor behavior, or design choices. The support team must keep incident ownership and updates clear during the handoff.",
    purpose: "Get help for faults that routine checks and recovery guides cannot fix.",
    usedWhen:
      "Use it for repeatable software faults, unexplained data changes, broad performance problems, code changes, or failures that return after a verified workaround.",
    why: "A clear evidence package lets engineers start at the failure instead of repeating first checks.",
    example:
      "Send the failing Logic App run link, cleaned action inputs, UTC times, correlation and message IDs, expected and actual results, recent changes, and impact or workaround.",
    operatorNote:
      "State the question or decision needed. Share safe evidence and steps to repeat the fault, name a technical owner, and keep incident updates going until service is restored.",
    sources: [{ label: "ServiceNow Incident Management", url: incidentDocs }],
  }),
  topic("Standard message reprocessing", {
    summary: "Review and resend one failed message after checking the cause and business result.",
    definition:
      "Standard reprocessing selects one failed message, fixes its cause, checks its business status, and sends it again through an approved path. It keeps the original ID and audit record.",
    purpose: "Recover one transaction without changing other messages or losing its history.",
    usedWhen:
      "Use it when one message failed for a known cause that is now fixed, such as a corrected map or partner setting.",
    why: "Handling one message at a time limits the effect of a mistake and makes the result easier to compare with the source and destination.",
    example:
      "After fixing an item-code map, an approved operator inspects the dead-lettered shipment notice, checks that the order is still open, and sends a replay linked to the original message ID.",
    operatorNote:
      "Inspect before receiving or resending. Check duplicate protection, route, content, permission, and destination status. Record the original and replay IDs, operator, reason, and result.",
    sources: [
      {
        label: "Service Bus dead-letter queues and reprocessing",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues",
      },
    ],
  }),
  topic("Bulk reprocessing concepts", {
    summary: "Resend a checked group of failed messages at a controlled speed.",
    definition:
      "Bulk reprocessing sets which messages to select, previews and approves the set, controls send order and speed, records each result, and defines when to stop and reconcile.",
    purpose:
      "Recover many messages after fixing a shared fault without overloading the systems that receive them.",
    usedWhen:
      "Use it only when the affected messages can be selected precisely and replay is safe for every message type.",
    why: "Batch limits reduce repeated work and give the team a clear point to stop before a new fault spreads.",
    example:
      "Preview all version 3 documents moved to the dead-letter queue during a 20-minute bad deployment. Resend 100 at a time and pause if failures exceed the agreed limit.",
    operatorNote:
      "Save the selected IDs first. Exclude work already completed at the destination, limit send speed, watch destination delays and queue size, stop on new failures, then compare attempted, successful, and failed counts.",
    sources: [
      {
        label: "Azure Well-Architected transient fault guidance",
        url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults",
      },
    ],
  }),
  topic("Queue administration", {
    summary: "Keep queues healthy, access-controlled, and safe to recover.",
    definition:
      "Queue administration covers queue settings and lifetime, access, processing speed, backlog checks, dead-letter review, retention, and change records.",
    purpose:
      "Keep messages moving while protecting their contents and limiting admin changes to approved owners.",
    usedWhen:
      "Use it during setup, worker outages, backlog response, planned work, permission reviews, and dead-letter cleanup or replay.",
    why: "A named queue owner and safe process reduce risky changes and help find capacity or worker problems earlier.",
    example:
      "Before increasing worker count, check the SQL service capacity, queue age, worker limit, and how to reverse the change.",
    operatorNote:
      "Inspect messages before receiving or deleting them. Check active, dead-letter, and scheduled counts; oldest age; settings; access; owner; and change record before making a change.",
    sources: [
      {
        label: "Service Bus queues, topics, and subscriptions",
        url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions",
      },
    ],
  }),
  topic("Monitoring administration", {
    summary: "Keep monitoring, dashboards, alerts, and notification routes useful.",
    definition:
      "Monitoring administration manages data collection, workspaces, data retention, dashboards, alert rules, notification groups, owners, and alert noise.",
    purpose: "Send the right service signals to the right people with enough detail to act.",
    usedWhen:
      "Use it when adding a service, changing support owners, tuning an alert, adding an integration, or reviewing missed or noisy alerts.",
    why: "An alert works best when it has a clear symptom, owner, and response guide. Missing data or ownerless alerts make incident response harder.",
    example:
      "A service change enables logging for dependency failures and checks that a queue-age alert reaches the integration on-call team with the correct resource link.",
    operatorNote:
      "Track alert changes, check signal and time window, test notifications, record owner and response guide, review duplicate alerts, and watch data volume and retention cost.",
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
  topic("Certificate monitoring", {
    summary: "Check certificates and renewals at the live services that use them.",
    definition:
      "Certificate monitoring records each certificate's owner and expiry, checks services and stores for expiry or trust errors, and confirms that a renewed certificate reached each service and partner.",
    purpose:
      "Give owners time to renew and install certificates before secure connections or signed exchanges fail.",
    usedWhen:
      "Use it for public and private HTTPS, APIM and Front Door backends, AS2 partner certificates, client identities, and internal trust stores.",
    why: "An expiry list can miss an old certificate still used by a gateway, a wrong server name, a missing link in the trust chain, or a partner that has not updated. Check the certificate clients see.",
    example:
      "A daily check watches the public API certificate and chain. A separate alert tracks the partner's AS2 signing certificate and agreed change date.",
    operatorNote:
      "Send alerts well before expiry. Include endpoint, certificate ID, owner, and renewal ticket. Check both sides after rotation. Keep private keys out of logs and tickets.",
    sources: [
      {
        label: "Azure Key Vault certificate overview",
        url: "https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates",
      },
    ],
  }),
];

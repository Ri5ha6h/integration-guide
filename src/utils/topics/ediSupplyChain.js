import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("edi", title, details);

export const ediSupplyChainTopics = [
  topic("AS2, SFTP & EDI transport", {
    summary: "Transport options move a payload; they do not define the EDI business meaning.",
    definition:
      "AS2 packages business data for transfer over HTTP(S) and can use S/MIME signing, encryption, and Message Disposition Notifications. SFTP transfers files over SSH. Both carry payloads such as X12 or EDIFACT, but they produce different receipt and security evidence.",
    purpose:
      "Move partner documents between endpoints using an agreed network route, identity model, security profile, and reliability convention.",
    usedWhen:
      "Use AS2 for direct B2B exchanges that need message-level security and agreed MDNs; use SFTP for scheduled file handoffs where both sides agree on keys, directories, and completion signals.",
    why: "Separating transport from payload lets partners choose a delivery channel without changing the message standard, while keeping its operational evidence distinct.",
    example:
      "For AS2, record the Message-ID and signed MDN alongside the payload hash. For SFTP, upload to a temporary filename and rename to the agreed final name only after the transfer completes, if the host supports the convention.",
    operatorNote:
      "For AS2, correlate the MDN but do not treat it as business acceptance. For SFTP, verify and pin the SSH host key, avoid disabling host-key checks, prevent partial-file pickup, and agree on archive/error folders, duplicate handling, and file naming.",
    sources: [
      {
        label: "RFC 4130: MIME-based secure EDI over HTTP",
        url: "https://www.rfc-editor.org/rfc/rfc4130",
      },
      { label: "OpenSSH protocol specifications", url: "https://www.openssh.com/specs.html" },
    ],
  }),
  topic("EDI-to-canonical data mapping", {
    summary:
      "Transform partner syntax into an application model without discarding business meaning.",
    definition:
      "A mapping parses a selected partner version/profile and converts segments and qualifiers into an internal model. A canonical model can normalize equivalent partner structures, but should retain source provenance and distinctions needed for audit, outbound mapping, or reconciliation.",
    purpose:
      "Let business applications use a consistent internal shape while partner adapters handle external syntax and guide differences.",
    usedWhen:
      "Use it when applications consume JSON/XML/domain records instead of raw EDI or several trading partners represent the same concepts differently.",
    why: "A stable internal contract reduces partner-specific branching in downstream systems, provided the mapping preserves identifiers, hierarchy, repeated structures, and source values.",
    example:
      "Map an ASN into `{shipmentId, orders: [], handlingUnits: [{sscc, children: [{gtin, quantity}]}]}` and retain the X12/EDIFACT source version, segment path, qualifier, and original payload reference.",
    operatorNote:
      "Keep the raw interchange securely; preserve qualifiers with values, loops as arrays, package parents/children, IDs with leading zeros as strings, precise decimal values, time zone/qualifier meaning, and the difference between omitted, empty, zero, and unknown.",
    sources: [
      { label: "X12 transaction-set examples", url: "https://x12.org/examples" },
      {
        label: "UNECE message directories",
        url: "https://unece.org/trade/uncefact/unedifact/download",
      },
    ],
  }),
  topic("Supply-chain identifiers: GTIN, GLN & SSCC", {
    summary:
      "Standard identifiers that connect products, trading parties, locations, and logistic units.",
    definition:
      "GTIN identifies a trade item at a packaging level; GLN identifies a party or location; SSCC identifies an individual logistics unit such as a pallet or parcel. GSIN and GINC can identify broader shipment and consignment groupings when adopted by the trading partners.",
    purpose:
      "Link electronic order and shipment records with products, physical packages, labels, scan events, and delivery locations.",
    usedWhen:
      "Use the identifier and qualifier agreed for each partner and business context; carry the same unit/party identities through the order, ASN, label, carrier, and receiving process.",
    why: "Shared identifiers reduce manual matching between a document and what is physically handled, but each key answers a different identity question.",
    example:
      "An 856/DESADV reports a pallet SSCC and the GTIN plus quantity of the cases nested on it; the ship-to GLN identifies the receiving location.",
    operatorNote:
      "Treat identifiers as strings, retain their issuing scheme/qualifier, and validate check digit/length rules where specified. Do not substitute a PO, tracking number, GTIN, or SSCC for one another because all are numeric-looking.",
    sources: [
      { label: "GS1 General Specifications", url: "https://ref.gs1.org/standards/genspecs/" },
      {
        label: "GS1 Logistics Interoperability Model",
        url: "https://ref.gs1.org/standards/logistics-interoperability/",
      },
    ],
  }),
  topic("EPCIS event visibility alongside EDI", {
    summary:
      "Event data records what happened to an identified object; EDI documents exchange requests and transaction facts.",
    definition:
      "GS1 EPCIS is a standard for capturing and sharing visibility events about objects, locations, business steps, and time. EDI messages such as an ASN describe a business document or shipment notice; an EPCIS event describes an observed event such as packing, shipping, receiving, or movement.",
    purpose:
      "Add event-level visibility and traceability to order, shipment, and receiving exchanges without treating events as replacements for the documents.",
    usedWhen:
      "Use EPCIS when multiple parties need interoperable supply-chain event history tied to GTINs, SSCCs, locations, and business context.",
    why: "An ASN may say what the sender dispatched, while later scan events can show when a logistic unit was loaded, received, or moved and where that observation occurred.",
    example:
      "Correlate an 856/DESADV containing pallet `SSCC=<assigned-logistic-unit-id>` with EPCIS events recording packing at a warehouse, shipping at a dock, and receiving at the retailer.",
    operatorNote:
      "Keep object and location identifiers stable, validate event time zone/business-step/location meaning, and link source transactions to event records. Reconcile missing or out-of-order events against the physical scan and partner process.",
    sources: [
      { label: "GS1 EPCIS standard", url: "https://ref.gs1.org/standards/epcis/" },
      {
        label: "GS1 global traceability standard",
        url: "https://ref.gs1.org/standards/global-traceability/",
      },
    ],
  }),
  topic("EDI onboarding, reconciliation & recovery", {
    summary: "The controls that make a partner connection predictable before and after go-live.",
    definition:
      "EDI operations span partner identity and guide setup, transport/certificate exchange, test cases, layered validation and acknowledgments, production monitoring, business reconciliation, duplicate/correction handling, and retained audit evidence.",
    purpose:
      "Prove the complete exchange path works for the agreed message and business process, then detect and recover gaps without losing or duplicating transactions.",
    usedWhen:
      "Use an onboarding and support checklist for each new or changed partner, including version/profile, endpoint, identifiers, control numbers, acknowledgment deadlines, owner, and escalation route.",
    why: "A file reaching a mailbox is only one milestone. Syntax acceptance, application processing, and the real-world business outcome may happen later or fail independently.",
    example:
      "For an invoice missing its expected business response, correlate the outbound control number, transport receipt, syntax ack, partner receipt, AP status, and payment/remittance records before deciding whether to resend.",
    operatorNote:
      "Classify failures as transport, syntax/schema, partner-profile, mapping, business-rule, or downstream-application errors. On timeout, reconcile recipient/control/message IDs and business state before replay; preserve raw input, checksum, timestamps, and every ack/retry decision.",
    sources: [
      {
        label: "Azure Logic Apps B2B integration accounts",
        url: "https://learn.microsoft.com/en-us/azure/logic-apps/enterprise-integration/create-integration-account",
      },
      {
        label: "X12 implementation guides",
        url: "https://x12.org/index.php/products/technical-reports",
      },
      { label: "UNECE UN/EDIFACT", url: "https://unece.org/trade/uncefact/unedifact" },
    ],
  }),
];

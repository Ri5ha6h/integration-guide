import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("edi", title, details);

export const ediSupplyChainTopics = [
  topic("AS2, SFTP & EDI transport", {
    summary: "AS2 and SFTP move EDI files; they do not define what the documents mean.",
    definition:
      "AS2 sends business data over HTTP or HTTPS and can sign and encrypt it. It can also return a Message Disposition Notification (MDN). SFTP sends files over SSH. Both can carry X12 or EDIFACT files, but each gives different security and receipt information.",
    purpose:
      "Move partner documents between systems using agreed network paths, identities, security rules, and delivery steps.",
    usedWhen:
      "Use AS2 for direct partner exchanges that need message signing, encryption, and agreed MDNs. Use SFTP for planned file transfers when both sides agree on SSH keys, folders, and completion signals.",
    why: "Partners can change how they send a file without changing the EDI message rules. Keep transport receipts separate from business replies.",
    example:
      "For AS2, save the Message-ID and signed MDN with the file hash. For SFTP, upload under a temporary name and rename it when the transfer is complete, if the server supports this method.",
    operatorNote:
      "For AS2, match the MDN to the file; it does not prove business acceptance. For SFTP, check and trust the server host key. Prevent early pickup of partial files, and agree on file names, folders, archives, errors, and duplicate handling.",
    sources: [
      {
        label: "RFC 4130: MIME-based secure EDI over HTTP",
        url: "https://www.rfc-editor.org/rfc/rfc4130",
      },
      { label: "OpenSSH protocol specifications", url: "https://www.openssh.com/specs.html" },
    ],
  }),
  topic("EDI mapping to a shared internal model", {
    summary:
      "Convert a partner's EDI into a shared internal data model and keep its business meaning.",
    definition:
      "A mapping reads one partner's standard and version, then converts its segments and qualifiers into a shared internal model. Keep source details that are needed for audit, replies, or matching the original document.",
    purpose:
      "Give business apps one internal data shape while partner-specific maps handle differences in EDI syntax and rules.",
    usedWhen:
      "Use it when apps need JSON, XML, or business records instead of raw EDI, or when several partners describe the same information in different ways.",
    why: "A shared internal model reduces partner-specific rules in other systems. The map must still keep IDs, parent-child groups, repeated fields, and source values.",
    example:
      "Map a shipment notice into shipment, order, and package records. Keep each SSCC, product ID, quantity, source version, segment location, qualifier, and a link to the original file.",
    operatorNote:
      "Keep the original file secure. Keep qualifiers with values, repeated groups as lists, package nesting, IDs with leading zeros as text, exact decimal amounts, and time-zone meaning. Tell a missing value from an empty, zero, or unknown value.",
    sources: [
      { label: "X12 transaction-set examples", url: "https://x12.org/examples" },
      {
        label: "UNECE message directories",
        url: "https://unece.org/trade/uncefact/unedifact/download",
      },
    ],
  }),
  topic("Supply-chain identifiers: GTIN, GLN & SSCC", {
    summary: "Standard IDs for products, organizations and places, and shipping units.",
    definition:
      "GTIN identifies a product at a packaging level. GLN identifies an organization or place. SSCC identifies one shipping unit, such as a pallet or parcel. Partners may also use GSIN or GINC to identify a shipment or consignment.",
    purpose:
      "Connect orders and shipment records to products, packages, labels, scans, and delivery places.",
    usedWhen:
      "Use the ID and qualifier agreed for that partner and task. Keep the same product, party, and package IDs through the order, shipment notice, label, carrier, and receiving steps.",
    why: "Shared IDs help match business documents to real products and packages. Each ID has a different purpose.",
    example:
      "An 856 or DESADV lists a pallet's SSCC and the GTIN and quantity of the cases on it. The ship-to GLN identifies the receiving place.",
    operatorNote:
      "Store IDs as text, keep their type or qualifier, and check length and check digits when required. Do not swap a purchase order, tracking number, GTIN, and SSCC because they look like numbers.",
    sources: [
      { label: "GS1 General Specifications", url: "https://ref.gs1.org/standards/genspecs/" },
      {
        label: "GS1 Logistics Interoperability Model",
        url: "https://ref.gs1.org/standards/logistics-interoperability/",
      },
    ],
  }),
  topic("Supply-chain events: EPCIS and EDI", {
    summary: "EPCIS records events about identified goods; EDI exchanges business documents.",
    definition:
      "GS1 EPCIS is a standard for sharing when and where an object was seen and what happened to it. An EDI message such as a shipment notice describes a business document or shipment. An EPCIS event records an observation such as packing, shipping, receiving, or moving goods.",
    purpose:
      "Add event history to orders and shipment records while keeping event data and business documents distinct.",
    usedWhen:
      "Use EPCIS when partners need to share supply-chain events linked to products, shipping units, places, and business steps.",
    why: "A shipment notice says what the sender reports as shipped. Later scan events can show when and where a package was loaded, received, or moved.",
    example:
      "Match an 856 or DESADV that lists a pallet's SSCC with EPCIS events for packing at a warehouse, shipping at a dock, and receipt at a retailer.",
    operatorNote:
      "Keep product and location IDs consistent. Check event time zone, business step, and place. Link events to source documents, and compare missing or out-of-order events with scans and partner records.",
    sources: [
      { label: "GS1 EPCIS standard", url: "https://ref.gs1.org/standards/epcis/" },
      {
        label: "GS1 global traceability standard",
        url: "https://ref.gs1.org/standards/global-traceability/",
      },
    ],
  }),
  topic("EDI onboarding, reconciliation & recovery", {
    summary: "Steps to set up, check, and recover an EDI connection with a partner.",
    definition:
      "EDI operations include partner IDs and guide setup, transport and certificate exchange, tests, message checks and replies, monitoring, business matching, duplicate and correction handling, and audit records.",
    purpose: "Prove the full exchange works, then find and fix missing or repeated transactions.",
    usedWhen:
      "Use a setup and support checklist for each new or changed partner. Include the version and guide, endpoint, IDs, control numbers, reply deadlines, owner, and escalation contact.",
    why: "A file arriving is only one step. It may still fail a syntax check, application processing, or the real business task.",
    example:
      "For an invoice with no expected business reply, check the outbound control number, transport receipt, syntax reply, partner receipt, accounts-payable status, and payment records before resending it.",
    operatorNote:
      "Classify the fault as transport, syntax, partner rules, mapping, business rules, or application processing. Before replaying after a timeout, check the recipient, IDs, and business result. Keep the original file, hash, times, and each reply or retry decision.",
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

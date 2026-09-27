import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("edi", title, details);

export const ediStandardsTopics = [
  topic("Electronic Data Interchange (EDI)", {
    summary:
      "A standard way for organizations to exchange structured business documents by computer.",
    definition:
      "EDI lets business systems exchange agreed message structures, codes, and partner rules. X12, UN/EDIFACT, EANCOM, and some XML profiles are examples. EDI is not one file type or a way to send files.",
    purpose:
      "Let business systems process orders, shipment notices, invoices, inventory updates, and other documents without typing them in again.",
    usedWhen:
      "Use it with trading partners such as retailers, suppliers, carriers, warehouses, logistics providers, customs brokers, and financial organizations when they have agreed exchange rules.",
    why: "Shared message rules let two organizations process and match routine business documents automatically.",
    example:
      "A retailer sends a purchase order. The supplier replies, later sends a shipment notice, and then sends an invoice. The documents use the agreed partner and order references.",
    operatorNote:
      "Check the standard and version, message type, partner guide, partner IDs, transport, acknowledgments, and business rules. A file name such as .edi does not tell you how to read the document.",
    sources: [
      { label: "GS1 EDI overview", url: "https://www.gs1.org/standards/edi" },
      { label: "X12 transaction sets", url: "https://x12.org/products/transaction-sets" },
      { label: "UNECE UN/EDIFACT", url: "https://unece.org/trade/uncefact/unedifact" },
    ],
  }),
  topic("Common EDI messages & business flows", {
    summary: "Business documents for orders, replies, shipments, status, and payment.",
    definition:
      "An EDI document is a business message, such as an X12 transaction set or an EDIFACT message, sent at one step in a process. Similar names across standards can mean related things, but their structure and meaning may differ.",
    purpose:
      "Exchange a specific business request or fact using rules both trading partners understand.",
    usedWhen:
      "Choose messages from the partner guide for orders, transport, warehouse, inventory, or customs. Check the version and which partner sends the message.",
    why: "The exact business event matters: a request, a shipment notice, and a payment record are different things.",
    example:
      "A buyer sends X12 850 or EDIFACT ORDERS. The seller may reply with 855 or ORDRSP. A shipper reports packed goods with 856 or DESADV. An 810 or INVOIC requests payment. The partner guide defines the exact use.",
    operatorNote:
      "Keep order and line numbers, shipment references, SSCC, invoice numbers, and partner IDs with their qualifiers. One shipment notice can cover several orders or packages.",
    sources: [
      { label: "X12 supply-chain flow", url: "https://x12.org/flow/supply-chain" },
      {
        label: "UNECE EDIFACT directories",
        url: "https://unece.org/trade/uncefact/unedifact/download",
      },
    ],
  }),
  topic("X12 transaction sets", {
    summary: "Numbered business messages in the ASC X12 standards family.",
    definition:
      "An X12 transaction set defines a business purpose and the order of its segments and data fields. Its number, such as 850, identifies the type. The version, industry guide, codes, and partner rules define what that message means in a specific exchange.",
    purpose:
      "Give organizations a shared message structure for supply chain, transport, finance, warehouses, and other work.",
    usedWhen:
      "Use the transaction set and version named in the partner guide. Do not assume that a familiar number has the same use for every partner.",
    why: "The standard gives partners shared message names and structures. A versioned partner guide says which fields and cases they actually use.",
    example:
      "Common sets include 204 for a motor-carrier load tender, 990 for a tender reply, 214 for transport status, 850 for a purchase order, 856 for a shipment notice, 810 for an invoice, and 940 or 945 for warehouse instructions or advice.",
    operatorNote:
      "Read the transaction number and version from the envelope. Keep the segment and code context, and use the correct guide before reading optional groups, codes, amounts, or dates.",
    sources: [
      { label: "X12 transaction-set directory", url: "https://x12.org/products/transaction-sets" },
      { label: "X12 supply chain", url: "https://ecommerce.x12.org/industry/supply-chain" },
    ],
  }),
  topic("X12 envelopes, versions & control numbers", {
    summary: "The outer X12 records that group and check business messages.",
    definition:
      "X12 usually places ST-SE transaction sets inside GS-GE groups, then places those groups inside an ISA-IEA interchange. Headers show who sent the data and which version applies. Trailers carry matching control numbers and counts.",
    purpose:
      "Mark message boundaries, tell the receiver how to read the data, and reveal missing or mismatched records.",
    usedWhen:
      "Use the separators, sender and receiver IDs, group version, transaction ID, and partner guide to choose how to read the file.",
    why: "A file can contain a valid-looking 850 but still use the wrong version or partner rules. Matching control numbers and counts can reveal duplicates or incomplete files.",
    example:
      "An ISA header and IEA trailer can surround a GS purchase-order group. That group can contain several ST 850 transactions. Each trailer must match its header and count.",
    operatorNote:
      "Read separators from ISA instead of assuming asterisks or tildes. Check partner IDs and qualifiers, control numbers, segment and transaction counts, version, and duplicate rules.",
    sources: [
      { label: "X12 examples", url: "https://x12.org/examples" },
      {
        label: "X12 implementation guides",
        url: "https://x12.org/index.php/products/technical-reports",
      },
    ],
  }),
  topic("UN/EDIFACT message structure", {
    summary: "An international EDI syntax with versioned rules and ordered message parts.",
    definition:
      "UN/EDIFACT defines message types, versions, code lists, and syntax rules. An interchange starts with UNB and ends with UNZ. It can group messages with UNG and UNE. Each message starts with UNH and ends with UNT.",
    purpose:
      "Represent structured trade and transport messages for international and multi-industry exchanges.",
    usedWhen:
      "Read an EDIFACT file using its syntax version, directory release, partner guide or EANCOM profile, and declared separators.",
    why: "Each release sets the order of message parts, which fields are required, how often they can appear, and which codes to use. Tags alone are not enough.",
    example:
      "UNH+1+IFTSTA:D:24A:UN' shows the start of a transport-status message and its version details. The full message and outer interchange are not shown.",
    operatorNote:
      "Check interchange, group, and message counts and matching references. Check the message type, version, release, and agency. Use separators declared by UNA or the agreed syntax rules.",
    sources: [
      { label: "UNECE UN/EDIFACT", url: "https://unece.org/trade/uncefact/unedifact" },
      {
        label: "UNECE EDIFACT syntax rules",
        url: "https://unece.org/fileadmin/DAM/trade/edifact/untdid/d422_s.htm",
      },
    ],
  }),
  topic("Partner implementation guides & profiles", {
    summary: "Agreed rules that tell two partners how to use a broad EDI standard.",
    definition:
      "A partner guide sets the standard and version, message direction, required fields, codes, partner IDs, transport, acknowledgments, and timing for an exchange.",
    purpose: "Give both partners a precise set of rules to build and check their systems against.",
    usedWhen:
      "Use the current partner guide when setting up an exchange, changing a map, reviewing a change, testing, or supporting production.",
    why: "Two partners can use the same X12 850 or EDIFACT ORDERS and still require different versions, fields, codes, and business steps. The guide lists their agreed choices.",
    example:
      "A guide may say that a partner accepts only X12 version 4010 for 850 messages, requires a ship-to address, uses specific unit codes, expects a 997 within an agreed time, and names an AS2 certificate.",
    operatorNote:
      "Keep the approved guide, version, owner, and start date. Test valid, invalid, boundary, and duplicate messages. Agree on changes with the partner before changing versions.",
    sources: [
      {
        label: "X12 technical reports and implementation guides",
        url: "https://x12.org/index.php/products/technical-reports",
      },
      { label: "GS1 EDI implementation", url: "https://www.gs1.org/standards/edi/implementation" },
    ],
  }),
  topic("EDI acknowledgment layers", {
    summary: "Different replies confirm transport, EDI checks, or business handling.",
    definition:
      "A transport receipt, a syntax check, and a business reply confirm different steps. For example, an AS2 MDN confirms receipt of an AS2 message; an X12 997 or 999, or EDIFACT CONTRL, reports EDI checks; an 855 or ORDRSP gives a business reply.",
    purpose: "Show how far an exchange has gone and which system or partner must act next.",
    usedWhen:
      "Agree which replies are required, what each one confirms, when it is due, and who handles a missing reply.",
    why: "A transport receipt does not prove that the file parsed correctly or that the business accepted, shipped, or paid for the order.",
    example:
      "A partner sends a signed MDN, then a 997 reports that the X12 group passed syntax checks. A separate 855 accepts or changes the purchase order. Track each reply on its own.",
    operatorNote:
      "Match each reply to the original message, control number, and partner. Tell a syntax error from a business rejection or missing reply. HTTP 200 or 202 does not prove business success.",
    sources: [
      { label: "RFC 4130: AS2 and MDN semantics", url: "https://www.rfc-editor.org/rfc/rfc4130" },
      { label: "X12 transaction-set directory", url: "https://x12.org/products/transaction-sets" },
      {
        label: "UNECE EDIFACT rules",
        url: "https://unece.org/trade/uncefact/unedifact/part-4-rules-electronic-data-interchange-administration-commerce-and-transport",
      },
    ],
  }),
];

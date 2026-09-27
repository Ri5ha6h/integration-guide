# Signal / Room

This guide explains Azure integration, security, messaging, EDI, supply chain, and IT support. These terms keep the language consistent across its chapters and topics.

## Guide terms

**Chapter**:
A major subject area in the guide.
_Avoid_: category

**Guide topic**:
One subject explained in the guide.
_Avoid_: entry, article

## Integration and messaging

**Integration**:
The exchange of data or work between separate systems.
_Avoid_: connection (unless you mean a network connection)

**Message**:
A unit of data that one system sends to another for processing or notice.
_Avoid_: payload (the payload is the data carried by a message)

**Queue**:
A store that holds messages until a receiver processes them.
_Avoid_: channel

**Service Bus topic**:
A message destination that sends a copy to each matching subscription. This is different from a guide topic.
_Avoid_: topic (without a qualifier, when the meaning is unclear)

**Subscription**:
A separate receive path for messages copied from a Service Bus topic.
_Avoid_: subscriber queue (unless describing a queue used by a specific service)

**Message ID**:
An identifier for one message. It can help detect duplicates and trace the message.
_Avoid_: correlation ID

**Correlation ID**:
An identifier shared by related work across systems. It links a business flow, but does not identify each message or attempt.
_Avoid_: message ID

**Retry**:
An automatic repeat attempt, usually after a temporary failure.
_Avoid_: reprocessing

**Reprocessing**:
A deliberate replay of a failed message after its cause and business effects are checked.
_Avoid_: retry

## EDI and supply chain

**EDI**:
Computer exchange of structured business documents under an agreed standard and partner rules.
_Avoid_: file format, transport

**Trading partner**:
An organization that exchanges business documents with another organization.
_Avoid_: customer (unless the organization is specifically a customer)

**Partner guide**:
The agreed rules for the EDI messages, versions, fields, codes, and acknowledgments used by two trading partners.
_Avoid_: standard (a standard is broader than a partner guide)

**Acknowledgment**:
A message that confirms one step in delivery, syntax checking, or business handling.
_Avoid_: acceptance (an acknowledgment does not always mean business acceptance)

**Control number**:
A reference in an EDI envelope or message that helps match headers to trailers and detect duplicates or missing data.
_Avoid_: message ID (unless the partner defines them as the same value)

**Qualifier**:
A code beside an EDI value that tells the reader what type of value it is.
_Avoid_: code (when you mean this specific EDI label)

## IT support

**Incident**:
An unplanned service outage or problem that needs work to restore normal service.
_Avoid_: service request

**Service request**:
A request for an approved, routine service, information, or access.
_Avoid_: incident

**Service-level agreement (SLA)**:
An agreement that sets service targets, such as response or restoration time, and the rules for measuring them.
_Avoid_: timer (the timer is one way to show progress against an SLA)

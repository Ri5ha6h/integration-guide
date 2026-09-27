import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("security", title, details);

export const securityNetworkingTopics = [
  topic("Microsoft Entra ID / Azure AD fundamentals", {
    summary: "The identity platform that authenticates people, applications, and workloads.",
    definition:
      "Microsoft Entra ID is Microsoft's cloud identity and access management service; Azure Active Directory is its former name. It issues tokens and evaluates identity policies for supported apps and services, while Azure resource authorization is commonly controlled separately with Azure RBAC.",
    purpose:
      "Establish who or what is making a request and apply organization sign-in and access policies.",
    usedWhen:
      "Use it for workforce and workload sign-in, application registrations, single sign-on, token issuance, Conditional Access, and identity governance.",
    why: "Central identity makes access review, authentication policy, and sign-in investigation consistent across connected services.",
    example:
      "A client authenticates with Entra ID, receives an access token for the API's audience, and sends it to APIM, which validates its signature, issuer, audience, and claims.",
    operatorNote:
      "For an access failure, distinguish authentication from authorization. Inspect sign-in logs, tenant and object IDs, token audience/issuer, consent, Conditional Access result, and the target resource's role assignment.",
    sources: [
      { label: "Microsoft Entra documentation", url: "https://learn.microsoft.com/en-us/entra/" },
    ],
  }),
  topic("Managed Identity", {
    summary: "An Azure-managed workload identity that avoids storing application credentials.",
    definition:
      "A managed identity is a Microsoft Entra identity assigned to a supported Azure resource. The workload obtains tokens for supported services, while Azure manages the identity's credentials; system-assigned identities follow the resource lifecycle, and user-assigned identities can be shared across resources.",
    purpose:
      "Authenticate a workload to another service without keeping a client secret or certificate in code or configuration.",
    usedWhen:
      "Use it when an Azure-hosted app or workflow needs to call a resource that accepts Microsoft Entra tokens, such as Key Vault, Storage, or Azure SQL.",
    why: "Credential rotation is removed from application code, but permissions still need explicit least-privilege assignment and token use must be supported by the destination.",
    example:
      "Enable a Function App's managed identity and grant it `Storage Blob Data Reader` only on the container it needs; the function requests a token and reads the partner file.",
    operatorNote:
      "Verify the identity type and principal/object ID, token audience, destination support, network path, and role assignment at the intended scope. A newly changed assignment can take time to become effective.",
    sources: [
      {
        label: "Managed identities overview for developers",
        url: "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview-for-developers",
      },
    ],
  }),
  topic("Role-based access control (RBAC)", {
    summary: "Authorization that grants a principal a role over a defined resource scope.",
    definition:
      "An Azure role assignment connects a security principal, a role definition (allowed actions), and a scope such as a resource, resource group, subscription, or management group. Azure RBAC controls Azure resource access; it is distinct from Microsoft Entra directory roles and many service-specific data-plane permissions.",
    purpose:
      "Grant each person or workload only the actions required on the resources it must operate.",
    usedWhen:
      "Use it for Azure control-plane access and for data-plane access where the service supports RBAC authorization.",
    why: "Explicit roles and narrow scopes make access auditable and limit the effect of a compromised account or misconfiguration.",
    example:
      "Give a deployment identity `Website Contributor` on one app resource while a runtime identity gets `Key Vault Secrets User` only on the required vault.",
    operatorNote:
      "Check the principal ID, role, assignment scope, inherited roles, deny assignments, and whether the failure is control-plane or data-plane. Confirm that the chosen role includes the needed action.",
    sources: [
      {
        label: "Understand Azure role assignments",
        url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments",
      },
    ],
  }),
  topic("MFA", {
    summary: "A sign-in check that requires more than one kind of identity proof.",
    definition:
      "Multifactor authentication requires two or more factors, typically something a person knows, possesses, or is. Microsoft Entra can apply MFA through tenant defaults or Conditional Access policy based on sign-in context.",
    purpose:
      "Reduce the chance that a stolen or guessed password alone is enough to access an account.",
    usedWhen:
      "Require it for interactive user access, especially privileged operations, remote access, or sign-ins flagged by organizational policy.",
    why: "An independent factor adds a check at authentication time; phishing-resistant methods offer stronger protection against adversary-in-the-middle attacks than a password alone.",
    example:
      "A helpdesk analyst signs in with a passkey and is prompted for an approved step-up challenge before accessing a privileged portal from an unmanaged device.",
    operatorNote:
      "Use sign-in logs to check the applied Conditional Access policy, authentication requirement and method, device state, location/risk, and any exclusion or break-glass account handling.",
    sources: [
      {
        label: "Microsoft Entra multifactor authentication overview",
        url: "https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks",
      },
    ],
  }),
  topic("PIM / Just-in-Time access", {
    summary: "Temporary activation of privileged roles only when a task requires them.",
    definition:
      "Microsoft Entra Privileged Identity Management manages eligible and active privileged role assignments. An eligible user activates a role for a configured period and may need to complete MFA, provide justification, or obtain approval.",
    purpose:
      "Limit always-on privilege and provide an auditable activation record for administrative work.",
    usedWhen:
      "Use it for infrequent administrator tasks and sensitive resource operations where permanent broad roles are unnecessary.",
    why: "JIT access reduces the time a privileged role is available and creates a reviewable request and activation trail.",
    example:
      "An engineer activates an eligible subscription role for 60 minutes with a change-ticket number, performs a deployment fix, then loses the elevated assignment when the activation expires.",
    operatorNote:
      "Check eligibility, approval and MFA settings, activation duration, scope, justification/ticket, audit history, and whether the assignment is active or only eligible. Follow the documented emergency-access process for outages.",
    sources: [
      {
        label: "What is Privileged Identity Management?",
        url: "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure",
      },
    ],
  }),
  topic("Virtual Network (VNet)", {
    summary: "An Azure private network boundary for addressing, routing, and segmentation.",
    definition:
      "A VNet is a logically isolated network with address spaces and subnets. Azure resources attach network interfaces or private endpoints to subnets and communicate through configured routes, security rules, peering, gateways, and DNS.",
    purpose:
      "Define where private workloads connect and how traffic reaches other subnets, on-premises networks, or public endpoints.",
    usedWhen:
      "Use it when services need private addressing, controlled east-west traffic, private endpoint access, or hybrid connectivity.",
    why: "Network boundaries and routes make allowed communication explicit. A VNet alone does not provide application authorization or guarantee that a PaaS endpoint is private.",
    example:
      "Place an integration worker in an app subnet, a private endpoint in an endpoint subnet, and route DNS through the hub resolver used by connected spokes.",
    operatorNote:
      "Trace source and destination addresses, subnet/NSG rules, user-defined routes, peering, gateway propagation, and DNS separately. Confirm return routing as well as the outbound path.",
    sources: [
      {
        label: "Azure virtual network overview",
        url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
      },
    ],
  }),
  topic("Private Endpoints", {
    summary: "A private IP in a VNet that connects to a supported Azure service over Private Link.",
    definition:
      "A private endpoint is a network interface with a private IP address in a VNet, mapped to a Private Link resource. Network reachability, endpoint approval, service firewalls, public access settings, and DNS all affect whether a client can use it.",
    purpose:
      "Give clients a private network path to a supported service without resolving its service name to a public endpoint.",
    usedWhen:
      "Use it for services such as Storage and SQL when private access is required from Azure or connected on-premises networks.",
    why: "Private Link makes the service reachable on a private address, but the client still needs correct DNS, authorization, and routing.",
    example:
      "A Function resolves `account.blob.core.windows.net` through the linked private DNS zone to the private endpoint IP, then authenticates with its managed identity.",
    operatorNote:
      "Check endpoint connection state/approval, NIC private IP, private DNS zone and VNet link, actual client resolver result, route, NSG, and service-level public network setting.",
    sources: [
      {
        label: "What is a private endpoint?",
        url: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview",
      },
      {
        label: "Private endpoint DNS configuration",
        url: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns",
      },
    ],
  }),
  topic("ExpressRoute", {
    summary: "Private connectivity from an organization network to Microsoft cloud services.",
    definition:
      "ExpressRoute extends an on-premises or colocation network to Microsoft cloud through a connectivity provider and private peering. Circuit, peering, gateway, routing, and resilience design determine which Azure networks are reachable.",
    purpose:
      "Provide hybrid network connectivity with controlled routing and predictable characteristics for supported Microsoft cloud paths.",
    usedWhen:
      "Use it when an organization needs private WAN connectivity, high-throughput data exchange, or enterprise network integration with Azure.",
    why: "Traffic uses the configured provider/private peering path rather than traversing the public internet, but private connectivity does not encrypt application data by itself or replace network security controls.",
    example:
      "An on-premises EDI gateway reaches a private endpoint in a hub VNet through ExpressRoute and a connected virtual network gateway, with DNS forwarded to the hub resolver.",
    operatorNote:
      "Check provider circuit state, peering/BGP routes, Azure gateway, route filters where relevant, effective routes, DNS forwarding, and end-to-end packet path. Keep a tested alternate path if the service requires resilient hybrid access.",
    sources: [
      {
        label: "Azure ExpressRoute overview",
        url: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction",
      },
    ],
  }),
  topic("IP whitelisting / filtering", {
    summary: "Network rules that permit or deny traffic from selected IP ranges.",
    definition:
      "IP allowlisting/filtering compares a connection's observed source or destination address with configured network rules. The feature may live in a firewall, NSG, service firewall, WAF, partner gateway, or APIM policy, each at a different traffic layer.",
    purpose:
      "Reduce which network locations can reach an endpoint or API and block traffic outside an agreed boundary.",
    usedWhen:
      "Use it as one control for partner ingress, administration, or service endpoints when the peer has stable egress addresses and the actual path preserves the expected source IP.",
    why: "A narrow allowlist reduces exposure, but IP address is not a user identity and proxy/NAT changes can alter the source seen by the rule.",
    example:
      "A partner AS2 endpoint accepts HTTPS only from the partner's documented NAT ranges; the security team updates the list during a coordinated address rotation.",
    operatorNote:
      "Compare the denied source IP in the correct hop's logs with the exact rule, prefix length, NAT/proxy path, IPv4/IPv6, and deployment scope. Keep an owner and review date for temporary entries.",
    sources: [
      {
        label: "WAF custom rules for Azure Front Door",
        url: "https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-custom-rules",
      },
    ],
  }),
  topic("DNS / network troubleshooting", {
    summary: "A layered method for finding name-resolution and connectivity failures.",
    definition:
      "DNS maps names to addresses and can return different results based on resolver and network context. Network troubleshooting follows a request from name resolution through route, transport handshake, gateway, and application response instead of assuming all failures are firewall blocks.",
    purpose:
      "Identify the first failing hop and distinguish incorrect DNS, missing routes, blocked ports, TLS problems, and application errors.",
    usedWhen:
      "Use it for private endpoint issues, cross-premises access, unhealthy origins, API timeouts, and certificate-name mismatches.",
    why: "A hostname resolving to the public IP instead of a private endpoint, or a one-way route, can look like an application outage even though the root cause is network configuration.",
    example:
      "From the affected workload, resolve the service FQDN, compare it with the intended private endpoint IP, test the expected port, inspect route/NSG path, then capture TLS and HTTP status.",
    operatorNote:
      "Run checks from the same subnet and resolver as the failing caller. Record the exact FQDN, returned IP, timestamp, source, port, TLS error, and request ID; compare with a known-good path.",
    sources: [
      {
        label: "Private endpoint DNS configuration",
        url: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns",
      },
    ],
  }),
  topic("TLS / HTTPS", {
    summary: "Transport protection that encrypts traffic and authenticates the server endpoint.",
    definition:
      "TLS negotiates cryptographic protection between peers; HTTPS is HTTP carried over TLS. Certificate chain, hostname, trust store, protocol version, cipher policy, and SNI all affect a successful handshake.",
    purpose:
      "Protect data in transit from passive reading and tampering, and let a client verify that it reached the intended server.",
    usedWhen:
      "Use it for browser and API traffic, service-to-service calls, partner endpoints, and any network hop that carries credentials or business data.",
    why: "Encryption and endpoint authentication reduce interception and impersonation risks. TLS does not decide whether the authenticated caller may access a business operation.",
    example:
      "A partner connects to `edi.example.net` over HTTPS; the client validates the presented chain and DNS hostname before posting a signed AS2 package.",
    operatorNote:
      "Inspect the peer's served certificate chain, hostname/SNI, expiry, trust roots, negotiated TLS version, and clock. Check TLS termination and re-encryption separately at Front Door, APIM, and the backend.",
    sources: [
      {
        label: "TLS protocol documentation",
        url: "https://learn.microsoft.com/en-us/windows-server/security/tls/tls-protocol",
      },
    ],
  }),
  topic("Certificate management & expiry monitoring", {
    summary: "Inventorying, renewing, deploying, and verifying certificates before trust breaks.",
    definition:
      "Certificate lifecycle management tracks certificate purpose, owner, subject/SANs, issuer, private-key storage, trust chain, deployment points, rotation, and revocation. Expiration monitoring should observe the certificate actually served by each endpoint as well as the inventory record.",
    purpose:
      "Prevent endpoint outages and failed partner authentication caused by expired, mismatched, untrusted, or incorrectly deployed certificates.",
    usedWhen:
      "Use it for web/API TLS, AS2 signing or encryption, mutual TLS, service identities, and trust stores.",
    why: "A certificate may be renewed in a vault but remain expired at a gateway or peer; inventory plus post-deployment probing closes that operational gap.",
    example:
      "Alert at 60, 30, and 7 days before expiry for each production AS2 partner certificate; rotate with a partner-agreed overlap and verify a signed test exchange after cutover.",
    operatorNote:
      "Track endpoint, certificate thumbprint/serial, owner, expiry, key location, renewal lead time, peer notification, and last successful probe. Never expose private key material in alerts or tickets.",
    sources: [
      {
        label: "Azure Key Vault certificate overview",
        url: "https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates",
      },
    ],
  }),
];

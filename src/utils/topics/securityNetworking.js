export const securityNetworkingTopics = [
  {
    "group": "security",
    "title": "Microsoft Entra ID / Azure AD fundamentals",
    "summary": "The identity service that authenticates users, applications, and devices.",
    "definition": "Microsoft Entra ID is Microsoft's cloud identity and access management service; Azure Active Directory (Azure AD) is its former name.",
    "purpose": "Issue identities, authenticate sign-ins, and provide tokens that applications use to authorize access.",
    "usedWhen": "Use it for workforce sign-in, application identities, single sign-on, and identity governance across cloud services.",
    "why": "Central identity controls make access easier to manage and audit across many applications.",
    "operatorNote": "Separate authentication (who signed in) from authorization (what that identity may do); inspect sign-in and audit logs."
  },
  {
    "group": "security",
    "title": "Managed Identity",
    "summary": "An Azure-managed identity for a resource to authenticate without stored credentials.",
    "definition": "A service principal whose credentials are created and rotated by Azure and made available to an Azure resource as a system-assigned or user-assigned identity.",
    "purpose": "Let an app or service request tokens to access supported resources without embedding passwords or keys.",
    "usedWhen": "Use it when an Azure-hosted workload needs to call Key Vault, Storage, SQL, or another Entra-protected service.",
    "why": "Removing application-managed secrets lowers the chance of credential leaks and rotation failures.",
    "operatorNote": "Verify the identity is enabled, the target supports Entra authentication, and the identity has the needed role at the right scope."
  },
  {
    "group": "security",
    "title": "Role-based access control (RBAC)",
    "summary": "Permissions assigned through roles at a defined scope.",
    "definition": "Azure RBAC authorizes actions on Azure resources by combining a security principal, a role definition, and a scope.",
    "purpose": "Grant people and workloads the actions they need to perform on subscriptions, resource groups, or resources.",
    "usedWhen": "Use it when granting operational, deployment, or application access to Azure resources.",
    "why": "Role and scope assignments are easier to audit and refine than ad hoc shared credentials.",
    "operatorNote": "Use least privilege; allow time for propagation and check deny assignments, inherited roles, and data-plane versus control-plane access."
  },
  {
    "group": "security",
    "title": "MFA",
    "summary": "An extra proof of identity beyond a password.",
    "definition": "Multifactor authentication requires a sign-in to satisfy two or more verification factors, such as something known, held, or inherent.",
    "purpose": "Reduce the risk that a stolen password is enough to access an account.",
    "usedWhen": "Use it for workforce accounts, privileged actions, and sign-ins subject to conditional access policy.",
    "why": "A second factor raises the bar for account takeover, especially for administrators.",
    "operatorNote": "When a sign-in fails, inspect the authentication method and policy result; provide a secure recovery path for lost devices."
  },
  {
    "group": "security",
    "title": "PIM / Just-in-Time access",
    "summary": "Time-limited elevation for privileged roles.",
    "definition": "Microsoft Entra Privileged Identity Management (PIM) manages eligible role assignments and can require activation steps such as MFA, approval, and justification.",
    "purpose": "Give an operator elevated permissions only for a bounded period and an explicit task.",
    "usedWhen": "Use it for administrator access, break-glass governance, and sensitive support work.",
    "why": "Short-lived elevation limits standing privilege and creates a reviewable access trail.",
    "operatorNote": "Confirm activation duration, approver, scope, and audit record; eligible access is not active until activated."
  },
  {
    "group": "security",
    "title": "Virtual Network (VNet)",
    "summary": "A private address space and routing boundary for Azure resources.",
    "definition": "An Azure VNet provides isolated IP ranges and network connectivity for resources, with subnets, routes, and security controls.",
    "purpose": "Place services on private networks and control how they reach each other and external networks.",
    "usedWhen": "Use it for private application tiers, hybrid connectivity, subnet separation, and private endpoints.",
    "why": "Network boundaries provide routing control and reduce unnecessary public exposure.",
    "operatorNote": "Check address overlap, effective routes, network security groups, peering, and DNS when traffic cannot pass."
  },
  {
    "group": "security",
    "title": "Private Endpoints",
    "summary": "A private IP address for reaching a supported Azure service over a VNet.",
    "definition": "A network interface in a VNet that connects privately to a specific resource through Azure Private Link.",
    "purpose": "Keep service access on private network paths rather than relying on a public endpoint.",
    "usedWhen": "Use it for Storage, SQL, Key Vault, and other supported services when network isolation is required.",
    "why": "Private endpoints narrow exposure and support private connectivity from Azure and connected networks.",
    "operatorNote": "A private endpoint also depends on DNS resolving the service name to its private address and on consumer approval where required."
  },
  {
    "group": "security",
    "title": "ExpressRoute",
    "summary": "A private, dedicated network connection from a location to Microsoft cloud services.",
    "definition": "A connectivity service that extends an on-premises or colocation network to Microsoft through a connectivity provider, outside the public internet path.",
    "purpose": "Connect enterprise networks to Azure with predictable private routing and hybrid network design.",
    "usedWhen": "Use it for workloads with hybrid connectivity, throughput, or network policy requirements beyond ordinary internet access.",
    "why": "It supports private connectivity and can provide more consistent network performance characteristics.",
    "operatorNote": "Trace route advertisements, circuit and peering state, gateway status, and return paths with the network team."
  },
  {
    "group": "security",
    "title": "IP whitelisting / filtering",
    "summary": "Allow or deny traffic based on source or destination IP ranges.",
    "definition": "An access control technique that compares network traffic addresses against configured allowlists or block rules.",
    "purpose": "Limit which networks can reach a public service or management surface.",
    "usedWhen": "Use it for partner ingress, admin portals, storage firewalls, and temporary controlled access.",
    "why": "A narrow network boundary can reduce unwanted access when combined with identity and application controls.",
    "operatorNote": "Keep ranges owned and reviewed; account for NAT, changing egress IPs, IPv4/IPv6, and the exact enforcement layer."
  },
  {
    "group": "security",
    "title": "DNS / network troubleshooting",
    "summary": "A stepwise way to find where name resolution or connectivity fails.",
    "definition": "DNS translates names to addresses; network paths then use routing, firewalls, and transport protocols to connect those addresses.",
    "purpose": "Separate name, route, port, TLS, and application problems instead of treating every connection error alike.",
    "usedWhen": "Use it when a service cannot resolve, connect, authenticate, or complete a request from a particular network.",
    "why": "Layer-by-layer checks help pinpoint the failing boundary and assign the right owner quickly.",
    "operatorNote": "Compare DNS answers from client and server networks, then test route, port, TLS handshake, and application response."
  },
  {
    "group": "security",
    "title": "TLS / HTTPS",
    "summary": "Encrypted, authenticated transport for web traffic.",
    "definition": "HTTPS is HTTP carried inside TLS, which provides encryption in transit and verifies the server certificate against the requested host.",
    "purpose": "Protect API and browser traffic from interception and tampering while confirming the service endpoint.",
    "usedWhen": "Use it for public and private web services, APIs, and any connection carrying credentials or sensitive data.",
    "why": "Encryption and endpoint authentication protect data as it moves across networks.",
    "operatorNote": "Check hostname, certificate chain, protocol support, cipher compatibility, and system clock when a handshake fails."
  },
  {
    "group": "security",
    "title": "Certificate management & expiry monitoring",
    "summary": "The process of issuing, rotating, and tracking certificates before they stop working.",
    "definition": "Certificate management covers ownership, issuance, secure storage, deployment, renewal, and revocation of certificates used for TLS or identity.",
    "purpose": "Keep encrypted endpoints and integrations trusted and available over time.",
    "usedWhen": "Use it anywhere APIs, gateways, apps, partners, or clients rely on certificate-based trust.",
    "why": "Expired or mismatched certificates can break traffic abruptly and weaken confidence in endpoint identity.",
    "operatorNote": "Record owner and expiry for each certificate, alert before renewal windows, and verify the deployed chain after rotation."
  }
];

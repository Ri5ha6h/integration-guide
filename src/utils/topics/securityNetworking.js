import { createTopic } from "../createTopic.js";

const topic = (title, details) => createTopic("security", title, details);

export const securityNetworkingTopics = [
  topic("Microsoft Entra ID / Azure AD fundamentals", {
    summary: "The cloud identity service for people, apps, and workloads.",
    definition:
      "Microsoft Entra ID is Microsoft's cloud service for sign-in and identity access. Azure Active Directory is its former name. Entra ID issues tokens and checks sign-in rules; Azure RBAC usually controls access to Azure resources.",
    purpose: "Confirm who or what is making a request and apply the organization's sign-in rules.",
    usedWhen:
      "Use it for employee and workload sign-in, app registrations, single sign-on, tokens, Conditional Access, and identity reviews.",
    why: "One identity service makes sign-in rules, access reviews, and sign-in investigations consistent across connected services.",
    example:
      "A client signs in with Entra ID and gets a token for the API. APIM checks the token's signature, issuer, audience, and claims.",
    operatorNote:
      "Find out if the failure is sign-in or permission related. Check sign-in logs, tenant and object IDs, token audience and issuer, consent, Conditional Access, and the resource role.",
    sources: [
      { label: "Microsoft Entra documentation", url: "https://learn.microsoft.com/en-us/entra/" },
    ],
  }),
  topic("Managed Identity", {
    summary: "An Azure identity for a workload, with credentials managed by Azure.",
    definition:
      "A managed identity is an Entra identity assigned to an Azure resource. The workload gets tokens for supported services, and Azure manages its credentials. A system-assigned identity belongs to one resource; a user-assigned identity can be shared.",
    purpose:
      "Let an app or workflow sign in to another service without storing a password or certificate.",
    usedWhen:
      "Use it when an Azure app needs to access a service that accepts Entra tokens, such as Key Vault, Storage, or Azure SQL.",
    why: "The app does not manage a secret, but it still needs the right limited permissions and the target service must support this sign-in method.",
    example:
      "Give a Function App identity Storage Blob Data Reader access to one container. The function gets a token and reads the partner file.",
    operatorNote:
      "Check the identity type and object ID, token audience, target service support, network route, and role at the correct scope. A new role can take time to work.",
    sources: [
      {
        label: "Managed identities overview for developers",
        url: "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview-for-developers",
      },
    ],
  }),
  topic("Role-based access control (RBAC)", {
    summary: "Permissions that give a person or app selected actions on selected resources.",
    definition:
      "An Azure role assignment links a person or app, a role with allowed actions, and a scope such as a resource, group, subscription, or management group. Azure RBAC differs from Entra directory roles and from service-specific data permissions.",
    purpose: "Give each person or app only the actions it needs on the resources it must use.",
    usedWhen:
      "Use Azure RBAC for Azure resource management and for data access when the service supports it.",
    why: "Clear roles and narrow scopes make access easier to review and limit the effect of a stolen account or mistake.",
    example:
      "Give a deployment app Website Contributor on one app. Give a runtime app Key Vault Secrets User only on the vault it needs.",
    operatorNote:
      "Check the person or app ID, role, scope, inherited roles, deny rules, and whether the failure is on resource management or data access. Confirm the role allows the needed action.",
    sources: [
      {
        label: "Understand Azure role assignments",
        url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments",
      },
    ],
  }),
  topic("Multifactor authentication (MFA)", {
    summary: "A sign-in check that asks for two or more types of proof.",
    definition:
      "Multifactor authentication (MFA) uses at least two types of proof, such as something a person knows, has, or is. Entra ID can require MFA through tenant settings or Conditional Access rules.",
    purpose: "Make a stolen or guessed password alone insufficient to sign in.",
    usedWhen:
      "Require it for interactive sign-in, especially for administrator tasks, remote access, or sign-ins covered by company policy.",
    why: "A second proof adds protection. Passkeys and other phishing-resistant methods offer stronger protection than a password alone.",
    example:
      "A support analyst signs in with a passkey and must complete another approved check before opening an administrator portal from an unmanaged device.",
    operatorNote:
      "Check sign-in logs for the Conditional Access rule, required sign-in method, device state, location or risk, and any exception or emergency account.",
    sources: [
      {
        label: "Microsoft Entra multifactor authentication overview",
        url: "https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks",
      },
    ],
  }),
  topic("Temporary privileged access (PIM)", {
    summary: "Temporary access to an administrator role when a task needs it.",
    definition:
      "Microsoft Entra Privileged Identity Management manages administrator roles. A person can be eligible for a role and activate it for a set time. Activation may require MFA, a reason, or approval.",
    purpose:
      "Reduce the time that administrator access is active and keep a record of each request.",
    usedWhen: "Use it for occasional administrator work when permanent broad access is not needed.",
    why: "Temporary access limits how long a role is available and records who activated it and why.",
    example:
      "An engineer activates a subscription role for 60 minutes, adds a change-ticket number, fixes a deployment, and loses the role when the time ends.",
    operatorNote:
      "Check eligibility, approval and MFA rules, activation time, scope, reason or ticket, and audit history. Use the emergency access process during an outage.",
    sources: [
      {
        label: "What is Privileged Identity Management?",
        url: "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure",
      },
    ],
  }),
  topic("Virtual Network (VNet)", {
    summary: "A private Azure network that controls addresses, routes, and network separation.",
    definition:
      "A VNet is an isolated network with address ranges and subnets. Resources connect through network interfaces or private endpoints. Routes, security rules, peering, gateways, and DNS control how they communicate.",
    purpose:
      "Choose where private workloads connect and how they reach other subnets, local networks, or public services.",
    usedWhen:
      "Use a VNet when services need private addresses, controlled traffic between subnets, private endpoints, or a link to a local network.",
    why: "Network boundaries and routes show which traffic can pass. A VNet does not control what an app user can do or make every service private.",
    example:
      "Put an integration worker in an app subnet and a private endpoint in another subnet. Send DNS requests through the hub resolver shared with connected networks.",
    operatorNote:
      "Check the source and destination addresses, subnet and NSG rules, custom routes, peering, gateway routes, and DNS. Check the return route too.",
    sources: [
      {
        label: "Azure virtual network overview",
        url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
      },
    ],
  }),
  topic("Private Endpoints", {
    summary: "A private IP address in a VNet for reaching a supported Azure service.",
    definition:
      "A private endpoint is a network interface with a private IP in a VNet. It connects to an Azure service through Private Link. Approval, DNS, routes, firewalls, and public access settings all affect the connection.",
    purpose: "Let a client reach a supported service over a private address.",
    usedWhen:
      "Use private endpoints for services such as Storage and SQL when Azure or a connected local network needs private access.",
    why: "Private Link provides a private network path. The client still needs correct DNS, permission, and routing.",
    example:
      "A Function App looks up account.blob.core.windows.net. A linked private DNS zone returns the private endpoint address, and the app signs in with its managed identity.",
    operatorNote:
      "Check endpoint approval, private IP, DNS zone and VNet link, the client's DNS result, route, NSG, and the service's public access setting.",
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
    summary: "A private network link between an organization and Microsoft cloud services.",
    definition:
      "ExpressRoute connects a local or colocation network to Microsoft cloud through a provider and private peering. The circuit, peering, gateway, and routes determine which Azure networks can be reached.",
    purpose: "Connect an organization's network to Azure through a planned private route.",
    usedWhen:
      "Use it when an organization needs private network access, high data capacity, or a link between its network and Azure.",
    why: "Traffic follows the provider's private route instead of the public internet. ExpressRoute does not encrypt application data or replace network security rules.",
    example:
      "An on-site EDI gateway reaches a private endpoint in an Azure hub VNet through ExpressRoute and a virtual network gateway. DNS requests go to the hub resolver.",
    operatorNote:
      "Check provider circuit status, peering and BGP routes, Azure gateway, route filters, effective routes, DNS forwarding, and the full packet path. Keep a tested backup route if the service needs one.",
    sources: [
      {
        label: "Azure ExpressRoute overview",
        url: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction",
      },
    ],
  }),
  topic("IP address filtering", {
    summary: "Rules that allow or block traffic from selected IP addresses.",
    definition:
      "An IP rule compares a connection's address with an allowed or blocked range. Rules can be in a firewall, network security group (NSG), service firewall, WAF, partner gateway, or APIM. Each checks traffic at a different point.",
    purpose: "Limit which network addresses can reach a service or API.",
    usedWhen:
      "Use it for partner connections, administration, or service access when the other side has stable addresses and the connection path preserves them.",
    why: "A short allowlist can reduce exposure. An IP address does not identify a person, and a proxy or address change can alter what the rule sees.",
    example:
      "An AS2 service accepts HTTPS only from the partner's approved network ranges. The security team updates the rules when the partner changes those addresses.",
    operatorNote:
      "Compare the blocked address in the correct network log with the rule, address range, proxy or NAT path, IP version, and deployment scope. Give temporary rules an owner and review date.",
    sources: [
      {
        label: "WAF custom rules for Azure Front Door",
        url: "https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-custom-rules",
      },
    ],
  }),
  topic("DNS / network troubleshooting", {
    summary: "A step-by-step way to find name lookup and connection problems.",
    definition:
      "DNS maps names to addresses, and the answer can differ by resolver and network. Trace each request through name lookup, route, connection, TLS, gateway, and application response to find the first failing step.",
    purpose:
      "Tell apart wrong DNS, missing routes, blocked ports, TLS errors, and application failures.",
    usedWhen:
      "Use it for private endpoint problems, access between networks, unhealthy backends, API timeouts, and certificate name errors.",
    why: "Wrong DNS or a missing return route can look like an application outage even when the app is healthy.",
    example:
      "From the failing workload, look up the service name and check that it returns the expected private IP. Test the port, route, security rules, TLS, and HTTP response.",
    operatorNote:
      "Run checks from the same subnet and DNS resolver as the failing app. Record the name, returned IP, time, source, port, TLS error, and request ID. Compare with a working path.",
    sources: [
      {
        label: "Private endpoint DNS configuration",
        url: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns",
      },
    ],
  }),
  topic("TLS / HTTPS", {
    summary: "A secure connection that encrypts traffic and checks the server's identity.",
    definition:
      "TLS protects a connection between two systems. HTTPS is HTTP over TLS. The certificate chain, server name, trusted certificate list, protocol version, cipher rules, and server name indication (SNI) can affect the connection.",
    purpose: "Protect data in transit and let a client check that it reached the intended server.",
    usedWhen:
      "Use it for websites, APIs, service calls, partner endpoints, and any network link that carries passwords or business data.",
    why: "Encryption and server checks reduce the risk of someone reading data or pretending to be the server. TLS does not decide what the signed-in caller may do.",
    example:
      "A partner connects to edi.example.net over HTTPS. Its client checks the certificate chain and server name before sending a signed AS2 package.",
    operatorNote:
      "Check the certificate chain, server name and SNI, expiry, trusted roots, negotiated TLS version, and system clock. Check TLS separately at Front Door, APIM, and the backend.",
    sources: [
      {
        label: "TLS protocol documentation",
        url: "https://learn.microsoft.com/en-us/windows-server/security/tls/tls-protocol",
      },
    ],
  }),
  topic("Certificate management & expiry monitoring", {
    summary: "Tracking, renewing, installing, and checking certificates before they expire.",
    definition:
      "Certificate management tracks the certificate's purpose, owner, names, issuer, private key, trust chain, installed locations, renewal, and revocation. Check the certificate served by each endpoint as well as the stored record.",
    purpose:
      "Prevent failed web connections, partner sign-in, or signed messages caused by expired or incorrect certificates.",
    usedWhen:
      "Use it for web and API TLS, AS2 signing or encryption, mutual TLS, service identities, and trusted certificate stores.",
    why: "A renewed certificate in a vault may still be missing from a gateway or partner system. Check the live endpoint after every renewal.",
    example:
      "Alert 60, 30, and 7 days before an AS2 partner certificate expires. Agree on an overlap, rotate the certificate, and test a signed exchange.",
    operatorNote:
      "Track the endpoint, certificate ID, owner, expiry, key location, renewal date, partner notice, and last successful check. Keep private keys out of alerts and tickets.",
    sources: [
      {
        label: "Azure Key Vault certificate overview",
        url: "https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates",
      },
    ],
  }),
];

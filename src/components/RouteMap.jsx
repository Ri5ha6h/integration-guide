export default function RouteMap() {
  return (
    <section className="route-card" aria-label="A typical integration path from request to resolution">
      <div className="route-card-top">
        <span className="eyebrow">A request, end to end</span>
        <span className="route-live"><i aria-hidden="true" /> SYSTEM PATH</span>
      </div>
      <ol className="route-map">
        <li className="route-node node-ingress">
          <span className="node-indicator" aria-hidden="true" /><span className="node-symbol" aria-hidden="true">↗</span>
          <small>01 / INGRESS</small><b>Receive request</b><em>Front Door · APIM</em>
        </li>
        <li className="route-node node-orchestrate">
          <span className="node-indicator" aria-hidden="true" /><span className="node-symbol" aria-hidden="true">⌘</span>
          <small>02 / LOGIC</small><b>Orchestrate</b><em>Logic Apps · Functions</em>
        </li>
        <li className="route-node node-transport">
          <span className="node-indicator" aria-hidden="true" /><span className="node-symbol" aria-hidden="true">⇢</span>
          <small>03 / TRANSPORT</small><b>Move work</b><em>Service Bus · RabbitMQ</em>
        </li>
        <li className="route-node node-observe">
          <span className="node-indicator" aria-hidden="true" /><span className="node-symbol" aria-hidden="true">⌁</span>
          <small>04 / SIGNAL</small><b>Observe</b><em>Monitor · App Insights</em>
        </li>
        <li className="route-node node-support">
          <span className="node-indicator" aria-hidden="true" /><span className="node-symbol" aria-hidden="true">◉</span>
          <small>05 / RESPONSE</small><b>Resolve</b><em>Alerts · ServiceNow</em>
        </li>
      </ol>
      <div className="route-foot"><span>IDENTITY + NETWORK GUARD EVERY HOP</span><span className="route-key"><i aria-hidden="true" /> DATA FLOW</span></div>
    </section>
  );
}

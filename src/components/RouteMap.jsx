export default function RouteMap() {
  return (
    <section className="route-card" aria-label="A typical request path from start to resolution">
      <div className="route-card-top">
        <span className="eyebrow">How a request moves through the system</span>
        <span className="route-live">
          <i aria-hidden="true" /> REQUEST PATH
        </span>
      </div>
      <ol className="route-map">
        <li className="route-node node-ingress">
          <span className="node-indicator" aria-hidden="true" />
          <span className="node-symbol" aria-hidden="true">
            ↗
          </span>
          <small>01 / REQUEST</small>
          <b>Receive request</b>
          <em>Front Door · APIM</em>
        </li>
        <li className="route-node node-orchestrate">
          <span className="node-indicator" aria-hidden="true" />
          <span className="node-symbol" aria-hidden="true">
            ⌘
          </span>
          <small>02 / WORKFLOW</small>
          <b>Run workflow</b>
          <em>Logic Apps · Functions</em>
        </li>
        <li className="route-node node-transport">
          <span className="node-indicator" aria-hidden="true" />
          <span className="node-symbol" aria-hidden="true">
            ⇢
          </span>
          <small>03 / MESSAGES</small>
          <b>Move work</b>
          <em>Service Bus · RabbitMQ</em>
        </li>
        <li className="route-node node-observe">
          <span className="node-indicator" aria-hidden="true" />
          <span className="node-symbol" aria-hidden="true">
            ⌁
          </span>
          <small>04 / MONITOR</small>
          <b>Check health</b>
          <em>Monitor · App Insights</em>
        </li>
        <li className="route-node node-support">
          <span className="node-indicator" aria-hidden="true" />
          <span className="node-symbol" aria-hidden="true">
            ◉
          </span>
          <small>05 / SUPPORT</small>
          <b>Restore service</b>
          <em>Alerts · ServiceNow</em>
        </li>
      </ol>
      <div className="route-foot">
        <span>Sign-in and network rules apply at each step.</span>
        <span className="route-key">
          <i aria-hidden="true" /> REQUEST FLOW
        </span>
      </div>
    </section>
  );
}

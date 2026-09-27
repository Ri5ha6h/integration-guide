import { chapters } from './chapters.js';
import { azureIntegrationTopics } from './topics/azureIntegration.js';
import { securityNetworkingTopics } from './topics/securityNetworking.js';
import { messagingTopics } from './topics/messaging.js';
import { supportOperationsTopics } from './topics/supportOperations.js';
import { ediStandardsTopics } from './topics/ediStandards.js';
import { ediSupplyChainTopics } from './topics/ediSupplyChain.js';

export { chapters };
export const topics = [
  ...azureIntegrationTopics,
  ...securityNetworkingTopics,
  ...messagingTopics,
  ...supportOperationsTopics,
  ...ediStandardsTopics,
  ...ediSupplyChainTopics,
];
export const findChapter = (id) => chapters.find((chapter) => chapter.id === id);

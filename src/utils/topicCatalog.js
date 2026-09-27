import { chapters } from './chapters.js';
import { azureIntegrationTopics } from './topics/azureIntegration.js';
import { securityNetworkingTopics } from './topics/securityNetworking.js';
import { messagingTopics } from './topics/messaging.js';
import { supportOperationsTopics } from './topics/supportOperations.js';

export { chapters };
export const topics = [
  ...azureIntegrationTopics,
  ...securityNetworkingTopics,
  ...messagingTopics,
  ...supportOperationsTopics,
];
export const findChapter = (id) => chapters.find((chapter) => chapter.id === id);

import { Payload } from './bringg/types';

/**
 * Validates if all required fields are present
 * @param taskPayload Payload sent by the client
 */
export function isTaskValid(payload: Payload) {
  const { name, phone, address } = payload;

  if (name === undefined || phone === undefined || address === undefined) {
    return false;
  }

  return true;
}

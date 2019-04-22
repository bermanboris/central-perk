import debug from 'debug';

/**
 * Creates new instance of "debug" logger with provided namespace
 * @param namespace namespace for the logger
 */
export function createLogger(namespace: string) {
  return debug(`central-perk:${namespace}`);
}

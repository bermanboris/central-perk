import { isTaskValid } from '../validation';

describe('task validation', () => {
  test('correct task', () => {
    const payload = { name: 'John', phone: '+123456789', address: 'New York' };
    expect(isTaskValid(payload)).toBe(true);
  });

  test('incorrect task', () => {
    expect(isTaskValid({ name: 'John' })).toBe(false);
    expect(isTaskValid({ address: 'New York' })).toBe(false);
    expect(isTaskValid({ phone: '+123456789' })).toBe(false);
    expect(isTaskValid({ name: 'John', phone: '+123456789' })).toBe(false);
    expect(isTaskValid({ phone: '+123456789', address: 'New York' })).toBe(false);
    expect(isTaskValid({ name: 'John', address: 'New York' })).toBe(false);
  });
});

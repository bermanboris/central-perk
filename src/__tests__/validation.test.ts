import { isTaskValid } from '../validation';

describe('task validation', () => {
  test('correct task', () => {
    const payload = { name: 'John', phone: '+123456789', address: 'New York' };
    expect(isTaskValid(payload)).toBe(true);
  });

  test('incorrect task', () => {
    const payload = { name: 'John', phone: '+123456789' };
    expect(isTaskValid(payload)).toBe(false);
  });
});

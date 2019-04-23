import { subWeeks } from 'date-fns';
import request from 'supertest';
import { app } from '../../app';
import { Bringg } from '../../bringg/bringg';

let date: jest.SpyInstance;

jest.mock('../../http-client');
jest.mock('../../bringg/bringg');

beforeEach(() => {
  date = jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);
});

afterEach(() => {
  jest.clearAllMocks();
  date.mockRestore();
});

describe('get tasks', () => {
  test('not returns tasks set before previous week', async () => {
    // subtract 2 weeks from current date
    const date = subWeeks(Date.now(), 2);

    Bringg.tasks = jest.fn().mockReturnValue({
      [Symbol.asyncIterator]: function*() {
        yield [{ title: 'Coffee Delivery', created_at: date }];
      },
    });

    const response = await request(app).get('/?phone=+123456789');
    expect(response.body).toEqual([]);
  });

  test('not returns tasks set after previous week', async () => {
    const date = Date.now();

    Bringg.tasks = jest.fn().mockReturnValue({
      [Symbol.asyncIterator]: function*() {
        yield [{ title: 'Coffee Delivery', created_at: date }];
      },
    });

    const response = await request(app).get('/?phone=+123456789');
    expect(response.body).toEqual([]);
  });

  test('returns tasks set in previous week', async () => {
    // subtract 1 week from current date
    const date = subWeeks(Date.now(), 1);

    Bringg.tasks = jest.fn().mockReturnValue({
      [Symbol.asyncIterator]: function*() {
        yield [{ title: 'Coffee Delivery', created_at: date }];
      },
    });

    const response = await request(app).get('/?phone=+123456789');
    expect(response.body).toEqual([
      { title: 'Coffee Delivery', created_at: '2016-11-11T00:00:00.000Z' },
    ]);
  });

  test('throws an error when no phone number is provided', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({
      status: 'error',
      error: 'Parameter phone is required!',
    });
  });
});

describe('add task', () => {
  test('throws an error when one of the fields is missing', async () => {
    const response = await request(app)
      .post('/')
      .send({});

    expect(response.body).toEqual({
      status: 'error',
      error: 'Required fields are missing',
    });
  });

  test('adds task successfully', async () => {
    const customer = {
      name: 'John',
      address: 'New York',
      phone: '+123456789',
      company_id: 123,
      id: 123456,
      image: '',
      lat: 123,
      lng: 123,
      external_id: '123',
      confirmation_code: 'abc',
    };

    const task = {
      title: 'Coffee Delivery',
    };

    // @ts-ignore
    Bringg.createCustomer.mockReturnValue(customer);
    // @ts-ignore
    Bringg.createTask.mockReturnValue(task);

    const response = await request(app)
      .post('/')
      .send({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      });

    expect(response.body).toEqual({ customer, task });
  });
});

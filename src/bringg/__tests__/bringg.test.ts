import { config } from '../../config';
import { httpClient } from '../../http-client';
import { Bringg } from '../bringg';
import { Customer, TaskRequest } from '../types';

let date: jest.SpyInstance;

jest.mock('../../http-client');

beforeEach(() => {
  date = jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);
});

afterEach(() => {
  jest.clearAllMocks();
  date.mockRestore();
});

function createTaskRequest(): TaskRequest {
  return {
    name: 'John',
    address: 'New York',
    phone: '+123-456-7890',
  };
}

function createCustomer(): Customer {
  return {
    name: 'John',
    address: 'New York',
    phone: '+123-456-7890',
    company_id: 123,
    id: 123456,
    image: '',
    lat: 123,
    lng: 123,
    external_id: '123',
    confirmation_code: 'abc',
  };
}

test('signs request payload', () => {
  const payload = createTaskRequest();
  const signedPayload = Bringg.signRequestPayload(payload);
  expect(signedPayload).toEqual({
    ...payload,
    timestamp: 1479427200000,
    signature: 'f44c4afc997af79f6f7e74294f9487168d912c1e',
    access_token: config.bringg.credentials.token,
  });
});

test('creates customer', async () => {
  const payload = createTaskRequest();
  await Bringg.createCustomer(payload);
  expect(httpClient.post).toBeCalledTimes(1);
  expect(httpClient.post).toBeCalledWith(
    '/customers',
    Bringg.signRequestPayload(payload)
  );
});

test('creates task', async () => {
  const customer = createCustomer();
  await Bringg.createTask(customer, 'Coffee Delivery');
  expect(httpClient.post).toBeCalledTimes(1);
  expect(httpClient.post).toBeCalledWith(
    '/tasks',
    Bringg.signRequestPayload({
      company_id: customer.company_id,
      customer_id: customer.id,
      title: 'Coffee Delivery',
    })
  );
});

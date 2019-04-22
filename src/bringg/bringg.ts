import crypto from 'crypto';
import querystring from 'querystring';
import { config } from '../config';
import { createLogger } from '../debug';
import { httpClient } from '../http-client';
import {
  Customer,
  CustomerResponse,
  Payload,
  SignedPayload,
  Task,
  TaskRequest,
  TaskResponse,
} from './types';

/**
 * Bringg provides multiple static methods that helps interact with Bringg API
 */
export class Bringg {
  public static debug = createLogger('bringg');

  /**
   * Signs request payload. Adds timestamp, access_token and signature fields
   * to provided payload.
   *
   * @param data Payload to sign.
   */
  public static signRequestPayload(data: Payload): SignedPayload {
    const payload: SignedPayload = {
      ...data,
      timestamp: Date.now(),
      access_token: config.bringg.credentials.token,
    };

    const signature = crypto
      .createHmac('sha1', config.bringg.credentials.secret)
      .update(querystring.stringify(payload))
      .digest('hex');

    payload.signature = signature;

    return payload;
  }

  public static async createCustomer(taskRequest: TaskRequest): Promise<Customer> {
    const payload = Bringg.signRequestPayload(taskRequest);
    const response = await httpClient.post<CustomerResponse>('/customers', payload);
    return response.data.customer;
  }

  public static async createTask(customer: Customer, title: string): Promise<Task> {
    const payload = Bringg.signRequestPayload({
      company_id: customer.company_id,
      customer_id: customer.id,
      title,
    });
    const response = await httpClient.post<TaskResponse>('/tasks', payload);
    return response.data.task;
  }

  /**
   * Aggreggates tasks from all pages
   * @param customerPhone Used to filter tasks that are related only to phone number owner
   */
  public static async *tasks(customerPhone?: string): AsyncIterableIterator<Task[]> {
    let page = 1;

    while (true) {
      Bringg.debug(`fetching tasks - page ${page}`);
      const payload = Bringg.signRequestPayload({ page });
      const response = await httpClient.get<Task[]>('/tasks', { params: payload });
      const tasks = response.data;

      /**
       * Increment page number for next request
       */
      page += 1;

      /**
       * There is no more tasks at the current page, so there is no point of making further requests
       */
      if (tasks.length === 0) {
        break;
      }

      /**
       * If customer phone number was provided by the caller, we filter out
       * tasks not related to phone number owner.
       */
      if (customerPhone === undefined) {
        yield tasks;
      } else {
        const customerTasks = tasks.filter(task => task.customer.phone === customerPhone);

        /**
         * There is no customer tasks on current page, skip to the next one..
         */
        if (customerTasks.length === 0) {
          Bringg.debug(`no customer (${customerPhone}) tasks found in page ${page - 1}`);
          continue;
        }

        yield customerTasks;
      }
    }
  }
}

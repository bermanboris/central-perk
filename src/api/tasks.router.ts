import { getISOWeek } from 'date-fns';
import { Router } from 'express';
import { Bringg } from '../bringg/bringg';
import { Task, TaskRequest } from '../bringg/types';
import { createLogger } from '../debug';
import { isTaskValid } from '../validation';
const tasksRouter = Router();

const debug = createLogger('tasks');

/**
 * Returns all customer tasks based on his phone number which has to be passed in query parameters
 */
tasksRouter.get('/', async (req, res) => {
  const customerTasks: Task[] = [];
  const customerPhone = req.query.phone;

  if (customerPhone === undefined) {
    return res.json({ status: 'error', error: 'Parameter phone is required!' });
  }

  try {
    for await (const tasks of Bringg.tasks(customerPhone)) {
      for (const task of tasks) {
        const lastWeek = getISOWeek(new Date()) - 1;
        const taskCreatedWeek = getISOWeek(task.created_at);
        debug({ lastWeek, taskCreatedWeek });
        /**
         * If task was created _before_ previous week, we break out of the loop.
         */
        if (taskCreatedWeek < lastWeek) {
          debug('current task is created more than 1 week ago, stopping');
          return res.json(customerTasks);
        }

        /**
         * If task was created _after_ previous week, we skip the iteration until we reach previous week.
         */
        if (taskCreatedWeek > lastWeek) {
          debug(`task created after previous week, skipping to the next one`);
          continue;
        }

        customerTasks.push(task);
      }
    }

    return res.json(customerTasks);
  } catch (err) {
    return res.json({ status: 'error', error: err.message });
  }
});

tasksRouter.post('/', async (req, res) => {
  const taskRequest: TaskRequest = req.body;

  try {
    /**
     * Validate if all required fields of task request are present
     */
    if (isTaskValid(taskRequest) === false) {
      throw new Error('Required fields are missing');
    }

    const customer = await Bringg.createCustomer(taskRequest);
    const task = await Bringg.createTask(customer, 'Coffee Delivery');

    return res.json({ customer, task });
  } catch (err) {
    return res.json({ status: 'error', error: err.message });
  }
});

export { tasksRouter };

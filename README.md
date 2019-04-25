# Central Perk API

### Manage coffee deliveries using Bringg service

## Summary

This API provides exposes two routes. First route is used for adding new tasks (orders).
And the second one, is used for getting customer tasks from previous week by his phone
number.

App is currently deployed to the cloud. You can make requests without setting up the
application locally. You can find HTTPie examples below.

## Installation

Install dependencies using npm:

```bash
npm install
```

## Running the application locally

> Before running the application, make sure you have ".env" file in root directory (same
> directory as package.json file). This file has to include environment variables that are
> necessary for API to work. You can use ".env.example" file as your boilerplate.

```bash
npm run watch

# App is running at http://127.0.0.1:8080
```

## Running the tests

```bash
npm run test
```

## Usage (using HTTPie)

### Adding new task (and customer)

> If you will try to add new customer with existing phone number, for some reason Bringg
> API will return 401 error. This is unexpected behaviour, and it is not handled by the
> application.

> Phone number has to be in **very** specific format (+xxx-xxxx-xxxx), otherwise it won't
> be added to the customer object by Bringg at all.

```bash
http POST https://api-qt6pdk5x6q-uc.a.run.app address="New York" name="John" phone="123-4567-8901"
```

### Getting customer tasks from previous week (by phone number)

> In order to get customer tasks, phone number has to be provided via GET query parameter

```bash
http GET https://api-qt6pdk5x6q-uc.a.run.app phone=="+12345678901"
```

# Central Perk API

Manage coffee deliveries using Bringg service

## Usage (using HTTPie)

### Adding new task (and customer)

```bash
http POST https://api-qt6pdk5x6q-uc.a.run.app/tasks address="New York" name="John" phone="123-4567-8901"
```

### Getting customer tasks from previous week (by phone number)

```bash
http GET https://api-qt6pdk5x6q-uc.a.run.app/tasks phone=="+12345678901"
```

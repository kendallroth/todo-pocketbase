# todo-pocketbase

## Pocketbase

### Development

Run `make api-serve` to start Pocketbase

### Auth

Add the following rule to Pocketbase to limit resources to the current user.

```
@request.auth.id = user.id
```

Tokens are valid for 14 days (by default) but can be refreshed if a valid token is provided (there is no refresh workflow). If the token is invalid (ie expired), the auth state can be cleared and a login workflow initiated.

### Admin UI

> **Username:** `kendall@kendallroth.ca`
> **Password:** `Passw0rd!@#`

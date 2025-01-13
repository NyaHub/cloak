### [[Auth]]

...
### Get User Info

Return info about self account

min permissions: [[Permissions#User]] if self or [[Permissions#Admin]]
url: `/api/v1/acc/{uuid}`
method: `get`

params:
- uuid - optional - uuid of account

response: [[Interfaces#IUser]]
### Edit user info

Edit user info and return new

min permissions: [[Permissions#User]] if self or [[Permissions#Admin]]
url: `/api/v1/acc/{uuid}`
method: `put`

params:
- uuid - optional - uuid of account

body:
```json
{
	user: IUser
}
```
response: [[Interfaces#IUser]]
### Delete account

Delete account

min permissions: [[Permissions#User]] if self or [[Permissions#Admin]]
url: `/api/v1/acc/{uuid}`
method: `delete`

params:
- uuid - optional - uuid of account

### Get balance

Get balance from account

min permissions: [[Permissions#User]] if view self balance or [[Permissions#Admin]] for other
url: `/api/v1/acc/balance/{uuid}`
method: `get`

params:
- uuid - optional - uuid of account

### Change account permission level

Change account permission level
May be used to ban  and unban account

permissions: [[Permissions#Admin]]
url: `/api/v1/acc/allowance/{uuid}`
method: `post`
body:
```json
{
	allowance: Allowance
}
```


### Create new token

Create a new token without save to database

min permissions: [[Permissions#User]]
url: `/api/v1/acc/newtoken`
method: `get`

response: `token`
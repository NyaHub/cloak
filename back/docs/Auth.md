#### Login

Login user

min permissions level: [[Permissions#Guest]]
url: `/api/v1/login`
method: `post`
type: `json`
body:
```json
{
	token: string
}
```
response: [[Interfaces#IUser]]
#### Register

Register user

min permissions level: [[Permissions#Admin]]
url: `/api/v1/register`
method: `post`
type: `json`
body:
```json
{
	email: string
}
```
response: [[Interfaces#IUser]]

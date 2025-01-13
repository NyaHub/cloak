### Create request

min permissions: [[Permissions#System]]
url: `/thread/{tuuid}/req/`
method: `post`
body:
```json
{ // IRequest
	ip: string,
	geo: string,
	isp: string,
	referer: string,
	device: string,
	ua: string,
	page: string,
	filtered: boolean
}
```

response: [[Interfaces#IRequest]]

### Edit request

min permissions: [[Permissions#Admin]]
url: `/thread/{tuuid}/req/{uuid}`
method: `put`
body:
```json
{ // IRequest
	ip: string,
	geo: string,
	isp: string,
	referer: string,
	device: string,
	ua: string,
	page: string,
	filtered: boolean
}
```

response: [[Interfaces#IRequest]]

### Delete request

min permissions: [[Permissions#Admin]]
url: `/thread/{tuuid}/req/{uuid}`
method: `delete`

response: `bool`
### Get requests

min permissions: [[Permissions#User]]
url: `/thread/{tuuid}/req/`
method: `get`

response: `IRequest[]`
### Get request

min permissions: [[Permissions#User]]
url: `/thread/{tuuid}/req/{uuid}`
method: `get`

response: `IRequest`
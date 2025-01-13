### Create thread

min permissions: [[Permissions#User]]
url: `/thread/`
method: `post`
body:
```json
{ // IThread
	name: string, // optional
	whitePage: { // IPageParams
		route: string,
		load: PageLoadType
	},
	offerPage: { // IPageParams
		route: string,
		load: PageLoadType
	},
	filters: IFilter,
	status: boolean
}
```

response: [[Interfaces#IThread]]

### Edit thread

min permissions: [[Permissions#User]]
url: `/thread/{uuid}`
method: `put`
body:
```json
{ // IThread
	name: string, // optional
	whitePage: { // IPageParams
		route: string,
		load: PageLoadType
	},
	offerPage: { // IPageParams
		route: string,
		load: PageLoadType
	},
	filters: IFilter,
	status: boolean
}
```

response: [[Interfaces#IThread]]

### Delete thread

min permissions: [[Permissions#User]]
url: `/thread/{uuid}`
method: `delete`

### Get threads

min permissions: [[Permissions#User]]
url: `/thread/`
method: `get`

### Get thread

min permissions: [[Permissions#User]]
url: `/thread/{uuid}`
method: `get`
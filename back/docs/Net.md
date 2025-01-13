## Auth in requests

### By headers

```
Authorization: Bearer <authToken>
```

### By body

```json
{
	authToken: authToken,
	data: {
		... request body
	}
}
```


## Response

```json
{
	status: int,
	message: string,
	data: any
}
```

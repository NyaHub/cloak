### Allowance

```ts
export enum Allowance {
	System = -1,
	Admin,
	User,
	Guest,
	Banned
}
```


### IUser

```ts
export interface IUser {
	id: string,
	email: string,
	name: string,
	token: string,
	allowance: Allowance,
	balance: number,
	createdAt: string,
	updatedAt: string
}
```


### IUserEdit

```ts
export interface IUserEdit {
	email: string,
	name: string,
}
```


### IPageParams

```ts
export interface IPageParams {
	route: string,
	load: PageLoadType
}
```


### IFilter

```ts
export interface IFilter {
	cloak: boolean,
	vpn: boolean,
	ipv6: boolean,
	clicks: boolean,
	geo: string[],
	geoBlock: boolean, // allow or no
	devices: DeviceTypes[],
	devicesBlock: boolean, // allow or no
	referer: string[],
	referrBlock: boolean, // allow or no
	refererEmpty: boolean, // allow or no
	UTM: string[], // utm query params? needs for tracking
	UTMBlock: boolean, // allow or no
	blacklist: string // id of blacklist from database
}
```


### DeviceTypes

```ts
export enum DeviceTypes {
	DESKTOP,
	MOBILE,
	TABLET,
	TV,
	OTHER
}
```


### PageLoadType

```ts
export enum PageLoadType {
	LOAD,
	REDIRECT,
	IFRAME
}
```


### DefaultPageParams  

```ts
export const DefaultPageParams: IPageParams = {
	route: "/",
	load: PageLoadType.LOAD
}
```


### DefaultFilters

```ts
export const DefaultFilters: IFilter = {
	cloak: true,
	vpn: true,
	ipv6: true,
	clicks: false,
	geo: [],
	geoBlock: false,
	devices: [],
	devicesBlock: false,
	referer: [],
	referrBlock: false,
	refererEmpty: false,
	UTM: [],
	UTMBlock: false,
	blacklist: "",
}
```


### IRequest

```ts
export interface IRequest {
	id: string,
	ip: string,
	geo: string,
	isp: string,
	referer: string,
	device: string,
	ua: string,
	page: string,
	filtered: boolean,
	createdAt: string
}
```


### IThread

```ts
export interface IThread{
	id: string,
	name: string,
	whitePage: IPageParams,
	offerPage: IPageParams,
	filters: IFilter,
	status: boolean,
	createdAt: string,
	updatedAt: string
}
```



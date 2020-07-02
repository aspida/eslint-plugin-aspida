# eslint-plugin-aspida

support writing aspida api definition

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-aspida`:

```
$ npm install eslint-plugin-aspida --save-dev
```


## Usage

Add `aspida` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "aspida"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "aspida/rule-name": 2
  }
}
```

We serve recommended configure. To use it:

```json
{
  "extends": [
    "plugin:aspida/recommended"
  ]
}
```

## Supported Rules

### export-methods
Make sure whether `Methods` exported.

### extra-members
Disallow unused member in each methods.

### identifier-key
Disallow using literal or expression as interface key.

### non-property-signature
Disallow non-property-signature (like below)

```typescript
interface Methods {
  get: {
    query: Type; // valid
    [key: string]: Type; // invalid
  }
}
```

### old-members
Disallow old (aspida < 0.14) member name `reqData` and `resData`

### refer-type
Disallow Refer type in each methods.

```typescript
interface Methods {
  get: {
    query: Type; // valid
  };
  post: PostDefinitionType; // invalid
}
```

*Ignoring this rule won't cause error but other rule won't work correctly*

### reqformat-type
Limit `reqFormat` type one of these:
- `ArrayBuffer`
- `Blob`
- `string`
- `FormData`

### validate-methods
Make sure method name is one of valid HTTP method
- get
- head
- post
- put
- delete
- connect
- options
- trace
- patch

### wrong-type-annotations
Disallow invalid type like below:

```typescript
interface Methods {
  get;
  post: any;
  put: {
    query;
  }
}
```

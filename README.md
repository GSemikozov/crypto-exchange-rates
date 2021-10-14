# Crypto exchange rates app

Application developed via cra + ts + jest + css-modules and intended to fetch and display current crypto change price ratio.

Public link from [Netlify](https://opening-hours-calendar.netlify.app/).

## Get started
- Install dependencies `yarn install`
- Configure your editor in accordance to linters used in project: `eslint`, `stylelint`, `prettier`

notice: before start, much better to have pre-installed plugins for eslint, stylelint and prettier in your editor +
enabled `format on save`, so you can enjoy local development process with auto-formatting code in place

## Main commands
- Develop mode `yarn start`
- Production build `yarn build`
- Run linters and check your code style `yarn lint`
- Auto-format your code according to rules described in linters' configs `prettier`
- Run tests `yarn test`

## linters
- eslint for typescript
- stylelint
- prettier
- pre-push hook that runs the following command: `yarn lint`

Allows us to keep code clean and follow common standards of code writing in modern react + typescript

## api
Locally API is available with `json-server` via endpoint called `data` and
posted here: `localhost:3001/data`.

Publicly - it's just suggested endpoint `https://coin360.com/api/coins` [data](https://coin360.com/api/coins).

## Other tools in use
- axios
- husky
- prettier

## TODO

 - Improve algorithm / formula of ratio calculation
 - Improve types (make it much readable, generic, specific)
 - Improve error handling

## License

```(c)
Copyright (C) (2021) Herman Semykozov.

All rights reserved - Do Not Redistribute
```

# CodePush Web [source](https://github.com/lisong/code-push-web)

CodePush Web is a [CodePush Server](https://github.com/lisong/code-push-server)'s web client. it's will more friendly then [code-push-cli](https://github.com/Microsoft/code-push)

## INSTALL

```shell
$ cd /path/to/code-push-web
$ npm install
```

## CONFIGURE

``` shell
$ vim ./src/config #change URL to production
```

## RUN DEV

```shell
$ npm start
```

## BUILD AND RUN IN PRODUCTION

```shell
$ cd /path/to/code-push-web
$ npm run build -- --release
$ cd ./build
$ npm install
$ node ./server.js
```

## BASE ON [React Starter Kit](https://github.com/kriasoft/react-starter-kit)

## License
MIT License [read](https://github.com/lisong/code-push-web/blob/master/LICENSE)

# js-optional
Optional Class like Java 8 java.util.Optional

### Install
npm install js-optional  <br />

### test
npm install mocha -g  <br />

cd $JS-OPTIONAL/test  <br />

mocha test.js  <br />

### Common use cases
``` javascript
let version = Optional.ofNullable("3.0.0").orElse("defalut");

version = Optional.ofNullable({version: "3.0.0"})
                    .flatMap(value => Optional.ofNullable(value.version))
                    .map(_ => _)
                    .orElse("UNKNOWN");

let isUSB3 = Optional.ofNullable("2.0")
                    .filter(_ => _ === "3.0")
                    .isPresent();
```

# enb-tech-wrap

ENB plugin to wrap a file into arbitrary content.

## Installation

```
npm i enb-wrap --save
```

## Usage

```js
[require('enb-tech-wrap/techs/wrap'), {
    filesTarget: '?.js', // source
    target: '?.wrapped.js',
    before: '/* before */',
    after: '/* after */',
    wrap: function(file, content) {
        return [
            '// The code was taken from ' + file,
            content
        ].join('\n');
    }
}]
```

## License

© 2017 YANDEX LLC. The Source Code is subject to the terms of the [Mozilla Public License 2.0](LICENSE.txt).

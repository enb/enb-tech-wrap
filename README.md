# enb-tech-wrap

ENB plugin to wrap a file into arbitrary content.

This enb tech gathers source files by `filesTarget` mask, then wraps them with `before`/`after`/`wrap`.
Finally, it concats them into one `target` file.

## Installation

```
npm i -S enb-tech-wrap
```

## Usage

```js
[require('enb-tech-wrap/techs/wrap'), {
    filesTarget: '?.js', // source
    target: '?.wrapped.js',
    before: '/* before */',
    after: '/* after */',
    beforeAll: '/* before all */',
    afterAll: '/* after all */',
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

/**
 * enb-wrap
 * ========
 *
 * Wraps a file into arbitrary content.
 *
 * **Options**
 *
 * * *String* **source** — Source file.
 * * *String* **target** — Target file.
 * * *String* **before** — Text to append before source content.
 * * *String* **after**  — Text to append after source content.
 * * *Function* **wrap** — Wrapper function.
 *
 * **Example**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-wrap/techs/wrap'));
 * ```
 */
var vfs = require('enb/lib/fs/async-fs');

module.exports = require('enb/lib/build-flow').create()
    .name('wrap-flow')
    .target('target')
    .defineRequiredOption('target')
    .defineRequiredOption('source')
    .defineOption('before', '')
    .defineOption('after', '')
    .defineOption('wrap')
    .useSourceFilename('source')
    .justJoinFiles(function (filename, content) {
        var wrapped = this.getOption('before') + content + this.getOption('after');
        return this.getOption('wrap').call(this, wrapped, filename);
    })
    .createTech();

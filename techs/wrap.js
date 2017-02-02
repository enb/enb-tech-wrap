var EOL = require('os').EOL,
    buildFlow = require('enb/lib/build-flow');
    Vow = require('vow'),
    vowFs = require('vow-fs');

/**
 * @class wrapTechFlow
 * @augments {BaseTech}
 * @classdesc
 *
 * Collects js files, wrapps and concats them together.
 *
 * @param {Object}      [options]                          Options
 * @param {String}      [options.target=js]                Path to target with compiled file.
 * @param {String[]}    [options.sourceSuffixes=['js']]    Files with specified suffixes involved in the build process.
 *
 * @example
 * addTechs([require('enb-tech-wrap/techs/wrap'), {
 *     filesTarget: '?.spec.files',
 *     target: '?.spec.js',
 *     sourceSuffixes: ['spec.js'],
 *     beforeAll: 'var b = __env__.GREP_BLOCKS;',
 *     wrap: function (filename, content) {
 *         var block = path.basename(filename, '.spec.js');
 *         return 'if(b ? (new RegExp(b)).test(\'' + block + '\'):true){' + content + '}';
 *     }
 * }])
 */
module.exports = buildFlow.create()
    .name('wrap-tech-flow')
    .target('target', '?.js')
    .defineOption('beforeAll')
    .defineOption('afterAll')
    .defineOption('before')
    .defineOption('after')
    .defineOption('wrap')
    .useFileList(['js'])
    .builder(function (files) {
        var before = this.getOption('before') || '',
            after = this.getOption('after') || '',
            beforeAll = this.getOption('beforeAll') || '',
            afterAll = this.getOption('afterAll') || '',
            wrap = this.getOption('wrap');

        return Vow.all(files.map(function (file) {
            return vowFs.read(file.fullname, 'utf8').then(function (content) {
                var wrapped = before + content + after;
                return wrap ? wrap.call(this, file.name, wrapped) : wrapped;
            });
        }, this))
        .then(function (res) {
            return beforeAll + res.join(EOL) + afterAll;
        });
    })
    .createTech();

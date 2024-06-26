(function() {
  let _ = typeof require == 'function' ? require('..') : window._;
  let templateSettings;

  QUnit.module('Utility', {

    beforeEach: function() {
      templateSettings = _.clone(_.templateSettings);
    },

    afterEach: function() {
      _.templateSettings = templateSettings;
    }

  });

  if (typeof this == 'object') {
    QUnit.test('noConflict', function(assert) {
      let underscore = _.noConflict();
      assert.strictEqual(underscore.identity(1), 1);
      if (typeof require != 'function') {
        assert.strictEqual(this._, void 0, 'global underscore is removed');
        this._ = underscore;
      } else if (typeof global !== 'undefined') {
        delete global._;
      }
    });
  }

  if (typeof require == 'function') {
    QUnit.test('noConflict (node vm)', function(assert) {
      assert.expect(2);
      let done = assert.async();
      let fs = require('fs');
      let vm = require('vm');
      let filename = __dirname + '/../underscore.js';
      fs.readFile(filename, function(err, content){
        let sandbox = vm.createScript(
          content + 'this.underscore = this._.noConflict();',
          filename
        );
        let context = {_: 'oldvalue'};
        sandbox.runInNewContext(context);
        assert.strictEqual(context._, 'oldvalue');
        assert.strictEqual(context.underscore.VERSION, _.VERSION);

        done();
      });
    });
  }

  QUnit.test('#750 - Return _ instance.', function(assert) {
    assert.expect(2);
    let instance = _([]);
    assert.strictEqual(_(instance), instance);
    assert.strictEqual(new _(instance), instance);
  });

  QUnit.test('identity', function(assert) {
    let stooge = {name: 'moe'};
    assert.strictEqual(_.identity(stooge), stooge, 'stooge is the same as his identity');
  });

  QUnit.test('constant', function(assert) {
    let stooge = {name: 'moe'};
    assert.strictEqual(_.constant(stooge)(), stooge, 'should create a function that returns stooge');
  });

  QUnit.test('noop', function(assert) {
    assert.strictEqual(_.noop('curly', 'larry', 'moe'), void 0, 'should always return undefined');
  });

  QUnit.test('random', function(assert) {
    let array = _.range(1000);
    let min = Math.pow(2, 31);
    let max = Math.pow(2, 62);

    assert.ok(_.every(array, function() {
      return _.random(min, max) >= min;
    }), 'should produce a random number greater than or equal to the minimum number');

    assert.ok(_.some(array, function() {
      return _.random(Number.MAX_VALUE) > 0;
    }), 'should produce a random number when passed `Number.MAX_VALUE`');
  });

  QUnit.test('now', function(assert) {
    let diff = _.now() - new Date().getTime();
    assert.ok(diff <= 0 && diff > -5, 'Produces the correct time in milliseconds');//within 5ms
  });

  QUnit.test('uniqueId', function(assert) {
    let ids = [], i = 0;
    while (i++ < 100) ids.push(_.uniqueId());
    assert.strictEqual(_.uniq(ids).length, ids.length, 'can generate a globally-unique stream of ids');
  });

  QUnit.test('times', function(assert) {
    let vals = [];
    _.times(3, function(i) { vals.push(i); });
    assert.deepEqual(vals, [0, 1, 2], 'is 0 indexed');
    //
    vals = [];
    _(3).times(function(i) { vals.push(i); });
    assert.deepEqual(vals, [0, 1, 2], 'works as a wrapper');
    // collects return values
    assert.deepEqual([0, 1, 2], _.times(3, function(i) { return i; }), 'collects return values');

    assert.deepEqual(_.times(0, _.identity), []);
    assert.deepEqual(_.times(-1, _.identity), []);
    assert.deepEqual(_.times(parseFloat('-Infinity'), _.identity), []);
  });

  QUnit.test('mixin', function(assert) {
    let ret = _.mixin({
      myReverse: function(string) {
        return string.split('').reverse().join('');
      }
    });
    assert.strictEqual(ret, _, 'returns the _ object to facilitate chaining');
    assert.strictEqual(_.myReverse('panacea'), 'aecanap', 'mixed in a function to _');
    assert.strictEqual(_('champ').myReverse(), 'pmahc', 'mixed in a function to the OOP wrapper');
  });

  QUnit.test('_.escape', function(assert) {
    assert.strictEqual(_.escape(null), '');
  });

  QUnit.test('_.unescape', function(assert) {
    let string = 'Curly & Moe';
    assert.strictEqual(_.unescape(null), '');
    assert.strictEqual(_.unescape(_.escape(string)), string);
    assert.strictEqual(_.unescape(string), string, 'don\'t unescape unnecessarily');
  });

  // Don't care what they escape them to just that they're escaped and can be unescaped
  QUnit.test('_.escape & unescape', function(assert) {
    // test & (&amp;) separately obviously
    let escapeCharacters = ['<', '>', '"', '\'', '`'];

    _.each(escapeCharacters, function(escapeChar) {
      let s = 'a ' + escapeChar + ' string escaped';
      let e = _.escape(s);
      assert.notEqual(s, e, escapeChar + ' is escaped');
      assert.strictEqual(s, _.unescape(e), escapeChar + ' can be unescaped');

      s = 'a ' + escapeChar + escapeChar + escapeChar + 'some more string' + escapeChar;
      e = _.escape(s);

      assert.strictEqual(e.indexOf(escapeChar), -1, 'can escape multiple occurrences of ' + escapeChar);
      assert.strictEqual(_.unescape(e), s, 'multiple occurrences of ' + escapeChar + ' can be unescaped');
    });

    // handles multiple escape characters at once
    let joiner = ' other stuff ';
    let allEscaped = escapeCharacters.join(joiner);
    allEscaped += allEscaped;
    assert.ok(_.every(escapeCharacters, function(escapeChar) {
      return allEscaped.indexOf(escapeChar) !== -1;
    }), 'handles multiple characters');
    assert.ok(allEscaped.indexOf(joiner) >= 0, 'can escape multiple escape characters at the same time');

    // test & -> &amp;
    let str = 'some string & another string & yet another';
    let escaped = _.escape(str);

    assert.notStrictEqual(escaped.indexOf('&'), -1, 'handles & aka &amp;');
    assert.strictEqual(_.unescape(str), str, 'can unescape &amp;');
  });

  QUnit.test('template', function(assert) {
    let basicTemplate = _.template("<%= thing %> is gettin' on my noives!");
    let result = basicTemplate({thing: 'This'});
    assert.strictEqual(result, "This is gettin' on my noives!", 'can do basic attribute interpolation');

    let sansSemicolonTemplate = _.template('A <% this %> B');
    assert.strictEqual(sansSemicolonTemplate(), 'A  B');

    let backslashTemplate = _.template('<%= thing %> is \\ridanculous');
    assert.strictEqual(backslashTemplate({thing: 'This'}), 'This is \\ridanculous');

    let escapeTemplate = _.template('<%= a ? "checked=\\"checked\\"" : "" %>');
    assert.strictEqual(escapeTemplate({a: true}), 'checked="checked"', 'can handle slash escapes in interpolations.');

    let fancyTemplate = _.template('<ul><% ' +
    '  for (let key in people) { ' +
    '%><li><%= people[key] %></li><% } %></ul>');
    result = fancyTemplate({people: {moe: 'Moe', larry: 'Larry', curly: 'Curly'}});
    assert.strictEqual(result, '<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>', 'can run arbitrary javascript in templates');

    let escapedCharsInJavaScriptTemplate = _.template('<ul><% _.each(numbers.split("\\n"), function(item) { %><li><%= item %></li><% }) %></ul>');
    result = escapedCharsInJavaScriptTemplate({numbers: 'one\ntwo\nthree\nfour'});
    assert.strictEqual(result, '<ul><li>one</li><li>two</li><li>three</li><li>four</li></ul>', 'Can use escaped characters (e.g. \\n) in JavaScript');

    let namespaceCollisionTemplate = _.template('<%= pageCount %> <%= thumbnails[pageCount] %> <% _.each(thumbnails, function(p) { %><div class="thumbnail" rel="<%= p %>"></div><% }); %>');
    result = namespaceCollisionTemplate({
      pageCount: 3,
      thumbnails: {
        1: 'p1-thumbnail.gif',
        2: 'p2-thumbnail.gif',
        3: 'p3-thumbnail.gif'
      }
    });
    assert.strictEqual(result, '3 p3-thumbnail.gif <div class="thumbnail" rel="p1-thumbnail.gif"></div><div class="thumbnail" rel="p2-thumbnail.gif"></div><div class="thumbnail" rel="p3-thumbnail.gif"></div>');

    let noInterpolateTemplate = _.template('<div><p>Just some text. Hey, I know this is silly but it aids consistency.</p></div>');
    result = noInterpolateTemplate();
    assert.strictEqual(result, '<div><p>Just some text. Hey, I know this is silly but it aids consistency.</p></div>');

    let quoteTemplate = _.template("It's its, not it's");
    assert.strictEqual(quoteTemplate({}), "It's its, not it's");

    let quoteInStatementAndBody = _.template('<% ' +
    "  if(foo == 'bar'){ " +
    "%>Statement quotes and 'quotes'.<% } %>");
    assert.strictEqual(quoteInStatementAndBody({foo: 'bar'}), "Statement quotes and 'quotes'.");

    let withNewlinesAndTabs = _.template('This\n\t\tis: <%= x %>.\n\tok.\nend.');
    assert.strictEqual(withNewlinesAndTabs({x: 'that'}), 'This\n\t\tis: that.\n\tok.\nend.');

    let template = _.template('<i><%- value %></i>');
    result = template({value: '<script>'});
    assert.strictEqual(result, '<i>&lt;script&gt;</i>');

    let stooge = {
      name: 'Moe',
      template: _.template("I'm <%= this.name %>")
    };
    assert.strictEqual(stooge.template(), "I'm Moe");

    template = _.template('\n ' +
    '  <%\n ' +
    '  // a comment\n ' +
    '  if (data) { data += 12345; }; %>\n ' +
    '  <li><%= data %></li>\n '
    );
    assert.strictEqual(template({data: 12345}).replace(/\s/g, ''), '<li>24690</li>');

    _.templateSettings = {
      evaluate: /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g
    };

    let custom = _.template('<ul>{{ for (let key in people) { }}<li>{{= people[key] }}</li>{{ } }}</ul>');
    result = custom({people: {moe: 'Moe', larry: 'Larry', curly: 'Curly'}});
    assert.strictEqual(result, '<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>', 'can run arbitrary javascript in templates');

    let customQuote = _.template("It's its, not it's");
    assert.strictEqual(customQuote({}), "It's its, not it's");

    quoteInStatementAndBody = _.template("{{ if(foo == 'bar'){ }}Statement quotes and 'quotes'.{{ } }}");
    assert.strictEqual(quoteInStatementAndBody({foo: 'bar'}), "Statement quotes and 'quotes'.");

    _.templateSettings = {
      evaluate: /<\?([\s\S]+?)\?>/g,
      interpolate: /<\?=([\s\S]+?)\?>/g
    };

    let customWithSpecialChars = _.template('<ul><? for (let key in people) { ?><li><?= people[key] ?></li><? } ?></ul>');
    result = customWithSpecialChars({people: {moe: 'Moe', larry: 'Larry', curly: 'Curly'}});
    assert.strictEqual(result, '<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>', 'can run arbitrary javascript in templates');

    let customWithSpecialCharsQuote = _.template("It's its, not it's");
    assert.strictEqual(customWithSpecialCharsQuote({}), "It's its, not it's");

    quoteInStatementAndBody = _.template("<? if(foo == 'bar'){ ?>Statement quotes and 'quotes'.<? } ?>");
    assert.strictEqual(quoteInStatementAndBody({foo: 'bar'}), "Statement quotes and 'quotes'.");

    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    let mustache = _.template('Hello {{planet}}!');
    assert.strictEqual(mustache({planet: 'World'}), 'Hello World!', 'can mimic mustache.js');

    let templateWithNull = _.template('a null undefined {{planet}}');
    assert.strictEqual(templateWithNull({planet: 'world'}), 'a null undefined world', 'can handle missing escape and evaluate settings');
  });

  QUnit.test('_.template provides the generated function source, when a SyntaxError occurs', function(assert) {
    let source;
    try {
      _.template('<b><%= if x %></b>');
    } catch (ex) {
      source = ex.source;
    }
    assert.ok(/__p/.test(source));
  });

  QUnit.test('_.template handles \\u2028 & \\u2029', function(assert) {
    let tmpl = _.template('<p>\u2028<%= "\\u2028\\u2029" %>\u2029</p>');
    assert.strictEqual(tmpl(), '<p>\u2028\u2028\u2029\u2029</p>');
  });

  QUnit.test('result calls functions and returns primitives', function(assert) {
    let obj = {w: '', x: 'x', y: function(){ return this.x; }};
    assert.strictEqual(_.result(obj, 'w'), '');
    assert.strictEqual(_.result(obj, 'x'), 'x');
    assert.strictEqual(_.result(obj, 'y'), 'x');
    assert.strictEqual(_.result(obj, 'z'), void 0);
    assert.strictEqual(_.result(null, 'x'), void 0);
  });

  QUnit.test('result returns a default value if object is null or undefined', function(assert) {
    assert.strictEqual(_.result(null, 'b', 'default'), 'default');
    assert.strictEqual(_.result(void 0, 'c', 'default'), 'default');
    assert.strictEqual(_.result(''.match('missing'), 1, 'default'), 'default');
  });

  QUnit.test('result returns a default value if property of object is missing', function(assert) {
    assert.strictEqual(_.result({d: null}, 'd', 'default'), null);
    assert.strictEqual(_.result({e: false}, 'e', 'default'), false);
  });

  QUnit.test('result only returns the default value if the object does not have the property or is undefined', function(assert) {
    assert.strictEqual(_.result({}, 'b', 'default'), 'default');
    assert.strictEqual(_.result({d: void 0}, 'd', 'default'), 'default');
  });

  QUnit.test('result does not return the default if the property of an object is found in the prototype', function(assert) {
    let Foo = function(){};
    Foo.prototype.bar = 1;
    assert.strictEqual(_.result(new Foo, 'bar', 2), 1);
  });

  QUnit.test('result does use the fallback when the result of invoking the property is undefined', function(assert) {
    let obj = {a: function() {}};
    assert.strictEqual(_.result(obj, 'a', 'failed'), void 0);
  });

  QUnit.test('result fallback can use a function', function(assert) {
    let obj = {a: [1, 2, 3]};
    assert.strictEqual(_.result(obj, 'b', _.constant(5)), 5);
    assert.strictEqual(_.result(obj, 'b', function() {
      return this.a;
    }), obj.a, 'called with context');
  });

  QUnit.test('result can accept an array of properties for deep access', function(assert) {
    let func = function() { return 'f'; };
    let context = function() { return this; };

    assert.strictEqual(_.result({a: 1}, 'a'), 1, 'can get a direct property');
    assert.strictEqual(_.result({a: {b: 2}}, ['a', 'b']), 2, 'can get a nested property');
    assert.strictEqual(_.result({a: 1}, 'b', 2), 2, 'uses the fallback value when property is missing');
    assert.strictEqual(_.result({a: 1}, ['b', 'c'], 2), 2, 'uses the fallback value when any property is missing');
    assert.strictEqual(_.result({a: void 0}, ['a'], 1), 1, 'uses the fallback when value is undefined');
    assert.strictEqual(_.result({a: false}, ['a'], 'foo'), false, 'can fetch falsy values');

    assert.strictEqual(_.result({a: func}, 'a'), 'f', 'can get a direct method');
    assert.strictEqual(_.result({a: {b: func}}, ['a', 'b']), 'f', 'can get a nested method');
    assert.strictEqual(_.result(), void 0, 'returns undefined if obj is not passed');
    assert.strictEqual(_.result(void 1, 'a', 2), 2, 'returns default if obj is not passed');
    assert.strictEqual(_.result(void 1, 'a', func), 'f', 'executes default if obj is not passed');
    assert.strictEqual(_.result({}, void 0, 2), 2, 'returns default if prop is not passed');
    assert.strictEqual(_.result({}, void 0, func), 'f', 'executes default if prop is not passed');

    let childObj = {c: context};
    let obj = {a: context, b: childObj};
    assert.strictEqual(_.result(obj, 'a'), obj, 'uses the parent object as context');
    assert.strictEqual(_.result(obj, 'e', context), obj, 'uses the object as context when executing the fallback');
    assert.strictEqual(_.result(obj, ['a', 'x'], context), obj, 'uses the object as context when executing the fallback');
    assert.strictEqual(_.result(obj, ['b', 'c']), childObj, 'uses the parent as context when accessing deep methods');

    assert.strictEqual(_.result({}, [], 'a'), 'a', 'returns the default when prop is empty');
    assert.strictEqual(_.result(obj, [], context), obj, 'uses the object as context when path is empty');

    let nested = {
      d: function() {
        return {
          e: function() {
            return obj;
          },
          f: context
        };
      }
    };
    assert.strictEqual(_.result(nested, ['d', 'e']), obj, 'can unpack nested function calls');
    assert.strictEqual(_.result(nested, ['d', 'f']).e(), obj, 'uses parent as context for nested function calls');
    assert.strictEqual(_.result(nested, ['d', 'x'], context).e(), obj, 'uses last valid child as context for fallback');

    if (typeof Symbol !== 'undefined') {
      let x = Symbol('x');
      let symbolObject = {};
      symbolObject[x] = 'foo';
      assert.strictEqual(_.result(symbolObject, x), 'foo', 'can use symbols as keys');

      let y = Symbol('y');
      symbolObject[y] = {};
      symbolObject[y][x] = 'bar';
      assert.strictEqual(_.result(symbolObject, [y, x]), 'bar', 'can use symbols as keys for deep matching');
    }
  });

  QUnit.test('_.templateSettings.variable', function(assert) {
    let s = '<%=data.x%>';
    let data = {x: 'x'};
    let tmp = _.template(s, {variable: 'data'});
    assert.strictEqual(tmp(data), 'x');
    _.templateSettings.variable = 'data';
    assert.strictEqual(_.template(s)(data), 'x');
  });

  QUnit.test('#547 - _.templateSettings is unchanged by custom settings.', function(assert) {
    assert.ok(!_.templateSettings.variable);
    _.template('', {}, {variable: 'x'});
    assert.ok(!_.templateSettings.variable);
  });

  QUnit.test('#556 - undefined template variables.', function(assert) {
    let template = _.template('<%=x%>');
    assert.strictEqual(template({x: null}), '');
    assert.strictEqual(template({x: void 0}), '');

    let templateEscaped = _.template('<%-x%>');
    assert.strictEqual(templateEscaped({x: null}), '');
    assert.strictEqual(templateEscaped({x: void 0}), '');

    let templateWithProperty = _.template('<%=x.foo%>');
    assert.strictEqual(templateWithProperty({x: {}}), '');
    assert.strictEqual(templateWithProperty({x: {}}), '');

    let templateWithPropertyEscaped = _.template('<%-x.foo%>');
    assert.strictEqual(templateWithPropertyEscaped({x: {}}), '');
    assert.strictEqual(templateWithPropertyEscaped({x: {}}), '');
  });

  QUnit.test('interpolate evaluates code only once.', function(assert) {
    assert.expect(2);
    let count = 0;
    let template = _.template('<%= f() %>');
    template({f: function(){ assert.ok(!count++); }});

    let countEscaped = 0;
    let templateEscaped = _.template('<%- f() %>');
    templateEscaped({f: function(){ assert.ok(!countEscaped++); }});
  });

  QUnit.test('#746 - _.template settings are not modified.', function(assert) {
    assert.expect(1);
    let settings = {};
    _.template('', null, settings);
    assert.deepEqual(settings, {});
  });

  QUnit.test('#779 - delimiters are applied to unescaped text.', function(assert) {
    assert.expect(1);
    let template = _.template('<<\nx\n>>', null, {evaluate: /<<(.*?)>>/g});
    assert.strictEqual(template(), '<<\nx\n>>');
  });

}());

# JSON Selector Language

## A tiny language for selecting JSON values

JSON Selector Language, or JSL, can be used to dynamically select JSON values.
It is meant for use in client-side environments like the browser where
bandwidth and performance constraints exist.

It was inspired by projects like jq and JMESPath, but is **tiny** by design—
it only has two expressions.

### Usage

As an example, if your data looks like the following:

```javascript
const json = {
  data: {
    Data: {
      items: [1, 3, 5, 7],
    },
  },
};
```

**Select the `Data` object:**
```javascript
import { jsl } from 'json-selector-lang';

try {
  const sel = jsl.compile('.data.Data');
  const val = jsl.evaluate(json, sel);

  // val = { items: [1, 3, 5, 7] }
} catch (e) {
  // catch the parser errors
}
```

**Select the `items` array:**
```javascript
import { jsl } from 'json-selector-lang';

try {
  const sel = jsl.compile('.data.Data.items');
  const val = jsl.evaluate(json, sel);

  // val = [1, 3, 5, 7]
} catch (e) {
  // catch the parser errors
}
```

**Select the third entry in the `items` array:**
```javascript
import { jsl } from 'json-selector-lang';

try {
  const sel = jsl.compile('.data.Data.items[2]');
  const val = jsl.evaluate(json, sel);

  // val = 5
} catch (e) {
  // catch the parser errors
}
```

### Constraints

The main constraint in v1 is that it can only evaluate JSON where the outermost
type is `object`.

```
// can evaluate
{ data: [0,1,2] }

// cannot evaluate
[ {data: 0} ]

// cannot evaluate
42

// cannot evaluate
"data"

// cannot evaluate
null
```

#### Tips

💡 Compile your selectors once and reuse as much as possible.

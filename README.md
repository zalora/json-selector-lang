# JSON Selector Language
## A tiny language for selecting JSON values

JSON Selector Language, or JSL, can be used to dynamically select JSON values.
It is meant for use in client-side environments like the browser where
bandwidth and performance constraints exist.

It was inspired by projects like jq and JMESPath, but is **tiny** by design—
it only has two expressions.

### Usage

As an example, if your data looks like the following:

```
const json = {
  data: {
    Data: {
      items: [1, 3, 5, 7]
    },
  }
};

```

You can select the `items` array as follows:

```
import jsl from 'json-selector-lang';

const itemsSelector = jsl.compile('.data.Data.items');

itemsSelector
  .eval(json)
  .then(val => {
    // val === [1, 3, 5, 7]
  })
  .catch((e) => {
    // interpreter error
  });
```

#### Tips

* Compile your selectors once and reuse as much as possible.

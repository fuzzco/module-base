Make columns that flow like this:

```
item one    item four
item two    item five
item three
```

with CSS like this:

```css
.your-list {
    display: grid;
    grid-template-rows: repeat(var(--row-count), auto);
    grid-auto-flow: column;
}
```

## Install

### NPM

1. `npm install smart-columns`
1. In your JS:

    ```
    import smartColumns from 'smart-columns'

    smartColumns()
    ```

### Script include

1. In your HTML:
    ```
    <script src="//unpkg.com/@fuzzco/smart-columns"></script>
    <script type="text/javascript">
        smartColumns()
    </script>
    ```

## Options

```js
smartColumns({
    // number of columns. default 2
    columns: 2,

    // CSS selector. default 'ol, ul'
    selector: 'ol, ul'
})
```

`smartColumns` sets a var called `--row-count` on each element it finds with the given `selector`. Run `smartColumns` again whenever the content changes to recalculate.

## Todo

-   Update when content changes - some kind of watcher?

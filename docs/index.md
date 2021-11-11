# Excla

## Lexcial Analyzer

The lexer parses strings into ASTs.

These are the tokens that are counted (with descriptions)

```js

'{' // -> match '}'

'}' // -> match '{'

'!' 

'@'

'"' // -> match '"'

'\\' // -> match TOKEN (or tokens)

'#'

```

## Multiple Macro Operators concept

There are multiple macro operators, '$', '@', and '!'.

The AST generator returns a basic tree.

```js

implementationMacro: 'define',
  generalMacro: null,
  arguments: [ 'print', 'print hello' ]

```

depending on what the statement is based on, it'll return the specific operator.

## Comment break

If it's not in any specific operation then it'll cancel the statement completely.

Everything's null and nothing's run.

## Long Options

Long options are often referred to as string literals.

They're encased by `"` and are special characters.

if you have to print a long sentence you can use string literals to prevent confusion.

```js

!define hello "hello, world"

```

```js
generalMacro: 'define',
arguments: [ 'hello', 'hello, world' ]
```

```js

!define hello hello, world

```

```js
generalMacro: 'define',
arguments: [ 'hello', 'hello,', 'world' ]
```

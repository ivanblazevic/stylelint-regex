# Stylelint Regex

Full flexibility for rule creation using regex

Examples:

## Disallow certain file name in @imports

`"stylelint/regex": [{"@import styles/main": "Global-styling is forbidden to import"}]`

## Ignore per file

`"stylelint/regex": [{"@import styles/main": "Global-styling is forbidden to import"}, { ignore: ["styles/global.scss"] }]`

This will not throw error if `@import styles/main` is found inside the `styles/global.scss`
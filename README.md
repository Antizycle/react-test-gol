# Game-of-Life
Game of life

My implementation of Game of Life on React.
Classic rules, border transitions to other side (toroidal array).
You can gererate randomly filled field with chosen size or set cells manualy.
Then start evolution process with selected speed.

Field is rendered as a html table. Each cycle it is getting redrawn with new
set of cells using react state and automatic rerenders.

KNOWN ISSUES:
- Start evolution feature is suboptimaly implemented and requires to much processing

TODO:
- redesign Start evo for better performance

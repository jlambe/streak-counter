# `@orlenka/streak-counter` - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

## Install

```shell
yarn add @orlenka/streak-counter
```

## Usage

[![Edit streak-counter (ts-course) (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/streak-counter-ts-course-forked-70jrg4?fontsize=14&hidenavigation=1&theme=dark)

```javascript
import {streakCounter} from '@orlenka/streak-counter'

const today = new Date();
const streak = streakCounter(localStorage, today);

// streak returns an object:
// {
//    currentCount: 1, 
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021"
// }
```

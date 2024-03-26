# Minesweeper

Welcome to Minesweeper! This is a React.js and TypeScript implementation of the classic Minesweeper game.

## Table of Contents

-   [Introduction](#introduction)

-   [Features](#features)

-   [Installation](#installation)

-   [Usage](#usage)

## Introduction

Minesweeper is a classic single-player puzzle game. The objective is to clear a rectangular board containing hidden mines without detonating any of them. Players reveal cells on the board to uncover numbers indicating how many adjacent cells contain mines. By using logic, players must strategically flag cells they believe contain mines and safely reveal the rest. The game ends when all non-mine cells are revealed (victory) or when a mine is accidentally revealed (defeat).

This project is a React.js implementation of Minesweeper, featuring a customizable game board depending on the difficulty level of the game, left-click and right-click mechanics for revealing and flagging cells, game end conditions, and more.

## Features

-   Dynamic game board generation based on user selected levels.
-   Random placement of mines on the board.
-   Left-click functionality to reveal cells.
-   Right-click functionality to flag cells.
-   Counter for the number of remaining mines and timer.
-   Game end conditions for victory or defeat.

## Installation

To run the Minesweeper game locally, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/vartika06/minesweeper.git
```

2. Navigate to the project directory:

```bash
cd minesweeper
```

3. Install dependencies using NPM:

```bash
npm install
```

4. After installing the dependencies, you can start the development server to play the game:

```bash
npm start
```

This command will start the development server and open the Minesweeper game in your default web browser. If it doesn't open automatically, you can access the game by navigating to http://localhost:3000 in your browser.

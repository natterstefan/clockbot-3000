module.exports = text =>
  [...text]
    .flatMap((cur, i, arr) => [
      {
        type: 'clear',
      },
      ...arr.slice(0, i + 1).map((letter, j) => ({
        type: 'text',
        string: letter,
        position: [4 * j, 0],
        color: [255 * (1 - j / arr.length), 0, 255 * j],
      })),
      {
        type: 'show',
      },
      {
        type: 'wait',
        ms: 500,
      },
    ])
    .concat({
      type: 'exit',
    })

function degreesToRadiant(degrees) {
  return (degrees * Math.PI) / 180;
}

export default function drawAnalogClock() {
  const startX = 0;
  const startY = 0;
  const radius = 3;
  const center = getPos(4, 4);
  const now = new Date();

  function getPos(x, y) {
    return [Math.round(startX + x), Math.round(startY + y)];
  }

  function drawHand({value, color, length}) {
    const degrees = value * 360;
    const radiant = degreesToRadiant(degrees);
    const x = Math.sin(radiant) * length;
    const y = Math.cos(radiant) * length;

    return {
      type: 'line',
      start: center,
      end: getPos(center[0] + x, center[1] - y),
      color
    };
  }

  return [
    {
      type: 'clear'
    },
    {
      type: 'circle',
      radius,
      position: center,
      color: [255, 255, 255]
    },
    drawHand({
      value: (now.getHours() % 12) / 12,
      length: 1,
      color: [0, 0, 255]
    }),
    drawHand({value: now.getMinutes() / 60, length: 2, color: [0, 255, 0]}),
    {
      type: 'show'
    }
  ];
}

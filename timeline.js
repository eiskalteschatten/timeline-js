function drawTimeline() {
  const canvas = document.getElementById('timelineCanvas');

  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const numberOfSpaces = { x: 5, y: 5 };

  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = isDarkMode ? 'white' : 'black';

  function drawLines() {
    const distanceBetweenLines = {
      x: canvas.width / numberOfSpaces.x,
      y: canvas.height / numberOfSpaces.y,
    };

    // Draw vertical lines
    for (let line = 1; line < numberOfSpaces.x; line += 1) {
      const height = canvas.height / 2;
      const x = line * distanceBetweenLines.x;
      const y = height / 2;

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, x, y);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.stroke();
      ctx.closePath();
    }

    // Draw horizontal line
    ctx.beginPath();
    ctx.setTransform(1,0,0,1, 0, canvas.height / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.closePath();
  }

  drawLines();
}

window.onload = drawTimeline;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawTimeline);

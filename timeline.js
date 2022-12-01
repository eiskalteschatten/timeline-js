function drawTimeline() {
  const canvas = document.getElementById('timelineCanvas');

  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const numberOfSpaces = 10;

  const ctx = canvas.getContext('2d');
  const foregroundColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'black' : 'white';

  ctx.strokeStyle = foregroundColor;

  function drawCenterLine() {
    ctx.beginPath();
    ctx.setTransform(1, 0, 0, 1, 0, canvas.height / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.closePath();
  }

  function drawYears() {
    const distanceBetweenLines = canvas.width / numberOfSpaces;

    // Draw vertical lines
    for (let line = 1; line < numberOfSpaces; line += 1) {
      const height = canvas.height / 2;
      const x = line * distanceBetweenLines;
      const y = height / 2;

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, x, y);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function drawGradient() {
    const transparentColor = isDarkMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)';
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, backgroundColor);
    gradient.addColorStop(.25, transparentColor);
    gradient.addColorStop(.75, transparentColor);
    gradient.addColorStop(1, backgroundColor);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  }

  drawCenterLine();
  drawYears();
  drawGradient();
}

window.onload = drawTimeline;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawTimeline);

function drawTimeline() {
  const canvas = document.getElementById('timelineCanvas');

  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const ctx = canvas.getContext('2d');
  const foregroundColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'black' : 'white';
  const fontSize = 16;

  ctx.strokeStyle = foregroundColor;
  ctx.font = `${fontSize}px sans-serif`;

  let timeLineX = 0;

  const distanceBetweenLines = 50;
  const linesPerScreen = Math.floor(canvas.width / distanceBetweenLines);
  const howOftenYearsAreShown = 3;
  const distanceBetweenYears = distanceBetweenLines * howOftenYearsAreShown;
  const yearsPerScreen = Math.floor(canvas.width / distanceBetweenYears);
  const yearIncrement = Math.floor(Math.random() * 35);
  const minStartingYear = 700;
  const maxStartingYear = 1000;
  const startingYear = Math.floor(Math.random() * (maxStartingYear - minStartingYear + 1) + minStartingYear);

  const years = [startingYear];

  for (let year = startingYear; year < new Date().getFullYear(); year = year + yearIncrement) {
    years.push(year);
  }

  let yearSliceIndex = 0;
  let yearsToDraw = years.slice(yearSliceIndex, yearsPerScreen);
  let yearsScrolledOff = [];

  function drawCenterLine() {
    ctx.beginPath();
    ctx.setTransform(1, 0, 0, 1, 0, canvas.height / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.closePath();
  }

  function drawYears() {
    let yearIndex = 0;

    for (let line = 1; line < linesPerScreen; line++) {
      const hasYear = !Boolean(line % howOftenYearsAreShown);
      const height = hasYear ? (canvas.height / 2) - fontSize : canvas.height / 2;
      const x = (line * distanceBetweenLines) - timeLineX;
      const y = hasYear ? (height / 2) + (fontSize / 2) : height / 2;

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, x, y);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.stroke();
      ctx.closePath();

      if (hasYear) {
        const year = yearsToDraw[yearIndex];
        ctx.setTransform(1,0,0,1, x, y);
        ctx.textAlign = 'center';
        ctx.fillStyle = foregroundColor;
        ctx.fillText(year, 0, 55);
        yearIndex++;
        yearsScrolledOff.push(year);
        yearSliceIndex++;
        yearsToDraw = years.slice(yearSliceIndex, yearSliceIndex + yearsPerScreen);
      }
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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawYears();
    drawCenterLine();
    drawGradient();
    timeLineX += 1;
    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
}

window.onload = drawTimeline;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawTimeline);

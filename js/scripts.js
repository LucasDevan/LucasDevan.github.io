const cards = document.querySelectorAll('.skill-card');

  cards.forEach(card => {
    const canvas = card.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const percent = card.getAttribute('data-percent');

    const center = 50;
    const radius = 40;

    ctx.lineWidth = 8;

    // background circle
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // progress circle
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(center, center, radius, -Math.PI/2, (2 * Math.PI * percent / 100) - Math.PI/2);
    ctx.stroke();

    // text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(percent + '%', center, center + 5);
});
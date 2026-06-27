let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let ctx = canvas.getContext('2d');

function getDotColor() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return isDark ? '#ffffff' : '#000000';
}

let dots = [];
for (let i = 0; i < 50; i++) {
  let x = Math.floor(Math.random() * canvas.width);
  let y;

y = Math.floor(Math.random() * canvas.height);
  
  dots.push({
    x,
    y,
    size: Math.random() * 3 + 5,
    color: getDotColor()
  });
}

const drawDotsOnly = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fill();
  });
};

drawDotsOnly();

document.addEventListener('mousemove', event => {
  if (window.matchMedia('(pointer: fine)').matches) {
    drawDotsOnly();
    let mouse = {
      x: event.pageX - banner.getBoundingClientRect().left,
      y: event.pageY - banner.getBoundingClientRect().top
    };

    dots.forEach(dot => {
      let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
      if (distance < 300) {
        ctx.strokeStyle = dot.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });
  }
});

window.addEventListener('mouseout', event => {
  if (!event.relatedTarget || event.relatedTarget.nodeName === 'HTML') {
    drawDotsOnly();
  }
});

window.updateDotColors = function () {
  dots.forEach(dot => {
    dot.color = getDotColor();
  });
  drawDotsOnly();
};

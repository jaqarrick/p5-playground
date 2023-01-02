import p5 from "p5";

const randomPlacement = (canvasWidth: number, canvasHeight: number) => {
  const randomX = Math.floor(Math.random() * canvasWidth);
  const randomY = Math.floor(Math.random() * canvasHeight);
  return [randomX, randomY];
};

const generateDotPlacements = (numOfDots: number, cw: number, ch: number) => {
  const placements = [];
  for (let i = 1; i < numOfDots; i++) {
    placements.push(randomPlacement(cw, ch));
  }
  return placements;
};

const placeDot = (p: p5, x: number, y: number) => {
  p.stroke(255, 0,0);
  p.fill(255, 0, 0)
  p.ellipse(x, y, 10, 10);
  p.point(x, y, Math.floor(Math.random() * 1000));
};

const connectAllPoints = (p: p5, points: number[][]) => {
  points.forEach((point, i) => {
    points.forEach((connection, j) => {
      const x1 = point[0],
        y1 = point[1],
        x2 = connection[0],
        y2 = connection[1];

      if (i !== j) {
        p.line(x1, y1, x2, y2);
      }
    });
  });
};

const randomDelta = () => (Math.random() < 0.5 ? 0 : Math.random() * 5 - 2.5);

const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;
const init = () => {
  const sketch = (p: p5) => {
    const group1 = generateDotPlacements(10, canvasWidth, canvasHeight),
      group2 = generateDotPlacements(40, canvasWidth, canvasHeight);
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(40);
    };

    p.draw = () => {
      p.background(255);
      // p.noFill();
      // p.fill(0,0,0);

      group1.forEach((placement, i) => {
        const newX = placement[0] + randomDelta(),
          newY = placement[1] + randomDelta();
        group1[i] = [newX, newY];
        placeDot(p, newX, newY);
      });

      group2.forEach(point => placeDot(p, point[0], point[1]))

      connectAllPoints(p, group1);
      connectAllPoints(p, group2);
    };
  };
  new p5(sketch, document.body);
};

init();
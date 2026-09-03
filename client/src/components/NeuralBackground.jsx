import { useEffect, useRef } from 'react';
import './NeuralBackground.css';

function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];
    let isPaused = false;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setupNodes();
    }

    function setupNodes() {
      // Fewer nodes on smaller screens (mobile), more on larger screens
      const isMobile = window.innerWidth < 768;
      const divisor = isMobile ? 45000 : 25000;
      const nodeCount = Math.min(
        Math.floor((canvas.width * canvas.height) / divisor),
        isMobile ? 30 : 70 // hard cap either way
      );

      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      }));
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (isPaused) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const opacity = 1 - dist / 140;
            ctx.strokeStyle = `rgba(79, 240, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.fillStyle = 'rgba(79, 240, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    // Pause the animation when the browser tab isn't visible (saves battery/CPU)
    function handleVisibilityChange() {
      isPaused = document.hidden;
      if (!isPaused) {
        draw(); // resume
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-bg" />;
}

export default NeuralBackground;
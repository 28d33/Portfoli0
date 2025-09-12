import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 20;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(0);
    const characters = 'qwertyuiopasdfghjklzxcvbnm`~!@#$%^&*()-=_+[]{}\|";:?/><,.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function drawMatrixRain() {
      // fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    let animationId;
    function animate() {
      drawMatrixRain();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(0);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}

import React, { useRef, useEffect } from "react";

export default function MiniPong({ width = 400, height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    let ball = { x: width / 2, y: height / 2, vx: 5, vy: 4, r: 8 };
    let paddle = { x: width - 20, y: height / 2 - 30, w: 10, h: 60 };

    const loop = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#1c1c22");
      gradient.addColorStop(0.5, "#31293f");
      gradient.addColorStop(1, "#1c1c22");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y - ball.r < 0 || ball.y + ball.r > height) ball.vy *= -1;
      if (ball.x - ball.r < 0) ball.vx *= -1;

      if (
        ball.x + ball.r > paddle.x &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.h
      ) ball.vx *= -1;

      if (ball.x > width) {
        ball.x = width / 2;
        ball.y = height / 2;
        ball.vx = 5;
        ball.vy = 4;
      }

      const ballGradient = ctx.createRadialGradient(
        ball.x - ball.r/2, ball.y - ball.r/2, 0,
        ball.x, ball.y, ball.r
      );
      ballGradient.addColorStop(0, "#ff7b00");
      ballGradient.addColorStop(1, "#ff5722");
      ctx.fillStyle = ballGradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      const paddleGradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x + paddle.w, paddle.y);
      paddleGradient.addColorStop(0, "#f97316");
      paddleGradient.addColorStop(1, "#ff7b00");
      ctx.fillStyle = paddleGradient;
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

      requestAnimationFrame(loop);
    };

    const movePaddle = (e) => {
      const rect = cvs.getBoundingClientRect();
      const scaleY = cvs.height / rect.height;
      
      paddle.y = (e.clientY - rect.top) * scaleY - paddle.h / 2;
      
      if (paddle.y < 0) paddle.y = 0;
      if (paddle.y + paddle.h > height) paddle.y = height - paddle.h;
    };

    cvs.addEventListener("mousemove", movePaddle);
    loop();

    return () => {
      cvs.removeEventListener("mousemove", movePaddle);
    };
  }, [width, height]);

  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      padding: "1rem"
    }}>
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        style={{ 
          border: "2px solid #31293f",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "100%",
          height: "auto"
        }} 
      />
    </div>
  );
}

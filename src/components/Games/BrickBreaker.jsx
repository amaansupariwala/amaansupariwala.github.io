import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-width: 860px;
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(12,12,15,0.7), rgba(12,12,15,0.9));
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  overflow: hidden;
  max-height: calc(100vh - 160px);
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: #0f1115;
  touch-action: none;
  overscroll-behavior: contain;
`;

const Hud = styled.div`
  position: absolute;
  top: 8px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  z-index: ${props => props.theme.zIndices.overlay};
`;

const Lives = styled.div`
  color: #fff;
  font-size: 14px;
  opacity: 0.9;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GhostButton = styled.button`
  padding: 6px 10px;
  font-size: 13px;
  color: #fff;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  transition: ${props => props.theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(255,255,255,0.14);
    transform: translateY(-1px);
  }
`;

const OverlayCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.theme.zIndices.overlay};
  pointer-events: none;
`;

const OverlayCard = styled.div`
  pointer-events: auto;
  background: rgba(15, 17, 21, 0.9);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 16px 20px;
  color: #fff;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
`;

const EndGameButton = styled(GhostButton)`
  position: absolute;
  top: 8px;
  right: 12px;
`;

const BrickBreaker = ({ onEnd }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'won' | 'lost'
  const [lives, setLives] = useState(3);
  const [isTouch, setIsTouch] = useState(false);
  const gameStateRef = useRef('ready');

  // Internal game state not tied to React renders
  const gameRef = useRef({
    width: 960,
    height: 720,
    scale: 1,
    balls: [],
    paddle: { width: 120, height: 16, x: 420, y: 680, speed: 10 },
    bricks: [],
    brickRows: 3,
    brickCols: 5,
    brickWidth: 160,
    brickHeight: 36,
    brickPadding: 10,
    brickOffsetTop: 110,
    brickOffsetLeft: 30,
    keys: {},
    pointerX: 480,
    isPointerActive: false,
    animationId: null
  });

  const initBricks = () => {
    const game = gameRef.current;
    const bricks = [];
    const colors = ['#7f1d1d', '#991b1b', '#b91c1c', '#dc2626', '#ef4444'];
    for (let row = 0; row < game.brickRows; row++) {
      bricks[row] = [];
      for (let col = 0; col < game.brickCols; col++) {
        bricks[row][col] = { x: 0, y: 0, status: 1, color: colors[col % colors.length], isSpeed: false, isExtraBall: false };
      }
    }
    // Choose a speed-up brick on the bottom row
    const specialRow = game.brickRows - 1;
    const specialCol = Math.floor(Math.random() * game.brickCols);
    bricks[specialRow][specialCol].isSpeed = true;
    // Choose two +ball bricks that are not the speed brick and are distinct
    const pickCell = () => ({ r: Math.floor(Math.random() * game.brickRows), c: Math.floor(Math.random() * game.brickCols) });
    let b1 = pickCell();
    if (b1.r === specialRow && b1.c === specialCol) b1.c = (b1.c + 1) % game.brickCols;
    let b2 = pickCell();
    if ((b2.r === specialRow && b2.c === specialCol) || (b2.r === b1.r && b2.c === b1.c)) b2.c = (b1.c + 2) % game.brickCols;
    bricks[b1.r][b1.c].isExtraBall = true;
    bricks[b2.r][b2.c].isExtraBall = true;
    game.bricks = bricks;
  };

  const createBallAtCenter = () => {
    const game = gameRef.current;
    const speed = 6.5;
    const x = game.width / 2;
    const y = game.height - 160;
    let dx = (Math.random() * 2 - 1) * speed; // -speed..speed
    if (Math.abs(dx) < speed * 0.35) {
      dx = Math.sign(dx || 1) * speed * 0.5;
    }
    const dy = -Math.sqrt(Math.max(speed * speed - dx * dx, 1));
    return { x, y, radius: 8, dx, dy };
  };

  const resetBallAndPaddle = () => {
    const game = gameRef.current;
    game.balls = [createBallAtCenter()];
    game.paddle.x = (game.width - game.paddle.width) / 2;
  };

  const respawnBallFromCenter = () => {
    const game = gameRef.current;
    game.balls = [createBallAtCenter()];
  };

  const resetGame = () => {
    initBricks();
    setLives(3);
    setGameState('ready');
    resetBallAndPaddle();
  };

  const checkWin = () => {
    const game = gameRef.current;
    for (let r = 0; r < game.brickRows; r++) {
      for (let c = 0; c < game.brickCols; c++) {
        if (game.bricks[r][c].status === 1) return;
      }
    }
    setGameState('won');
    if (game.animationId) cancelAnimationFrame(game.animationId);
  };

  const detectBrickCollision = (ball) => {
    const game = gameRef.current;
    for (let r = 0; r < game.brickRows; r++) {
      for (let c = 0; c < game.brickCols; c++) {
        const brick = game.bricks[r][c];
        if (brick.status !== 1) continue;
        const bx = c * (game.brickWidth + game.brickPadding) + game.brickOffsetLeft;
        const by = r * (game.brickHeight + game.brickPadding) + game.brickOffsetTop;
        brick.x = bx; brick.y = by;

        if (
          ball.x + ball.radius > bx &&
          ball.x - ball.radius < bx + game.brickWidth &&
          ball.y + ball.radius > by &&
          ball.y - ball.radius < by + game.brickHeight
        ) {
          // Determine side of impact using overlap
          const overlapLeft = ball.x + ball.radius - bx;
          const overlapRight = bx + game.brickWidth - (ball.x - ball.radius);
          const overlapTop = ball.y + ball.radius - by;
          const overlapBottom = by + game.brickHeight - (ball.y - ball.radius);
          const minOverlapX = Math.min(overlapLeft, overlapRight);
          const minOverlapY = Math.min(overlapTop, overlapBottom);
          if (minOverlapX < minOverlapY) {
            ball.dx = -ball.dx;
          } else {
            ball.dy = -ball.dy;
          }
          if (brick.isSpeed) {
            // Double the speed
            const speedScale = 2.0;
            ball.dx *= speedScale;
            ball.dy *= speedScale;
          }
          if (brick.isExtraBall) {
            // Spawn a new ball at collision point with randomized direction
            const baseSpeed = Math.hypot(ball.dx, ball.dy);
            let ndx = (Math.random() * 2 - 1);
            if (Math.abs(ndx) < 0.3) ndx = Math.sign(ndx || 1) * 0.5;
            const ndy = Math.sign(ball.dy) * Math.sqrt(Math.max(1 - ndx * ndx, 0.1));
            const newBall = {
              x: ball.x,
              y: ball.y,
              radius: 8,
              dx: ndx * baseSpeed,
              dy: ndy * baseSpeed
            };
            if (game.balls.length < 3) {
              game.balls.push(newBall);
            }
          }
          brick.status = 0;
          checkWin();
        }
      }
    }
  };

  const update = () => {
    const game = gameRef.current;
    const { paddle, width, height, keys } = game;

    // Horizontal paddle control via keys
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) paddle.x -= paddle.speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) paddle.x += paddle.speed;
    // Pointer (mouse/touch) glues paddle to pointerX
    paddle.x += (game.pointerX - (paddle.x + paddle.width / 2)) * 0.3;

    // Bounds for paddle
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > width) paddle.x = width - paddle.width;

    // Update all balls
    const remaining = [];
    for (let i = 0; i < game.balls.length; i++) {
      const ball = game.balls[i];
      // Move
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Walls
      if (ball.x - ball.radius < 0) { ball.x = ball.radius; ball.dx = -ball.dx; }
      if (ball.x + ball.radius > width) { ball.x = width - ball.radius; ball.dx = -ball.dx; }
      if (ball.y - ball.radius < 0) { ball.y = ball.radius; ball.dy = -ball.dy; }

      // Paddle
      if (
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width &&
        ball.dy > 0
      ) {
        const relative = (ball.x - paddle.x) / paddle.width; // 0..1
        const angle = (relative - 0.5) * Math.PI / 2.5; // spread ~72deg
        const speed = Math.hypot(ball.dx, ball.dy);
        ball.dx = speed * Math.sin(angle);
        ball.dy = -Math.abs(speed * Math.cos(angle));
        ball.y = paddle.y - ball.radius - 0.5;
      }

      // Bricks
      detectBrickCollision(ball);

      // Keep ball if not missed
      if (ball.y - ball.radius <= height) {
        remaining.push(ball);
      }
    }
    game.balls = remaining;

    // If no balls remain, lose a life
    if (game.balls.length === 0) {
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setGameState('lost');
      } else {
        respawnBallFromCenter();
        // Pause game and wait for user tap to continue
        setGameState('ready');
      }
    }
  };

  const draw = (ctx) => {
    const game = gameRef.current;
    const { width, height, paddle, bricks, balls } = game;
    // Background
    const gV = ctx.createLinearGradient(0, 0, 0, height);
    gV.addColorStop(0, '#111316');
    gV.addColorStop(1, '#0b0d12');
    ctx.fillStyle = gV;
    ctx.fillRect(0, 0, width, height);

    // Bricks
    for (let r = 0; r < game.brickRows; r++) {
      for (let c = 0; c < game.brickCols; c++) {
        const brick = bricks[r][c];
        if (brick.status !== 1) continue;
        const x = c * (game.brickWidth + game.brickPadding) + game.brickOffsetLeft;
        const y = r * (game.brickHeight + game.brickPadding) + game.brickOffsetTop;
        brick.x = x; brick.y = y;
        ctx.fillStyle = brick.color;
        ctx.fillRect(x, y, game.brickWidth, game.brickHeight);
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 0.5, y + 0.5, game.brickWidth - 1, game.brickHeight - 1);
        if (brick.isSpeed) {
          // Draw "2x speed"
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 16px Inter, Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('2x speed', x + game.brickWidth / 2, y + game.brickHeight / 2);
        }
        if (brick.isExtraBall) {
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 16px Inter, Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+ball', x + game.brickWidth / 2, y + game.brickHeight / 2);
        }
      }
    }

    // Paddle
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Balls
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    }
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    draw(ctx);
    if (gameStateRef.current === 'playing') update();
    game.animationId = requestAnimationFrame(loop);
  };

  const startGame = () => {
    const game = gameRef.current;
    if (!game.balls || game.balls.length === 0) {
      game.balls = [createBallAtCenter()];
    }
    if (gameStateRef.current !== 'playing') setGameState('playing');
  };

  // Resize to fit frame while keeping logical size for crisp physics
  const resizeToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = gameRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / game.width;
    const scaleY = rect.height / game.height;
    game.scale = Math.min(scaleX, scaleY);
    // Adjust brick vertical offset for small viewports and touch devices
    const baseTop = 120;
    const touchBump = isTouch ? 40 : 0;
    const smallHeightBump = rect.height < 540 ? 40 : 0;
    game.brickOffsetTop = baseTop + touchBump + smallHeightBump;
    // Center bricks horizontally within the frame
    const totalGridWidth = game.brickCols * game.brickWidth + (game.brickCols - 1) * game.brickPadding;
    game.brickOffsetLeft = Math.max(0, Math.floor((game.width - totalGridWidth) / 2));
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const canvas = canvasRef.current;
    const game = gameRef.current;
    initBricks();
    resetBallAndPaddle();
    setIsTouch(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    const handleKeyDown = (e) => {
      game.keys[e.key] = true;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        startGame();
      }
    };
    const handleKeyUp = (e) => { game.keys[e.key] = false; };

    const updatePointerFromEvent = (clientX) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const ratioX = rect.width > 0 ? (x / rect.width) : 0.5;
      game.pointerX = ratioX * game.width;
    };

    const onMouseMove = (e) => { updatePointerFromEvent(e.clientX); };
    const onMouseDown = (e) => { game.isPointerActive = true; updatePointerFromEvent(e.clientX); startGame(); };
    const onMouseUp = () => { game.isPointerActive = false; };

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        game.isPointerActive = true;
        updatePointerFromEvent(e.touches[0].clientX);
        startGame();
      }
    };
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePointerFromEvent(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => { game.isPointerActive = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    // Global listeners so touches/clicks anywhere control the paddle
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', resizeToCanvas);
    resizeToCanvas();
    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', resizeToCanvas);
      if (game.animationId) cancelAnimationFrame(game.animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile-only: lock scroll while playing
  useEffect(() => {
    const isMobile = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile) return;

    const preventDefault = (e) => {
      if (gameStateRef.current === 'playing') {
        e.preventDefault();
      }
    };

    if (gameState === 'playing') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('wheel', preventDefault, { passive: false });
      return () => {
        document.body.style.overflow = originalOverflow || '';
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('wheel', preventDefault);
      };
    } else {
      // Ensure scroll is enabled when not playing
      document.body.style.overflow = '';
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'lost' || gameState === 'won') {
      // stop loop next frame; handled in loop via no updates
    }
  }, [gameState]);

  return (
    <Frame>
      <Canvas
        ref={canvasRef}
        width={gameRef.current.width}
        height={gameRef.current.height}
        onClick={() => startGame()}
        onTouchStart={() => startGame()}
      />

      <Hud>
        <Lives>Lives: {lives}</Lives>
        <ControlsRow>
          <GhostButton onClick={() => resetGame()}>Restart</GhostButton>
        </ControlsRow>
      </Hud>

      <EndGameButton onClick={() => { 
        // Ensure scroll is re-enabled on exit
        try { document.body.style.overflow = ''; } catch (e) {}
        resetGame(); 
        setGameState('ready'); 
        if (onEnd) onEnd(); 
      }} aria-label="End game">
        ✕ End game
      </EndGameButton>

      {(gameState === 'ready' || gameState === 'won' || gameState === 'lost') && (
        <OverlayCenter onClick={() => startGame()} onTouchStart={() => startGame()}>
          <OverlayCard>
            {gameState === 'ready' && <div>{isTouch ? 'Tap anywhere to start' : 'Click anywhere or press SPACE to start'}</div>}
            {gameState === 'won' && (
              <div>
                <div>Good job!</div>
                <div style={{ marginTop: 12 }}>
                  <GhostButton onClick={() => { resetGame(); setGameState('ready'); }}>Play again</GhostButton>
                </div>
              </div>
            )}
            {gameState === 'lost' && (
              <div>
                <div>Game over</div>
                <div style={{ marginTop: 12 }}>
                  <GhostButton onClick={() => { resetGame(); }}>Play again</GhostButton>
                </div>
              </div>
            )}
          </OverlayCard>
        </OverlayCenter>
      )}
    </Frame>
  );
};

export default BrickBreaker;



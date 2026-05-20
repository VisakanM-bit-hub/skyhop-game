import { useState, useEffect, useRef } from 'react';
import { Background } from './components/Background';
import { MemoizedPlayer } from './components/Player';
import { MemoizedObstacle } from './components/Obstacle';
import { ParticleEffect, ExplosionEffect } from './components/ParticleEffect';
import { ScoreBoard } from './components/ScoreBoard';
import { StartScreen } from './components/StartScreen';
import { GameOver } from './components/GameOver';
import { PauseButton, PauseMenu } from './components/PauseButton';
import { MobileControls, TouchArea } from './components/MobileControls';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_SIZE,
  PLAYER_START_X,
  PLAYER_START_Y,
  GRAVITY,
  JUMP_POWER,
  MAX_FALL_SPEED,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  OBSTACLE_MIN_GAP,
  OBSTACLE_MAX_GAP,
  SCORE_THRESHOLD_FOR_DIFFICULTY,
  DIFFICULTY_INCREMENT,
  PLATFORM_MOVE_SPEED,
  PARTICLE_COUNT,
  PARTICLE_SPEED,
} from './utils/constants';
import { getHighScore, setHighScore } from './utils/storage';
import { playSound } from './utils/sounds';
import './App.css';

export default function App() {
  // Game State
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScoreState] = useState(() => getHighScore());
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Player State
  const [playerState, setPlayerState] = useState({
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    velocityY: 0,
  });

  // Obstacles State
  const [obstacles, setObstacles] = useState([]);

  // Particles
  const [particles, setParticles] = useState([]);

  // Explosion Effect
  const [explosionPos, setExplosionPos] = useState(null);
  const [showExplosion, setShowExplosion] = useState(false);

  // Refs for game state
  const gameRefState = useRef({
    score: 0,
    level: 1,
    difficulty: 1,
    totalDistance: 0,
    cameraY: 0,
    gameOver: false,
  });

  const obstaclesRef = useRef([]);
  const nextObstacleYRef = useRef(-300);
  const particlesRef = useRef([]);
  const explosionTimeoutRef = useRef(null);
  const gameLoopRef = useRef(null);

  /**
   * Initialize new game
   */
  const initializeGame = () => {
    if (explosionTimeoutRef.current) clearTimeout(explosionTimeoutRef.current);

    setPlayerState({
      x: PLAYER_START_X,
      y: PLAYER_START_Y,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      velocityY: 0,
    });

    // Generate first obstacles well above player
    const initialObstacles = [];
    for (let i = 0; i < 10; i++) {
      initialObstacles.push({
        id: Math.random(),
        x: Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH),
        y: -300 - i * 150,
        width: OBSTACLE_WIDTH,
        height: OBSTACLE_HEIGHT,
        moveDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    obstaclesRef.current = initialObstacles;
    setObstacles(initialObstacles);
    nextObstacleYRef.current = -300 - 10 * 150 - 150;

    setScore(0);
    setLevel(1);
    setIsNewRecord(false);
    setShowExplosion(false);
    setExplosionPos(null);
    particlesRef.current = [];
    setParticles([]);

    gameRefState.current = {
      score: 0,
      level: 1,
      difficulty: 1,
      totalDistance: 0,
      cameraY: 0,
      gameOver: false,
    };
  };

  /**
   * Handle player jump
   */
  const handlePlayerJump = () => {
    if (gameState !== 'playing' || isPaused) return;

    setPlayerState((prev) => ({
      ...prev,
      velocityY: JUMP_POWER,
    }));

    playSound('jump');

    // Jump particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const vx = Math.cos(angle) * PARTICLE_SPEED;
      const vy = Math.sin(angle) * PARTICLE_SPEED;
      particlesRef.current.push({
        id: Math.random(),
        x: playerState.x + PLAYER_SIZE / 2,
        y: playerState.y + PLAYER_SIZE,
        vx,
        vy,
        life: 600,
        maxLife: 600,
      });
    }
  };

  /**
   * Main game loop
   */
  useEffect(() => {
    if (gameState !== 'playing' || isPaused) return;

    const gameLoop = () => {
      setPlayerState((prevPlayer) => {
        let player = { ...prevPlayer };

        // Apply gravity
        player.velocityY += GRAVITY;
        if (player.velocityY > MAX_FALL_SPEED) {
          player.velocityY = MAX_FALL_SPEED;
        }

        // Update position
        player.y += player.velocityY;

        // Horizontal wrapping
        if (player.x < -PLAYER_SIZE) player.x = GAME_WIDTH;
        else if (player.x > GAME_WIDTH) player.x = -PLAYER_SIZE;

        // Update camera
        const cameraY = Math.max(0, PLAYER_START_Y - player.y);
        gameRefState.current.cameraY = cameraY;
        gameRefState.current.totalDistance = Math.max(gameRefState.current.totalDistance, cameraY);

        // Update score
        const newScore = Math.floor(gameRefState.current.totalDistance / 10);
        if (newScore > gameRefState.current.score) {
          gameRefState.current.score = newScore;
          setScore(newScore);
          playSound('score');

          // Level up
          const newLevel = Math.floor(newScore / SCORE_THRESHOLD_FOR_DIFFICULTY) + 1;
          if (newLevel > gameRefState.current.level) {
            gameRefState.current.level = newLevel;
            gameRefState.current.difficulty = 1 + (newLevel - 1) * DIFFICULTY_INCREMENT;
            setLevel(newLevel);
          }
        }

        // Update obstacles
        setObstacles((prevObs) => {
          let obs = prevObs.map((o) => ({
            ...o,
            x: o.x + o.moveDirection * PLATFORM_MOVE_SPEED * gameRefState.current.difficulty,
            y: o.y + gameRefState.current.difficulty,
          }));

          // Bounce off walls
          obs = obs.map((o) => {
            if (o.x <= 0 || o.x + o.width >= GAME_WIDTH) {
              o.moveDirection *= -1;
            }
            return o;
          });

          // Generate new obstacles
          while (nextObstacleYRef.current < GAME_HEIGHT + 500) {
            obs.push({
              id: Math.random(),
              x: Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH),
              y: nextObstacleYRef.current,
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT,
              moveDirection: Math.random() > 0.5 ? 1 : -1,
            });
            nextObstacleYRef.current += OBSTACLE_MIN_GAP + Math.random() * (OBSTACLE_MAX_GAP - OBSTACLE_MIN_GAP);
          }

          // Remove off-screen obstacles
          obs = obs.filter((o) => o.y < GAME_HEIGHT + 300);
          obstaclesRef.current = obs;
          return obs;
        });

        // Update particles
        particlesRef.current = particlesRef.current.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy + 0.1,
          vy: p.vy + 0.1,
          life: p.life - 16,
        })).filter((p) => p.life > 0);
        setParticles([...particlesRef.current]);

        // Check collision with obstacles
        if (!gameRefState.current.gameOver) {
          const collision = obstaclesRef.current.some((obs) =>
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
          );

          if (collision) {
            gameRefState.current.gameOver = true;
            playSound('collision');
            setExplosionPos({ x: player.x + PLAYER_SIZE / 2, y: player.y + PLAYER_SIZE / 2 });
            setShowExplosion(true);

            // Collision particles
            for (let i = 0; i < PARTICLE_COUNT * 2; i++) {
              const angle = (i / (PARTICLE_COUNT * 2)) * Math.PI * 2;
              const vx = Math.cos(angle) * PARTICLE_SPEED * 1.5;
              const vy = Math.sin(angle) * PARTICLE_SPEED * 1.5;
              particlesRef.current.push({
                id: Math.random(),
                x: player.x + PLAYER_SIZE / 2,
                y: player.y + PLAYER_SIZE / 2,
                vx,
                vy,
                life: 800,
                maxLife: 800,
              });
            }

            if (explosionTimeoutRef.current) clearTimeout(explosionTimeoutRef.current);
            explosionTimeoutRef.current = setTimeout(() => {
              const isRecord = gameRefState.current.score > highScore;
              if (isRecord) {
                setHighScore(gameRefState.current.score);
                setHighScoreState(gameRefState.current.score);
                setIsNewRecord(true);
                playSound('highScore');
              }
              setGameState('gameOver');
            }, 400);
          }
        }

        // Check if fell off screen
        if (player.y > GAME_HEIGHT && !gameRefState.current.gameOver) {
          gameRefState.current.gameOver = true;
          playSound('collision');

          if (explosionTimeoutRef.current) clearTimeout(explosionTimeoutRef.current);
          explosionTimeoutRef.current = setTimeout(() => {
            const isRecord = gameRefState.current.score > highScore;
            if (isRecord) {
              setHighScore(gameRefState.current.score);
              setHighScoreState(gameRefState.current.score);
              setIsNewRecord(true);
              playSound('highScore');
            }
            setGameState('gameOver');
          }, 300);
        }

        return player;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, isPaused, highScore]);

  /**
   * Input handling
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'start') {
          initializeGame();
          setGameState('playing');
        } else if (gameState === 'playing') {
          handlePlayerJump();
        }
      }
      if (e.code === 'KeyP' && gameState === 'playing') {
        setIsPaused(!isPaused);
      }
    };

    const handleClick = () => {
      if (gameState === 'start') {
        initializeGame();
        setGameState('playing');
      } else if (gameState === 'playing') {
        handlePlayerJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [gameState, isPaused]);

  /**
   * Render
   */
  return (
    <div
      className="relative mx-auto bg-slate-950 overflow-hidden touch-none select-none"
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
      }}
    >
      {/* Background */}
      <Background />

      {/* Game World */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `translateY(${gameRefState.current.cameraY}px)`,
        }}
      >
        {/* Player */}
        <MemoizedPlayer playerState={playerState} />

        {/* Obstacles */}
        {obstacles.map((obs) => (
          <MemoizedObstacle key={obs.id} obstacleState={obs} />
        ))}

        {/* Particles */}
        <ParticleEffect particles={particles} />

        {/* Explosion */}
        {explosionPos && (
          <ExplosionEffect
            x={explosionPos.x}
            y={explosionPos.y}
            isActive={showExplosion}
          />
        )}
      </div>

      {/* UI */}
      {gameState === 'playing' && (
        <>
          <ScoreBoard score={score} highScore={highScore} level={level} />
          <PauseButton isPaused={isPaused} onPauseToggle={() => setIsPaused(!isPaused)} />
          <MobileControls onTap={handlePlayerJump} />
          <PauseMenu
            isPaused={isPaused}
            onResume={() => setIsPaused(false)}
            onRestart={() => {
              initializeGame();
              setGameState('playing');
            }}
          />
        </>
      )}

      {/* Start Screen */}
      {gameState === 'start' && (
        <TouchArea onTap={() => {
          initializeGame();
          setGameState('playing');
        }}>
          <StartScreen
            onStart={() => {
              initializeGame();
              setGameState('playing');
            }}
            highScore={highScore}
          />
        </TouchArea>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <GameOver
          score={score}
          highScore={highScore}
          isNewRecord={isNewRecord}
          onRestart={() => {
            initializeGame();
            setGameState('playing');
          }}
        />
      )}
    </div>
  );
}

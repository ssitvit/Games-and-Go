import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./BallShooting.css";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scoreEl = document.getElementById("scoreEl");
    const startGameBtn = document.getElementById("startGamebtn");
    const modalEl = document.getElementById("modalEl");
    const bigScoreEl = document.getElementById("bigScoreEl");
    let score = 0;

    class Player {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
      }
      draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    class Projectile {
      constructor(x, y, radius, color, veloctiy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.veloctiy = veloctiy;
      }
      draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      }
      update() {
        this.draw();
        this.x = this.x + this.veloctiy.x;
        this.y = this.y + this.veloctiy.y;
      }
    }
    class Enemy {
      constructor(x, y, radius, color, veloctiy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.veloctiy = veloctiy;
      }
      draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      }
      update() {
        this.draw();
        this.x = this.x + this.veloctiy.x;
        this.y = this.y + this.veloctiy.y;
      }
    }
    const friction = 0.99;
    class Particle {
      constructor(x, y, radius, color, veloctiy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.veloctiy = veloctiy;
        this.alpha = 1;
      }
      draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
      }
      update() {
        this.draw();
        this.veloctiy.x *= friction;
        this.veloctiy.y *= friction;
        this.x = this.x + this.veloctiy.x;
        this.y = this.y + this.veloctiy.y;
        this.alpha -= 0.01;
      }
    }
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    let player = new Player(x, y, 10, "white");
    let projectiles = [];
    let enemies = [];
    let particles = [];
    player.draw();

    function init() {
      player = new Player(x, y, 10, "white");
      projectiles = [];
      enemies = [];
      particles = [];
      score = 0;
      scoreEl.innerHTML = score;
      bigScoreEl.innerHTML = score;
    }

    function spawnEnemies() {
      setInterval(() => {
        const radius = Math.random() * (30 - 4) + 6;
        let x;
        let y;
        if (Math.random() < 0.5) {
          x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
          y = Math.random() * canvas.height;
        } else {
          x = Math.random() * canvas.width;
          y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = `hsl(${Math.random() * 360},50%,50%)`;
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle),
        };
        enemies.push(new Enemy(x, y, radius, color, velocity));
      }, 1800);
    }
    let animateId;
    function animate() {
      animateId = requestAnimationFrame(animate);
      c.fillStyle = "rgba(0,0,0,0.1)";
      c.fillRect(0, 0, canvas.width, canvas.height);
      player.draw();
      particles.forEach((particle, particleIndex) => {
        if (particle.alpha <= 0) {
          particles.splice(particleIndex, 1);
        } else {
          particle.update();
        }
      });
      projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();
        // remove from edges of screen
        if (
          projectile.x + projectile.radius < 0 ||
          projectile.x - projectile.radius > canvas.width ||
          projectile.y + projectile.radius < 0 ||
          projectile.y - projectile.radius > canvas.height
        ) {
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      });
      enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist - enemy.radius - player.radius < 1) {
          // end game
          setTimeout(() => {
            cancelAnimationFrame(animateId);
            modalEl.style.display = "flex";
            bigScoreEl.innerHTML = score;
          }, 0);
        }
        projectiles.forEach((projectile, projectileIndex) => {
          const dist = Math.hypot(
            projectile.x - enemy.x,
            projectile.y - enemy.y
          );
          if (dist - enemy.radius - projectile.radius < 1) {
            // collision detection and shrinking the larger enemies
            // particle explosion
            for (let i = 0; i < enemy.radius * 2; i++) {
              particles.push(
                new Particle(
                  projectile.x,
                  projectile.y,
                  Math.random() * 2,
                  enemy.color,
                  {
                    x: (Math.random() - 0.5) * (Math.random() * 8),
                    y: (Math.random() - 0.5) * (Math.random() * 8),
                  }
                )
              );
            }
            if (enemy.radius - 10 > 10) {
              gsap.to(enemy, {
                radius: enemy.radius - 10,
              });
              setTimeout(() => {
                projectiles.splice(projectileIndex, 1);
              }, 0);
              score += 100;
              scoreEl.innerHTML = score;
            } else {
              setTimeout(() => {
                enemies.splice(enemyIndex, 1);
                projectiles.splice(projectileIndex, 1);
              }, 0);
              score += 250;
              scoreEl.innerHTML = score;
            }
          }
        });
      });
    }

    window.addEventListener("click", (event) => {
      const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
      );
      const veloctiy = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5,
      };
      projectiles.push(
        new Projectile(
          canvas.width / 2,
          canvas.height / 2,
          5,
          "white",
          veloctiy
        )
      );
    });

    startGameBtn.addEventListener("click", () => {
      init();
      spawnEnemies();
      animate();
      modalEl.style.display = "none";
    });
  }, []);

  return <canvas ref={canvasRef} className="BallShootingCanvas" />;
};

export default CanvasComponent;

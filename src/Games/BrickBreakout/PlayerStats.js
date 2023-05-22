import React from 'react'

export default function PlayerStats(context, player, canvas) {
    // level
    context.font = "20px Arial";
    context.fillStyle = "#fff";
    context.fillText(`Level: ${player.level}`, 20, 30);

    // lives
    context.font = "20px Arial";
    context.fillStyle = "#f42";
    let gap = 0;
    for (let i = 0; i < player.lives; i++) {
        context.fillText("❤️", canvas.width / 2 + gap - 90, 30);
        gap += 30;
    }
    // score
    context.font = "20px Arial";
    context.fillStyle = "#fff";
    context.fillText(`Score: ${player.score}`, canvas.width - 140, 30);
}

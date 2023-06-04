$(document).on('mousemove', function (e) {
    box.css('left', e.pageX);
});

function bottle_down(bottle) {
    bottle_current_position = parseInt(bottle.css('top'));
    bottle.css('top', bottle_current_position + speed);
}

function check_bottle_hits_floor(bottle) {
    if (collision(bottle, ground)) {
        show_broken(bottle);
        decrement_life();
        return true;
    }
    return false;
}

function set_bottle_to_initial_position(bottle) {
    bottle.css('top', bottle_initial_position);
}

function show_broken(bottle) {
    broken_num = bottle.attr('data-broken');
    $('#broken' + broken_num).show();
    hide_broken(broken_num);
}

function hide_broken(broken_num) {
    setTimeout(function () {
        $('#broken' + broken_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
	if(life<0){
		life=0
	}
    life_span.text(life);
}

function check_bottle_hits_box(bottle) {
    if (collision(bottle, box)) {
        bottle_top = parseInt(bottle.css('top'));
        if (bottle_top < box_top) {
            update_score();
            return true;
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});
// $(document).on('mousemove', function (e) {
//     basket.css('left', e.pageX);
// });

// function egg_down(egg) {
//     egg_current_position = parseInt(egg.css('top'));
//     egg.css('top', egg_current_position + speed);
// }

// function check_egg_hits_floor(egg) {
//     if (collision(egg, floor)) {
//         show_bulls_eye(egg);
//         decrement_life();
//         return true;
//     }
//     return false;
// }

// function set_egg_to_initial_position(egg) {
//     egg.css('top', egg_initial_position);
// }

// function show_bulls_eye(egg) {
//     bullseye_num = egg.attr('data-bullseye');
//     $('#bullseye' + bullseye_num).show();
//     hide_bulls_eye(bullseye_num);
// }

// function hide_bulls_eye(bullseye_num) {
//     setTimeout(function () {
//         $('#bullseye' + bullseye_num).hide();
//     }, 800);
// }

// function decrement_life() {
//     life--;
// 	if(life<0){
// 		life=0
// 	}
//     life_span.text(life);
// }

// function check_egg_hits_basket(egg) {
//     if (collision(egg, basket)) {
//         egg_top = parseInt(egg.css('top'));
//         if (egg_top < basket_top) {
//             update_score();
//             return true;
//         }
//     }
//     return false;
// }

// function update_score() {
//     score++;
//     if (score % 10 === 0 && speed <= max_speed) {
//         speed++;
//     }
//     score_span.text(score);
//     score_1.text(score);
// }

// function stop_the_game() {
//     cancelAnimationFrame(anim_id);
//     restart.slideDown();
// }

// restart.click(function () {
//     location.reload();
// });
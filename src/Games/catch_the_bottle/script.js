$(function () {

    the_game = function () {

        if (check_bottle_hits_floor(bottle1) || check_bottle_hits_box(bottle1)) {
            set_bottle_to_initial_position(bottle1);
        } else {
            bottle_down(bottle1);
        }

        if (check_bottle_hits_floor(bottle2) || check_bottle_hits_box(bottle2)) {
            set_bottle_to_initial_position(bottle2);
        } else {
            bottle_down(bottle2);
        }

        if (check_bottle_hits_floor(bottle3) || check_bottle_hits_box(bottle3)) {
            set_bottle_to_initial_position(bottle3);
        } else {
            bottle_down(bottle3);
        }

        if (life > 0) {
            anim_id = requestAnimationFrame(the_game);
        } else {
            stop_the_game();
        }
    };

    anim_id = requestAnimationFrame(the_game);

});
// $(function () {

//     the_game = function () {

//         if (check_egg_hits_floor(egg1) || check_egg_hits_basket(egg1)) {
//             set_egg_to_initial_position(egg1);
//         } else {
//             egg_down(egg1);
//         }

//         if (check_egg_hits_floor(egg2) || check_egg_hits_basket(egg2)) {
//             set_egg_to_initial_position(egg2);
//         } else {
//             egg_down(egg2);
//         }

//         if (check_egg_hits_floor(egg3) || check_egg_hits_basket(egg3)) {
//             set_egg_to_initial_position(egg3);
//         } else {
//             egg_down(egg3);
//         }

//         if (life > 0) {
//             anim_id = requestAnimationFrame(the_game);
//         } else {
//             stop_the_game();
//         }
//     };

//     anim_id = requestAnimationFrame(the_game);

// });
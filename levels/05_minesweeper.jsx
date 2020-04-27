#BEGIN_PROPERTIES#
{
    "version": "1.2.1",
    "commandsIntroduced": ["map.setSquareColor"],
    "music": "cloudy_sin"
}
#END_PROPERTIES#
/******************
 * minesweeper.js *
 ******************
 *
 * 阿西莫夫的机器人三定律见鬼了。他们现在实际上是想要干掉你。
 * 虽然地板上遍布地雷，但不要太悲观。只是奋不顾身的冲向出口似乎不太明智。
 * 无论如何，你需要活下来。
 *
 * 不过，如果有什么办法让你可以发现这些地雷……
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel(map) {
#START_OF_START_LEVEL#
    for (x = 0; x < map.getWidth(); x++) {
        for (y = 0; y < map.getHeight(); y++) {
            map.setSquareColor(x, y, '#f00');
        }
    }

    map.placePlayer(map.getWidth() - 5, 5);

    for (var i = 0; i < 75; i++) {
        var x = getRandomInt(0, map.getWidth() - 1);
        var y = getRandomInt(0, map.getHeight() - 1);
        if ((x != 2 || y != map.getHeight() - 1)
            && (x != map.getWidth() - 5 || y != 5)) {
            // don't place mine over exit or player!
            map.placeObject(x, y, 'mine');
#BEGIN_EDITABLE#

#END_EDITABLE#
        }
    }

    map.placeObject(2, map.getHeight() - 1, 'exit');
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateAtLeastXObjects(40, 'mine');
    map.validateExactlyXManyObjects(1, 'exit');
}

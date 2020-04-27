#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced": ["ROT.Map.DividedMaze", "player.atLocation"],
    "music": "gurh"
}
#END_PROPERTIES#
/********************
 * theLongWayOut.js *
 ********************
 *
 * 好吧，看起来他们发现了我们的意图。
 * 我原以为这条路会很畅通，事实上看来不是这样。
 * 不过没关系，聪明人总能消除这些麻烦。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.placePlayer(7, 5);

    var maze = new ROT.Map.DividedMaze(map.getWidth(), map.getHeight());
#BEGIN_EDITABLE#

#END_EDITABLE#
    maze.create( function (x, y, mapValue) {

        // don't write maze over player
        if (map.getPlayer().atLocation(x,y)) {
            return 0;
        }

        else if (mapValue === 1) { //0 is empty space 1 is wall
            map.placeObject(x,y, 'block');
        }
        else {
            map.placeObject(x,y,'empty');
        }
    });

    map.placeObject(map.getWidth()-4, map.getHeight()-4, 'block');
    map.placeObject(map.getWidth()-6, map.getHeight()-4, 'block');
    map.placeObject(map.getWidth()-5, map.getHeight()-5, 'block');
    map.placeObject(map.getWidth()-5, map.getHeight()-3, 'block');
#BEGIN_EDITABLE#

#END_EDITABLE#
    map.placeObject(map.getWidth()-5, map.getHeight()-4, 'exit');
#END_OF_START_LEVEL#
}

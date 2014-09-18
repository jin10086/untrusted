#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced": [],
    "music": "coming soon"
}
#END_PROPERTIES#
/*******************
 * multiplicity.js *
 *******************
 *
 * 刚出狼窝又入虎穴。他们再次限制了你的活动。不过，当然啦……
 *
 * 顺便说一下，关卡文件名可作看作提示。我之前有提过吗？
 *
 * 我保证，不会再遇到这种监牢了。
 */

function startLevel(map) {
#START_OF_START_LEVEL#

    map.placePlayer(map.getWidth()-5, map.getHeight()-4);

    for (y = 7; y <= map.getHeight() - 3; y++) {
        map.placeObject(7, y, 'block');
        map.placeObject(map.getWidth() - 3, y, 'block');
    }
#BEGIN_EDITABLE#

#END_EDITABLE#
    for (x = 7; x <= map.getWidth() - 3; x++) {
        map.placeObject(x, 7, 'block');
        map.placeObject(x, map.getHeight() - 3, 'block');
    }

    map.placeObject(map.getWidth() - 5, 5, 'exit');
#END_OF_START_LEVEL#
}

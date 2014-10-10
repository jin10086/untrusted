#BEGIN_PROPERTIES#
{
    "version": "1.0",
    "commandsIntroduced":
        ["global.startLevel", "global.onExit", "map.placePlayer",
         "map.placeObject", "map.getHeight", "map.getWidth",
         "map.displayChapter", "map.getPlayer", "player.hasItem"],
    "music": "The Green"
}
#END_PROPERTIES#
/*****************
 * theGreatWall.js *
 *****************
 *
 * 古代，长城在用于保护不受外敌入侵的同时，也阻止人民出行海外旅游、贸易。
 * 
 * 今天，一个网络长城依然屹立在东方。
 *
 * 是男人，就冲出去！
 *
 * 自由无价！
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.displayChapter('第一章\n自由无价');

    map.placePlayer(25, map.getHeight() - 5);

    for (x = 0; x < map.getWidth(); x++) {
		if ((x % 10) < 5 ) {
        	map.placeObject(x, 5, 'block');
		} else {
        	map.placeObject(x, 7, 'block');
			for (y = 0; y < 3; y ++) {
	        	map.placeObject(x, 7 - y, 'block');				
			}
		}
        map.placeObject(x, 10, 'block');
    }

#BEGIN_EDITABLE#

#END_EDITABLE#

    map.placeObject(15, 12, 'computer');
    map.placeObject(25, 0, 'exit');
#END_OF_START_LEVEL#
}

function onExit(map) {
    if (!map.getPlayer().hasItem('computer')) {
        map.writeStatus("别忘记捡起电脑（computer）！");
        return false;
    } else {
        return true;
    }
}

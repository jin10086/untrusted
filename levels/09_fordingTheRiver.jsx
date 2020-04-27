#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["player.killedBy", "object.onCollision"],
    "music": "The_Waves_Call_Her_Name"
}
#END_PROPERTIES#
/**********************
 * fordingTheRiver.js *
 **********************
 *
 * 这里有一条河。幸运的是，我对此有所准备。
 * 看见另一边的救生艇（raft）了吗？
 *
 * 所需要的只是一个计划。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    var raftDirection = 'down';

    map.placePlayer(map.getWidth()-1, map.getHeight()-1);
    var player = map.getPlayer();

    map.defineObject('raft', {
        'type': 'dynamic',
        'symbol': '▓',
        'color': '#420',
        'transport': true, // （防止玩家掉进水里）
        'behavior': function (me) {
            me.move(raftDirection);
        }
    });

    map.defineObject('water', {
        'symbol': '░',
        'color': '#44f',
        'onCollision': function (player) {
            player.killedBy('drowning in deep dark water');
        }
    });

    for (var x = 0; x < map.getWidth(); x++) {
        for (var y = 5; y < 15; y++) {
            map.placeObject(x, y, 'water');
        }
    }

    map.placeObject(20, 5, 'raft');
    map.placeObject(0, 2, 'exit');
    map.placeObject(0, 1, 'block');
    map.placeObject(1, 1, 'block');
    map.placeObject(0, 3, 'block');
    map.placeObject(1, 3, 'block');

#BEGIN_EDITABLE#



#END_EDITABLE#
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'raft');
}

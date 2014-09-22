#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["object.giveItemTo", "object.passableFor",
         "map.validateAtMostXObjects"],
    "music": "conspiracy"
}
#END_PROPERTIES#
/*
 * robot.js
 *
 * 你需要三把钥匙来释放算法（Algorithm）：红色的、绿色的和蓝色的钥匙。
 * 不幸的是，这三把钥匙保存在人类识别区（barrier）中。
 *
 * 计划很简单：对用于维护作业的机器人（robot）重新编程，
 * 以便让其穿过识别区拿到钥匙。
 *
 * 首先让我们试试红色钥匙（redKey）。
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel(map) {
#START_OF_START_LEVEL#
    // 提示：你可以按 R 或 5 来重置，并且玩家不要与机器人同时同方向移动。

    map.placePlayer(map.getWidth()-2, map.getHeight()-2);
    var player = map.getPlayer();

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'redKey');
        },
        'behavior': function (me) {
#BEGIN_EDITABLE#
            // 可用的命令：me.move(direction) 和 me.canMove(direction)

#END_EDITABLE#
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.placeObject(0, map.getHeight() - 1, 'exit');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 8, 'redKey');
    map.placeObject(map.getWidth() - 2, 9, 'barrier');

    for (var x = 0; x < map.getWidth(); x++) {
        map.placeObject(x, 0, 'block');
        if (x != map.getWidth() - 2) {
            map.placeObject(x, 9, 'block');
        }
    }

    for (var y = 1; y < 9; y++) {
        map.placeObject(0, y, 'block');
        map.placeObject(map.getWidth() - 1, y, 'block');
    }
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'robot');
    map.validateAtMostXObjects(1, 'redKey');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('redKey')) {
        map.writeStatus("我们必须拿到这把钥匙！");
        return false;
    } else {
        return true;
    }
}

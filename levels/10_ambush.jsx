#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced": [],
    "music": "Come and Find Me"
}
#END_PROPERTIES#
/*************
 * ambush.js *
 *************
 *
 * 噢，噢，我知道了。这不在计划内。
 *
 * 看起来，不好好打一架，他们是不会让你带走算法（Algorithm）的。
 * 在穿过守卫机器人时，小心选择你的路线。
 *
 * 好吧，来点改进。让我们给它们的程序制造点麻烦，如何？
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    function moveToward(obj, type) {
        var target = obj.findNearest(type);
        var leftDist = obj.getX() - target.x;
        var upDist = obj.getY() - target.y;

        var direction;
        if (upDist == 0 && leftDist == 0) {
            return;
        } if (upDist > 0 && upDist >= leftDist) {
            direction = 'up';
        } else if (upDist < 0 && upDist < leftDist) {
            direction = 'down';
        } else if (leftDist > 0 && leftDist >= upDist) {
            direction = 'left';
        } else {
            direction = 'right';
        }

        if (obj.canMove(direction)) {
            obj.move(direction);
        }
    }

    map.defineObject('attackDrone', {
        'type': 'dynamic',
        'symbol': 'd',
        'color': 'red',
        'onCollision': function (player) {
            player.killedBy('an attack drone');
        },
        'behavior': function (me) {
#BEGIN_EDITABLE#
            moveToward(me, 'player');
#END_EDITABLE#
        }
    });

    map.defineObject('reinforcementDrone', {
        'type': 'dynamic',
        'symbol': 'd',
        'color': 'yellow',
        'onCollision': function (player) {
            player.killedBy('a reinforcement drone');
        },
        'behavior': function (me) {
#BEGIN_EDITABLE#
            me.move('left');
#END_EDITABLE#
        }
    });

    map.defineObject('defenseDrone', {
        'type': 'dynamic',
        'symbol': 'd',
        'color': 'green',
        'onCollision': function (player) {
            player.killedBy('a defense drone');
        },
        'behavior': function (me) {
#BEGIN_EDITABLE#

#END_EDITABLE#
        }
    });

    // 用于装饰
    map.defineObject('water', {
        'symbol': '░',
        'color': '#44f'
    });

    map.placePlayer(0, 12);

    for (var x = 0; x < map.getWidth(); x++) {
        map.placeObject(x, 10, 'block');
        map.placeObject(x, 14, 'block');

        for (var y = 20; y < map.getHeight(); y++) {
            map.placeObject(x, y, 'water');
        }
    }

    map.placeObject(23, 11, 'attackDrone');
    map.placeObject(23, 12, 'attackDrone');
    map.placeObject(23, 13, 'attackDrone');

    map.placeObject(27, 11, 'defenseDrone');
    map.placeObject(27, 12, 'defenseDrone');
    map.placeObject(27, 13, 'defenseDrone');

    map.placeObject(24, 11, 'reinforcementDrone');
    map.placeObject(25, 11, 'reinforcementDrone');
    map.placeObject(26, 11, 'reinforcementDrone');
    map.placeObject(24, 13, 'reinforcementDrone');
    map.placeObject(25, 13, 'reinforcementDrone');
    map.placeObject(26, 13, 'reinforcementDrone');

    map.placeObject(map.getWidth()-1, 12, 'exit');
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

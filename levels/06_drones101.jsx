#BEGIN_PROPERTIES#
{
    "version": "1.2",
	"commandsIntroduced":
        ["object.type", "object.behavior", "object.findNearest",
         "object.getX", "object.getY", "object.canMove", "object.move"],
    "music": "GameScratch"
}
#END_PROPERTIES#

/****************
 * drones101.js *
 ****************
 *
 * 我亲爱的教授，还记得吗？很久以前你讲授过的那堂人工智能的课程，
 * 第二道作业是匿名特工的行为。
 * 我记得有一个幼稚的实现：只要机器人没有看到你，就很容易攻击它。
 * 那么现在让我们设想一下……
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
            moveToward(me, 'player');
        }
    });


    map.placePlayer(1, 1);
    map.placeObject(map.getWidth()-2, 12, 'attackDrone');
    map.placeObject(map.getWidth()-1, 12, 'exit');

    map.placeObject(map.getWidth()-1, 11, 'block');
    map.placeObject(map.getWidth()-2, 11, 'block');
    map.placeObject(map.getWidth()-1, 13, 'block');
    map.placeObject(map.getWidth()-2, 13, 'block');
#BEGIN_EDITABLE#




#END_EDITABLE#
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

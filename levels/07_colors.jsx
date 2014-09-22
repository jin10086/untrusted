#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["map.defineObject", "player.getColor", "player.setColor",
         "object.color", "object.impassable", "object.symbol",
         "player.setPhoneCallback"],
    "music": "Y"
}
#END_PROPERTIES#
/*************
* colors.js *
 *************
 *
 * 你已经接近出口了。只需要通过这个颜色锁就可以了。
 *
 * 只改变环境已经不够了。你需要学习改变你自己。
 * 我已经为你提供了一些有帮助的东西。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.placePlayer(0, 12);

    map.placeObject(5, 12, 'phone');

    // 电话（phone）可以让你调用由在下面
	// player.setPhoneCallback() 定义的功能函数。
	// 可以通过 Q 键或 Ctrl+6 使用电话的功能。
    map.getPlayer().setPhoneCallback(function () {
#BEGIN_EDITABLE#
        var player = map.getPlayer();

        player.setColor('#f00');





#END_EDITABLE#
    });


    map.defineObject('redLock', {
        symbol: '☒',
        color: "#f00", // 红
        impassable: function(player, object) {
            return player.getColor() != object.color;
        }
    });

    map.defineObject('greenLock', {
        symbol: '☒',
        color: "#0f0", // 绿
        impassable: function(player, object) {
            return player.getColor() != object.color;
        }
    });

    map.defineObject('yellowLock', {
        symbol: '☒',
        color: "#ff0", // 黄
        impassable: function(player, object) {
            return player.getColor() != object.color;
        }
    });

    for (var x = 20; x <= 40; x++) {
        map.placeObject(x, 11, 'block');
        map.placeObject(x, 13, 'block');
    }
    map.placeObject(22, 12, 'greenLock');
    map.placeObject(25, 12, 'redLock');
    map.placeObject(28, 12, 'yellowLock');
    map.placeObject(31, 12, 'greenLock');
    map.placeObject(34, 12, 'redLock');
    map.placeObject(37, 12, 'yellowLock');
    map.placeObject(40, 12, 'exit');
    for (var y = 0; y < map.getHeight(); y++) {
        if (y != 12) {
            map.placeObject(40, y, 'block');
        }
        for (var x = 41; x < map.getWidth(); x++) {
            map.setSquareColor(x, y, '#080');
        }
    }
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('phone')) {
        map.writeStatus("我们需要电话！");
        return false;
    } else {
        return true;
    }
}

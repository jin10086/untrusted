#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["map.getObjectTypeAt", "player.getX", "player.getY",
         "map.refresh"],
    "mapProperties": {
        "allowOverwrite": true
    },
    "music": "Night Owl"
}
#END_PROPERTIES#
/*******************
 * intoTheWoods.js *
 *******************
 *
 * 哈哈，现在你已经脱险了。
 * 或者，就当前环境来说，你进入更加危险的地方了。
 *
 * 那么深呼吸、放送，在进入之前务必记得你来此的目的。
 *
 * 我跟踪到一个信号，说明算法（Algorithm）就在跟前。
 * 你需要穿越树林、渡过小河，然后到达藏匿它的要塞。
 * 守卫不怎么严密，所以我们应该可以让他们放松警惕。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    // 注意：在本关中，允许用 map.placeObject
	// 替换已有的对象。

    map.displayChapter('第二章\n迷失的算法与骑士');

    map.placePlayer(2, map.getHeight() - 1);

    var functionList = {};

    functionList['fortresses'] = function () {
        function genRandomValue(direction) {
            if (direction === "height") {
                return Math.floor(Math.random() * (map.getHeight()-3));
            } else if (direction === "width") {
                return Math.floor(Math.random() * (map.getWidth()+1));
            }
        }

        var x = genRandomValue("width");
        var y = genRandomValue("height");

        for (var i = x-2; i < x+2; i++) {
            map.placeObject(i,y-2, 'block');
        }
        for (var i = x-2; i < x+2; i++) {
            map.placeObject(i,y+2, 'block');
        }

        for (var j = y-2; j < y+2; j++) {
            map.placeObject(x-2,j, 'block');
        }

        for (var j = y-2; j < y+2; j++) {
            map.placeObject(x+2,j, 'block');
        }
    };

    functionList['generateForest'] = function () {
        for (var i = 0; i < map.getWidth(); i++) {
            for (var j = 0; j < map.getHeight(); j++) {

                // 如果该格已经有树，就将其清空
                if (map.getObjectTypeAt(i, j) === 'tree') {
                    // 移除已有的树
                    map.placeObject(i,j, 'empty');
                }

                if (map.getPlayer().atLocation(i,j) ||
                        map.getObjectTypeAt(i, j) === 'block' ||
                        map.getObjectTypeAt(i, j) === 'exit') {
                    continue;
                }

                var rv = Math.random();
                if (rv < 0.45) {
                    map.placeObject(i, j, 'tree');
                }
            }
        }
        map.refresh();
    };

    functionList['movePlayerToExit'] = function () {
        map.writeStatus("拒绝访问。");
    }

    functionList['pleaseMovePlayerToExit'] = function () {
        map.writeStatus("我不这么认为。");
    }

    functionList['movePlayerToExitDamnit'] = function () {
        map.writeStatus("那么，赛事如何了？");
    }

    // generate forest
    functionList['generateForest']();

    // generate fortresses
    functionList['fortresses']();
    functionList['fortresses']();
    functionList['fortresses']();
    functionList['fortresses']();

    map.getPlayer().setPhoneCallback(functionList[#{#"movePlayerToExit"#}#]);

    map.placeObject(map.getWidth()-1, map.getHeight()-1, 'exit');
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateAtLeastXObjects(100, 'tree');
    map.validateExactlyXManyObjects(1, 'exit');
}

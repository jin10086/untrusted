#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced": [],
    "music": "The_Waves_Call_Her_Name",
    "startingMessage": "You have lost the Algorithm!"
}
#END_PROPERTIES#
/**************************
 * exceptionalCrossing.js *
 **************************
 *
 * 抱歉，老朋友，不过我想我不能与你共享这篇论文。
 * 为了我，你所做的一切非常了不起。对这些钥匙的利用非常聪明！
 * 我自己永远也想不到。
 *
 * 不过呢，当然啦，这也是为什么你一开始会来到这里的原因。
 *
 * 你一直都意志坚定。不过现在，啊哈，你的死期到了。
 *
 * 不过，我也不是铁石心肠的人。我会让你选择见上帝的方式。
 * 怎么样，这是不是很好啊？
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.displayChapter('第三章\n背叛');

    map.placePlayer(0, 0);

    // 哼哼！
    map.getPlayer().removeItem('theAlgorithm');

    map.defineObject('water', {
        'symbol': '░',
        'color': '#44f',
        'onCollision': function (player) {
            player.killedBy#{#('drowning in deep dark water')#}#;
        }
    });

    for (var x = 0; x < map.getWidth(); x++)
        for (var y = 5; y < 15; y++)
            map.placeObject(x, y, 'water');

    map.placeObject(map.getWidth()-1, map.getHeight()-1, 'exit');
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

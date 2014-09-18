#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["global.startLevel", "global.onExit", "map.placePlayer",
         "map.placeObject", "map.getHeight", "map.getWidth",
         "map.displayChapter", "map.getPlayer", "player.hasItem"],
    "music": "The Green"
}
#END_PROPERTIES#
/*****************
 * cellBlockA.js *
 *****************
 *
 * 早安，Dr. Eval。
 *
 * 这并不容易，不过我已经授权将你的电脑还你。
 * 你对这个系统可能不怎么熟悉，不过仍然是基于 JavaScript。
 * 这和我们预期的一样。
 *
 * 现在让我们看看来此的目的，以及如何让你从这里出去。
 * 小菜一碟。
 *
 * 我会尽可能的为你提供可访问的代码，不过可能不怎么有效。
 * 红色背景表示那些代码被限制编辑。
 *
 * 代码构造了一个围绕你的墙。你需要开个缺口出来。
 * 你可能不用作太多工作。事实上，做得越少越好。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.displayChapter('第一章\n越狱');

    map.placePlayer(7, 5);
#BEGIN_EDITABLE#

    for (y = 3; y <= map.getHeight() - 10; y++) {
        map.placeObject(5, y, 'block');
        map.placeObject(map.getWidth() - 5, y, 'block');
    }

    for (x = 5; x <= map.getWidth() - 5; x++) {
        map.placeObject(x, 3, 'block');
        map.placeObject(x, map.getHeight() - 10, 'block');
    }
#END_EDITABLE#

    map.placeObject(15, 12, 'computer');

    map.placeObject(map.getWidth()-7, map.getHeight()-5, 'exit');
#END_OF_START_LEVEL#
}

function onExit(map) {
    if (!map.getPlayer().hasItem('computer')) {
        map.writeStatus("别 忘 记 捡 起 你 的 电 脑！");
        return false;
    } else {
        return true;
    }
}

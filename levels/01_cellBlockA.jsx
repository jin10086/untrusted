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
 * 虽然这并不太容易，不过我已经得到授权，将你的电脑还给你。
 * 你可能对这个系统不怎么熟悉。不过和我们预期的一样，
 * 这个系统仍然是基于 JavaScript 的。
 * 
 * 现在来看看我们在此的目的，并了解一下如何让你从这里出去。
 * 应当都是小菜一碟。
 *
 * 我会尽可能的为你提供代码的访问权限，不过可能不怎么有效。
 * 那些红色背景的代码表示不允许编辑。
 *
 * 这段代码构造了一个围绕你的墙。你需要开个缺口出来。
 * 你可能不用作太多工作。事实上，你做得越少越有效。
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
        map.writeStatus("别忘记捡起你的电脑！");
        return false;
    } else {
        return true;
    }
}

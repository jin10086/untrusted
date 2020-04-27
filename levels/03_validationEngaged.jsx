#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["global.validateLevel", "map.validateAtLeastXObjects",
         "map.validateExactlyXManyObjects"],
    "music": "Obscure Terrain"
}
#END_PROPERTIES#
/************************
 * validationEngaged.js *
 ************************
 *
 * 现在，可以确认我们被他们发现了！
 * validateLevel 函数会用来检验，限制你可以做的事情。
 * 看来这儿不允许移除任何阻挡。
 *
 * 他们正想尽办法将你留在这里。
 * 不过你比他们更聪明。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.placePlayer(map.getWidth()-7, map.getHeight()-5);
#BEGIN_EDITABLE#

    for (y = 10; y <= map.getHeight() - 3; y++) {
        map.placeObject(5, y, 'block');
        map.placeObject(map.getWidth() - 5, y, 'block');
    }

    for (x = 5; x <= map.getWidth() - 5; x++) {
        map.placeObject(x, 10, 'block');
        map.placeObject(x, map.getHeight() - 3, 'block');
    }
#END_EDITABLE#

    map.placeObject(7, 5, 'exit');
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    numBlocks = 2 * (map.getHeight()-13) + 2 * (map.getWidth()-10);

    map.validateAtLeastXObjects(numBlocks, 'block');
    map.validateExactlyXManyObjects(1, 'exit');
}

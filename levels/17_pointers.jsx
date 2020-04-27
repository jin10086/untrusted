#BEGIN_PROPERTIES#
{
    "version": "1.2.1",
    "commandsIntroduced":
        ["map.getDynamicObjects", "map.getCanvasCoords", "object.setTarget"],
    "music": "Tart",
    "mapProperties": {
        "showDrawingCanvas": true
    }
}
#END_PROPERTIES#
/***************
 * pointers.js *
 ***************
 *
 * 你！你怎么还活着？
 *
 * 好吧，没关系。祝你在通过这个迷宫房间的时候好运，你不会再见到我或者算法了！
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    function shuffle(o){ //v1.0 [http://bit.ly/1l6LGQT]
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    map.createFromGrid(
        ['+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+* @ o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++* E o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++'],
        {
            '@': 'player',
            'E': 'exit',
            '+': 'block',
            'o': 'teleporter',
            '*': 'trap',
        }, 2, 2);

    var canvas = map.getCanvasContext();

    var teleportersAndTraps = map.getDynamicObjects();
    teleportersAndTraps = shuffle(teleportersAndTraps);

    for (i = 0; i < teleportersAndTraps.length; i+=2) {
        var t1 = teleportersAndTraps[i];
        var t2 = teleportersAndTraps[i+1];

        // 让每个传输点（teleporter）通向另外一个传输点，
		// 或是一个陷阱
        if (t1.getType() == 'teleporter') {
            t1.setTarget(t2);
        }
        if (t2.getType() == 'teleporter') {
            t2.setTarget(t1);
        }

#BEGIN_EDITABLE#
        // TODO 找到某种办法将文档中的 API 移除，
		// 免得那些“好医生”发现了 map.getCanvasCoords()




#END_EDITABLE#
    }
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

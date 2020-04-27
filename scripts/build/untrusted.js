function clone(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = obj.constructor();
    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Array.prototype.remove = function(item) {
    // TODO Update to use Array.prototype.indexOf
    for(var i = this.length; i--;) {
        if(this[i] === item) {
            this.splice(i, 1);
        }
    }
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

// Distance from point to line
// http://stackoverflow.com/a/6853926/2608804
function pDistance(x, y, x1, y1, x2, y2) {
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = dot / len_sq;

    var xx, yy;

    if (param < 0 || (x1 == x2 && y1 == y2)) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * jQuery.fn.sortElements
 *
 * from http://james.padolsey.com/javascript/sorting-elements-with-jquery
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode;
 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){

    var sort = [].sort;

    return function(comparator, getSortable) {

        getSortable = getSortable || function(){return this;};

        var placements = this.map(function(){

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function() {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });

    };

})();

// http://stackoverflow.com/a/20095486/2608804
function isNewerVersion(v1, v2) {
    "use strict";
    var v1parts = v1.split('.'), v2parts = v2.split('.');
    var maxLen = Math.max(v1parts.length, v2parts.length);
    var part1, part2;
    var cmp = 0;
    for(var i = 0; i < maxLen && !cmp; i++) {
        part1 = parseInt(v1parts[i], 10) || 0;
        part2 = parseInt(v2parts[i], 10) || 0;
        if(part1 < part2)
            cmp = 1;
        if(part1 > part2)
            cmp = -1;
    }
    return (0 > cmp);
}
// 由于 rotjs 库的原因，括号使用英文半角，
// 可以获得更好的显示效果。
var _i18nDisplay = {
	// display.js
	"%c{#0f0}> initialize"	:	{'x' : 0, 'y' : -2, 'txt' : "%c{#0f0}> 初始化"},
	"U N T R U S T E D"		:	{'x' : 21, 'y' : 3, 'txt' : "一意孤行"},
	"- or - "	:	{'x' : 23, 'y' : 5, 'txt' : "- 或 - "},
	"THE CONTINUING ADVENTURES OF DR. EVAL"	:	{'x' : 19,'y' : 7, 'txt' : "Dr.Eval 大冒险"},
	"a game by Alex Nisnevich and Greg Shuflin"	:	{'x' : 9, 'y' : 12, 'txt' : "Alex Nisnevich 和 Greg Shuflin 开发\n\n　　　　　　　　　mikespook 汉化"},
	"Press any key to begin ..."	:	{'x' : 28, 'y' : 22, 'txt':"按任意键开始游戏 ..."},
}
var _i18n = {
	// display.js	
	"%c{#0f0}> run "	:	"%c{#0f0}> 运行 ",
	// inventory.js
	'INVENTORY: '	:	'背包：',
	// sound.js
	'Now playing: "':	'正在播放："',
	'The Green'		:	'绿之韵',
	'Adversity'		:	'厄运',
    'Beach Wedding Dance'	:	'沙滩婚礼舞',
	'Boss Loop 1'	:	'大王寻山 1',
    'Brazilicon Alley'		:	'布里斯林科小路',
    'Da Funk Do You Know \'bout Chip?'	:	'芯之畏惧',
    'cloudy sin'	:	'罪恶密布',
    'Come and Find Me'	:	'来找我',
    'coming soon'	:	'将至',
    'Comme Des Orages'	:	'风暴',
    'Conspiracy'	:	'阴谋',
    'Death Destroyer (Radio Edit)'	:	'死神（音乐版）',
    'Dynamic Punctuality'	:	'动态规则',
    'Dmitry\'s Thing #2'	:	'德米特里小事 #2',
    'Messeah'	:	'混乱',
    'Night Owl'	:	'猫头鹰',
    'Obscure Terrain'	:	'朦胧领域',
    'Searching'	:	'寻觅',
    'Slimeball Vomit'	:	'作呕',
    'Soixante-8'	:	'六十8',
    'Tart (Pts 1-2)'	:	'午夜酸果',
    'The Waves Call Her Name'	:	'永恒的呼唤',
	// _tail.js
	'%cIf you can read this, you are cheating! D:'	:	'"%c如果你看到这些文字，说明你在作弊！:D"',
	'%cBut really, you don\'t need this console to play the game. Walk around using arrow keys (or Vim keys), and pick up the computer ('	:	'%c说真的，你没必要用控制台来玩这个游戏。用方向键(或 Vim 快捷键)移动，捡起电脑(',
	'). Then the fun begins!'	:	')。来找点乐子吧！',
	// objects.js
	'a hidden mine'	:	'隐藏的地雷(mine)',
	'a trap'	:	'陷阱(trap)',
	'You have picked up the computer!'	:	'你捡起了一台电脑(computer)！',
	'You have picked up the function phone!' :	'你捡起了一部电话(phone)！',
	'You have picked up a red key!'	:	'你捡起了红色钥匙(redKey)！',
	'You have picked up a green key!'	:	'你捡起了绿色钥匙(greenKey)！',
	'You have picked up a blue key!'	:	'你捡起了蓝色钥匙(blueKey)！',
	'You have picked up a yellow key!'	:	'你捡起了黄色钥匙(yellowKey)！',
	'You have picked up the Algorithm!'	:	'你得到了算法(theAlgorithm)！',
	'You have lost the Algorithm!'	:	'你失去了算法(theAlgorithm)！',
	// reference.js
	'Begins drawing a new shape.'	:	'绘制一个新的图形。',
	'Sets the end coordinates of a line.'	:	'设定线段的终点坐标。',
	'Determines the width of the next lines drawn.'	:	'设定之后绘制的线段的宽度。',
	'Sets the start coordinates of a line.'	:	'设定线段的起始坐标。',
	'Draws a line whose coordinates have been defined by <b>lineTo</b> and <b>moveTo</b>.'	:	'绘制一条由 <b>lineTo</b> 和 <b>moveTo</b> 定义坐标的线段。',
	'Determines the color (and, optionally, other properties) of the next lines drawn.'	:	'设定之后绘制的线段的颜色(以及其他属性作为可选项)。',
	'When passed an HTML string, $ returns a corresponding <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance.'	:	'当传入一段 HTML 字符串时，$ 返回对应的 <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> 实例。',
	'The player exits the level as soon as this method returns true.'	:	'一旦这个方法返回 true，玩家就立刻退出当前关卡。',
	'The player can exit the level only if this method returns true.'	:	'只有当这个方法返回 true，玩家才能退出当前关卡。',
	'This method is called when the level loads.'	:	'在当前关卡加载时，这个方法会被调用。',
	'The level can be loaded only if this method returns true.'	:	'只有这个方法返回 true 时，当前关卡才能被加载。',
	'Instantiates a Maze object of given width and height. The Maze object can create a maze by calling maze.create(callback), where the callback is a function that accepts (x, y, mapValue) and performs some action for each point in a grid, where mapValue is a boolean that is true if and only if the given point is part of the maze.'	:	'用给定的宽度和高度初始化一个迷宫对象。这个迷宫对象可以通过调用 maze.create(callback) 来创建迷宫。这里的 callback 是一个接受 (x, y, mapValue) 作为参数的函数，并且可以对方格中的每个点进行操作。mapValue 是布尔值，当给定的点是迷宫中可以通行的路径是为 true。',
	'Adds the given CSS class to the DOM element(s) specified by the jQuery object.'	:	'为某个 jQuery 对象化的 DOM 元素添加 CSS class。',
	'Returns the children of the DOM element specified by the jQuery object, as a jQuery array.'	:	'返回某个 jQuery 对象化的 DOM 元素的子对象，并保存在 jQuery 数组中。',
	'Returns all elements in the DOM tree specified by the jQuery object that match the given CSS selector, as a jQuery array.'	:	'返回所有匹配给定的 CSS 选择器的 jQuery 对象化的 DOM 元素，并保存在 jQuery 数组中。',
	'Returns the first element of a jQuery array.'	:	'返回 jQuery 数组的第一个元素。',
	'Returns true if and only if the DOM element specified by the jQuery object has the given CSS class.'	:	'当且仅当某个 jQuery 对象化的 DOM 元素拥有指定的 CSS class 时，返回 true。',
	'Returns the number of elements in a jQuery array.'	:	'返回 jQuery 数组的元素个数。',
	'Returns the next sibling of the DOM element specified by the jQuery object.'	:	'返回某个 jQuery 对象化的 DOM 元素的下一个元素。',
	'Returns the parent of the DOM element specified by the jQuery object.'	:	'返回某个 jQuery 对象化的 DOM 元素的父元素。',
	'Returns the previous sibling of the DOM element specified by the jQuery object.'	:	'返回某个jQuery 对象化的 DOM 元素的前一个元素。',
	'Removes the given CSS class from the DOM element(s) specified by the jQuery object.'	:	'移除某个 jQuery 对象化的 DOM 元素指定的 CSS class。',
	'Returns the number of objects of the given type on the map.'	:	'返回地图上指定类型的对象的个数。',
	'Creates the map from a <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance, rendering the map as a DOM (document object model) rather than a grid.'	:	'从一个 <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> 实例中创建地图，用 DOM (document object model) 而不是表格来渲染地图。',
	'Places objects on the map corresponding to their position on the grid (an array of strings), with mappings as defined in tiles (a dictionary of character -> object type mappings), at the given offset from the top-left corner of the map.'	:	'基于对象在网格中的位置(一个字符串数组)在地图上放置它们。同时，用给定的从地图左上角计算的偏移量映射到分片(角色的方向 -> 对象的类型)。',
	'Places a line on the map between the given points, that triggers the given callback when the player touches it. (Note that the line is invisible: createLine does <i>not</i> draw anything to the <a onclick="$(\'#helpPaneSidebar .category#canvas\').click();">canvas</a>.)'	:	'在地图上给定的点之间放置一条线段，当玩家触碰到这条线的时候，触发指定的回调。(注意这条线是不可见的：createLine <i>不会</i>在 <a onclick="$(\'#helpPaneSidebar .category#canvas\').click();">canvas</a> 上绘制任何东西。',
	'Displays the given chapter name.'	:	'显示指定章节的名字。',
	'Defines a new type of <a onclick="$(\'#helpPaneSidebar .category#object\').click();">object</a> with the given properties. Note that type definitions created with map.defineObject only persist in the scope of the level.'	:	'用指定的属性来定义一个新的 <a onclick="$(\'#helpPaneSidebar .category#object\').click();">object</a> 类型。注意使用 map.defineObject 进行的任何定义，对象的作用域只在当前关卡有效。',
	'Returns the empty cells adjacent to the cell at the given coordinates (if any), as an array of items of the form <i>[[x, y], direction]</i>, where (x, y) are the coordinates of each empty cell, and <i>direction</i> is the direction from the given cell to each empty cell ("left", "right", "up", or "down").'	:	'返回指定坐标的相邻的空单元，用 <i>[[x, y], direction]</i> 的格式作为数组的元素，返回数组。(x, y) 表示空单元的坐标，而 <i>direction</i> 是空单元相对指定单元的方向(“left”、“right”、“up” 或 “down”)。',
	'Returns the 2D drawing context of the <a onclick="$(\'#helpPaneSidebar .category#canvas\').click();">canvas</a> overlaying the map.'	:	'返回放置有地图的 <a onclick="$(\'#helpPaneSidebar .category#canvas\').click();">canvas</a> 的 2D 上下文。',
	'Returns {"x": x, "y": y}, where x and y are the respective coordinates of the given object on the canvas returned by map.getCanvasContext().'	:	'返回 {"x": x, "y": y}，而 x 和 y 分别是由 map.getCanvasContext() 返回的指定对象的横纵坐标。',
	'Returns the <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance representing the map.'	:	'返回表示地图的 <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> 实例。',
	'Returns all dynamic objects currently on the map.'	:	'返回当前地图上所有的动态对象。',
	'Returns the height of the map, in cells.'	:	'以单元格为单位，返回地图的高。',
	'Returns the type of the object at the given coordinates (or "empty" if there is no object there).'	:	'返回指定坐标上对象的类型(如果没有对象，返回“empty”)。',
	'Returns the Player object.'	:	'返回玩家对象',
	'Returns a hexadecimal string representing a random color in between the start and end colors. The start and end colors must be arrays of the form [R, G, B], where R, G, and B are decimal integers.'	:	'返回一个十六进制字符串表示在 start 到 end 之间的随机颜色。start 和 end 颜色必须是按照 [R, G, B] 格式的数组，R、G 和 B 是十进制整数。',
	'Returns the width of the map, in cells.'	:	'以单元格为单位，返回地图的宽。',
	'Returns true if called while a level is starting.'	:	'如果调用的时候关卡已经开始，返回 true。',
	'Overrides the action performed by pressing the given key (<i>left</i>, <i>right</i>, <i>up</i>, or <i>down</i>).'	:	'改写给定的按键的功能(<i>left</i>, <i>right</i>, <i>up</i>, or <i>down</i>)。',
	'Places an object of the given type at the given coordinates.'	:	'在指定的坐标放置特定类型的对象。',
	'Places the player at the given coordinates.'	:	'将玩家放置在指定坐标。',
	'Sets the background color of the given square.'	:	'设置指定格子的背景颜色。',
	'Sets the background color of the given square.'	:	'设置指定格子的背景颜色。',
	'Starts a timer (c.f. setInterval) of the given delay, in milliseconds (minimum 25 ms).'	:	'用指定延迟启动一个定时器(也就是 setInterval)，以毫秒为单位(最小 25 毫秒)。',
	'Updates the <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance representing the map.'	:	'更新代表地图的 <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> 实例。',
	'Raises an exception if there are not at least num lines (created by map.createLine) on the map.'	:	'如果地图上(由 map.createLine 创建的)线段的数量未达到 num，产生一个异常。',
	'Raises an exception if there are not at least num objects of type objectType on the map.'	:	'如果地图 objectType 类型对象的数量未达到 num ，产生一个异常。',
	'Raises an exception if there are more than num dynamic objects on the map.'	:	'如果地图上动态对象的数量未达到 num，产生一个异常。',
	'Raises an exception if there are not exactly num objects of type objectType on the map.'	:	'如果地图上 objectType 类型对象的数量不是 num，产生一个异常。',
	'Raises an exception if there are any timers currently set with map.startTimer.'	:	'如果当前有任何由 map.startTimer 创建的定时器，产生一个异常。',
	'Displays a message at the bottom of the map.'	:	'在地图的下方显示消息。',
	'(For dynamic objects only.) Returns true if (and only if) the object is able to move one square in the given direction, which can be "left", "right", "up", or "down".'	:	'(仅用于动态对象。)当且仅当对象可以移动到指定方向上的方格时返回 true。方向可以是“left”、“right”、“up” 或 “down”。',
	'The color of the object\'s symbol on the map.'	:	'地图上代表对象的颜色。',
	'(For dynamic objects only.) Returns the x and y coordinates of the nearest object of the given type to this object, as a hash.'	:	'(仅用于动态对象。)返回距离当前对象最近的、指定类型的对象的 x 和 y 坐标。',
	'(For dynamic objects only.) Returns the x-coordinate of the object.'	:	'(仅用于动态对象。)返回对象的 x 坐标。',
	'(For dynamic objects only.) Returns the y-coordinate of the object.'	:	'(仅用于动态对象。)返回对象的 y 坐标。',
	'(For dynamic objects only.) Gives the given item to the target (generally, the player). Can only be done if the object and the player have just collided.'	:	'(仅用于动态对象。)向指定目标(通常是玩家)提供特定的物品。仅在物品和玩家发生碰撞时有效。',
	'(For non-dynamic objects only.) The function that determines whether or not the player can pass through this object.'	:	'(仅用于非动态对象。)用于判断玩家是否可以穿过该对象的函数。',
	'(For dynamic objects only.) Moves the object one square in the given direction, which can be "left", "right", "up", or "down". An object can only move once per turn.'	:	'(仅用于动态对象。)将对象向指定方向移动一格。方向可以是“left”、“right”、“up” 或 “down”。每个周期对象都只能移动一格。',
	'The function that is executed when this object touches the player.'	:	'当对象触碰到玩家时，该函数被执行。',
	'(For dynamic objects only.) The function that is executed when this object is destroyed.'	:	'(仅用于动态对象。)当对象被销毁时，该函数被执行。',
	'(For dynamic objects only.) If true, this object destroys any dynamic object (or player) that it collides with, and is itself destroyed when it collides with anything.'	:	'(仅用于动态对象。)如果为 true，这个对象会摧毁它所碰到的任何动态对象(或玩家)，如果碰到任何东西，它本身也会被摧毁。',
	'(For dynamic objects only.) If true, this object can be pushed by the player.'	:	'(仅用于动态对象。)如果为 true，这个对象可以被玩家推动。',
	'The object\'s symbol on the map.'	:	'地图上代表对象的符号。',
	'(For teleporters only.) Sets the destination of this teleporter.'	:	'(仅用于传送点)设定该传送点的目的地。',
	'Can be "item", "dynamic", or none. If "dynamic", then this object can move on turns that run each time that the player moves. If "item", then this object can be picked up.'	:	'可以是“item”、“dynamic” 或 none。如果是 “dynamic” 这个对象在玩家每次移动的时候都可以移动。如果是 “item”，那么可以捡起这个对象。',
	'Returns true if and only if the player is at the given location.'	:	'当且仅当玩家在指定的位置上时，返回 true。',
	'Returns the color of the player.'	:	'返回玩家的颜色。',
	'Returns the direction of last move by the player.'	:	'返回玩家最后移动的方向。',
	'Returns the x-coordinate of the player.'	:	'返回玩家的 x 坐标。',
	'Returns the y-coordinate of the player.'	:	'返回玩家的 y 坐标。',
	'Returns true if and only if the player has the given item.'	:	'当且仅当玩家拥有指定的物品时，返回 true。',
	'Kills the player and displays the given text as the cause of death.'	:	'杀死玩家，并展示指定的文字来说明死因。',
	'Moves the player one square in the given direction. The player can only move once in a given function.'	:	'向指定方向将玩家移动一格。在指定函数中，玩家只能被移动一次。',
	'Removes the given item from the player\'s inventory, if the player has the given item.'	:	'如果玩家有指定的物品的话，从背包中移除它。',
	'Sets the color of the player.'	:	'设置玩家的颜色。',
	'Sets the function that is executed when the player uses the function phone.'	:	'设置玩家使用电话功能时，将执行的函数。',
	// map.js
	'Forbidden method call: '	:	'禁止的方法调用：',
	"There is no type of object named "	:	'没有物品叫做',
	"!"	:	'！',
    "Can't place object on top of player!"	:	'不能将物品放在玩家上！',
	"There is already an object at"	:	'已经有物品位于坐标',
	"Can't place player twice!"	:	'玩家不能被放置两次！',
	"There is already a type of object named "	:	'已经有物品类型叫做',
	"defineObject(): minimum interval is 100 milliseconds"	:	'"defineObject()：最小间隔为 100 毫秒',
	"delay not specified"	:	'未指定延迟',
	"minimum delay is 25 milliseconds"	:	'最小延迟为 25 毫秒',
	'Not enough '	:	'不足数量的',
	's on the map! Expected: '	:	'在地图上！应当有：',
	', found: '	:	'，现有：', 
	'Too many '	:	'太多的',
	'Wrong number of '	:	'错误数量的',
	'Too many timers set on the map! Expected: 0, found: '	:	'在地图上有太多定时器！应当有：0，现有：',
	'Not enough lines on the map! Expected: '	:	'在地图上的线条数量不足！应当有：',
	//
	'':''
}

function _(txt) {
	return _i18n[txt] == undefined ? txt : _i18n[txt];
}

function _d(txt) {
	return _i18nDisplay[txt] == undefined ? {'x' : 0, 'y' : 0, 'txt' : txt} : _i18nDisplay[txt];
}
function playIntro(display, map, i) {
    if (i < 0) {
        display._intro = true;
    } else {
        if (typeof i === 'undefined') { i = map.getHeight(); }
        display.clear();
		var l = ["%c{#0f0}> initialize", "U N T R U S T E D",
		"- or - ", "THE CONTINUING ADVENTURES OF DR. EVAL",
		"a game by Alex Nisnevich and Greg Shuflin",
		"Press any key to begin ..."];
		for(var j = 0; j < l.length; j ++) {
			var txt = _d(l[j])
	        display.drawText(txt.x, i + txt.y, txt.txt);
		}
        setTimeout(function () {
            display.playIntro(map, i - 1);
        }, 100);
    }    
}
(function () {
function Game(debugMode, startLevel) {
    /* private properties */

    var __currentCode = '';
    var __commands = [];
    var __playerCodeRunning = false;

    /* unexposed properties */

    this._dimensions = {
        width: 50,
        height: 25
    };

    this._levelFileNames = [
'01_cellBlockA.jsx','02_theLongWayOut.jsx','03_validationEngaged.jsx','04_multiplicity.jsx','05_minesweeper.jsx','06_drones101.jsx','07_colors.jsx','08_intoTheWoods.jsx','09_fordingTheRiver.jsx','10_ambush.jsx','11_robot.jsx','12_robotNav.jsx','13_robotMaze.jsx','14_crispsContest.jsx','15_exceptionalCrossing.jsx','16_lasers.jsx','17_pointers.jsx','18_superDrEvalBros.jsx','19_documentObjectMadness.jsx','20_bossFight.jsx','21_endOfTheLine.jsx','22_credits.jsx'
    ];

    this._bonusLevels = [
'pushme.jsx','sampleLevel.jsx','trapped.jsx'
    ]

	this._mod = '';

    this._viewableScripts = [
        'codeEditor.js',
        'display.js',
        'dynamicObject.js',
        'game.js',
        'inventory.js',
        'map.js',
        'objects.js',
        'player.js',
        'reference.js',
        'sound.js',
        'ui.js',
        'util.js',
        'validate.js'
    ];

    this._editableScripts = [
        'map.js',
        'objects.js',
        'player.js'
    ];

    this._resetTimeout = null;
    this._currentLevel = 0;
    this._currentFile = null;
    this._levelReached = parseInt(localStorage.getItem(this._mod.length == 0 ? 'levelReached' : this._mod + '.levelReached')) || 1;
    this._displayedChapters = [];

    this._eval = window.eval; // store our own copy of eval so that we can override window.eval
    this._playerPrototype = Player; // to allow messing with map.js and player.js later

    /* unexposed getters */

    this._getHelpCommands = function () { return __commands; };
    this._isPlayerCodeRunning = function () { return __playerCodeRunning; };
	this._getLocalKey = function (key) { return (this._mod.length == 0 ? '' : this._mod + '.') + key; };

    /* unexposed setters */

    this._setPlayerCodeRunning = function (pcr) { __playerCodeRunning = pcr; };

    /* unexposed methods */

    this._initialize = function () {
        // Fix potential corruption
        // levelReached may be "81111" instead of "8" due to bug
        if (this._levelReached > this._levelFileNames.length) {
            for (var l = 1; l <= this._levelFileNames.length; l++) {
                if (!localStorage[this._getLocalKey("level" + l + ".lastGoodState")]) {
                    this._levelReached = l - 1;
                    break;
                }
            }
        }

        // Initialize sound
        this.sound = new Sound(debugMode ? 'local' : 'cloudfront');

        // Initialize map display
        this.display = ROT.Display.create(this, {
            width: this._dimensions.width,
            height: this._dimensions.height,
            fontSize: 20
        });
        this.display.setupEventHandlers();
        var display = this.display;
        $('#screen').append(this.display.getContainer());
        $('#drawingCanvas, #dummyDom, #dummyDom *').click(function () {
            display.focus();
        });

        // Initialize editor, map, and objects
        this.editor = new CodeEditor("editor", 600, 500, this);
        this.map = new Map(this.display, this);
        this.objects = this.getListOfObjects();

        // Initialize validator
        this.saveReferenceImplementations(); // prevents tampering with methods
        this._globalVars = []; // keep track of current global variables
        for (p in window) {
            if (window.propertyIsEnumerable(p)) {
                this._globalVars.push(p);
            }
        }

        // Enable controls
        this.enableShortcutKeys();
        this.enableButtons();
        this.setUpNotepad();

        // Load help commands from local storage (if possible)
        if (localStorage.getItem(this._getLocalKey('helpCommands'))) {
            __commands = localStorage.getItem(this._getLocalKey('helpCommands')).split(';');
        }

        // Enable debug features
        if (debugMode) {
            this._debugMode = true;
            this._levelReached = 999; // make all levels accessible
            __commands = Object.keys(this.reference); // display all help
            this.sound.toggleSound(); // mute sound by default in debug mode
        }

        // Lights, camera, action
        if (startLevel) {
            this._currentLevel = startLevel - 1;
            this._getLevel(startLevel, debugMode);
        } else if (!debugMode && this._levelReached != 1) {
            // load last level reached (unless it's the credits)
            this._getLevel(Math.min(this._levelReached, 21));
        } else {
            this._intro();
        }
    };

    this._intro = function () {
        this.display.focus();
        this.display.playIntro(this.map);
    };

    this._start = function (lvl) {
        this._getLevel(lvl ? lvl : 1);
    };

    this._moveToNextLevel = function () {
        // is the player permitted to exit?
        if (typeof this.onExit === 'function' && !this.onExit(this.map)) {
            this.sound.playSound('blip');
            return;
        }

        this.sound.playSound('complete');

        //we disable moving so the player can't move during the fadeout
        this.map.getPlayer()._canMove = false;

        if (this._currentLevel == 'bonus') {
            // open main menu
            $('#helpPane, #notepadPane').hide();
            $('#menuPane').show();
        } else {
            this._getLevel(this._currentLevel + 1, false, true);
        }
    };

    this._jumpToNthLevel = function (levelNum) {
        this._currentFile = null;
        this._getLevel(levelNum, false, false);
        this.display.focus();
        this.sound.playSound('blip');
    };

    // makes an ajax request to get the level text file and
    // then loads it into the game
    this._getLevel = function (levelNum, isResetting, movingToNextLevel) {
        var game = this;
        var editor = this.editor;

        if (levelNum > this._levelFileNames.length) {
            return;
        }

        this._levelReached = Math.max(levelNum, this._levelReached);
        if (!debugMode) {
            localStorage.setItem(this._getLocalKey('levelReached'), this._levelReached);
        }

        var fileName = this._levelFileNames[levelNum - 1];

        lvlCode = this._levels['levels/' + fileName];
        if (movingToNextLevel) {
            // save level state and create a gist
            editor.saveGoodState();
            editor.createGist();
        }

        game._currentLevel = levelNum;
        game._currentFile = null;

        // load level code in editor
        editor.loadCode(lvlCode);

        // restored saved state for this level?
        if (!isResetting && editor.getGoodState(levelNum)) {
            // unless the current level is a newer version
            var newVer = editor.getProperties().version;
            var savedVer = editor.getGoodState(levelNum).version;
            if (!(newVer && (!savedVer || isNewerVersion(newVer, savedVer)))) {
                // restore saved line/section/endOfStartLevel state if possible
                if (editor.getGoodState(levelNum).endOfStartLevel) {
                    editor.setEndOfStartLevel(editor.getGoodState(levelNum).endOfStartLevel);
                }
                if (editor.getGoodState(levelNum).editableLines) {
                    editor.setEditableLines(editor.getGoodState(levelNum).editableLines);
                }
                if (editor.getGoodState(levelNum).editableSections) {
                    editor.setEditableSections(editor.getGoodState(levelNum).editableSections);
                }

                // restore saved code
                editor.setCode(editor.getGoodState(levelNum).code);
            }
        }

        // start the level and fade in
        game._evalLevelCode(null, null, true);
        game.display.focus();

        // store the commands introduced in this level (for api reference)
        __commands = __commands.concat(editor.getProperties().commandsIntroduced).unique();
        localStorage.setItem(this._getLocalKey('helpCommands'), __commands.join(';'));
    };

    this._getLevelByPath = function (filePath) {
        var game = this;
        var editor = this.editor;

        $.get(filePath, function (lvlCode) {
            game._currentLevel = 'bonus';
            game._currentBonusLevel = filePath.split("levels/")[1];
            game._currentFile = null;

            // load level code in editor
            editor.loadCode(lvlCode);

            // start the level and fade in
            game._evalLevelCode(null, null, true);
            game.display.focus();

            // store the commands introduced in this level (for api reference)
            __commands = __commands.concat(editor.getProperties().commandsIntroduced).unique();
            localStorage.setItem(this._getLocalKey('helpCommands'), __commands.join(';'));
        }, 'text');

    };

    // how meta can we go?
    this._editFile = function (filePath) {
        var game = this;

        var fileName = filePath.split('/')[filePath.split('/').length - 1];
        game._currentFile = filePath;

        $.get(filePath, function (code) {
            // load level code in editor
            if (game._editableScripts.indexOf(fileName) > -1) {
                game.editor.loadCode('#BEGIN_EDITABLE#\n' + code + '\n#END_EDITABLE#');
            } else {
                game.editor.loadCode(code);
            }
        }, 'text');
    };

    this._resetLevel = function( level ) {
        var game = this;
        var resetTimeout_msec = 2500;

        if ( this._resetTimeout != null ) {
            $('body, #buttons').css('background-color', '#000');
            window.clearTimeout( this._resetTimeout );
            this._resetTimeout = null;

            this._getLevel(level, true);
        } else {
            this.display.writeStatus("To reset this level press ^4 again.");
            $('body, #buttons').css('background-color', '#900');

            this._resetTimeout = setTimeout(function () {
                game._resetTimeout = null;

                $('body, #buttons').css('background-color', '#000');
            }, resetTimeout_msec );
        }
    };

    // restart level with currently loaded code
    this._restartLevel = function () {
        this.editor.setCode(__currentCode);
        this._evalLevelCode();
    };

    this._evalLevelCode = function (allCode, playerCode, isNewLevel, restartingLevelFromScript) {
        var game = this;

        // by default, get code from the editor
        var loadedFromEditor = false;
        if (!allCode) {
            allCode = this.editor.getCode();
            playerCode = this.editor.getPlayerCode();
            loadedFromEditor = true;
        }

        // if we're editing a script file, do something completely different
        if (this._currentFile !== null && !restartingLevelFromScript) {
            this.validateAndRunScript(allCode);
            return;
        }

        // save current display state (for scrolling up later)
        this.display.saveGrid(this.map);

        // validate the code
        // if it passes validation, returns the startLevel function if it pass
        // if it fails validation, returns false
        var validatedStartLevel = this.validate(allCode, playerCode, restartingLevelFromScript);

        if (validatedStartLevel) { // code is valid
            // reset the map
            this.map._reset(); // for cleanup
            this.map = new Map(this.display, this);
            this.map._reset();
            this.map._setProperties(this.editor.getProperties()['mapProperties']);

            // save editor state
            __currentCode = allCode;
            if (loadedFromEditor && !restartingLevelFromScript) {
                this.editor.saveGoodState();
            }

            // clear drawing canvas and hide it until level loads
            $('#drawingCanvas')[0].width = $('#drawingCanvas')[0].width;
            $('#drawingCanvas').hide();
            $('#dummyDom').hide();

            // set correct inventory state
            this.setInventoryStateByLevel(this._currentLevel);

            // start the level
            validatedStartLevel(this.map);

            // deal with sneaky players
            this.clearModifiedGlobals();

            // draw the map
            this.display.fadeIn(this.map, isNewLevel ? 100 : 10, function () {
                game.map.refresh(); // refresh inventory display

                // show map overlays if necessary
                if (game.map._properties.showDrawingCanvas) {
                    $('#drawingCanvas').show();
                } else if (game.map._properties.showDummyDom) {
                    $('#dummyDom').show();
                }

                // workaround because we can't use writeStatus() in startLevel()
                // (due to the text getting overwritten by the fade-in)
                if (game.editor.getProperties().startingMessage) {
                    game.display.writeStatus(game.editor.getProperties().startingMessage);
                }
            });

            this.map._ready();

            // start bg music for this level
            if (this.editor.getProperties().music) {
                this.sound.playTrackByName(this.editor.getProperties().music);
            }

            // finally, allow player movement
            if (this.map.getPlayer()) {
                this.map.getPlayer()._canMove = true;
                game.display.focus();
            }
        } else { // code is invalid
            // play error sound
            this.sound.playSound('static');

            // disable player movement
            this.map.getPlayer()._canMove = false;
        }
    };

    this._callUnexposedMethod = function(f) {
        if (__playerCodeRunning) {
            __playerCodeRunning = false;
            res = f();
            __playerCodeRunning = true;
            return res;
        } else {
            return f();
        }
    };
}
function CodeEditor(textAreaDomID, width, height, game) {
    var symbols = {
        'begin_line':'#BEGIN_EDITABLE#',
        'end_line':'#END_EDITABLE#',
        'begin_char':"#{#",
        'end_char': "#}#",
        'begin_properties':'#BEGIN_PROPERTIES#',
        'end_properties':'#END_PROPERTIES#',
        'start_start_level':'#START_OF_START_LEVEL#',
        'end_start_level':'#END_OF_START_LEVEL#'
    };

    var charLimit = 80;

    var properties = {};
    var editableLines = [];
    var editableSections = {};
    var lastChange = {};
    var startOfStartLevel = null;
    var endOfStartLevel = null;

    this.setEndOfStartLevel = function (eosl) {
        endOfStartLevel = eosl;
    }

    this.setEditableLines = function (el) {
        editableLines = el;
    }

    this.setEditableSections = function (es) {
        editableSections = es;
    }

    // for debugging purposes
    log = function (text) {
        if (game._debugMode) {
            console.log(text);
        }
    }

    // preprocesses code,determines the location
    // of editable lines and sections, loads properties
    function preprocess(codeString) {
        editableLines = [];
        editableSections = {};
        endOfStartLevel = null;
        startOfStartLevel = null;
        var propertiesString = '';

        var lineArray = codeString.split("\n");
        var inEditableBlock = false;
        var inPropertiesBlock = false;

        for (var i = 0; i < lineArray.length; i++) {
            var currentLine = lineArray[i];

            // process properties
            if (currentLine.indexOf(symbols.begin_properties) === 0) {
                lineArray.splice(i,1); // be aware that this *mutates* the list
                i--;
                inPropertiesBlock = true;
            } else if (currentLine.indexOf(symbols.end_properties) === 0) {
                lineArray.splice(i,1);
                i--;
                inPropertiesBlock = false;
            } else if (inPropertiesBlock) {
                lineArray.splice(i,1);
                i--;
                propertiesString += currentLine;
            }
            // process editable lines and sections
              else if (currentLine.indexOf(symbols.begin_line) === 0) {
                lineArray.splice(i,1);
                i--;
                inEditableBlock = true;
            } else if (currentLine.indexOf(symbols.end_line) === 0) {
                lineArray.splice(i,1);
                i--;
                inEditableBlock = false;
            }
            // process start of startLevel()
              else if (currentLine.indexOf(symbols.start_start_level) === 0) {
                lineArray.splice(i,1);
                startOfStartLevel = i;
                i--;
            }
            // process end of startLevel()
              else if (currentLine.indexOf(symbols.end_start_level) === 0) {
                lineArray.splice(i,1);
                endOfStartLevel = i;
                i--;
            }
            // everything else
              else {
                if (inEditableBlock) {
                    editableLines.push(i);
                } else {
                    // check if there are any editable sections
                    var sections = [];
                    var startPoint = null;
                    for (var j = 0; j < currentLine.length - 2; j++) {
                        if (currentLine.slice(j,j+3) === symbols.begin_char) {
                            currentLine = currentLine.slice(0,j) + currentLine.slice(j+3, currentLine.length);
                            startPoint = j;
                        } else if (currentLine.slice(j,j+3) === symbols.end_char) {
                            currentLine = currentLine.slice(0,j) + currentLine.slice(j+3, currentLine.length);
                            sections.push([startPoint, j]);
                        }
                    }
                    if (sections.length > 0) {
                        lineArray[i] = currentLine;
                        editableSections[i] = sections;
                    }
                }
            }
        }

        try {
            properties = JSON.parse(propertiesString);
        } catch (e) {
            properties = {};
        }

        return lineArray.join("\n");
    }

    var findEndOfSegment = function(line) {
        // Given an editable line number, returns the last line of the
        // given line's editable segment.

        if (editableLines.indexOf(line + 1) === -1) {
            return line;
        }

        return findEndOfSegment(line + 1);
    };

    var shiftLinesBy = function(array, after, shiftAmount) {
        // Shifts all line numbers strictly after the given line by
        // the provided amount.

        return array.map(function(line) {
            if (line > after) {
                log('Shifting ' + line + ' to ' + (line + shiftAmount));
                return line + shiftAmount;
            }
            return line;
        });
    };

    // enforces editing restrictions when set as the handler
    // for the 'beforeChange' event
    var enforceRestrictions = function(instance, change) {
        lastChange = change;

        var inEditableArea = function(c) {
            var lineNum = c.to.line;
            if (editableLines.indexOf(lineNum) !== -1 && editableLines.indexOf(c.from.line) !== -1) {
                // editable lines?
                return true;
            } else if (editableSections[lineNum]) {
                // this line has editable sections - are we in one of them?
                var sections = editableSections[lineNum];
                for (var i = 0; i < sections.length; i++) {
                    var section = sections[i];
                    if (c.from.ch > section[0] && c.to.ch > section[0] &&
                        c.from.ch < section[1] && c.to.ch < section[1]) {
                        return true;
                    }
                }
                return false;
            }
        };

        log(
            '---Editor input (beforeChange) ---\n' +
            'Kind: ' + change.origin + '\n' +
            'Number of lines: ' + change.text.length + '\n' +
            'From line: ' + change.from.line + '\n' +
            'To line: ' + change.to.line
        );

        if (!inEditableArea(change)) {
            change.cancel();
        } else if (change.to.line < change.from.line ||
                   change.to.line - change.from.line + 1 > change.text.length) { // Deletion
            updateEditableLinesOnDeletion(change);
        } else { // Insert/paste
            // First line already editable
            var newLines = change.text.length - (change.to.line - change.from.line + 1);

            if (newLines > 0) {
                if (editableLines.indexOf(change.to.line) < 0) {
                    change.cancel();
                    return;
                }

                // enforce 80-char limit by wrapping all lines > 80 chars
                var wrappedText = [];
                change.text.forEach(function (line) {
                    while (line.length > charLimit) {
                        // wrap lines at spaces if at all possible
                        var minCutoff = charLimit - 20;
                        var cutoff = minCutoff + line.slice(minCutoff).indexOf(" ");
                        if (cutoff > 80) {
                            // no suitable cutoff point found - let's get messy
                            cutoff = 80;
                        }
                        wrappedText.push(line.substr(0, cutoff));
                        line = line.substr(cutoff);
                    }
                    wrappedText.push(line);
                });
                change.text = wrappedText;

                // updating line count
                newLines = change.text.length - (change.to.line - change.from.line + 1);

                updateEditableLinesOnInsert(change, newLines);
            } else {
                // enforce 80-char limit by trimming the line
                var lineLength = instance.getLine(change.to.line).length;
                if (lineLength + change.text[0].length > charLimit) {
                    var allowedLength = Math.max(charLimit - lineLength, 0);
                    change.text[0] = change.text[0].substr(0, allowedLength);
                }
            }

            // modify editable sections accordingly
            // TODO Probably broken by multiline paste
            var sections = editableSections[change.to.line];
            if (sections) {
                var delta = change.text[0].length - (change.to.ch - change.from.ch);
                for (var i = 0; i < sections.length; i++) {
                    // move any section start/end points that we are to the left of
                    if (change.to.ch < sections[i][1]) {
                        sections[i][1] += delta;
                    }
                    if (change.to.ch < sections[i][0]) {
                        sections[i][0] += delta;
                    }
                }
            }
        }

        log(editableLines);
    }

    var updateEditableLinesOnInsert = function(change, newLines) {
        var lastLine = findEndOfSegment(change.to.line);

        // Shift editable line numbers after this segment
        editableLines = shiftLinesBy(editableLines, lastLine, newLines);

        // TODO If editable sections appear together with editable lines
        // in a level, multiline edit does not properly handle editable
        // sections.

        log("Appending " + newLines + " lines");

        // Append new lines
        for (var i = lastLine + 1; i <= lastLine + newLines; i++) {
            editableLines.push(i);
        }

        // Update endOfStartLevel
        if (endOfStartLevel) {
            endOfStartLevel += newLines;
        }
    };

    var updateEditableLinesOnDeletion = function(changeInput) {
        // Figure out how many lines just got removed
        var numRemoved = changeInput.to.line - changeInput.from.line - changeInput.text.length + 1;
        // Find end of segment
        var editableSegmentEnd = findEndOfSegment(changeInput.to.line);
        // Remove that many lines from its end, one by one
        for (var i = editableSegmentEnd; i > editableSegmentEnd - numRemoved; i--) {
            log('Removing\t' + i);
            editableLines.remove(i);
        }
        // Shift lines that came after
        editableLines = shiftLinesBy(editableLines, editableSegmentEnd, -numRemoved);
        // TODO Shift editableSections

        // Update endOfStartLevel
        if (endOfStartLevel) {
            endOfStartLevel -= numRemoved;
        }
    };

    // beforeChange events don't pick up undo/redo
    // so we track them on change event
    var trackUndoRedo = function(instance, change) {
        if (change.origin === 'undo' || change.origin === 'redo') {
            enforceRestrictions(instance, change);
        }
    }

    this.initialize = function() {
        this.internalEditor = CodeMirror.fromTextArea(document.getElementById(textAreaDomID), {
            theme: 'vibrant-ink',
            lineNumbers: true,
            dragDrop: false,
            smartIndent: false
        });

        this.internalEditor.setSize(width, height);

        // set up event handlers

        this.internalEditor.on("focus", function(instance) {
            // implements yellow box when changing focus
            $('.CodeMirror').addClass('focus');
            $('#screen canvas').removeClass('focus');

            $('#helpPane').hide();
            $('#menuPane').hide();
        });

        this.internalEditor.on('cursorActivity', function (instance) {
            // fixes the cursor lag bug
            instance.refresh();

            // automatically smart-indent if the cursor is at position 0
            // and the line is empty (ignore if backspacing)
            if (lastChange.origin !== '+delete') {
                var loc = instance.getCursor();
                if (loc.ch === 0 && instance.getLine(loc.line).trim() === "") {
                    instance.indentLine(loc.line, "prev");
                }
            }
        });

        this.internalEditor.on('change', markEditableSections);
        this.internalEditor.on('change', trackUndoRedo);
    }

    // loads code into editor
    this.loadCode = function(codeString) {
        /*
         * logic: before setting the value of the editor to the code string,
         * we run it through setEditableLines and setEditableSections, which
         * strip our notation from the string and as a side effect build up
         * a data structure of editable areas
         */

        this.internalEditor.off('beforeChange', enforceRestrictions);
        codeString = preprocess(codeString);
        this.internalEditor.setValue(codeString);
        this.internalEditor.on('beforeChange', enforceRestrictions);

        this.markUneditableLines();
        this.internalEditor.refresh();
        this.internalEditor.clearHistory();
    };

    // marks uneditable lines within editor
    this.markUneditableLines = function() {
        var instance = this.internalEditor;
        for (var i = 0; i < instance.lineCount(); i++) {
            if (editableLines.indexOf(i) === -1) {
                instance.addLineClass(i, 'wrap', 'disabled');
            }
        }
    }

    // marks editable sections inside uneditable lines within editor
    var markEditableSections = function(instance) {
        $('.editableSection').removeClass('editableSection');
        for (var line in editableSections) {
            if (editableSections.hasOwnProperty(line)) {
                var sections = editableSections[line];
                for (var i = 0; i < sections.length; i++) {
                    var section = sections[i];
                    var from = {'line': parseInt(line), 'ch': section[0]};
                    var to = {'line': parseInt(line), 'ch': section[1]};
                    instance.markText(from, to, {'className': 'editableSection'});
                }
            }
        }
    }

    // returns all contents
    this.getCode = function (forSaving) {
        var lines = this.internalEditor.getValue().split('\n');

        if (!forSaving && startOfStartLevel) {
            // insert the end of startLevel() marker at the appropriate location
            lines.splice(startOfStartLevel, 0, "map._startOfStartLevelReached()");
        }

        if (!forSaving && endOfStartLevel) {
            // insert the end of startLevel() marker at the appropriate location
            lines.splice(endOfStartLevel+1, 0, "map._endOfStartLevelReached()");
        }

        return lines.join('\n');
    }

    // returns only the code written in editable lines and sections
    this.getPlayerCode = function () {
        var code = '';
        for (var i = 0; i < this.internalEditor.lineCount(); i++) {
            if (editableLines && editableLines.indexOf(i) > -1) {
                code += this.internalEditor.getLine(i) + ' \n';
            }
        }
        for (var line in editableSections) {
            if (editableSections.hasOwnProperty(line)) {
                var sections = editableSections[line];
                for (var i = 0; i < sections.length; i++) {
                    var section = sections[i];
                    code += this.internalEditor.getLine(line).slice(section[0], section[1]) + ' \n';
                }
            }
        }
        return code;
    };

    this.getProperties = function () {
        return properties;
    }

    this.setCode = function(code) {
        // make sure we're not saving the hidden START/END_OF_START_LEVEL lines
        code = code.split('\n').filter(function (line) {
            return line.indexOf('OfStartLevelReached') < 0;
        }).join('\n');

        this.internalEditor.off('beforeChange',enforceRestrictions);
        this.internalEditor.setValue(code);
        this.internalEditor.on('beforeChange', enforceRestrictions);
        this.markUneditableLines();
        this.internalEditor.refresh();
        this.internalEditor.clearHistory();
    }

    this.saveGoodState = function () {
        var lvlNum = game._currentFile ? game._currentFile : game._currentLevel;
        localStorage.setItem(game._getLocalKey('level' + lvlNum + '.lastGoodState'), JSON.stringify({
            code: this.getCode(true),
            playerCode: this.getPlayerCode(),
            editableLines: editableLines,
            editableSections: editableSections,
            endOfStartLevel: endOfStartLevel,
            version: this.getProperties().version
        }));
    }

    this.createGist = function () {
        var lvlNum = game._currentLevel;
        var filename = 'untrusted-lvl' + lvlNum + '-solution.js';
        var description = 'Solution to level ' + lvlNum + ' in Untrusted: http://alex.nisnevich.com/untrusted/';
        var data = {
            'files': {},
            'description': description,
            'public': true
        };
        data['files'][filename] = {
            'content': this.getCode(true).replace(/\t/g, '    ')
        };

        $.ajax({
            'url': 'https://api.github.com/gists',
            'type': 'POST',
            'data': JSON.stringify(data),
            'success': function (data, status, xhr) {
                $('#savedLevelMsg').html('Level ' + lvlNum + ' solution saved at <a href="'
                    + data['html_url'] + '" target="_blank">' + data['html_url'] + '</a>');
            }
        });
    }

    this.getGoodState = function (lvlNum) {
        return JSON.parse(localStorage.getItem(game._getLocalKey('level' + lvlNum + '.lastGoodState')));
    }

    this.refresh = function () {
        this.internalEditor.refresh();
    }

    this.focus = function () {
        this.internalEditor.focus();
    }

    this.initialize(); // run initialization code
}
ROT.Display.create = function(game, opts) {
    opts.fontFamily = _('"droid sans mono", Courier, "Courier New", monospace');
    var display = new ROT.Display(opts);
    display.game = game;
    return display;
};

ROT.Display.prototype.errors = [];

ROT.Display.prototype.setupEventHandlers = function() {
    var display = this;
    var game = this.game;

    // directions for moving entities
    var keys = {
        37: 'left', // left arrow
        38: 'up', // up arrow
        39: 'right', // right arrow
        40: 'down', // down arrow
        65: 'left', // A
        68: 'right', // D
        72: 'left', // H
        74: 'down', // J
        75: 'up', // K
        76: 'right', // L
        81: 'funcPhone', // Q
        82: 'rest', // R
        83: 'down', // S
        87: 'up', // W
        98: 'down', // 2
        100: 'left', // 4
        101: 'rest', // 5
        102: 'right', // 6
        104: 'up' // 8
    };

    // contentEditable is required for canvas elements to detect keyboard events
    $(this.getContainer()).attr("contentEditable", "true");
    this.getContainer().addEventListener("keydown", function(e) {
        if (display._intro == true) {
            game._start();
            display._intro = false;
        } else if (keys[e.keyCode] && game.map.getPlayer()) {
            game.map.getPlayer().move(keys[e.keyCode], true);
        }
        e.preventDefault();
    });

    this.getContainer().addEventListener("click", function(e) {
        $(this).addClass('focus');
        $('.CodeMirror').removeClass('focus');

        $('#helpPane').hide();
        $('#menuPane').hide();
    });
};

// drawObject takes care of looking up an object's symbol and color
// according to name (NOT according to the actual object literal!)
ROT.Display.prototype.drawObject = function (map, x, y, object) {
    var type = object.type;
    var definition = map._getObjectDefinition(type) || this.savedDefinitions[type];

    var symbol = definition.symbol;
    var color = object.color || definition.color || "#fff";
    var bgColor = object.bgColor || "#000";

    this.draw(x, y, symbol, color, bgColor);
};

ROT.Display.prototype.drawAll = function(map) {
    if (!this.offset) {this.offset = 0;}

    var game = this.game;

    // _initialize grid
    var grid = new Array(game._dimensions.width);
    for (var x = 0; x < game._dimensions.width; x++) {
        grid[x] = new Array(game._dimensions.height);
        for (var y = 0; y < game._dimensions.height; y++) {
            grid[x][y] = {
                type: 'empty',
                bgColor: 'black'
            };
        }
    }

    // place static objects
    for (var x = 0; x < game._dimensions.width; x++) {
        for (var y = 0; y < game._dimensions.height; y++) {
            grid[x][y] = {
                type: map._getGrid()[x][y].type,
                bgColor: map._getGrid()[x][y].bgColor
            };
        }
    }

    // place dynamic objects
    for (var i = 0; i < map.getDynamicObjects().length; i++) {
        var obj = map.getDynamicObjects()[i];
        grid[obj.getX()][obj.getY()] = {
            type: obj.getType(),
            bgColor: map._getGrid()[obj.getX()][obj.getY()].bgColor
        };
    }

    // place player
    if (map.getPlayer()) {
        var player = map.getPlayer();
        grid[player.getX()][player.getY()] = {
            type: 'player',
            color: player.getColor(),
            bgColor: map._getGrid()[player.getX()][player.getY()].bgColor
        }
    }

    // draw grid
    for (var x = 0; x < game._dimensions.width; x++) {
        for (var y = Math.max(0, this.offset - map.getHeight()); y < game._dimensions.height; y++) {
            this.drawObject(map, x, y + this.offset, grid[x][y]);
        }
    }

    // write error messages, if any
    if (this.errors && this.errors.length > 0) {
        for (var i = 0; i < this.errors.length; i++) {
            var y = this.game._dimensions.height - this.errors.length + i;
            this.drawText(0, y, this.errors[i]);
        }
    }

    // store for potential later use
    this.grid = grid;
};

ROT.Display.prototype.drawPreviousLevel = function(map, offset) {
    if (!offset) {offset = 0;}

    var game = this.game;
    var grid = this.savedGrid;

    if (grid) {
        for (var x = 0; x < game._dimensions.width; x++) {
            for (var y = 0; y < game._dimensions.height; y++) {
                this.drawObject(map, x, y + offset, grid[x][y]);
            }
        }
    }
};

ROT.Display.prototype.saveGrid = function (map) {
    this.savedGrid = this.grid;
    this.savedDefinitions = map._getObjectDefinitions();
}

ROT.Display.prototype.playIntro = function (map, i) {
    display = this;
	playIntro(display, map, i)
};

ROT.Display.prototype.fadeIn = function (map, speed, callback, i) {
    var display = this;
    var game = this.game;
    if (game._currentLevel == "bonus") {
        var levelName = game._currentBonusLevel;
    } else {
        var levelName = game._levelFileNames[game._currentLevel - 1];
    }
    var command = _("%c{#0f0}> run ") + levelName;

    if (i < -3) {
        if (callback) { callback(); }
    } else {
        if (typeof i === 'undefined') { i = map.getHeight(); }
        this.clear();
        this.errors = [];
        this.drawPreviousLevel(map, i - map.getHeight());

        this.offset = i + 3;
        this.drawAll(map);

        this.drawText(0, i + 1, command);

        setTimeout(function () {
            display.fadeIn(map, speed, callback, i - 1);
        }, speed);
    }
};

ROT.Display.prototype.writeStatus = function(text) {
    var map = this.game.map;

    var strings = [];
	var l = 0;
	for (var i = 0; i < text.length; i ++) {
		l ++;
		if (escape(text.charAt(i)).indexOf('%u') >= 0) { // is full-width char
			l ++;
		}
		if (l > map.getWidth() - 10) {
	        // split into lines
	        strings.push(text.substr(strings.join('').length, i));
			l = 0;
		}
	}
	if (strings.length == 0) {
		strings = [text];
	}

    for (var i = 0; i < strings.length; i++) {
        var str = strings[i];
        var x = Math.floor((map.getWidth() - str.replace(/[^\u0000-\u00ff]/g,"aa").length) / 2);
        var y = map.getHeight() + i - strings.length - 1;
        this.drawText(x, y, _(str));
    }
};

ROT.Display.prototype.appendError = function(errorText, command) {
    var map = this.game.map;
    if (!command) {
        command = "%c{#0f0}> run " + this.game._levelFileNames[this.game._currentLevel - 1];
    }

    this.offset -= 3;
    this.errors = this.errors.concat([command, errorText, ""]);
    this.clear();
    this.drawAll(map);
};

ROT.Display.prototype.focus = function() {
    $('#screen').show();
    $(this.getContainer()).attr('tabindex', '0').click().focus();
};


ROT.Display.prototype.renderDom = function(html, css) {
    // using ideas from http://robert.ocallahan.org/2011/11/drawing-dom-content-to-canvas.html
    /*var canvas = $('#drawingCanvas')[0];
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width; //resets background of canvas
    var data = "data:image/svg+xml," +
               "<svg xmlns='http://www.w3.org/2000/svg' width='" + canvas.width + "' height='" + canvas.height + "'>" +
                 "<foreignObject width='100%' height='100%'>" +
                   "<style type='text/css'>" + css + "</style>" +
                   "<div xmlns='http://www.w3.org/1999/xhtml'>" +
                        html +
                   "</div>" +
                 "</foreignObject>" +
               "</svg>";
    //console.log(data);
    var img = new Image();
    img.src = data;
    //console.log(img);
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }*/

    // drawing DOM to canvas doesn't work in many browsers, so
    // we fall back to basic DOM rendering
    $(dummyDom).html(html); // DOM CSS now resides in game.css with everything else
}
function DynamicObject(map, type, x, y, __game) {
    /* private variables */

    var __x = x;
    var __y = y;
    var __type = type;
    var __definition = __game._callUnexposedMethod(function () {
        return map._getObjectDefinition(type);
    });
    var __inventory = [];
    var __destroyed = false;
    var __myTurn = true;
    var __timer = null;

    /* wrapper */

    function wrapExposedMethod(f, object) {
        return function () {
            var args = arguments;
            return __game._callUnexposedMethod(function () {
                return f.apply(object, args);
            });
        };
    };

    /* unexposed methods */

    this._computeDestination = function (startX, startY, direction) {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: object._computeDestination()';}

        switch (direction) {
            case 'up':
                return {'x': startX, 'y': startY - 1};
            case 'down':
                return {'x': startX, 'y': startY + 1};
            case 'left':
                return {'x': startX - 1, 'y': startY};
            case 'right':
                return {'x': startX + 1, 'y': startY};
            default:
                return {'x': startX, 'y': startY};
        }
    };

    this._onTurn = function () {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: object._onTurn()';}

        var me = this;
        var player = map.getPlayer();

        function executeTurn() {
            __myTurn = true;

            try {
                //we need to check for a collision with the player *after*
                //the player has moved but *before* the object itself moves
                //this prevents a bug where players and objects can 'pass through'
                //each other
                if (__x === player.getX() && __y === player.getY()) {
                    if (__definition.pushable) {
                        me.move(player.getLastMoveDirection());
                    }
                    if (__definition.onCollision) {
                        map._validateCallback(function () {
                            __definition.onCollision(player, me);
                        });
                    }
                }

                if (__myTurn && __definition.behavior) {
                    map._validateCallback(function () {
                        __definition.behavior(me, player);
                    });
                }
            } catch (e) {
                // throw e; // for debugging
                map.writeStatus(e.toString());
            }
        }

        if (__definition.interval) {
            // start timer if not already set
            if (!__timer) {
                __timer = setInterval(executeTurn, __definition.interval);
            }

            // don't move on regular turn, but still check for player collision
            if (map.getPlayer().atLocation(__x, __y) &&
                    (__definition.onCollision || __definition.projectile)) {
                // trigger collision
                if (__definition.projectile) {
                    // projectiles automatically kill
                    map.getPlayer().killedBy('a ' + __type);
                } else {
                    map._validateCallback(function () {
                        __definition.onCollision(map.getPlayer(), this);
                    });
                }
            }
        } else {
            executeTurn();
        }
    };

    this._afterMove = function () {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: object._afterMove()';}

        // try to pick up items
        var objectName = map._getGrid()[__x][__y].type;
        if (map._getObjectDefinition(objectName).type === 'item' && !__definition.projectile) {
            __inventory.push(objectName);
            map._removeItemFromMap(__x, __y, objectName);
            map._playSound('pickup');
        }
    };

    this._destroy = function (onMapReset) {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: object._destroy()';}

        var me = this;

        __destroyed = true;
        clearInterval(__timer);

        // remove this object from map's __dynamicObjects list
        map._refreshDynamicObjects();

        // unless the map is being reset, play an explosion
        // and call this object's onDestroy method
        if (__definition.onDestroy && !onMapReset) {
            if (!__definition.projectile) {
                map._playSound('explosion');
            }

            map._validateCallback(function () {
                __definition.onDestroy(me);
            });
        }
    };

    /* exposed methods */

    this.getX = function () { return __x; };
    this.getY = function () { return __y; };
    this.getType = function () { return __type; };
    this.isDestroyed = function () { return __destroyed; };

    this.giveItemTo = wrapExposedMethod(function (player, itemType) {
        var pl_at = player.atLocation;

        if (!(pl_at(__x, __y) || pl_at(__x+1, __y) || pl_at(__x-1, __y) ||
                pl_at(__x, __y+1) || pl_at(__x, __y-1))) {
            throw (type + ' says: Can\'t give an item unless I\'m touching the player!');
        }
        if (__inventory.indexOf(itemType) < 0) {
            throw (type + ' says: I don\'t have that item!');
        }

        player._pickUpItem(itemType, map._getObjectDefinition(itemType));
    }, this);

    this.move = wrapExposedMethod(function (direction) {
        var dest = this._computeDestination(__x, __y, direction);

        if (!__myTurn) {
            throw 'Can\'t move when it isn\'t your turn!';
        }

        var nearestObj = map._findNearestToPoint("anyDynamic", dest.x, dest.y);

        // check for collision with player
        if (map.getPlayer().atLocation(dest.x, dest.y) &&
                (__definition.onCollision || __definition.projectile)) {
            // trigger collision
            if (__definition.projectile) {
                // projectiles automatically kill
                map.getPlayer().killedBy('a ' + __type);
            } else {
                __definition.onCollision(map.getPlayer(), this);
            }
        } else if (map._canMoveTo(dest.x, dest.y, __type) &&
                !map._isPointOccupiedByDynamicObject(dest.x, dest.y)) {
            // move the object
            __x = dest.x;
            __y = dest.y;
            this._afterMove(__x, __y);
        } else {
            // cannot move
            if (__definition.projectile) {
                // projectiles disappear when they cannot move
                this._destroy();

                // projectiles also destroy any dynamic objects they touch
                if (map._isPointOccupiedByDynamicObject(dest.x, dest.y)) {
                    map._findDynamicObjectAtPoint(dest.x, dest.y)._destroy();
                }
            }
        }

        __myTurn = false;
    }, this);

    this.canMove = wrapExposedMethod(function (direction) {
        var dest = this._computeDestination(__x, __y, direction);

        // check if the object can move there and will not collide with
        // another dynamic object
        return (map._canMoveTo(dest.x, dest.y, __type) &&
            !map._isPointOccupiedByDynamicObject(dest.x, dest.y));
    }, this);

    this.findNearest = wrapExposedMethod(function (type) {
        return map._findNearestToPoint(type, __x, __y);
    }, this);

    // only for teleporters
    this.setTarget = wrapExposedMethod(function (target) {
        if (__type != 'teleporter') {
            throw 'setTarget() can only be called on a teleporter!';
        }

        if (target === this) {
            throw 'Teleporters cannot target themselves!';
        }

        this.target = target;
    }, this);

    // constructor

    if (!map._dummy && __definition.interval) {
        this._onTurn();
    }
}
Game.prototype.inventory = [];

Game.prototype.getItemDefinition = function (itemName) {
	var map = this.map;
	return this._callUnexposedMethod(function () {
		return map._getObjectDefinition(itemName);
	});
};

Game.prototype.addToInventory = function (itemName) {
	if (this.inventory.indexOf(itemName) === -1) {
		this.inventory.push(itemName);
		this.drawInventory();
	}
};

Game.prototype.checkInventory = function (itemName) {
	return this.inventory.indexOf(itemName) > -1;
};

Game.prototype.removeFromInventory = function (itemName) {
	var object = this.getItemDefinition(itemName);
	if (!object) {
		throw 'No such object: ' + itemName;
	}
	if (object.type != 'item') {
		throw 'Object is not an item: ' + itemName;
	}

	this.inventory.remove(itemName);
	this.drawInventory();

	if (object.onDrop) {
		object.onDrop(this);
	}
};

Game.prototype.setInventoryStateByLevel = function (levelNum) {
	// first remove items that have onDrop effects on UI
	if (levelNum == 1) {
		this.removeFromInventory('computer');
	}
	if (levelNum <= 7) {
		this.removeFromInventory('phone');
	}

	// clear any remaining items from inventory
	this.inventory = [];

	// repopulate inventory by level
	if (levelNum > 1) {
		this.addToInventory('computer');
		$('#editorPane').fadeIn();
		this.editor.refresh();
	}
	if (levelNum > 7) {
		this.addToInventory('phone');
		$('#phoneButton').show();
	}
	if (levelNum > 11) {
		this.addToInventory('redKey');
	}
	if (levelNum > 12) {
		this.addToInventory('greenKey');
	}
	if (levelNum > 13) {
		this.addToInventory('blueKey');
	}
	if (levelNum > 14) {
		this.addToInventory('theAlgorithm');
		this.removeFromInventory('redKey');
		this.removeFromInventory('greenKey');
		this.removeFromInventory('blueKey');
	}
	if (levelNum > 15) {
		this.removeFromInventory('theAlgorithm');
	}
	if (levelNum > 20) {
		this.addToInventory('theAlgorithm');
	}

	// does this belong here? it does in a vague way maybe
	if (this.editor.getProperties().activateSuperMenu) {
        this.activateSuperMenu();
    }

    // clear any status messages generated by this
    this.map._status = '';
};

Game.prototype.drawInventory = function () {
	var game = this;

	if (this.inventory.length > 0) {
		$('#inventory').text(_('INVENTORY: '));

		this.inventory.forEach(function (item) {
			var object = game.map._getObjectDefinition(item);

			$('<span class="item">')
				.attr('title', item)
				.css('color', object.color ? object.color : '#fff')
				.text(object.symbol)
				.appendTo($('#inventory'));
		});
	} else {
		$('#inventory').html('');
	}
};

/* methods relating to specific inventory items go here */

Game.prototype.usePhone = function () {
	var player = this.map.getPlayer();
	if (player && player._canMove && player.hasItem('phone')) {
		if (player._phoneFunc) {
			this.sound.playSound('select');
			this.validateCallback(player._phoneFunc);
		} else {
			this.sound.playSound('static');
			this.display.writeStatus("Your function phone isn't bound to any function!");
		}
	}
};
function Map(display, __game) {
    /* private variables */

    var __player;
    var __grid;
    var __dynamicObjects = [];
    var __objectDefinitions;

    var __lines;
    var __dom;
    var __domCSS = '';

    var __allowOverwrite;
    var __keyDelay;
    var __refreshRate;

    var __intervals = [];
    var __chapterHideTimeout;

    /* unexposed variables */

    this._properties = {};
    this._display = display;
    this._dummy = false; // overridden by dummyMap in validate.js
    this._status = '';

    /* wrapper */

    function wrapExposedMethod(f, map) {
        return function () {
            var args = arguments;
            return __game._callUnexposedMethod(function () {
                return f.apply(map, args);
            });
        };
    };

    /* unexposed getters */

    this._getObjectDefinition = function(objName) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._getObjectDefinition()';}
        return __objectDefinitions[objName];
    };
    this._getObjectDefinitions = function() {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._getObjectDefinitions()';}
        return __objectDefinitions;
    };
    this._getGrid = function () {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._getGrid()';}
        return __grid;
    };
    this._getLines = function() {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._getLines()';}
        return __lines;
    };

    /* exposed getters */

    this.getDynamicObjects = function () { return __dynamicObjects; };
    this.getPlayer = function () { return __player; };
    this.getWidth = function () { return __game._dimensions.width; };
    this.getHeight = function () { return __game._dimensions.height; };

    /* unexposed methods */

    this._reset = function () {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._reset()';}

        __objectDefinitions = __game.getListOfObjects();

        this._display.clear();

        __grid = new Array(__game._dimensions.width);
        for (var x = 0; x < __game._dimensions.width; x++) {
            __grid[x] = new Array(__game._dimensions.height);
            for (var y = 0; y < __game._dimensions.height; y++) {
                __grid[x][y] = {type: 'empty'};
            }
        }

        this.getDynamicObjects().forEach(function (obj) {
            obj._destroy(true);
        });
        __dynamicObjects = [];
        __player = null;

        for (var i = 0; i < __intervals.length; i++) {
            clearInterval(__intervals[i]);
        }
        __intervals = [];

        __lines = [];
        __dom = '';
        this._overrideKeys = {};

        // preload stylesheet for DOM level
        $.get('styles/dom.css', function (css) {
            __domCSS = css;
        });

        this.finalLevel = false;
        this._callbackValidationFailed = false;
    };

    this._ready = function () {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._ready()';}

        var map = this;

        // set refresh rate if one is specified
        if (__refreshRate) {
            map.startTimer(function () {
                // refresh the map
                map.refresh();

                // rewrite status
                if (map._status) {
                    map.writeStatus(map._status);
                }

                // check for nonstandard victory condition
                if (typeof(__game.objective) === 'function' && __game.objective(map)) {
                    __game._moveToNextLevel();
                }
            }, __refreshRate);
        }
    };

    this._setProperties = function (mapProperties) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._setProperties()';}

        // set defaults
        this._properties = {};
        __allowOverwrite = false;
        __keyDelay = 0;
        __refreshRate = null;

        // now set any properties that were passed in
        if (mapProperties) {
            this._properties = mapProperties;

            if (mapProperties.allowOverwrite === true) {
                __allowOverwrite = true;
            }

            if (mapProperties.keyDelay) {
                __keyDelay = mapProperties.keyDelay;
            }

            if (mapProperties.refreshRate) {
                __refreshRate = mapProperties.refreshRate;
            }
        }
    };

    this._canMoveTo = function (x, y, myType) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._canMoveTo()';}

        var x = Math.floor(x); var y = Math.floor(y);

        if (x < 0 || x >= __game._dimensions.width || y < 0 || y >= __game._dimensions.height) {
            return false;
        }

        // look for static objects that can serve as obstacles
        var objType = __grid[x][y].type;
        var object = __objectDefinitions[objType];
        if (object.impassable) {
            if (myType && object.passableFor && object.passableFor.indexOf(myType) > -1) {
                // this object is of a type that can pass the obstacle
                return true;
            } else if (typeof object.impassable === 'function') {
                // the obstacle is impassable only in certain circumstances
                try {
                    return this._validateCallback(function () {
                        return !object.impassable(__player, object);
                    });
                } catch (e) {
                    display.writeStatus(e.toString());
                }
            } else {
                // the obstacle is always impassable
                return false;
            }
        } else if (myType && object.impassableFor && object.impassableFor.indexOf(myType) > -1) {
            // this object is of a type that cannot pass the obstacle
            return false;
        } else {
            // no obstacle
            return true;
        }
    };

    // Returns the object of the given type closest to target coordinates
    this._findNearestToPoint = function (type, targetX, targetY) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._findNearestToPoint()';}

        var foundObjects = [];

        // look for static objects
        for (var x = 0; x < this.getWidth(); x++) {
            for (var y = 0; y < this.getHeight(); y++) {
                if (__grid[x][y].type === type) {
                    foundObjects.push({x: x, y: y});
                }
            }
        }

        // look for dynamic objects
        for (var i = 0; i < this.getDynamicObjects().length; i++) {
            var object = this.getDynamicObjects()[i];
            if (object.getType() === type) {
                foundObjects.push({x: object.getX(), y: object.getY()});
            }
        }

        // look for player
        if (type === 'player') {
            foundObjects.push({x: __player.getX(), y: __player.getY()});
        }

        var dists = [];
        for (var i = 0; i < foundObjects.length; i++) {
            var obj = foundObjects[i];
            dists[i] = Math.sqrt(Math.pow(targetX - obj.x, 2) + Math.pow(targetY - obj.y, 2));

            // We want to find objects distinct from ourselves
            if (dists[i] === 0) {
                dists[i] = 999;
            }
        }

        var minDist = Math.min.apply(Math, dists);
        var closestTarget = foundObjects[dists.indexOf(minDist)];

        return closestTarget;
    };

    this._isPointOccupiedByDynamicObject = function (x, y) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._isPointOccupiedByDynamicObject()';}

        var x = Math.floor(x); var y = Math.floor(y);

        for (var i = 0; i < this.getDynamicObjects().length; i++) {
            var object = this.getDynamicObjects()[i];
            if (object.getX() === x && object.getY() === y) {
                return true;
            }
        }
        return false;
    };

    this._findDynamicObjectAtPoint = function (x, y) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._findDynamicObjectAtPoint()';}

        var x = Math.floor(x); var y = Math.floor(y);

        for (var i = 0; i < this.getDynamicObjects().length; i++) {
            var object = this.getDynamicObjects()[i];
            if (object.getX() === x && object.getY() === y) {
                return object;
            }
        }
        return false;
    };

    this._moveAllDynamicObjects = function () {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._moveAllDynamicObjects()';}

        // the way things work right now, teleporters must take precedence
        // over all other objects -- otherwise, pointers.jsx will not work
        // correctly.
        // TODO: make this not be the case

        // "move" teleporters
        this.getDynamicObjects().filter(function (object) {
            return (object.getType() === 'teleporter');
        }).forEach(function(object) {
            object._onTurn();
        });

        // move everything else
        this.getDynamicObjects().filter(function (object) {
            return (object.getType() !== 'teleporter');
        }).forEach(function(object) {
            object._onTurn();
        });

        // refresh only at the end
        this.refresh();
    };

    this._removeItemFromMap = function (x, y, klass) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._removeItemFromMap()';}

        var x = Math.floor(x); var y = Math.floor(y);

        if (__grid[x][y].type === klass) {
            __grid[x][y].type = 'empty';
        }
    };

    this._reenableMovementForPlayer = function (player) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._reenableMovementForPlayer()';}

        if (!this._callbackValidationFailed) {
            setTimeout(function () {
                player._canMove = true;
            }, __keyDelay);
        }
    };

    this._hideChapter = function() {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._hideChapter()';}

        // start fading out chapter immediately
        // unless it's a death message, in which case wait 2.5 sec
        clearInterval(__chapterHideTimeout);
        __chapterHideTimeout = setTimeout(function () {
            $('#chapter').fadeOut(1000);
        }, $('#chapter').hasClass('death') ? 2500 : 0);

        // also, clear any status text if map is refreshing automatically (e.g. boss level)
        this._status = '';
    };

    this._refreshDynamicObjects = function() {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._refreshDynamicObjects()';}

        __dynamicObjects = __dynamicObjects.filter(function (obj) { return !obj.isDestroyed(); });
    };

    this._countTimers = function() {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._countTimers()';}

        return __intervals.length;
    }

    /* (unexposed) wrappers for game methods */

    this._startOfStartLevelReached = function() {
        __game._startOfStartLevelReached = true;
    };

    this._endOfStartLevelReached = function() {
        __game._endOfStartLevelReached = true;
    };

    this._playSound = function (sound) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._playSound()';}

        __game.sound.playSound(sound);
    };

    this._validateCallback = function (callback) {
        if (__game._isPlayerCodeRunning()) { throw _('Forbidden method call: ') + 'map._validateCallback()';}

        return __game.validateCallback(callback);
    };

    /* exposed methods */

    this.refresh = wrapExposedMethod(function () {
        if (__dom) {
            this._display.clear();

            var domHTML = __dom[0].outerHTML
                .replace(/"/g, "'")
                .replace(/<hr([^>]*)>/g, '<hr $1 />')
                .replace(/<img([^>]*)>/g, '<img $1 />');

            this._display.renderDom(domHTML, __domCSS);
        } else {
            this._display.drawAll(this);
        }
        __game.drawInventory();
    }, this);

    this.countObjects = wrapExposedMethod(function (type) {
        var count = 0;

        // count static objects
        for (var x = 0; x < this.getWidth(); x++) {
            for (var y = 0; y < this.getHeight(); y++) {
                if (__grid[x][y].type === type) {
                    count++;
                }
            }
        }

        // count dynamic objects
        this.getDynamicObjects().forEach(function (obj) {
            if (obj.getType() === type) {
                count++;
            }
        })

        return count;
    }, this);

    this.placeObject = wrapExposedMethod(function (x, y, type) {
        var x = Math.floor(x); var y = Math.floor(y);

        if (!__objectDefinitions[type]) {
            throw _("There is no type of object named ") + type + _("!");
        }

        if (__player && x == __player.getX() && y == __player.getY()) {
            throw _("Can't place object on top of player!");
        }

        if (typeof(__grid[x]) === 'undefined' || typeof(__grid[x][y]) === 'undefined') {
            return;
            // throw "Not a valid location to place an object!";
        }

        if (__objectDefinitions[type].type === 'dynamic') {
            // dynamic object
            __dynamicObjects.push(new DynamicObject(this, type, x, y, __game));
        } else {
            // static object
            if (__grid[x][y].type === 'empty' || __grid[x][y].type === type || __allowOverwrite) {
                __grid[x][y].type = type;
            } else {
                throw _("There is already an object at") + " (" + x + ", " + y + ")" + _("!");
            }
        }
    }, this);

    this.placePlayer = wrapExposedMethod(function (x, y) {
        var x = Math.floor(x); var y = Math.floor(y);

        if (__player) {
            throw _("Can't place player twice!");
        }

        __player = new __game._playerPrototype(x, y, this, __game);
        this._display.drawAll(this);
    }, this);

    this.createFromGrid = wrapExposedMethod(function (grid, tiles, xOffset, yOffset) {
        for (var y = 0; y < grid.length; y++) {
            var line = grid[y];
            for (var x = 0; x < line.length; x++) {
                var tile = line[x];
                var type = tiles[tile];
                if (type === 'player') {
                    this.placePlayer(x + xOffset, y + yOffset);
                } else if (type) {
                    this.placeObject(x + xOffset, y + yOffset, type);
                }
            }
        }
    }, this);

    this.setSquareColor = wrapExposedMethod(function (x, y, bgColor) {
        var x = Math.floor(x); var y = Math.floor(y);

        __grid[x][y].bgColor = bgColor;
    }, this);

    this.defineObject = wrapExposedMethod(function (name, properties) {
        if (__objectDefinitions[name]) {
            throw _("There is already a type of object named ") + name + _("!");
        }

        if (properties.interval && properties.interval < 100) {
            throw _("defineObject(): minimum interval is 100 milliseconds");
        }

        __objectDefinitions[name] = properties;
    }, this);

    this.getObjectTypeAt = wrapExposedMethod(function (x, y) {
        var x = Math.floor(x); var y = Math.floor(y);

        // Bazek: We should always check, if the coordinates are inside of map!
        if (x >= 0 && x < this.getWidth() && y >= 0 && y < this.getHeight())
            return __grid[x][y].type;
        else
            return '';
    }, this);

    this.getAdjacentEmptyCells = wrapExposedMethod(function (x, y) {
        var x = Math.floor(x); var y = Math.floor(y);

        var map = this;
        var actions = ['right', 'down', 'left', 'up'];
        var adjacentEmptyCells = [];
        $.each(actions, function (i, action) {
            switch (actions[i]) {
                case 'right':
                    var child = [x+1, y];
                    break;
                case 'left':
                    var child = [x-1, y];
                    break;
                case 'down':
                    var child = [x, y+1];
                    break;
                case 'up':
                    var child = [x, y-1];
                    break;
            }
            // Bazek: We need to check, if child is inside of map!
            var childInsideMap = child[0] >= 0 && child[0] < map.getWidth() && child[1] >= 0 && child[1] < map.getHeight();
            if (childInsideMap && map.getObjectTypeAt(child[0], child[1]) === 'empty') {
                adjacentEmptyCells.push([child, action]);
            }
        });
        return adjacentEmptyCells;
    }, this);

    this.startTimer = wrapExposedMethod(function(timer, delay) {
        if (!delay) {
            throw "startTimer(): " + _("delay not specified")
        } else if (delay < 25) {
            throw "startTimer(): " + _("minimum delay is 25 milliseconds");
        }

        __intervals.push(setInterval(timer, delay));
    }, this);

    this.timeout = wrapExposedMethod(function(timer, delay) {
        if (!delay) {
            throw "timeout(): " + _("delay not specified");
        } else if (delay < 25) {
            throw "timeout(): " + _("minimum delay is 25 milliseconds");
        }

        __intervals.push(setTimeout(timer, delay));
    }, this);

    this.displayChapter = wrapExposedMethod(function(chapterName, cssClass) {
        if (__game._displayedChapters.indexOf(chapterName) === -1) {
            $('#chapter').html(chapterName.replace("\n","<br>"));
            $('#chapter').removeClass().show();

            if (cssClass) {
                $('#chapter').addClass(cssClass);
            } else {
                __game._displayedChapters.push(chapterName);
            }

            setTimeout(function () {
                $('#chapter').fadeOut();
            }, 5 * 1000);
        }
    }, this);

    this.writeStatus = wrapExposedMethod(function(status) {
        this._status = status;

        if (__refreshRate) {
            // write the status immediately
            display.writeStatus(status);
        } else {
            // wait 100 ms for redraw reasons
            setTimeout(function () {
                display.writeStatus(status);
            }, 100);
        }
    }, this);

    // used by validators
    // returns true iff called at the start of the level (that is, on DummyMap)
    // returns false iff called by validateCallback (that is, on the actual map)
    this.isStartOfLevel = wrapExposedMethod(function () {
        return this._dummy;
    }, this);

    /* canvas-related stuff */

    this.getCanvasContext = wrapExposedMethod(function() {
        return $('#drawingCanvas')[0].getContext('2d');
    }, this);

    this.getCanvasCoords = wrapExposedMethod(function(obj) {
        return {
            x: (obj.getX() + 0.5) * 600 / __game._dimensions.width,
            y: (obj.getY() + 0.5) * 500 / __game._dimensions.height
        };
    }, this);

    this.getRandomColor = wrapExposedMethod(function(start, end) {
        var mean = [
            Math.floor((start[0] + end[0]) / 2),
            Math.floor((start[1] + end[1]) / 2),
            Math.floor((start[2] + end[2]) / 2)
        ];
        var std = [
            Math.floor((end[0] - start[0]) / 2),
            Math.floor((end[1] - start[1]) / 2),
            Math.floor((end[2] - start[2]) / 2)
        ];
        return ROT.Color.toHex(ROT.Color.randomize(mean, std));
    }, this);

    this.createLine = wrapExposedMethod(function(start, end, callback) {
        __lines.push({'start': start, 'end': end, 'callback': callback});
    }, this);

    this.testLineCollisions = wrapExposedMethod(function(player) {
        var threshold = 7;
        var playerCoords = this.getCanvasCoords(player);
        __lines.forEach(function (line) {
            if (pDistance(playerCoords.x, playerCoords.y,
                    line.start[0], line.start[1],
                    line.end[0], line.end[1]) < threshold) {
                line.callback(__player);
            }
        })
    }, this);

    /* for DOM manipulation level */

    this.getDOM = wrapExposedMethod(function () {
        return __dom;
    })

    this.createFromDOM = wrapExposedMethod(function(dom) {
        __dom = dom;
    }, this);

    this.updateDOM = wrapExposedMethod(function(dom) {
        __dom = dom;
    }, this);

    this.overrideKey = wrapExposedMethod(function(keyName, callback) {
        this._overrideKeys[keyName] = callback;
    }, this);

    /* validators */

    this.validateAtLeastXObjects = wrapExposedMethod(function(num, type) {
        var count = this.countObjects(type);
        if (count < num) {
            throw _('Not enough ') + type + _('s on the map! Expected: ') + num + _(', found: ') + count;
        }
    }, this);

    this.validateAtMostXObjects = wrapExposedMethod(function(num, type) {
        var count = this.countObjects(type);
        if (count > num) {
            throw _('Too many ') + type + _('s on the map! Expected: ') + num + _(', found: ') + count;
        }
    }, this);

    this.validateExactlyXManyObjects = wrapExposedMethod(function(num, type) {
        var count = this.countObjects(type);
        if (count != num) {
            throw _('Wrong number of ') + type + _('s on the map! Expected: ') + num + _(', found: ') + count;
        }
    }, this);

    this.validateAtMostXDynamicObjects = wrapExposedMethod(function(num) {
        var count = this.getDynamicObjects().length;
        if (count > num) {
            throw 'Too many dynamic objects on the map! Expected: ' + num + ', found: ' + count;
        }
    }, this);

    this.validateNoTimers = wrapExposedMethod(function() {
        var count = this._countTimers();
        if (count > 0) {
            throw _('Too many timers set on the map! Expected: 0, found: ') + count;
        }
    }, this);

    this.validateAtLeastXLines = wrapExposedMethod(function(num) {
        var count = this._getLines().length;
        if (count < num) {
            throw _('Not enough lines on the map! Expected: ') + num + _(', found: ') + count;
        }
    }, this);

    /* initialization */

    this._reset();
}
/*
Objects can have the following parameters:
    color: '#fff' by default
    impassable: true if it blocks the player from movement (false by default)
    onCollision: function (player, game) called when player moves over the object
    onPickUp: function (player, game) called when player picks up the item
    symbol: Unicode character representing the object
    type: 'item' or null
*/

Game.prototype.getListOfObjects = function () {
    var game = this;
    return {
        // special

        'empty' : {
            'symbol': ' ',
            'impassableFor': ['raft']
        },

        'player' : {
            'symbol': '@',
            'color': '#0f0'
        },

        'exit' : {
            'symbol' : String.fromCharCode(0x2395), // ⎕
            'color': '#0ff',
            'onCollision': function (player) {
                if (!game.map.finalLevel) {
                    game._moveToNextLevel();
                }
            }
        },

        // obstacles

        'block': {
            'symbol': '#',
            'color': '#999',
            'impassable': true
        },

        'tree': {
            'symbol': '♣',
            'color': '#080',
            'impassable': true
        },

        'mine': {
            'symbol': ' ',
            'onCollision': function (player) {
                player.killedBy(_('a hidden mine'));
            }
        },

        'trap': {
            'type': 'dynamic',
            'symbol': '*',
            'color': '#f00',
            'onCollision': function (player, me) {
                player.killedBy(_('a trap'));
            },
            'behavior': null
        },

        'teleporter': {
            'type': 'dynamic',
            'symbol' : String.fromCharCode(0x2395), // ⎕
            'color': '#f0f',
            'onCollision': function (player, me) {
                if (!player._hasTeleported) {
                    game._callUnexposedMethod(function () {
                        player._moveTo(me.target);
                    });
                }
                player._hasTeleported = true;
            },
            'behavior': null
        },

        // items

        'computer': {
            'type': 'item',
            'symbol': String.fromCharCode(0x2318), // ⌘
            'color': '#ccc',
            'onPickUp': function (player) {
                $('#editorPane').fadeIn();
                game.editor.refresh();
                game.map.writeStatus(_('You have picked up the computer!'));
            },
            'onDrop': function () {
                $('#editorPane').hide();
            }
        },

        'phone': {
            'type': 'item',
            'symbol': String.fromCharCode(0x260E), // ☎
            'onPickUp': function (player) {
                game.map.writeStatus(_('You have picked up the function phone!'));
                $('#phoneButton').show();
            },
            'onDrop': function () {
                $('#phoneButton').hide();
            }
        },

        'redKey': {
            'type': 'item',
            'symbol': 'k',
            'color': 'red',
            'onPickUp': function (player) {
                game.map.writeStatus(_('You have picked up a red key!'));
            }
        },

        'greenKey': {
            'type': 'item',
            'symbol': 'k',
            'color': '#0f0',
            'onPickUp': function (player) {
                game.map.writeStatus(_('You have picked up a green key!'));
            }
        },

        'blueKey': {
            'type': 'item',
            'symbol': 'k',
            'color': '#06f',
            'onPickUp': function (player) {
                game.map.writeStatus(_('You have picked up a blue key!'));
            }
        },

        'yellowKey': {
            'type': 'item',
            'symbol': 'k',
            'color': 'yellow',
            'onPickUp': function (player) {
                game.map.writeStatus(_('You have picked up a yellow key!'));
            }
        },

        'theAlgorithm': {
            'type': 'item',
            'symbol': 'A',
            'color': 'white',
            'onPickUp': function (player) {
                game.map.writeStatus(_('You have picked up the Algorithm!'));
            },
            'onDrop': function () {
                game.map.writeStatus(_('You have lost the Algorithm!'));
            }
        }
    };
};
function Player(x, y, __map, __game) {
    /* private variables */

    var __x = x;
    var __y = y;
    var __color = "#0f0";
    var __lastMoveDirection = '';

    var __display = __map._display;

    /* unexposed variables */

    this._canMove = false;

    /* wrapper */

    function wrapExposedMethod(f, player) {
        return function () {
            var args = arguments;
            return __game._callUnexposedMethod(function () {
                return f.apply(player, args);
            });
        };
    };

    /* exposed getters/setters */

    this.getX = function () { return __x; };
    this.getY = function () { return __y; };
    this.getColor = function () { return __color; };
    this.getLastMoveDirection = function() { return __lastMoveDirection; };

    this.setColor = wrapExposedMethod(function (c) {
        __color = c;
        __display.drawAll(__map);
    });

    /* unexposed methods */

    // (used for teleporters)
    this._moveTo = function (dynamicObject) {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: player._moveTo()';}

        // no safety checks or anything
        // this method is about as safe as a war zone
        __x = dynamicObject.getX();
        __y = dynamicObject.getY();
        __display.drawAll(__map);

        // play teleporter sound
        __game.sound.playSound('blip');
    };

    this._afterMove = function (x, y) {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: player._afterMove()';}

        var player = this;

        this._hasTeleported = false; // necessary to prevent bugs with teleportation

        __map._hideChapter();
        __map._moveAllDynamicObjects();

        var onTransport = false;

        // check for collision with transport object
        for (var i = 0; i < __map.getDynamicObjects().length; i++) {
            var object = __map.getDynamicObjects()[i];
            if (object.getX() === x && object.getY() === y) {
                var objectDef = __map._getObjectDefinition(object.getType());
                if (objectDef.transport) {
                    onTransport = true;
                }
            }
        }

        // check for collision with static object UNLESS
        // we are on a transport
        if (!onTransport) {
            var objectName = __map._getGrid()[x][y].type;
            var objectDef = __map._getObjectDefinition(objectName);
            if (objectDef.type === 'item') {
                this._pickUpItem(objectName, objectDef);
            } else if (objectDef.onCollision) {
                __game.validateCallback(function () {
                    objectDef.onCollision(player, __game);
                }, false, true);
            }
        }

        // check for collision with any lines on the map
        __map.testLineCollisions(this);

        // check for nonstandard victory condition (e.g. DOM level)
        if (typeof(__game.objective) === 'function' && __game.objective(__map)) {
            __game._moveToNextLevel();
        }
    };

    this._pickUpItem = function (itemName, object) {
        if (__game._isPlayerCodeRunning()) { throw 'Forbidden method call: player._pickUpItem()';}

        var player = this;

        __game.addToInventory(itemName);
        __map._removeItemFromMap(__x, __y, itemName);
        __map.refresh();
        __game.sound.playSound('pickup');

        if (object.onPickUp) {
            __game.validateCallback(function () {
                setTimeout(function () {
                    object.onPickUp(player);
                }, 100);
                // timeout is so that written text is not immediately overwritten
                // TODO: play around with Display.writeStatus so that this is
                // not necessary
            });
        }
    };

    /* exposed methods */

    this.atLocation = wrapExposedMethod(function (x, y) {
        return (__x === x && __y === y);
    }, this);

    this.move = wrapExposedMethod(function (direction, fromKeyboard) {
        if (!this._canMove) { // mainly for key delay
            return false;
        }

        if (__map._overrideKeys[direction] && fromKeyboard) {
            try {
                __game.validateCallback(__map._overrideKeys[direction], true);

                __map.refresh();
                this._canMove = false;
                __map._reenableMovementForPlayer(this); // (key delay can vary by map)
                this._afterMove(__x, __y);
            } catch (e) {
            }

            return;
        }

        var new__x;
        var new__y;
        if (direction === 'up') {
            new__x = __x;
            new__y = __y - 1;
        }
        else if (direction === 'down') {
            new__x = __x;
            new__y = __y + 1;
        }
        else if (direction === 'left') {
            new__x = __x - 1;
            new__y = __y;
        }
        else if (direction === 'right') {
            new__x = __x + 1;
            new__y = __y;
        }
        else if (direction === 'rest') {
            new__x = __x;
            new__y = __y;
        }
        else if (direction === 'funcPhone') {
            __game.usePhone();
            return;
        }

        if (__map._canMoveTo(new__x, new__y)) {
            __x = new__x;
            __y = new__y;

            __map.refresh();

            this._canMove = false;

            __lastMoveDirection = direction;
            this._afterMove(__x, __y);

            __map._reenableMovementForPlayer(this); // (key delay can vary by map)
        } else {
            // play bump sound
            __game.sound.playSound('select');
        }
    }, this);

    this.killedBy = wrapExposedMethod(function (killer) {
        __game.sound.playSound('hurt');
        __game._restartLevel();

        __map.displayChapter('You have been killed by \n' + killer + '!', 'death');
    }, this);

    this.hasItem = wrapExposedMethod(function (itemName) {
        return __game.checkInventory(itemName);
    }, this);

    this.removeItem = wrapExposedMethod(function (itemName) {
        var object = __game.objects[itemName];

        __game.removeFromInventory(itemName);
        __game.sound.playSound('blip');
    }, this);

    this.setPhoneCallback = wrapExposedMethod(function(func) {
        this._phoneFunc = func;
    }, this);
}
Game.prototype.reference = {
    'canvas.beginPath': {
        'name': 'canvasContext.beginPath()',
        'category': 'canvas',
        'type': 'method',
        'description': _('Begins drawing a new shape.')
    },
    'canvas.lineTo': {
        'name': 'canvasContext.lineTo(x, y)',
        'category': 'canvas',
        'type': 'method',
        'description': _('Sets the end coordinates of a line.')
    },
    'canvas.lineWidth': {
        'name': 'canvasContext.lineWidth',
        'category': 'canvas',
        'type': 'property',
        'description': _('Determines the width of the next lines drawn.')
    },
    'canvas.moveTo': {
        'name': 'canvasContext.moveTo(x, y)',
        'category': 'canvas',
        'type': 'method',
        'description': _('Sets the start coordinates of a line.')
    },
    'canvas.stroke': {
        'name': 'canvasContext.stroke()',
        'category': 'canvas',
        'type': 'method',
        'description': _('Draws a line whose coordinates have been defined by <b>lineTo</b> and <b>moveTo</b>.')
    },
    'canvas.strokeStyle': {
        'name': 'canvasContext.strokeStyle',
        'category': 'canvas',
        'type': 'property',
        'description': _('Determines the color (and, optionally, other properties) of the next lines drawn.')
    },

    'global.$': {
        'name': '$(html)',
        'category': 'global',
        'type': 'method',
        'description': _('When passed an HTML string, $ returns a corresponding <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance.')
    },
    'global.objective': {
        'name': 'objective(map)',
        'category': 'global',
        'type': 'method',
        'description': _('The player exits the level as soon as this method returns true.')
    },
    'global.onExit': {
        'name': 'onExit(map)',
        'category': 'global',
        'type': 'method',
        'description': _('The player can exit the level only if this method returns true.')
    },
    'global.startLevel': {
        'name': 'startLevel(map)',
        'category': 'global',
        'type': 'method',
        'description': _('This method is called when the level loads.')
    },
    'global.validateLevel': {
        'name': 'validateLevel(map)',
        'category': 'global',
        'type': 'method',
        'description': _('The level can be loaded only if this method returns true.')
    },
    'ROT.Map.DividedMaze': {
        'name': 'ROT.Map.DividedMaze(width, height)',
        'category': 'global',
        'type': 'method',
        'description': _('Instantiates a Maze object of given width and height. The Maze object can create a maze by calling maze.create(callback), where the callback is a function that accepts (x, y, mapValue) and performs some action for each point in a grid, where mapValue is a boolean that is true if and only if the given point is part of the maze.')
    },

    'jQuery.addClass': {
        'name': 'jQueryObject.addClass(class)',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Adds the given CSS class to the DOM element(s) specified by the jQuery object.')
    },
    'jQuery.children': {
        'name': 'jQueryObject.children()',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Returns the children of the DOM element specified by the jQuery object, as a jQuery array.')
    },
    'jQuery.find': {
        'name': 'jQueryObject.find(selector)',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Returns all elements in the DOM tree specified by the jQuery object that match the given CSS selector, as a jQuery array.')
    },
    'jQuery.first': {
        'name': 'jQueryObject.first()',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Returns the first element of a jQuery array.')
    },
    'jQuery.hasClass': {
        'name': 'jQueryObject.hasClass(class)',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Returns true if and only if the DOM element specified by the jQuery object has the given CSS class.')
    },
    'jQuery.length': {
        'name': 'jQueryObject.length',
        'category': 'jQuery',
        'type': 'property',
        'description': _('Returns the number of elements in a jQuery array.')
    },
    'jQuery.next': {
        'name': 'jQueryObject.next()',
        'category': 'jQuery',
        'type': 'property',
        'description': _('Returns the next sibling of the DOM element specified by the jQuery object.')
    },
    'jQuery.parent': {
        'name': 'jQueryObject.parent()',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Returns the parent of the DOM element specified by the jQuery object.')
    },
    'jQuery.prev': {
        'name': 'jQueryObject.prev()',
        'category': 'jQuery',
        'type': 'property',
        'description': _('Returns the previous sibling of the DOM element specified by the jQuery object.')
    },
    'jQuery.removeClass': {
        'name': 'jQueryObject.removeClass(class)',
        'category': 'jQuery',
        'type': 'method',
        'description': _('Removes the given CSS class from the DOM element(s) specified by the jQuery object.')
    },

    'map.countObjects': {
        'name': 'map.countObjects(objectType)',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the number of objects of the given type on the map.')
    },
    'map.createFromDOM': {
        'name': 'map.createFromDOM($html)',
        'category': 'map',
        'type': 'method',
        'description': _('Creates the map from a <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance, rendering the map as a DOM (document object model) rather than a grid.')
    },
    'map.createFromGrid': {
        'name': 'map.createFromGrid(grid, tiles, xOffset, yOffset)',
        'category': 'map',
        'type': 'method',
        'description': _('Places objects on the map corresponding to their position on the grid (an array of strings), with mappings as defined in tiles (a dictionary of character -> object type mappings), at the given offset from the top-left corner of the map.')
    },
    'map.createLine': {
        'name': 'map.createLine([x1, x2], [y1 y2], callback)',
        'category': 'map',
        'type': 'method',
        'description': _('Places a line on the map between the given points, that triggers the given callback when the player touches it. (Note that the line is invisible: createLine does <i>not</i> draw anything to the <a onclick="$(\'#helpPaneSidebar .category#canvas\').click();">canvas</a>.)')
    },
    'map.displayChapter': {
        'name': 'map.displayChapter(chapter)',
        'category': 'map',
        'type': 'method',
        'description': _('Displays the given chapter name.')
    },
    'map.defineObject': {
        'name': 'map.defineObject(type, properties)',
        'category': 'map',
        'type': 'method',
        'description': _('Defines a new type of <a onclick="$(\'#helpPaneSidebar .category#object\').click();">object</a> with the given properties. Note that type definitions created with map.defineObject only persist in the scope of the level.')
    },
    'map.getAdjacentEmptyCells': {
        'name': 'map.getAdjacentEmptyCells(x, y)',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the empty cells adjacent to the cell at the given coordinates (if any), as an array of items of the form <i>[[x, y], direction]</i>, where (x, y) are the coordinates of each empty cell, and <i>direction</i> is the direction from the given cell to each empty cell ("left", "right", "up", or "down").')
    },
    'map.getCanvasContext': {
        'name': 'map.getCanvasContext()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the 2D drawing context of the <a onclick="$(\'#helpPaneSidebar .category#canvas\').click();">canvas</a> overlaying the map.')
    },
    'map.getCanvasCoords': {
        'name': 'map.getCanvasCoords(obj)',
        'category': 'map',
        'type': 'method',
        'description': _('Returns {"x": x, "y": y}, where x and y are the respective coordinates of the given object on the canvas returned by map.getCanvasContext().')
    },
    'map.getDOM': {
        'name': 'map.getDOM()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance representing the map.')
    },
    'map.getDynamicObjects': {
        'name': 'map.getDynamicObjects()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns all dynamic objects currently on the map.')
    },
    'map.getHeight': {
        'name': 'map.getHeight()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the height of the map, in cells.')
    },
    'map.getObjectTypeAt': {
        'name': 'map.getObjectTypeAt(x, y)',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the type of the object at the given coordinates (or "empty" if there is no object there).')
    },
    'map.getPlayer': {
        'name': 'map.getPlayer()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the Player object.')
    },
    'map.getRandomColor': {
        'name': 'map.getRandomColor(start, end)',
        'category': 'map',
        'type': 'method',
        'description': _('Returns a hexadecimal string representing a random color in between the start and end colors. The start and end colors must be arrays of the form [R, G, B], where R, G, and B are decimal integers.')
    },
    'map.getWidth': {
        'name': 'map.getWidth()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns the width of the map, in cells.')
    },
    'map.isStartOfLevel': {
        'name': 'map.isStartOfLevel()',
        'category': 'map',
        'type': 'method',
        'description': _('Returns true if called while a level is starting.')
    },
    'map.overrideKey': {
        'name': 'map.overrideKey(key, callback)',
        'category': 'map',
        'type': 'method',
        'description': _('Overrides the action performed by pressing the given key (<i>left</i>, <i>right</i>, <i>up</i>, or <i>down</i>).')
    },
    'map.placeObject': {
        'name': 'map.placeObject(x, y, objectType)',
        'category': 'map',
        'type': 'method',
        'description': _('Places an object of the given type at the given coordinates.')
    },
    'map.placePlayer': {
        'name': 'map.placePlayer(x, y)',
        'category': 'map',
        'type': 'method',
        'description': _('Places the player at the given coordinates.')
    },
    'map.setSquareColor': {
        'name': 'map.setSquareColor(x, y, color)',
        'category': 'map',
        'type': 'method',
        'description': _('Sets the background color of the given square.')
    },
    'map.setSquareColor': {
        'name': 'map.setSquareColor(x, y, color)',
        'category': 'map',
        'type': 'method',
        'description': _('Sets the background color of the given square.')
    },
    'map.startTimer': {
        'name': 'map.startTimer(callback, delay)',
        'category': 'map',
        'type': 'method',
        'description': _('Starts a timer (c.f. setInterval) of the given delay, in milliseconds (minimum 25 ms).')
    },
    'map.updateDOM': {
        'name': 'map.updateDOM($html)',
        'category': 'map',
        'type': 'method',
        'description': _('Updates the <a onclick="$(\'#helpPaneSidebar .category#jQuery\').click();">jQuery</a> instance representing the map.')
    },
    'map.validateAtLeastXLines': {
        'name': 'map.validateAtLeastXObjects(num)',
        'category': 'map',
        'type': 'method',
        'description': _('Raises an exception if there are not at least num lines (created by map.createLine) on the map.')
    },
    'map.validateAtLeastXObjects': {
        'name': 'map.validateAtLeastXObjects(num, objectType)',
        'category': 'map',
        'type': 'method',
        'description': _('Raises an exception if there are not at least num objects of type objectType on the map.')
    },
    'map.validateAtMostXDynamicObjects': {
        'name': 'map.validateExactlyXManyObjects(num)',
        'category': 'map',
        'type': 'method',
        'description': _('Raises an exception if there are more than num dynamic objects on the map.')
    },
    'map.validateExactlyXManyObjects': {
        'name': 'map.validateExactlyXManyObjects(num, objectType)',
        'category': 'map',
        'type': 'method',
        'description': _('Raises an exception if there are not exactly num objects of type objectType on the map.')
    },
    'map.validateNoTimers': {
        'name': 'map.validateNoTimers()',
        'category': 'map',
        'type': 'method',
        'description': _('Raises an exception if there are any timers currently set with map.startTimer.')
    },
    'map.writeStatus': {
        'name': 'map.writeStatus(message)',
        'category': 'map',
        'type': 'method',
        'description': _('Displays a message at the bottom of the map.')
    },

    'object.behavior': {
        'name': 'object.behavior = function (object)',
        'category': 'object',
        'type': 'property',
        'description': _('(For dynamic objects only.) The function that is executed each time it is this object\'s turn.')
    },
    'object.canMove': {
        'name': 'object.canMove(direction)',
        'category': 'object',
        'type': 'method',
        'description': _('(For dynamic objects only.) Returns true if (and only if) the object is able to move one square in the given direction, which can be "left", "right", "up", or "down".')
    },
    'object.color': {
        'name': 'object.color',
        'category': 'object',
        'type': 'property',
        'description': _('The color of the object\'s symbol on the map.')
    },
    'object.findNearest': {
        'name': 'object.findNearest(type)',
        'category': 'object',
        'type': 'method',
        'description': _('(For dynamic objects only.) Returns the x and y coordinates of the nearest object of the given type to this object, as a hash.')
    },
    'object.getX': {
        'name': 'object.getX()',
        'category': 'object',
        'type': 'method',
        'description': _('(For dynamic objects only.) Returns the x-coordinate of the object.')
    },
    'object.getY': {
        'name': 'object.getY()',
        'category': 'object',
        'type': 'method',
        'description': _('(For dynamic objects only.) Returns the y-coordinate of the object.')
    },
    'object.giveItemTo': {
        'name': 'object.giveItemTo(target, item)',
        'category': 'object',
        'type': 'method',
        'description': _('(For dynamic objects only.) Gives the given item to the target (generally, the player). Can only be done if the object and the player have just collided.')
    },
    'object.impassable': {
        'name': 'object.impassable = function (player, object)',
        'category': 'object',
        'type': 'property',
        'description': _('(For non-dynamic objects only.) The function that determines whether or not the player can pass through this object.')
    },
    'object.move': {
        'name': 'object.move(direction)',
        'category': 'object',
        'type': 'method',
        'description': _('(For dynamic objects only.) Moves the object one square in the given direction, which can be "left", "right", "up", or "down". An object can only move once per turn.')
    },
    'object.onCollision': {
        'name': 'object.onCollision = function (player)',
        'category': 'object',
        'type': 'property',
        'description': _('The function that is executed when this object touches the player.')
    },
    'object.onDestroy': {
        'name': 'object.onDestroy = function (object)',
        'category': 'object',
        'type': 'property',
        'description': _('(For dynamic objects only.) The function that is executed when this object is destroyed.')
    },
    'object.projectile': {
        'name': 'object.projectile',
        'category': 'object',
        'type': 'property',
        'description': _('(For dynamic objects only.) If true, this object destroys any dynamic object (or player) that it collides with, and is itself destroyed when it collides with anything.')
    },
    'object.pushable': {
        'name': 'object.pushable',
        'category': 'object',
        'type': 'property',
        'description': _('(For dynamic objects only.) If true, this object can be pushed by the player.')
    },
    'object.symbol': {
        'name': 'object.symbol',
        'category': 'object',
        'type': 'property',
        'description': _('The object\'s symbol on the map.')
    },
    'object.setTarget': {
        'name': 'object.setTarget()',
        'category': 'object',
        'type': 'method',
        'description': _('(For teleporters only.) Sets the destination of this teleporter.')
    },
    'object.type': {
        'name': 'object.type',
        'category': 'object',
        'type': 'property',
        'description': _('Can be "item", "dynamic", or none. If "dynamic", then this object can move on turns that run each time that the player moves. If "item", then this object can be picked up.')
    },

    'player.atLocation': {
        'name': 'player.atLocation(x, y)',
        'category': 'player',
        'type': 'method',
        'description': _('Returns true if and only if the player is at the given location.')
    },
    'player.getColor': {
        'name': 'player.getColor()',
        'category': 'player',
        'type': 'method',
        'description': _('Returns the color of the player.')
    },
    'player.getLastMoveDirection': {
        'name': 'player.getLastMoveDirection()',
        'category': 'player',
        'type': 'method',
        'description': _('Returns the direction of last move by the player.')
    },
    'player.getX': {
        'name': 'player.getX()',
        'category': 'player',
        'type': 'method',
        'description': _('Returns the x-coordinate of the player.')
    },
    'player.getY': {
        'name': 'player.getY()',
        'category': 'player',
        'type': 'method',
        'description': _('Returns the y-coordinate of the player.')
    },
    'player.hasItem': {
        'name': 'player.hasItem(itemType)',
        'category': 'player',
        'type': 'method',
        'description': _('Returns true if and only if the player has the given item.')
    },
    'player.killedBy': {
        'name': 'player.killedBy(text)',
        'category': 'player',
        'type': 'method',
        'description': _('Kills the player and displays the given text as the cause of death.')
    },
    'player.move': {
        'name': 'player.move(direction)',
        'category': 'player',
        'type': 'method',
        'description': _('Moves the player one square in the given direction. The player can only move once in a given function.')
    },
    'player.removeItem': {
        'name': 'player.removeItem(itemType)',
        'category': 'player',
        'type': 'method',
        'description': _('Removes the given item from the player\'s inventory, if the player has the given item.')
    },
    'player.setColor': {
        'name': 'player.setColor(color)',
        'category': 'player',
        'type': 'method',
        'description': _('Sets the color of the player.')
    },
    'player.setPhoneCallback': {
        'name': 'player.setPhoneCallback(callback)',
        'category': 'player',
        'type': 'method',
        'description': _('Sets the function that is executed when the player uses the function phone.')
    }
};
function Sound(source) {
    this.tracks = {
        'Adversity': {
            path: "music/Adversity.mp3",
            artist: "Seropard",
            title: _("Adversity"),
            url: "https://soundcloud.com/seropard"
        },
        'Beach Wedding Dance': {
            path: "music/Rolemusic_-_07_-_Beach_Wedding_Dance.mp3",
            artist: "Rolemusic",
            title: _("Beach Wedding Dance"),
            url: "https://soundcloud.com/rolemusic"
        },
        'BossLoop': {
            path: "music/Boss Loop 1.mp3",
            artist: "Essa",
            title: _("Boss Loop 1"),
            url: "http://www.youtube.com/user/Essasmusic"
        },
        'Brazil': {
            path: "music/Vernon_Lenoir_-_Brazilicon_alley.mp3",
            artist: "Vernon Lenoir",
            title: _("Brazilicon Alley"),
            url: "http://vernonlenoir.wordpress.com/"
        },
        'Chip': {
            path: "music/ThatAndyGuy-Chip-loop.mp3",
            artist: "That Andy Guy",
            title: _("Da Funk Do You Know 'bout Chip?"),
            url: "https://soundcloud.com/that-andy-guy"
        },
        'cloudy_sin': {
            path: "music/intricate_cloudy_sin.mp3",
            artist: "iNTRICATE",
            title: _("cloudy sin"),
            url: "https://soundcloud.com/stk13"
        },
        'Come and Find Me': {
            path: "music/Eric_Skiff_-_09_-_Come_and_Find_Me_-_B_mix.mp3",
            artist: "Eric Skiff",
            title: _("Come and Find Me"),
            url: "http://ericskiff.com/"
        },
        'coming soon': {
            path: "music/Fex_coming_soon.mp3",
            artist: "Fex",
            title: _("coming soon"),
            url: "http://artistserver.com/Fex"
        },
        'Comme Des Orages': {
            path: "music/Obsibilo_-_02_-_Comme_Des_Orages.mp3",
            artist: "Obsibilo",
            title: _("Comme Des Orages"),
            url: "http://freemusicarchive.org/music/Obsibilo/"
        },
        'conspiracy': {
            path: "music/conspiracy_bitcrusher_final.mp3",
            artist: "Mike and Alan",
            title: _("Conspiracy"),
            url: "https://www.facebook.com/MicAndAlan"
        },
        'Death Destroyer': {
            path: "music/BLEO_-_02_-_Death_Destroyer_Radio_Edit_feat_Rhinostrich.mp3",
            artist: "BLEO feat Rhinostrich",
            title: _("Death Destroyer (Radio Edit)"),
            url: "http://bleo.dummydrome.com/"
        },
        'GameScratch': {
            path: "music/DmitryMazin-GameScratch.mp3",
            artist: "Dmitry Mazin",
            title: _("Dynamic Punctuality"),
            url: "https://soundcloud.com/dmitry-mazin"
        },
        'gurh': {
            path: "music/gurh.mp3",
            artist: "Dmitry Mazin",
            title: _("Dmitry's Thing #2"),
            url: "https://soundcloud.com/dmitry-mazin"
        },
        'Messeah': {
            path: "music/RoccoW_-_Messeah.mp3",
            artist: "RoccoW",
            title: _("Messeah"),
            url: "https://soundcloud.com/roccow"
        },
        'Night Owl': {
            path: "music/Broke_For_Free_-_01_-_Night_Owl.mp3",
            artist: "Broke for Free",
            title: _("Night Owl"),
            url: "http://brokeforfree.com/"
        },
        'Obscure Terrain': {
            path: "music/Revolution_Void_-_08_-_Obscure_Terrain.mp3",
            artist: "Revolution Void",
            title: _("Obscure Terrain"),
            url: "http://revolutionvoid.com/"
        },
        'Searching': {
            path: "music/Eric_Skiff_-_06_-_Searching.mp3",
            artist: "Eric Skiff",
            title: _("Searching"),
            url: "http://ericskiff.com/"
        },
        'Slimeball Vomit': {
            path: "music/Various_Artists_-_15_-_Slimeball_vomit.mp3",
            artist: "Radio Scotvoid",
            title: _("Slimeball Vomit"),
            url: "https://soundcloud.com/radio-scotvoid"
        },
        'Soixante-8': {
            path: "music/Obsibilo_-_Soixante-8.mp3",
            artist: "Obsibilo",
            title: _("Soixante-8"),
            url: "http://freemusicarchive.org/music/Obsibilo/"
        },
        'Tart': {
            path: "music/BLEO_-_02_-_Tart_Pts_1__2_feat_KeFF.mp3",
            artist: "BLEO feat KeFF",
            title: _("Tart (Pts 1-2)"),
            url: "http://bleo.dummydrome.com/"
        },
        'The Green': {
            path: "music/Yonnie_The_Green.mp3",
            artist: "Jonathan Holliday",
            title: _("The Green"),
            url: "http://www.soundclick.com/bands/default.cfm?bandID=836578"
        },
        'The_Waves_Call_Her_Name': {
            path: "music/Sycamore_Drive_-_03_-_The_Waves_Call_Her_Name.mp3",
            artist: "Sycamore Drive",
            title: _("The Waves Call Her Name"),
            url: "http://sycamoredrive.bandcamp.com/"
        },
        'Y': {
            path: "music/Tortue_Super_Sonic_-_11_-_Y.mp3",
            artist: "Tortue Super Sonic",
            title: _("Y"),
            url: "https://soundcloud.com/tss-tortue-super-sonic"
        }
    };

    this.defaultTracks = [ // (not currently used, as all levels now have explicit tracks)
        'GameScratch',
        'Y',
        'Searching',
        'Soixante-8',
        'Come and Find Me'
    ];

    this.sources = {
        'local': '',
        'cloudfront': 'http://dk93t8qfl63bu.cloudfront.net/'
    };

    this.bgPlayerElt = $("#jquery_bgPlayer");
    this.soundPlayerElt = $("#jquery_soundPlayer");
    this.muted = false;
    this.currentLevelNum = -1;

    this.init = function() {
        var sound = this;

        this.source = this.sources[source];

        this.bgPlayerElt.jPlayer({
            wmode: "window",
            loop: true,
            swfPath: "lib/Jplayer.swf",
            volume: 0.6
        });
        this.soundPlayerElt.jPlayer({
            wmode: "window",
            loop: false,
            supplied: 'wav',
            swfPath: "lib/Jplayer.swf"
        });

        $(window).focus(function () {
            $(sound.bgPlayerElt).jPlayer('play');
        }).blur(function () {
            $(sound.bgPlayerElt).jPlayer('pause');
        });
    };

    this.playTrackByName = function (name) {
        this.trackForLevel = name;

        var track = this.tracks[name];
		var nowPlayingMsg = _('Now playing: "') + track.title;
        if (track.url) {
            nowPlayingMsg += '" - <a target="_blank" href="' + track.url + '">' + track.artist + '</a>';
        } else {
            nowPlayingMsg += '" - ' + track.artist;
        }
        $('#nowPlayingMsg').html(nowPlayingMsg);

        if (!this.muted && this.currentlyPlayingTrack !== name) {
            var path = this.source + track.path;
            $(this.bgPlayerElt).jPlayer('stop');
            $(this.bgPlayerElt).jPlayer("setMedia", {
                'mp3': path
            });
            $(this.bgPlayerElt).jPlayer('play');

            this.currentlyPlayingTrack = name;
        }
    };

    this.playTrackByNum = function (num) {
        this.playTrackByName(this.defaultTracks[(num - 1) % this.defaultTracks.length]);
    };

    this.playSound = function (name) {
        $(this.soundPlayerElt).jPlayer('stop');
        $(this.soundPlayerElt).jPlayer("setMedia", {
            'wav': 'sound/' + name + '.wav'
        });
        $(this.soundPlayerElt).jPlayer('play');
    };

    this.toggleSound = function() {
        if (this.muted) {
            this.bgPlayerElt.jPlayer('unmute');
            this.soundPlayerElt.jPlayer('unmute');
            $("#muteButton img").attr('src', 'images/mute-off.png');
            this.muted = false;
            this.playTrackByName(this.trackForLevel);
        } else {
            this.bgPlayerElt.jPlayer('mute');
            this.soundPlayerElt.jPlayer('mute');
            $("#muteButton img").attr('src', 'images/mute-on.png');
            this.muted = true;
        }
    };

    // constructor
    this.init();
}
Game.prototype.verbotenWords = [
    'eval', '.call', 'call(', 'apply', 'bind', // prevents arbitrary code execution
    'prototype', // prevents messing with prototypes
    'setTimeout', 'setInterval', // requires players to use map.startTimer() instead
    'requestAnimationFrame', 'mozRequestAnimationFrame', // (more timeout-like methods)
    'webkitRequestAnimationFrame', 'setImmediate', // (more timeout-like methods)
    'prompt', 'confirm', // prevents dialogs asking for user input
    'debugger', // prevents pausing execution
    'delete', // prevents removing items
    'atob(','btoa(',//prevent bypassing checks using Base64
    'Function(', //prevent constructing arbitrary function
    'constructor', // prevents retrieval of Function using an instance of it
    'window', // prevents setting "window.[...] = map", etc.
    'document', // in particular, document.write is dangerous
    'self.', 'self[', 'top.', 'top[', 'frames',  // self === top === frames === window
    'parent', 'content', // parent === content === window in most of cases
    'validate', 'onExit', 'objective', // don't let players rewrite these methods
    'this[' // prevents this['win'+'dow'], etc.
];
Game.prototype.allowedTime = 2000; // for infinite loop prevention

var DummyDisplay = function () {
    this.clear = function () {};
    this.drawAll = function () {};
    this.drawObject = function () {};
    this.drawText = function () {};
    this.writeStatus = function () {};
};

Game.prototype.validate = function(allCode, playerCode, restartingLevelFromScript) {
    var game = this;

    try {
        for (var i = 0; i < this.verbotenWords.length; i++) {
            var badWord = this.verbotenWords[i];
            if (playerCode.indexOf(badWord) > -1) {
                throw "You are not allowed to use '" + badWord + "'!";
            }
        }

        var dummyMap = new Map(new DummyDisplay(), this);
        dummyMap._dummy = true;
        dummyMap._setProperties(this.editor.getProperties().mapProperties);

        // modify the code to always check time to prevent infinite loops
        allCode = allCode.replace(/\)\s*{/g, ") {"); // converts Allman indentation -> K&R
        allCode = allCode.replace(/\n\s*while\s*\((.*)\)/g, "\nfor (dummy=0;$1;)"); // while -> for
        allCode = $.map(allCode.split('\n'), function (line, i) {
            return line.replace(/for\s*\((.*);(.*);(.*)\)\s*{/g,
                "for ($1, startTime = Date.now();$2;$3){" +
                    "if (Date.now() - startTime > " + game.allowedTime + ") {" +
                        "throw '[Line " + (i+1) + "] TimeOutException: Maximum loop execution time of " + game.allowedTime + " ms exceeded.';" +
                    "}");
        }).join('\n');

        if (this._debugMode) {
            console.log(allCode);
        }

        // evaluate the code to get startLevel() and (opt) validateLevel() methods

        this._eval(allCode);

        // start the level on a dummy map to validate
        this._setPlayerCodeRunning(true);
        startLevel(dummyMap);
        this._setPlayerCodeRunning(false);

        // re-run to check if the player messed with startLevel
        this._startOfStartLevelReached = false;
        this._endOfStartLevelReached = false;
        dummyMap._reset();
        startLevel(dummyMap);

        // does startLevel() execute fully?
        // (if we're restarting a level after editing a script, we can't test for this
        // - nor do we care)
        if (!this._startOfStartLevelReached && !restartingLevelFromScript) {
            throw 'startLevel() has been tampered with!';
        }
        if (!this._endOfStartLevelReached && !restartingLevelFromScript) {
            throw 'startLevel() returned prematurely!';
        }

        // has the player tampered with any functions?
        this.detectTampering(dummyMap, dummyMap.getPlayer());

        this.validateLevel = function () { return true; };
        // does validateLevel() succeed?
        if (typeof(validateLevel) === "function") {
            this.validateLevel = validateLevel;
            validateLevel(dummyMap);
        }

        this.onExit = function () { return true; };
        if (typeof onExit === "function") {
            this.onExit = onExit;
        }

        this.objective = function () { return false; };
        if (typeof objective === "function") {
            this.objective = objective;
        }

        return startLevel;
    } catch (e) {
        // cleanup
        this._setPlayerCodeRunning(false);

        var exceptionText = e.toString();
        if (e instanceof SyntaxError) {
            var lineNum = this.findSyntaxError(allCode, e.message);
            if (lineNum) {
                exceptionText = "[Line " + lineNum + "] " + exceptionText;
            }
        }
        this.display.appendError(exceptionText);

        // throw e; // for debugging
        return null;
    }
};

// makes sure nothing un-kosher happens during a callback within the game
// e.g. item collison; function phone
Game.prototype.validateCallback = function(callback, throwExceptions, ignoreForbiddenCalls) {
    try {
        // run the callback and check for forbidden method calls
        try {
            if (!ignoreForbiddenCalls) {
                this._setPlayerCodeRunning(true);
            }
            var result = callback();
            this._setPlayerCodeRunning(false);
        } catch (e) {
            // cleanup
            this._setPlayerCodeRunning(false);

            if (e.toString().indexOf("Forbidden method call") > -1) {
                // display error, disable player movement
                this.display.appendError(e.toString(), "%c{red}Please reload the level.");
                this.sound.playSound('static');
                this.map.getPlayer()._canMove = false;
                this.map._callbackValidationFailed = true;

                // throw e; // for debugging
                return;
            } else {
                // other exceptions are fine here - just pass them up
                throw e;
            }
        }

        // check if validator still passes
        try {
            if (typeof(this.validateLevel) === 'function') {
                this.validateLevel(this.map);
            }
        } catch (e) {
            // validation failed - not much to do here but restart the level, unfortunately
            this.display.appendError(e.toString(), "%c{red}Validation failed! Please reload the level.");

            // play error sound
            this.sound.playSound('static');

            // disable player movement
            this.map.getPlayer()._canMove = false;
            this.map._callbackValidationFailed = true;

            return;
        }

        // on maps with many objects (e.g. boss fight),
        // we can't afford to do these steps
        if (!this.map._properties.quickValidateCallback) {
            this.clearModifiedGlobals();

            // has the player tampered with any functions?
            try {
                this.detectTampering(this.map, this.map.getPlayer());
            } catch (e) {
                this.display.appendError(e.toString(), "%c{red}Validation failed! Please reload the level.");

                // play error sound
                this.sound.playSound('static');

                // disable player movement
                this.map.getPlayer()._canMove = false;
                this.map._callbackValidationFailed = true;

                return;
            }

            // refresh the map, just in case
            this.map.refresh();

            return result;
        }
    } catch (e) {
        this.map.writeStatus(e.toString());

        // throw e; // for debugging
        if (throwExceptions) {
            throw e;
        }
    }
};

Game.prototype.validateAndRunScript = function (code) {
    try {
        // Game.prototype.blah => game.blah
        code = code.replace(/Game.prototype/, 'this');

        // Blah => game._blahPrototype
        code = code.replace(/function Map/, 'this._mapPrototype = function');
        code = code.replace(/function Player/, 'this._playerPrototype = function');

        new Function(code).bind(this).call(); // bind the function to current instance of game!

        if (this._mapPrototype) {
            // re-initialize map if necessary
            this.map._reset(); // for cleanup
            this.map = new this._mapPrototype(this.display, this);
        }

        // re-initialize objects if necessary
        this.objects = this.getListOfObjects();

        // and restart current level from saved state
        var savedState = this.editor.getGoodState(this._currentLevel);
        this._evalLevelCode(savedState['code'], savedState['playerCode'], false, true);
    } catch (e) {
        this.display.writeStatus(e.toString());
        //throw e; // for debugging
    }
}

// awful awful awful method that tries to find the line
// of code where a given error occurs
Game.prototype.findSyntaxError = function(code, errorMsg) {
    var lines = code.split('\n');
    for (var i = 1; i <= lines.length; i++) {
        var testCode = lines.slice(0, i).join('\n');

        try {
            this._eval(testCode);
        } catch (e) {
            if (e.message === errorMsg) {
                return i;
            }
        }
    }
    return null;
};

Game.prototype.clearModifiedGlobals = function() {
    for (p in window) {
        if (window.propertyIsEnumerable(p) && this._globalVars.indexOf(p) == -1) {
            window[p] = null;
        }
    }
};

// Function tampering prevention

Game.prototype.referenceImplementations = {
    'map': {
        'countObjects': '',
        'createFromDOM': '',
        'createFromGrid': '',
        'displayChapter': '',
        'defineObject': '',
        'getAdjacentEmptyCells': '',
        'getCanvasContext': '',
        'getCanvasCoords': '',
        'getDOM': '',
        'getDynamicObjects': '',
        'getHeight': '',
        'getObjectTypeAt': '',
        'getPlayer': '',
        'getRandomColor': '',
        'getWidth': '',
        'isStartOfLevel': '',
        'overrideKey': '',
        'placeObject': '',
        'placePlayer': '',
        'setSquareColor': '',
        'startTimer': '',
        'updateDOM': '',
        'validateAtLeastXObjects': '',
        'validateAtMostXObjects': '',
        'validateExactlyXManyObjects': '',
        'validateAtMostXDynamicObjects': '',
        'validateNoTimers': '',
        'validateAtLeastXLines': ''
    },
    'player': {
        'atLocation': '',
        'getColor': '',
        'getLastMoveDirection': '',
        'getX': '',
        'getY': '',
        'hasItem': '',
        'killedBy': '',
        'move': '',
        'removeItem': '',
        'setColor': '',
        'setPhoneCallback': ''
    }
}

Game.prototype.saveReferenceImplementations = function() {
    for (f in this.referenceImplementations.map) {
        if (this.referenceImplementations.map.hasOwnProperty(f)) {
            this.referenceImplementations.map[f] = this.map[f];
        }
    }

    var dummyPlayer = new Player(0, 0, this.map, this);
    for (f in this.referenceImplementations.player) {
        if (this.referenceImplementations.player.hasOwnProperty(f)) {
            this.referenceImplementations.player[f] = dummyPlayer[f];
        }
    }
};

Game.prototype.detectTampering = function(map, player) {
    // once the super menu is activated, we don't care anymore!
    if (this._superMenuActivated) {
        return;
    }

    for (f in this.referenceImplementations.map) {
        if (this.referenceImplementations.map.hasOwnProperty(f)) {
            if (this.referenceImplementations.map[f].toString() != map[f].toString()) {
                throw (f + '() has been tampered with!');
            }
        }
    }

    if (player) {
        for (f in this.referenceImplementations.player) {
            if (this.referenceImplementations.player.hasOwnProperty(f)) {
                if (this.referenceImplementations.player[f].toString() != player[f].toString()) {
                    throw (f + '() has been tampered with!');
                }
            }
        }
    }
};
var toggleFocus = (function () {
    var focus_state = undefined;
    return function do_toggle(game) {
        if (!focus_state || focus_state === 'display') {
            focus_state = 'editor';
            game.editor.focus();
        } else if (focus_state === 'editor') {
            focus_state = 'display';
            game.display.focus();
        }
    };
})();

Game.prototype.enableShortcutKeys = function () {
    var game = this;

    shortcut.add('ctrl+1', function () {
        $("#helpButton").click();
        return true;
    });

	shortcut.add('ctrl+2', function () {
        $("#toggleFocusButton").click();
		return true;
	});

    shortcut.add('ctrl+3', function () {
        $("#notepadButton").click();
        return true;
    });

    shortcut.add('ctrl+4', function () {
        $("#resetButton").click();
        return true;
    });

    shortcut.add('ctrl+5', function () {
        $("#executeButton").click();
        return true;
    });

    shortcut.add('ctrl+6', function () {
        $("#phoneButton").click();
        return true;
    });

    shortcut.add('ctrl+0', function () {
        $("#menuButton").click();
        return true;
    });
};

Game.prototype.enableButtons = function () {
    var game = this;

    $("#helpButton").click( function () {
        game.sound.playSound('select');
        game.openHelp();
    });

    $("#toggleFocusButton").click( function () {
        game.sound.playSound('select');
        toggleFocus(game);
    });

    $('#notepadButton').click( function () {
        game.sound.playSound('select');
        $('#helpPane, #menuPane').hide();
        $('#notepadPane').toggle();
        game.notepadEditor.refresh();
        return true;
    });

    $("#resetButton").click( function () {
        game.sound.playSound('blip');
        game._resetLevel( game._currentLevel );
    });

    $("#executeButton").click( function () {
        game.sound.playSound('blip');
        game._evalLevelCode();
    });

    $("#phoneButton").click( function () {
        game.sound.playSound('select');
        game.usePhone();
    });

    $("#menuButton").click( function () {
        game.sound.playSound('select');
        game.openMenu();
    });

    $("#helpPaneCloseButton").click ( function () {
        game.sound.playSound('select');
        $('#helpPane').hide();
    });

    $("#muteButton").click( function () {
        game.sound.toggleSound();
    });
};

Game.prototype.setUpNotepad = function () {
    var game = this;

    var textarea = document.getElementById('notepadTextarea');
    this.notepadEditor = CodeMirror.fromTextArea(textarea, {
        theme: 'vibrant-ink',
        lineNumbers: true,
        mode: 'javascript'
    });

    this.notepadEditor.setSize(null, 275);

    var ls_tag = 'notepadContent';
    var content = localStorage.getItem(this._getLocalKey(ls_tag));
    if (content === null) {
        content = '';
    }
    this.notepadEditor.setValue(content);

    $('#notepadPaneCloseButton').click(function () {
        $('#notepadPane').hide();
    });

    $('#notepadSaveButton').click(function () {
        var v = game.notepadEditor.getValue();
        localStorage.setItem(this._getLocalKey(ls_tag), v);
    });
};

Game.prototype.openMenu = function () {
    var game = this;

    $('#menuPane #levels').html('');
    $.each(game._levelFileNames, function (levelNum, fileName) {
        levelNum += 1;
        var levelName = fileName.split('.')[0];
        levelName = levelName.split('_').join(' ');

        var levelButton = $('<button>');
        if (levelNum <= game._levelReached) {
            levelButton.text(levelName).click(function () {
                game._jumpToNthLevel(levelNum);
                $('#menuPane').hide();
            });
        } else {
            levelButton.text('???').addClass('disabled');
        }
        levelButton.appendTo('#menuPane #levels');
    });

    $('#helpPane, #notepadPane').hide();
    $('#menuPane').toggle();
};

Game.prototype.activateSuperMenu = function () {
    var game = this;

    if (!game._superMenuActivated) {
        $('#menuPane').addClass('expanded');
        $('#leftMenuPane').show();
        $('#rightMenuPane .pop_up_box_heading').hide();

        $('#rootDir').click(function () {
            $('#leftMenuPane li').removeClass('selected');
            $('#rightMenuPane div').hide();
            $('#rootDir').addClass('selected');
            $('#root').show();
        });

        $('#levelsDir').click(function () {
            $('#leftMenuPane li').removeClass('selected');
            $('#rightMenuPane div').hide();
            $('#levelsDir').addClass('selected');
            $('#levels').show();
        });

        $('#scriptsDir').click(function () {
            $('#leftMenuPane li').removeClass('selected');
            $('#rightMenuPane div').hide();
            $('#scriptsDir').addClass('selected');
            $('#scripts').show();
        });

        $('#bonusDir').click(function () {
            $('#leftMenuPane li').removeClass('selected');
            $('#rightMenuPane div').hide();
            $('#bonusDir').addClass('selected');
            $('#bonus').show();
        });

        $.each(game._viewableScripts, function (i, script) {
            var scriptButton = $('<button>');
            scriptButton.text(script).click(function () {
                game._editFile('scripts/' + script);
                $('#menuPane').hide();
            });

            if (game._editableScripts.indexOf(script) == -1) {
                scriptButton.addClass('uneditable');
            }

            scriptButton.appendTo('#menuPane #scripts');
        });

        $.each(game._bonusLevels, function (i, lvl) {
            var lvlButton = $('<button>');
            lvlButton.text(lvl).click(function () {
                game._getLevelByPath('levels/bonus/' + lvl);
                $('#menuPane').hide();
            });

            lvlButton.appendTo('#menuPane #bonus');
        });

        $('#menuLabel').text('Menu+');

        game._superMenuActivated = true;
    }
}

Game.prototype.openHelp = function () {
    var game = this;

    var categories = [];

    $('#helpPaneSidebar ul').html('');
    $('#helpPaneContent').html('');

    // build help
    $.each(game._getHelpCommands(), function (i, command) {
        if (game.reference[command]) {
            var reference = game.reference[command];

            if (categories.indexOf(reference.category) == -1) {
                categories.push(reference.category);

                var categoryLink = $('<li class="category" id="'+ reference.category +'">');
                categoryLink.text(reference.category)
                    .click(function () {
                        $('#helpPaneSidebar .category').removeClass('selected');
                        $(this).addClass('selected');

                        $('#helpPaneContent .category').hide();
                        $('#helpPaneContent .category#' + this.id).show();
                });
                $('#helpPaneSidebar ul').append(categoryLink);

                $('#helpPaneContent').append($('<div class="category" id="'+ reference.category +'">'));
            }

            var $command = $('<div class="command">');
            $command.appendTo($('#helpPaneContent .category#' + reference.category));

            var $commandTitle = $('<div class="commandTitle">');
            $commandTitle.text(reference.name)
                .appendTo($command);

            var $commandDescription = $('<div class="commandDescription">');
            $commandDescription.html(reference.description)
                .appendTo($command);
        }
    });

    // sort help commands
    $('#helpPaneContent .category').each(function (i, category) {
        $(category).find('.command').sortElements(function (a, b) {
            var contentA = $(a).find('.commandTitle').text();
            var contentB = $(b).find('.commandTitle').text();
            return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        });
    });

    if (!$('#helpPane').is(':visible')) {
        $('#menuPane, #notepadPane').hide();
        $('#helpPane').show();
        $('#helpPaneSidebar .category#global').click();
    } else {
        $('#helpPane').hide();
    }
};
Game.prototype._levels = {
    'levels/01_cellBlockA.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["global.startLevel", "global.onExit", "map.placePlayer",\n         "map.placeObject", "map.getHeight", "map.getWidth",\n         "map.displayChapter", "map.getPlayer", "player.hasItem"],\n    "music": "The Green"\n}\n#END_PROPERTIES#\n/*****************\n * cellBlockA.js *\n *****************\n *\n * 早安，Dr. Eval。\n *\n * 虽然这并不太容易，不过我已经得到授权，将你的电脑还给你。\n * 你可能对这个系统不怎么熟悉。不过和我们预期的一样，\n * 这个系统仍然是基于 JavaScript 的。\n * \n * 现在来看看我们在此的目的，并了解一下如何让你从这里出去。\n * 应当都是小菜一碟。\n *\n * 我会尽可能的为你提供代码的访问权限，不过可能不怎么有效。\n * 那些红色背景的代码表示不允许编辑。\n *\n * 这段代码构造了一个围绕你的墙。你需要开个缺口出来。\n * 你可能不用作太多工作。事实上，你做得越少越有效。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.displayChapter(\'第一章\\n越狱\');\n\n    map.placePlayer(7, 5);\n#BEGIN_EDITABLE#\n\n    for (y = 3; y <= map.getHeight() - 10; y++) {\n        map.placeObject(5, y, \'block\');\n        map.placeObject(map.getWidth() - 5, y, \'block\');\n    }\n\n    for (x = 5; x <= map.getWidth() - 5; x++) {\n        map.placeObject(x, 3, \'block\');\n        map.placeObject(x, map.getHeight() - 10, \'block\');\n    }\n#END_EDITABLE#\n\n    map.placeObject(15, 12, \'computer\');\n\n    map.placeObject(map.getWidth()-7, map.getHeight()-5, \'exit\');\n#END_OF_START_LEVEL#\n}\n\nfunction onExit(map) {\n    if (!map.getPlayer().hasItem(\'computer\')) {\n        map.writeStatus("别忘记捡起你的电脑！");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/02_theLongWayOut.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced": ["ROT.Map.DividedMaze", "player.atLocation"],\n    "music": "gurh"\n}\n#END_PROPERTIES#\n/********************\n * theLongWayOut.js *\n ********************\n *\n * 好吧，看起来他们发现了我们的意图。\n * 我原以为这条路会很畅通，事实上看来不是这样。\n * 不过没关系，聪明人总能消除这些麻烦。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.placePlayer(7, 5);\n\n    var maze = new ROT.Map.DividedMaze(map.getWidth(), map.getHeight());\n#BEGIN_EDITABLE#\n\n#END_EDITABLE#\n    maze.create( function (x, y, mapValue) {\n\n        // don\'t write maze over player\n        if (map.getPlayer().atLocation(x,y)) {\n            return 0;\n        }\n\n        else if (mapValue === 1) { //0 is empty space 1 is wall\n            map.placeObject(x,y, \'block\');\n        }\n        else {\n            map.placeObject(x,y,\'empty\');\n        }\n    });\n\n    map.placeObject(map.getWidth()-4, map.getHeight()-4, \'block\');\n    map.placeObject(map.getWidth()-6, map.getHeight()-4, \'block\');\n    map.placeObject(map.getWidth()-5, map.getHeight()-5, \'block\');\n    map.placeObject(map.getWidth()-5, map.getHeight()-3, \'block\');\n#BEGIN_EDITABLE#\n\n#END_EDITABLE#\n    map.placeObject(map.getWidth()-5, map.getHeight()-4, \'exit\');\n#END_OF_START_LEVEL#\n}\n ', 
    'levels/03_validationEngaged.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["global.validateLevel", "map.validateAtLeastXObjects",\n         "map.validateExactlyXManyObjects"],\n    "music": "Obscure Terrain"\n}\n#END_PROPERTIES#\n/************************\n * validationEngaged.js *\n ************************\n *\n * 现在，可以确认我们被他们发现了！\n * validateLevel 函数会用来检验，限制你可以做的事情。\n * 看来这儿不允许移除任何阻挡。\n *\n * 他们正想尽办法将你留在这里。\n * 不过你比他们更聪明。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.placePlayer(map.getWidth()-7, map.getHeight()-5);\n#BEGIN_EDITABLE#\n\n    for (y = 10; y <= map.getHeight() - 3; y++) {\n        map.placeObject(5, y, \'block\');\n        map.placeObject(map.getWidth() - 5, y, \'block\');\n    }\n\n    for (x = 5; x <= map.getWidth() - 5; x++) {\n        map.placeObject(x, 10, \'block\');\n        map.placeObject(x, map.getHeight() - 3, \'block\');\n    }\n#END_EDITABLE#\n\n    map.placeObject(7, 5, \'exit\');\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    numBlocks = 2 * (map.getHeight()-13) + 2 * (map.getWidth()-10);\n\n    map.validateAtLeastXObjects(numBlocks, \'block\');\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/04_multiplicity.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced": [],\n    "music": "coming soon"\n}\n#END_PROPERTIES#\n/*******************\n * multiplicity.js *\n *******************\n *\n * 刚出狼窝又入虎穴。他们再次限制了你的活动。不过，当然啦……\n *\n * 顺便说一下，关卡文件名可作看作提示。我之前有提过吗？\n *\n * 我保证，不会再遇到这种监牢了。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n\n    map.placePlayer(map.getWidth()-5, map.getHeight()-4);\n\n    for (y = 7; y <= map.getHeight() - 3; y++) {\n        map.placeObject(7, y, \'block\');\n        map.placeObject(map.getWidth() - 3, y, \'block\');\n    }\n#BEGIN_EDITABLE#\n\n#END_EDITABLE#\n    for (x = 7; x <= map.getWidth() - 3; x++) {\n        map.placeObject(x, 7, \'block\');\n        map.placeObject(x, map.getHeight() - 3, \'block\');\n    }\n\n    map.placeObject(map.getWidth() - 5, 5, \'exit\');\n#END_OF_START_LEVEL#\n}\n ', 
    'levels/05_minesweeper.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2.1",\n    "commandsIntroduced": ["map.setSquareColor"],\n    "music": "cloudy_sin"\n}\n#END_PROPERTIES#\n/******************\n * minesweeper.js *\n ******************\n *\n * 阿西莫夫的机器人三定律见鬼了。他们现在实际上是想要干掉你。\n * 虽然地板上遍布地雷，但不要太悲观。只是奋不顾身的冲向出口似乎不太明智。\n * 无论如何，你需要活下来。\n *\n * 不过，如果有什么办法让你可以发现这些地雷……\n */\n\nfunction getRandomInt(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    for (x = 0; x < map.getWidth(); x++) {\n        for (y = 0; y < map.getHeight(); y++) {\n            map.setSquareColor(x, y, \'#f00\');\n        }\n    }\n\n    map.placePlayer(map.getWidth() - 5, 5);\n\n    for (var i = 0; i < 75; i++) {\n        var x = getRandomInt(0, map.getWidth() - 1);\n        var y = getRandomInt(0, map.getHeight() - 1);\n        if ((x != 2 || y != map.getHeight() - 1)\n            && (x != map.getWidth() - 5 || y != 5)) {\n            // don\'t place mine over exit or player!\n            map.placeObject(x, y, \'mine\');\n#BEGIN_EDITABLE#\n\n#END_EDITABLE#\n        }\n    }\n\n    map.placeObject(2, map.getHeight() - 1, \'exit\');\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateAtLeastXObjects(40, \'mine\');\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/06_drones101.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n	"commandsIntroduced":\n        ["object.type", "object.behavior", "object.findNearest",\n         "object.getX", "object.getY", "object.canMove", "object.move"],\n    "music": "GameScratch"\n}\n#END_PROPERTIES#\n\n/****************\n * drones101.js *\n ****************\n *\n * 我亲爱的教授，还记得吗？很久以前你讲授过的那堂人工智能的课程，\n * 第二道作业是匿名特工的行为。\n * 我记得有一个幼稚的实现：只要机器人没有看到你，就很容易攻击它。\n * 那么现在让我们设想一下……\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    function moveToward(obj, type) {\n        var target = obj.findNearest(type);\n        var leftDist = obj.getX() - target.x;\n        var upDist = obj.getY() - target.y;\n\n        var direction;\n        if (upDist == 0 && leftDist == 0) {\n        	return;\n        } if (upDist > 0 && upDist >= leftDist) {\n            direction = \'up\';\n        } else if (upDist < 0 && upDist < leftDist) {\n            direction = \'down\';\n        } else if (leftDist > 0 && leftDist >= upDist) {\n            direction = \'left\';\n        } else {\n            direction = \'right\';\n        }\n\n        if (obj.canMove(direction)) {\n            obj.move(direction);\n        }\n    }\n\n    map.defineObject(\'attackDrone\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'d\',\n        \'color\': \'red\',\n        \'onCollision\': function (player) {\n            player.killedBy(\'an attack drone\');\n        },\n        \'behavior\': function (me) {\n            moveToward(me, \'player\');\n        }\n    });\n\n\n    map.placePlayer(1, 1);\n    map.placeObject(map.getWidth()-2, 12, \'attackDrone\');\n    map.placeObject(map.getWidth()-1, 12, \'exit\');\n\n    map.placeObject(map.getWidth()-1, 11, \'block\');\n    map.placeObject(map.getWidth()-2, 11, \'block\');\n    map.placeObject(map.getWidth()-1, 13, \'block\');\n    map.placeObject(map.getWidth()-2, 13, \'block\');\n#BEGIN_EDITABLE#\n\n\n\n\n#END_EDITABLE#\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/07_colors.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["map.defineObject", "player.getColor", "player.setColor",\n         "object.color", "object.impassable", "object.symbol",\n         "player.setPhoneCallback"],\n    "music": "Y"\n}\n#END_PROPERTIES#\n/*************\n* colors.js *\n *************\n *\n * 你已经接近出口了。只需要通过这个颜色锁就可以了。\n *\n * 只改变环境已经不够了。你需要学习改变你自己。\n * 我已经为你提供了一些有帮助的东西。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.placePlayer(0, 12);\n\n    map.placeObject(5, 12, \'phone\');\n\n    // 电话（phone）可以让你调用由在下面\n	// player.setPhoneCallback() 定义的功能函数。\n	// 可以通过 Q 键或 Ctrl+6 使用电话的功能。\n    map.getPlayer().setPhoneCallback(function () {\n#BEGIN_EDITABLE#\n        var player = map.getPlayer();\n\n        player.setColor(\'#f00\');\n\n\n\n\n\n#END_EDITABLE#\n    });\n\n\n    map.defineObject(\'redLock\', {\n        symbol: \'☒\',\n        color: "#f00", // 红\n        impassable: function(player, object) {\n            return player.getColor() != object.color;\n        }\n    });\n\n    map.defineObject(\'greenLock\', {\n        symbol: \'☒\',\n        color: "#0f0", // 绿\n        impassable: function(player, object) {\n            return player.getColor() != object.color;\n        }\n    });\n\n    map.defineObject(\'yellowLock\', {\n        symbol: \'☒\',\n        color: "#ff0", // 黄\n        impassable: function(player, object) {\n            return player.getColor() != object.color;\n        }\n    });\n\n    for (var x = 20; x <= 40; x++) {\n        map.placeObject(x, 11, \'block\');\n        map.placeObject(x, 13, \'block\');\n    }\n    map.placeObject(22, 12, \'greenLock\');\n    map.placeObject(25, 12, \'redLock\');\n    map.placeObject(28, 12, \'yellowLock\');\n    map.placeObject(31, 12, \'greenLock\');\n    map.placeObject(34, 12, \'redLock\');\n    map.placeObject(37, 12, \'yellowLock\');\n    map.placeObject(40, 12, \'exit\');\n    for (var y = 0; y < map.getHeight(); y++) {\n        if (y != 12) {\n            map.placeObject(40, y, \'block\');\n        }\n        for (var x = 41; x < map.getWidth(); x++) {\n            map.setSquareColor(x, y, \'#080\');\n        }\n    }\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n\nfunction onExit(map) {\n    if (!map.getPlayer().hasItem(\'phone\')) {\n        map.writeStatus("我们需要电话！");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/08_intoTheWoods.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["map.getObjectTypeAt", "player.getX", "player.getY",\n         "map.refresh"],\n    "mapProperties": {\n        "allowOverwrite": true\n    },\n    "music": "Night Owl"\n}\n#END_PROPERTIES#\n/*******************\n * intoTheWoods.js *\n *******************\n *\n * 哈哈，现在你已经脱险了。\n * 或者，就当前环境来说，你进入更加危险的地方了。\n *\n * 那么深呼吸、放送，在进入之前务必记得你来此的目的。\n *\n * 我跟踪到一个信号，说明算法（Algorithm）就在跟前。\n * 你需要穿越树林、渡过小河，然后到达藏匿它的要塞。\n * 守卫不怎么严密，所以我们应该可以让他们放松警惕。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    // 注意：在本关中，允许用 map.placeObject\n	// 替换已有的对象。\n\n    map.displayChapter(\'第二章\\n迷失的算法与骑士\');\n\n    map.placePlayer(2, map.getHeight() - 1);\n\n    var functionList = {};\n\n    functionList[\'fortresses\'] = function () {\n        function genRandomValue(direction) {\n            if (direction === "height") {\n                return Math.floor(Math.random() * (map.getHeight()-3));\n            } else if (direction === "width") {\n                return Math.floor(Math.random() * (map.getWidth()+1));\n            }\n        }\n\n        var x = genRandomValue("width");\n        var y = genRandomValue("height");\n\n        for (var i = x-2; i < x+2; i++) {\n            map.placeObject(i,y-2, \'block\');\n        }\n        for (var i = x-2; i < x+2; i++) {\n            map.placeObject(i,y+2, \'block\');\n        }\n\n        for (var j = y-2; j < y+2; j++) {\n            map.placeObject(x-2,j, \'block\');\n        }\n\n        for (var j = y-2; j < y+2; j++) {\n            map.placeObject(x+2,j, \'block\');\n        }\n    };\n\n    functionList[\'generateForest\'] = function () {\n        for (var i = 0; i < map.getWidth(); i++) {\n            for (var j = 0; j < map.getHeight(); j++) {\n\n                // 如果该格已经有树，就将其清空\n                if (map.getObjectTypeAt(i, j) === \'tree\') {\n                    // 移除已有的树\n                    map.placeObject(i,j, \'empty\');\n                }\n\n                if (map.getPlayer().atLocation(i,j) ||\n                        map.getObjectTypeAt(i, j) === \'block\' ||\n                        map.getObjectTypeAt(i, j) === \'exit\') {\n                    continue;\n                }\n\n                var rv = Math.random();\n                if (rv < 0.45) {\n                    map.placeObject(i, j, \'tree\');\n                }\n            }\n        }\n        map.refresh();\n    };\n\n    functionList[\'movePlayerToExit\'] = function () {\n        map.writeStatus("拒绝访问。");\n    }\n\n    functionList[\'pleaseMovePlayerToExit\'] = function () {\n        map.writeStatus("我不这么认为。");\n    }\n\n    functionList[\'movePlayerToExitDamnit\'] = function () {\n        map.writeStatus("那么，赛事如何了？");\n    }\n\n    // generate forest\n    functionList[\'generateForest\']();\n\n    // generate fortresses\n    functionList[\'fortresses\']();\n    functionList[\'fortresses\']();\n    functionList[\'fortresses\']();\n    functionList[\'fortresses\']();\n\n    map.getPlayer().setPhoneCallback(functionList[#{#"movePlayerToExit"#}#]);\n\n    map.placeObject(map.getWidth()-1, map.getHeight()-1, \'exit\');\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateAtLeastXObjects(100, \'tree\');\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/09_fordingTheRiver.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["player.killedBy", "object.onCollision"],\n    "music": "The_Waves_Call_Her_Name"\n}\n#END_PROPERTIES#\n/**********************\n * fordingTheRiver.js *\n **********************\n *\n * 这里有一条河。幸运的是，我对此有所准备。\n * 看见另一边的救生艇（raft）了吗？\n *\n * 所需要的只是一个计划。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    var raftDirection = \'down\';\n\n    map.placePlayer(map.getWidth()-1, map.getHeight()-1);\n    var player = map.getPlayer();\n\n    map.defineObject(\'raft\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'▓\',\n        \'color\': \'#420\',\n        \'transport\': true, // （防止玩家掉进水里）\n        \'behavior\': function (me) {\n            me.move(raftDirection);\n        }\n    });\n\n    map.defineObject(\'water\', {\n        \'symbol\': \'░\',\n        \'color\': \'#44f\',\n        \'onCollision\': function (player) {\n            player.killedBy(\'drowning in deep dark water\');\n        }\n    });\n\n    for (var x = 0; x < map.getWidth(); x++) {\n        for (var y = 5; y < 15; y++) {\n            map.placeObject(x, y, \'water\');\n        }\n    }\n\n    map.placeObject(20, 5, \'raft\');\n    map.placeObject(0, 2, \'exit\');\n    map.placeObject(0, 1, \'block\');\n    map.placeObject(1, 1, \'block\');\n    map.placeObject(0, 3, \'block\');\n    map.placeObject(1, 3, \'block\');\n\n#BEGIN_EDITABLE#\n\n\n\n#END_EDITABLE#\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateExactlyXManyObjects(1, \'raft\');\n}\n ', 
    'levels/10_ambush.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced": [],\n    "music": "Come and Find Me"\n}\n#END_PROPERTIES#\n/*************\n * ambush.js *\n *************\n *\n * 噢，噢，我知道了。这不在计划内。\n *\n * 看起来，不好好打一架，他们是不会让你带走算法（Algorithm）的。\n * 在穿过守卫机器人时，小心选择你的路线。\n *\n * 好吧，来点改进。让我们给它们的程序制造点麻烦，如何？\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    function moveToward(obj, type) {\n        var target = obj.findNearest(type);\n        var leftDist = obj.getX() - target.x;\n        var upDist = obj.getY() - target.y;\n\n        var direction;\n        if (upDist == 0 && leftDist == 0) {\n            return;\n        } if (upDist > 0 && upDist >= leftDist) {\n            direction = \'up\';\n        } else if (upDist < 0 && upDist < leftDist) {\n            direction = \'down\';\n        } else if (leftDist > 0 && leftDist >= upDist) {\n            direction = \'left\';\n        } else {\n            direction = \'right\';\n        }\n\n        if (obj.canMove(direction)) {\n            obj.move(direction);\n        }\n    }\n\n    map.defineObject(\'attackDrone\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'d\',\n        \'color\': \'red\',\n        \'onCollision\': function (player) {\n            player.killedBy(\'an attack drone\');\n        },\n        \'behavior\': function (me) {\n#BEGIN_EDITABLE#\n            moveToward(me, \'player\');\n#END_EDITABLE#\n        }\n    });\n\n    map.defineObject(\'reinforcementDrone\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'d\',\n        \'color\': \'yellow\',\n        \'onCollision\': function (player) {\n            player.killedBy(\'a reinforcement drone\');\n        },\n        \'behavior\': function (me) {\n#BEGIN_EDITABLE#\n            me.move(\'left\');\n#END_EDITABLE#\n        }\n    });\n\n    map.defineObject(\'defenseDrone\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'d\',\n        \'color\': \'green\',\n        \'onCollision\': function (player) {\n            player.killedBy(\'a defense drone\');\n        },\n        \'behavior\': function (me) {\n#BEGIN_EDITABLE#\n\n#END_EDITABLE#\n        }\n    });\n\n    // 用于装饰\n    map.defineObject(\'water\', {\n        \'symbol\': \'░\',\n        \'color\': \'#44f\'\n    });\n\n    map.placePlayer(0, 12);\n\n    for (var x = 0; x < map.getWidth(); x++) {\n        map.placeObject(x, 10, \'block\');\n        map.placeObject(x, 14, \'block\');\n\n        for (var y = 20; y < map.getHeight(); y++) {\n            map.placeObject(x, y, \'water\');\n        }\n    }\n\n    map.placeObject(23, 11, \'attackDrone\');\n    map.placeObject(23, 12, \'attackDrone\');\n    map.placeObject(23, 13, \'attackDrone\');\n\n    map.placeObject(27, 11, \'defenseDrone\');\n    map.placeObject(27, 12, \'defenseDrone\');\n    map.placeObject(27, 13, \'defenseDrone\');\n\n    map.placeObject(24, 11, \'reinforcementDrone\');\n    map.placeObject(25, 11, \'reinforcementDrone\');\n    map.placeObject(26, 11, \'reinforcementDrone\');\n    map.placeObject(24, 13, \'reinforcementDrone\');\n    map.placeObject(25, 13, \'reinforcementDrone\');\n    map.placeObject(26, 13, \'reinforcementDrone\');\n\n    map.placeObject(map.getWidth()-1, 12, \'exit\');\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/11_robot.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["object.giveItemTo", "object.passableFor",\n         "map.validateAtMostXObjects"],\n    "music": "conspiracy"\n}\n#END_PROPERTIES#\n/*\n * robot.js\n *\n * 你需要三把钥匙来释放算法（Algorithm）：红色的、绿色的和蓝色的钥匙。\n * 不幸的是，这三把钥匙保存在人类识别区（barrier）中。\n *\n * 计划很简单：对用于维护作业的机器人（robot）重新编程，\n * 以便让其穿过识别区拿到钥匙。\n *\n * 首先让我们试试红色钥匙（redKey）。\n */\n\nfunction getRandomInt(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    // 提示：你可以按 R 或 5 来重置，并且玩家不要与机器人同时同方向移动。\n\n    map.placePlayer(map.getWidth()-2, map.getHeight()-2);\n    var player = map.getPlayer();\n\n    map.defineObject(\'robot\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'R\',\n        \'color\': \'gray\',\n        \'onCollision\': function (player, me) {\n            me.giveItemTo(player, \'redKey\');\n        },\n        \'behavior\': function (me) {\n#BEGIN_EDITABLE#\n            // 可用的命令：me.move(direction) 和 me.canMove(direction)\n\n#END_EDITABLE#\n        }\n    });\n\n    map.defineObject(\'barrier\', {\n        \'symbol\': \'░\',\n        \'color\': \'purple\',\n        \'impassable\': true,\n        \'passableFor\': [\'robot\']\n    });\n\n    map.placeObject(0, map.getHeight() - 1, \'exit\');\n    map.placeObject(1, 1, \'robot\');\n    map.placeObject(map.getWidth() - 2, 8, \'redKey\');\n    map.placeObject(map.getWidth() - 2, 9, \'barrier\');\n\n    for (var x = 0; x < map.getWidth(); x++) {\n        map.placeObject(x, 0, \'block\');\n        if (x != map.getWidth() - 2) {\n            map.placeObject(x, 9, \'block\');\n        }\n    }\n\n    for (var y = 1; y < 9; y++) {\n        map.placeObject(0, y, \'block\');\n        map.placeObject(map.getWidth() - 1, y, \'block\');\n    }\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateExactlyXManyObjects(1, \'robot\');\n    map.validateAtMostXObjects(1, \'redKey\');\n}\n\nfunction onExit(map) {\n    if (!map.getPlayer().hasItem(\'redKey\')) {\n        map.writeStatus("我们必须拿到这把钥匙！");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/12_robotNav.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced": [],\n    "music": "Messeah"\n}\n#END_PROPERTIES#\n/*\n * robotNav.js\n *\n * 绿色钥匙被放在一个更加复杂的房间里。\n * 你需要让机器人穿越这些障碍。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    // 提示：你可以按 R 或 5 来重置，并且玩家不要与机器人同时同方向移动。\n\n    map.placePlayer(0, map.getHeight() - 1);\n    var player = map.getPlayer();\n\n    map.defineObject(\'robot\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'R\',\n        \'color\': \'gray\',\n        \'onCollision\': function (player, me) {\n            me.giveItemTo(player, \'greenKey\');\n        },\n        \'behavior\': function (me) {\n#BEGIN_EDITABLE#\n            if (me.canMove(\'right\')) {\n                me.move(\'right\');\n            } else {\n                me.move(\'down\');\n            }\n\n\n\n\n\n\n\n\n\n\n\n#END_EDITABLE#\n        }\n    });\n\n    map.defineObject(\'barrier\', {\n        \'symbol\': \'░\',\n        \'color\': \'purple\',\n        \'impassable\': true,\n        \'passableFor\': [\'robot\']\n    });\n\n    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, \'exit\');\n    map.placeObject(1, 1, \'robot\');\n    map.placeObject(map.getWidth() - 2, 8, \'greenKey\');\n    map.placeObject(map.getWidth() - 2, 9, \'barrier\');\n\n    for (var x = 0; x < map.getWidth(); x++) {\n        map.placeObject(x, 0, \'block\');\n        if (x != map.getWidth() - 2) {\n            map.placeObject(x, 9, \'block\');\n        }\n    }\n\n    for (var y = 1; y < 9; y++) {\n        map.placeObject(0, y, \'block\');\n        map.placeObject(map.getWidth() - 1, y, \'block\');\n    }\n\n    for (var i = 0; i < 4; i++) {\n        map.placeObject(20 - i, i + 1, \'block\');\n        map.placeObject(35 - i, 8 - i, \'block\');\n    }\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateExactlyXManyObjects(1, \'robot\');\n    map.validateAtMostXObjects(1, \'greenKey\');\n}\n\nfunction onExit(map) {\n    if (!map.getPlayer().hasItem(\'greenKey\')) {\n        map.writeStatus("我们必须拿到这把钥匙！");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/13_robotMaze.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced": ["map.getAdjacentEmptyCells"],\n    "music": "Searching"\n}\n#END_PROPERTIES#\n/*\n * robotMaze.js\n *\n * 蓝色钥匙被藏在了迷宫里，这当然不是那么容易了。\n *\n * 新亏你是个工智能的专家，相信我们不会空手而归。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    // 提示：你可以按 R 或 5 来重置，并且玩家不要与机器人同时同方向移动。\n\n    map.getRandomInt = function(min, max) {\n        return Math.floor(Math.random() * (max - min + 1)) + min;\n    }\n\n    map.placePlayer(map.getWidth()-1, map.getHeight()-1);\n    var player = map.getPlayer();\n\n    map.defineObject(\'robot\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'R\',\n        \'color\': \'gray\',\n        \'onCollision\': function (player, me) {\n            me.giveItemTo(player, \'blueKey\');\n        },\n        \'behavior\': function (me) {\n#BEGIN_EDITABLE#\n            // 随机移动\n            var moves = map.getAdjacentEmptyCells(me.getX(), me.getY());\n            // getAdjacentEmptyCells 可以提供一个 ((x, y), direction) 格式的数组\n            me.move(moves[map.getRandomInt(0, moves.length - 1)][1]);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#END_EDITABLE#\n        }\n    });\n\n    map.defineObject(\'barrier\', {\n        \'symbol\': \'░\',\n        \'color\': \'purple\',\n        \'impassable\': true,\n        \'passableFor\': [\'robot\']\n    });\n\n    map.placeObject(0, map.getHeight() - 1, \'exit\');\n    map.placeObject(1, 1, \'robot\');\n    map.placeObject(map.getWidth() - 2, 8, \'blueKey\');\n    map.placeObject(map.getWidth() - 2, 9, \'barrier\');\n\n    var autoGeneratedMaze = new ROT.Map.DividedMaze(map.getWidth(), 10);\n    autoGeneratedMaze.create( function (x, y, mapValue) {\n        // 别试图欺骗机器人或者识别区\n        if ((x == 1 && y == 1) || (x == map.getWidth() - 2 && y >= 8)) {\n            return 0;\n        } else if (mapValue === 1) { //0 是空的，1 是墙\n            map.placeObject(x,y, \'block\');\n        } else {\n            map.placeObject(x,y,\'empty\');\n        }\n    });\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateExactlyXManyObjects(1, \'robot\');\n    map.validateAtMostXObjects(1, \'blueKey\');\n}\n\nfunction onExit(map) {\n    if (!map.getPlayer().hasItem(\'blueKey\')) {\n        map.writeStatus("我们必须拿到这把钥匙！");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/14_crispsContest.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["map.createFromGrid", "player.removeItem"],\n    "music": "Chip"\n}\n#END_PROPERTIES#\n/********************\n * crispsContest.js *\n ********************\n *\n * 算法（Algorithm）已经是我们囊中之物了！\n * \n * 最后，我们将面对决定性的时刻，在多项式时间里解决 3SAT。\n * 这将会是一个漫长而又奇怪的旅程，不过这一切都十分值得。\n *\n * 你已经有了红色、绿色和蓝色的钥匙。现在，你需要找到解锁这些东西方法。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.defineObject(\'redLock\', {\n        \'symbol\': String.fromCharCode(0x2297),\n        \'color\': \'red\',\n        \'impassable\': function (player) {\n            if (player.hasItem(\'redKey\')) {\n                player.removeItem(\'redKey\');\n                return false;\n            } else {\n                return true;\n            }\n        }\n    });\n\n    map.defineObject(\'blueLock\', {\n        \'symbol\': String.fromCharCode(0x2297),\n        \'color\': \'#06f\',\n        \'impassable\': function (player) {\n            if (player.hasItem(\'blueKey\')) {\n                player.removeItem(\'blueKey\');\n                return false;\n            } else {\n                return true;\n            }\n        }\n    });\n\n    map.defineObject(\'greenLock\', {\n        \'symbol\': String.fromCharCode(0x2297),\n        \'color\': \'#0f0\',\n        \'impassable\': function (player) {\n            if (player.hasItem(\'greenKey\')) {\n                player.removeItem(#{#\'greenKey\'#}#);\n                return false;\n            } else {\n                return true;\n            }\n        }\n    });\n\n    map.defineObject(\'yellowLock\', {\n        \'symbol\': String.fromCharCode(0x2297),\n        \'color\': \'yellow\',\n        \'impassable\': function (player) {\n            if (player.hasItem(\'yellowKey\')) {\n                player.removeItem(\'yellowKey\');\n                return false;\n            } else {\n                return true;\n            }\n        }\n    });\n\n    map.createFromGrid(\n       [\'  +++++ +++++  \',\n        \'  + b +++ r +  \',\n        \'  +   +E+   +  \',\n        \'+++G+B+ +R+G+++\',\n        \'+ y B     R b +\',\n        \'+   +     +   +\',\n        \'+++++  @  +++++\',\n        \'+   +     +   +\',\n        \'+ y R     B y +\',\n        \'++++++Y+Y++++++\',\n        \'    +  +  +    \',\n        \'    + ABy +    \',\n        \'    +++++++    \'],\n    {\n        \'@\': \'player\',\n        \'E\': \'exit\',\n        \'A\': \'theAlgorithm\',\n        \'+\': \'block\',\n        \'R\': \'redLock\',\n        \'G\': \'greenLock\',\n        \'B\': \'blueLock\',\n        \'Y\': \'yellowLock\',\n        \'r\': \'redKey\',\n        \'g\': \'greenKey\',\n        \'b\': \'blueKey\',\n        \'y\': \'yellowKey\'\n    }, 17, 6);\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateAtMostXObjects(1, \'theAlgorithm\');\n    map.validateAtMostXObjects(4, \'yellowKey\');\n    map.validateAtMostXObjects(2, \'blueKey\');\n    map.validateAtMostXObjects(1, \'redKey\');\n}\n\nfunction onExit(map) {\n    // 确保我们得到了所有需要的东西！\n    if (!map.getPlayer().hasItem(\'theAlgorithm\')) {\n        map.writeStatus("You must get that Algorithm!!");\n        return false;\n    } else if (!map.getPlayer().hasItem(\'computer\')) {\n        map.writeStatus("You\'ll need your computer! [Ctrl-5 to restart]");\n        return false;\n    } else if (!map.getPlayer().hasItem(\'phone\')) {\n        map.writeStatus("You\'ll need your phone! [Ctrl-5 to restart]");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/15_exceptionalCrossing.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced": [],\n    "music": "The_Waves_Call_Her_Name",\n    "startingMessage": "You have lost the Algorithm!"\n}\n#END_PROPERTIES#\n/**************************\n * exceptionalCrossing.js *\n **************************\n *\n * 抱歉，老朋友，不过我想我不能与你共享这篇论文。\n * 为了我，你所做的一切非常了不起。对这些钥匙的利用非常聪明！\n * 我自己永远也想不到。\n *\n * 不过呢，当然啦，这也是为什么你一开始会来到这里的原因。\n *\n * 你一直都意志坚定。不过现在，啊哈，你的死期到了。\n *\n * 不过，我也不是铁石心肠的人。我会让你选择见上帝的方式。\n * 怎么样，这是不是很好啊？\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.displayChapter(\'第三章\\n背叛\');\n\n    map.placePlayer(0, 0);\n\n    // 哼哼！\n    map.getPlayer().removeItem(\'theAlgorithm\');\n\n    map.defineObject(\'water\', {\n        \'symbol\': \'░\',\n        \'color\': \'#44f\',\n        \'onCollision\': function (player) {\n            player.killedBy#{#(\'drowning in deep dark water\')#}#;\n        }\n    });\n\n    for (var x = 0; x < map.getWidth(); x++)\n        for (var y = 5; y < 15; y++)\n            map.placeObject(x, y, \'water\');\n\n    map.placeObject(map.getWidth()-1, map.getHeight()-1, \'exit\');\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/16_lasers.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2.3",\n    "commandsIntroduced":\n        ["map.getCanvasContext", "canvas.beginPath", "canvas.strokeStyle",\n         "canvas.lineWidth", "canvas.moveTo", "canvas.lineTo",\n         "canvas.stroke", "map.createLine", "map.validateAtLeastXLines"],\n    "music": "Soixante-8",\n    "mapProperties": {\n        "showDrawingCanvas": true\n    }\n}\n#END_PROPERTIES#\n/*************\n * lasers.js *\n *************\n *\n * 是启动杀戮激光的时候了！每支激光都可以即刻杀死你，除非你有匹配的颜色。\n * 你无法看到每支激光都是什么颜色，这真是太遗憾了！\n */\n\nfunction getRandomInt(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.placePlayer(0, 0);\n    map.placeObject(map.getWidth()-1, map.getHeight()-1, \'exit\');\n    var player = map.getPlayer();\n\n    for (var i = 0; i < 25; i++) {\n        var colors = [\'red\', \'yellow\', \'teal\'];\n\n        var startX = getRandomInt(0, 600);\n        var startY = getRandomInt(0, 500);\n        var angle = getRandomInt(0, 360);\n        var length = getRandomInt(200, 300);\n        var color = colors[i % 3];\n        createLaser(startX, startY, angle, length, color);\n    }\n\n    function createLaser(centerX, centerY, angleInDegrees, length, color) {\n        var angleInRadians = angleInDegrees * Math.PI / 180;\n\n        var x1 = centerX - Math.cos(angleInRadians) * length / 2;\n        var y1 = centerY + Math.sin(angleInRadians) * length / 2;\n        var x2 = centerX + Math.cos(angleInRadians) * length / 2;\n        var y2 = centerY - Math.sin(angleInRadians) * length / 2;\n\n        // map.createLine() 创建一条不可见的线，\n		// 当玩家越过它的时候会产生响应的影响\n        map.createLine([x1, y1], [x2, y2], function (player) {\n            if (player.getColor() != color) {\n                player.killedBy(\'a \' + color + \' laser\');\n            }\n        });\n\n#BEGIN_EDITABLE#\n        // 使用画布绘制一条线\n        var ctx = map.getCanvasContext();\n        ctx.beginPath();\n        ctx.strokeStyle = \'white\';\n        ctx.lineWidth = 5;\n        ctx.moveTo(x1, y1);\n        ctx.lineTo(x2, y2);\n        ctx.stroke();\n#END_EDITABLE#\n\n    }\n\n#BEGIN_EDITABLE#\n\n\n\n\n\n\n\n\n\n#END_EDITABLE#\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateAtLeastXLines(25);\n}\n ', 
    'levels/17_pointers.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2.1",\n    "commandsIntroduced":\n        ["map.getDynamicObjects", "map.getCanvasCoords", "object.setTarget"],\n    "music": "Tart",\n    "mapProperties": {\n        "showDrawingCanvas": true\n    }\n}\n#END_PROPERTIES#\n/***************\n * pointers.js *\n ***************\n *\n * 你！你怎么还活着？\n *\n * 好吧，没关系。祝你在通过这个迷宫房间的时候好运，你不会再见到我或者算法了！\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    function shuffle(o){ //v1.0 [http://bit.ly/1l6LGQT]\n        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i),\n            x = o[--i], o[i] = o[j], o[j] = x);\n        return o;\n    };\n\n    map.createFromGrid(\n        [\'+++++++++++++++++++++++++++++++++++++++++++++\',\n         \'++o *++++o *++++o *++++o *++++o *++++o *+++++\',\n         \'+* @ o++*   o++*   o++*   o++*   o++*   o++++\',\n         \'++o *++++o *++++o *++++o *++++o *++++o *+++++\',\n         \'+++++++++++++++++++++++++++++++++++++++++++++\',\n         \'+++++* o++++* o++++* o++++* o++++* o++++* o++\',\n         \'++++o   *++o   *++o   *++o   *++o   *++o   *+\',\n         \'+++++* o++++* o++++* o++++* o++++* o++++* o++\',\n         \'+++++++++++++++++++++++++++++++++++++++++++++\',\n         \'++o *++++o *++++o *++++o *++++o *++++o *+++++\',\n         \'+*   o++*   o++*   o++*   o++*   o++*   o++++\',\n         \'++o *++++o *++++o *++++o *++++o *++++o *+++++\',\n         \'+++++++++++++++++++++++++++++++++++++++++++++\',\n         \'+++++* o++++* o++++* o++++* o++++* o++++* o++\',\n         \'++++o   *++o   *++o   *++o   *++o   *++o   *+\',\n         \'+++++* o++++* o++++* o++++* o++++* o++++* o++\',\n         \'+++++++++++++++++++++++++++++++++++++++++++++\',\n         \'++o *++++o *++++o *++++o *++++o *++++o *+++++\',\n         \'+*   o++*   o++*   o++*   o++*   o++* E o++++\',\n         \'++o *++++o *++++o *++++o *++++o *++++o *+++++\',\n         \'+++++++++++++++++++++++++++++++++++++++++++++\'],\n        {\n            \'@\': \'player\',\n            \'E\': \'exit\',\n            \'+\': \'block\',\n            \'o\': \'teleporter\',\n            \'*\': \'trap\',\n        }, 2, 2);\n\n    var canvas = map.getCanvasContext();\n\n    var teleportersAndTraps = map.getDynamicObjects();\n    teleportersAndTraps = shuffle(teleportersAndTraps);\n\n    for (i = 0; i < teleportersAndTraps.length; i+=2) {\n        var t1 = teleportersAndTraps[i];\n        var t2 = teleportersAndTraps[i+1];\n\n        // 让每个传输点（teleporter）通向另外一个传输点，\n		// 或是一个陷阱\n        if (t1.getType() == \'teleporter\') {\n            t1.setTarget(t2);\n        }\n        if (t2.getType() == \'teleporter\') {\n            t2.setTarget(t1);\n        }\n\n#BEGIN_EDITABLE#\n        // TODO 找到某种办法将文档中的 API 移除，\n		// 免得那些“好医生”发现了 map.getCanvasCoords()\n\n\n\n\n#END_EDITABLE#\n    }\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n}\n ', 
    'levels/18_superDrEvalBros.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2.2",\n    "commandsIntroduced": ["player.move", "map.startTimer"],\n    "music": "Beach Wedding Dance",\n    "mapProperties": {\n        "keyDelay": 25\n    }\n}\n#END_PROPERTIES#\n/**********************\n * superDrEvalBros.js *\n **********************\n *\n * 你居然还在这？！好吧，Dr. Eval，让我们看看你在更小维度上表现如何吧。\n *\n * 放弃吧。除非你吃了魔法蘑菇来变大，否则一切都结束了。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    var fl = Math.floor;\n    var w = map.getWidth();\n    var h = map.getHeight();\n\n    map.placePlayer(1, fl(h/2)-1);\n    var player = map.getPlayer();\n\n    map.placeObject(w-1, fl(h/2)-1, \'exit\');\n\n    for (var x = 0; x < fl(w/2) - 5; x++) {\n        for (var y = fl(h/2); y < h; y++) {\n            map.placeObject(x, y, \'block\');\n        }\n    }\n\n    for (var x = fl(w/2) + 5; x <= w; x++) {\n        for (var y = fl(h/2); y < h; y++) {\n            map.placeObject(x, y, \'block\');\n        }\n    }\n\n    function gravity() {\n        var x = player.getX();\n        var y = player.getY() + 1;\n\n        if (y === map.getHeight() - 2) {\n            player.killedBy("gravity");\n        }\n\n        if (map.getObjectTypeAt(x,y) === "empty") {\n            player.move("down");\n        }\n\n    }\n    map.startTimer(gravity, 45);\n\n    function jump() {\n#BEGIN_EDITABLE#\n\n\n\n\n\n\n\n#END_EDITABLE#\n    }\n\n    player.setPhoneCallback(function () {\n        var x = player.getX();\n        var y = player.getY() + 1;\n\n        if (map.getObjectTypeAt(x,y) !== "empty") {\n            jump();\n        }\n    });\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    map.validateExactlyXManyObjects(1, \'exit\');\n    map.validateExactlyXManyObjects(520, \'block\');\n}\n ', 
    'levels/19_documentObjectMadness.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2.2",\n    "commandsIntroduced":\n        ["global.objective", "map.getDOM", "map.createFromDOM",\n         "map.updateDOM", "map.overrideKey", "global.$",\n         "jQuery.find", "jQuery.addClass", "jQuery.hasClass",\n         "jQuery.removeClass", "jQuery.parent", "jQuery.length",\n         "jQuery.children", "jQuery.first", "jQuery.next",\n         "jQuery.prev"],\n    "music": "BossLoop",\n    "mapProperties": {\n        "showDummyDom": true\n    }\n}\n#END_PROPERTIES#\n/****************************\n * documentObjectMadness.js *\n ****************************\n *\n * 这真令人无法相信！我无法相信你居然进入了人工智能部门的 Web 服务器！\n * 你应该已经被删除了！这不可能！这些干 IT 的蠢货在想什么？\n *\n * 没关系。算法还在我这里。这是最重要的。\n * 剩下的部分只是实现一下，这能有多难？\n *\n * 无论如何，你已经无法抓到我了，我亲爱的博士。\n * 最终，科研的史册里会记载你被授予令人尊敬的教授头衔的。\n *\n * 你大概不知道 jQuery 吧！\n */\n\nfunction objective(map) {\n    return map.getDOM().find(\'.adversary\').hasClass(\'drEval\');\n}\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    var html = "<div class=\'container\'>" +\n    "<div style=\'width: 600px; height: 500px; background-color: white; font-size: 10px;\'>" +\n        "<center><h1>人工智能部门</h1></center>" +\n        "<hr />" +\n        "<table border=\'0\'><tr valign=\'top\'>" +\n            "<td><div id=\'face\' /></td>" +\n            "<td>" +\n                "<h2 class=facultyName>Cornelius Eval</h2>" +\n                "<h3>计算机科学副教授</h3>" +\n                "<ul>" +\n                    "<li>学士, 数学, 马尼托巴大学</li>" +\n                    "<li>PhD, 人工智能, <a href=\'http://www.mit.edu\'>MIT</a></li>" +\n                "</ul>" +\n                "<h4>个人介绍</h4>" +\n                "<p>我是一名计算机科学副教授，工作于人工智能部门。" +\n                "我当前的研究方向包括人机界面、NP 完全问题和并行网格数学理论。</p>" +\n                "<p>我现在还是 <a href=\'\'>超级玛丽大学生队</a> 的在职顾问。" +\n                "业余时间，我热衷于波尔卡舞和轻骑摩托。</p>" +\n            "</td>" +\n        "</tr></table>" +\n\n        "<div id=\'class_schedule\'>" +\n          "<h4>Class Schedule</h4>" +\n            "<table>" +\n             "<tr>" +\n                "<th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th>" +\n             "</tr>" +\n             "<tr>" +\n                "<td>CS145 - 分号</td><td>无计划</td><td>CS145 - 分号</td><td>CS199 - 实践理论</td><td>CS145 - Semicolons</td>" +\n             "</tr>" +\n            "</table>" +\n        "</div>" +\n        "<div id=\'loremIpsum\'>" +\n        "<h4>Lorem Ipsum</h4>" +\n          "<blockquote>" +\n            "<code>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci " +\n            "velit, sed quia nonnumquam eiusmodi tempora incidunt ut labore et dolore magnam aliquam quaerat " +\n            "voluptatem.</code>" +\n            "<footer>— " +\n              "<cite>Cicero, De Finibus Bonorum et Malorum</cite>" +\n            "</footer>" +\n          "</blockquote>" +\n        "</div>" +\n    "</div></div>";\n\n    var $dom = $(html);\n\n    $dom.find(\'.facultyName\').addClass(\'drEval\');\n    $dom.find(\'cite\').addClass(\'adversary\');\n\n    function moveToParent(className) {\n        var currentPosition = $dom.find(\'.\' + className);\n        if (currentPosition.parent().length > 0 &&\n                !currentPosition.parent().hasClass(\'container\')) {\n            currentPosition.parent().addClass(className);\n            currentPosition.removeClass(className);\n            map.updateDOM($dom);\n        }\n    }\n\n    function moveToFirstChild(className) {\n        var currentPosition = $dom.find(\'.\' + className);\n        if (currentPosition.children().length > 0) {\n            currentPosition.children().first().addClass(className);\n            currentPosition.removeClass(className);\n            map.updateDOM($dom);\n        }\n    }\n\n    function moveToPreviousSibling(className) {\n        var currentPosition = $dom.find(\'.\' + className);\n        if (currentPosition.prev().length > 0) {\n            currentPosition.prev().addClass(className);\n            currentPosition.removeClass(className);\n            map.updateDOM($dom);\n        }\n    }\n\n    function moveToNextSibling(className) {\n        var currentPosition = $dom.find(\'.\' + className);\n        if (currentPosition.next().length > 0) {\n            currentPosition.next().addClass(className);\n            currentPosition.removeClass(className);\n            map.updateDOM($dom);\n        }\n    }\n\n    map.overrideKey(\'up\', function () { moveToParent(\'drEval\'); });\n    map.overrideKey(\'down\', function () { moveToFirstChild(\'drEval\'); });\n    map.overrideKey(\'left\', function () { moveToPreviousSibling(\'drEval\'); });\n    map.overrideKey(\'right\', function () { moveToNextSibling(\'drEval\'); });\n\n    map.defineObject(\'adversary\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'@\',\n        \'color\': \'red\',\n        \'behavior\': function (me) {\n            var move = Math.floor(Math.random() * 4) + 1; // 1, 2, 3, or 4\n            if (move == 1) {\n                moveToParent(\'adversary\');\n            } else if (move == 2) {\n                moveToFirstChild(\'adversary\');\n            } else if (move == 3) {\n                moveToPreviousSibling(\'adversary\');\n            } else if (move == 4) {\n                moveToNextSibling(\'adversary\');\n            }\n        }\n    });\n\n    map.placePlayer(1, 1);\n    map.placeObject(map.getWidth() - 2, map.getHeight() - 2, \'adversary\');\n\n    map.createFromDOM($dom);\n#END_OF_START_LEVEL#\n}\n ', 
    'levels/20_bossFight.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "commandsIntroduced":\n        ["object.onDestroy", "object.projectile",\n         "map.countObjects", "map.isStartOfLevel",\n         "map.validateAtMostXDynamicObjects", "map.validateNoTimers"],\n	"music": "Adversity",\n    "mapProperties": {\n        "refreshRate": 50,\n        "quickValidateCallback": true\n    }\n}\n#END_PROPERTIES#\n\n/*****************\n * bossFight.js *\n *****************\n *\n * 别太过分了，DR. EVAL！！！！\n * 你不会活着离开这里的！！！！\n * 这回你将会见到我真正的能力！！！！\n * 尝尝机器人怒火吧！！！！\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n	map.defineObject(\'boss\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'⊙\',\n        \'color\': \'red\',\n        \'interval\': 200,\n        \'onCollision\': function (player) {\n            player.killedBy(\'the boss\');\n        },\n        \'behavior\': function (me) {\n        	if (!me.direction) {\n        		me.direction = \'right\';\n        	}\n        	if (me.canMove(me.direction)) {\n            	me.move(me.direction);\n        	} else {\n        		me.direction = (me.direction == \'right\') ? \'left\' : \'right\';\n        	}\n        	if (Math.random() < 0.3) {\n            	map.placeObject(me.getX(), me.getY() + 2, \'bullet\');\n        	}\n        },\n        \'onDestroy\': function (me) {\n            if (map.countObjects(\'boss\') == 0) {\n                map.placeObject(me.getX(), me.getY(), \'theAlgorithm\');\n            }\n        }\n    });\n\n    map.defineObject(\'bullet\', {\n        \'type\': \'dynamic\',\n        \'symbol\': \'.\',\n        \'color\': \'red\',\n        \'interval\': 100,\n        \'projectile\': true,\n        \'behavior\': function (me) {\n            me.move(\'down\');\n        }\n    });\n\n    map.placePlayer(0, map.getHeight() - 3);\n    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, \'exit\');\n\n    // 很辛苦吗，嗯？\n    map.getPlayer().removeItem(\'phone\');\n    map.placeObject(map.getWidth() - 1, map.getHeight() - 3, \'phone\');\n\n    map.placeObject(0, map.getHeight() - 4, \'block\');\n    map.placeObject(1, map.getHeight() - 4, \'block\');\n    map.placeObject(2, map.getHeight() - 4, \'block\');\n    map.placeObject(2, map.getHeight() - 3, \'block\');\n    map.placeObject(map.getWidth() - 1, map.getHeight() - 4, \'block\');\n    map.placeObject(map.getWidth() - 2, map.getHeight() - 4, \'block\');\n    map.placeObject(map.getWidth() - 3, map.getHeight() - 4, \'block\');\n    map.placeObject(map.getWidth() - 3, map.getHeight() - 3, \'block\');\n\n    for (var x = 0; x < map.getWidth(); x++) {\n        map.placeObject(x, 4, \'block\');\n    }\n\n    map.placeObject(9, 5, \'boss\');\n    map.placeObject(11, 5, \'boss\');\n    map.placeObject(13, 5, \'boss\');\n    map.placeObject(15, 5, \'boss\');\n    map.placeObject(17, 5, \'boss\');\n    map.placeObject(19, 5, \'boss\');\n    map.placeObject(21, 5, \'boss\');\n    map.placeObject(23, 5, \'boss\');\n    map.placeObject(25, 5, \'boss\');\n    map.placeObject(27, 5, \'boss\');\n    map.placeObject(29, 5, \'boss\');\n    map.placeObject(31, 5, \'boss\');\n\n    map.placeObject(10, 6, \'boss\');\n    map.placeObject(12, 6, \'boss\');\n    map.placeObject(14, 6, \'boss\');\n    map.placeObject(16, 6, \'boss\');\n    map.placeObject(18, 6, \'boss\');\n    map.placeObject(20, 6, \'boss\');\n    map.placeObject(22, 6, \'boss\');\n    map.placeObject(24, 6, \'boss\');\n    map.placeObject(26, 6, \'boss\');\n    map.placeObject(28, 6, \'boss\');\n    map.placeObject(30, 6, \'boss\');\n\n#BEGIN_EDITABLE#\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#END_EDITABLE#\n\n#END_OF_START_LEVEL#\n}\n\nfunction validateLevel(map) {\n    // called at start of level and whenever a callback executes\n    map.validateAtMostXObjects(59, \'block\');\n    map.validateAtMostXObjects(1, \'phone\');\n\n    if (map.countObjects(\'theAlgorithm\') > 0 && map.countObjects(\'boss\') > 0) {\n        throw "The Algorithm can only be dropped by the boss!";\n    }\n\n    // only called at start of level\n    if (map.isStartOfLevel()) {\n        map.validateAtMostXDynamicObjects(23);\n        map.validateNoTimers();\n    }\n}\n\nfunction onExit(map) {\n    if (!map.getPlayer().hasItem(\'theAlgorithm\')) {\n        map.writeStatus("You must take back the Algorithm!!");\n        return false;\n    } else if (!map.getPlayer().hasItem(\'phone\')) {\n        map.writeStatus("We need the phone!");\n        return false;\n    } else {\n        return true;\n    }\n}\n ', 
    'levels/21_endOfTheLine.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2",\n    "activateSuperMenu": true,\n    "music": "Comme Des Orages"\n}\n#END_PROPERTIES#\n\n/*******************\n * endOfTheLine.js *\n *******************\n *\n * \n * 我认为无须忏悔，Cornelius。\n *\n * 你真希望我能做到？你真的认为可以相信论文的作者可以证明举世瞩目的 P = NP？\n *\n * 你们都是单纯的科研人员，我的好博士。“人工智能部门”是脱离现实的。\n * 我不认为你曾行考虑过，将这个算法实现，一个【物理】的实现方案。\n * 如果一个棘手的谜题实际上就像它预期的那样容易解决，人类会怎么做？\n *\n * Cornelius，如果这个知识被公开的话，我们都将成为上帝。\n * 幼稚的孩童使用无法想象的力量会如何。\n * 我们已经有一个奥本海默了，我们不需要让 Dr. Cornelius Eval 成为另一个奥本海默。\n *\n * 如果在这个算法上我能获得成功，那么它将是安全和可靠的。\n * 我可以明智的、具有远见和负责的运用它。\n * 我祈祷我的失败不会导致人类毁灭，不过我如此并不报乐观态度。\n *\n * 你可能已经击败了我的机器人军团，而我估计这可能是最终结果了。\n * 算法永远无法离开这一赛博空间。而你也一样。\n *\n * 这是超越你我之外的存在。我不后悔，因为我可以立刻重新开始。\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    map.finalLevel = true;\n    map.placePlayer(15, 12);\n    map.placeObject(25, 12, \'exit\');\n#END_OF_START_LEVEL#\n}\n ', 
    'levels/22_credits.jsx': '#BEGIN_PROPERTIES#\n{\n    "version": "1.2.1",\n    "music": "Brazil"\n}\n#END_PROPERTIES#\n/**************\n * credits.js *\n *************\n *\n * 恭喜！Dr. Eval 已经成功带着算法逃离了赛博空间。\n *\n * 给你自己一个大大的奖励吧，你是一个聪明的黑客。\n *\n *\n *\n * 渴望更多？\n *\n * 访问一意孤行的 github 版本库\n *      https://github.com/AlexNisnevich/untrusted （英文版）\n *		https://github.com/mikespook/untrusted （中文版）\n *\n * 或许还可以尝试自己作一两个关卡！\n *\n * 喜欢这些音乐？你可以完整地听一遍\n *      https://soundcloud.com/untrusted\n *\n * 请随时联系我们 [\n *      \'alex [dot] nisnevich [at] gmail [dot] com\'，\n *      \'greg [dot] shuflin [at] gmail [dot] com\'，\n *      \'mikepook [plus] untrusted [at] gmail [dot] com\'\n * ]\n *\n * 再一次，衷心祝贺！\n *\n *             -- Alex，Greg 和 mikespook\n */\n\nfunction startLevel(map) {\n#START_OF_START_LEVEL#\n    var credits = [\n        [21, 1, "一意孤行"],\n        [23, 2, "- 或 -"],\n        [19, 3, "Dr.Eval 大冒险"],\n        [1, 4, "{"],\n        [2, 5, "\'开发\': \'Alex Nisnevich 和 Greg Shuflin\',"],\n        [2, 6, "\'汉化\': \'mikespook\',"], \n        [2, 7, "\'特别感谢\': {"],\n        [5, 8, "Dmitry_Mazin: [\'设计\', \'编码\'],"],\n        [5, 9, "Jordan_Arnesen: [\'关卡\', \'测试\'],"],\n        [5, 10, "Natasha_HullRichter: [\'关卡\',\'测试\']"],\n        [2, 11, "},"],\n        [2, 12, "\'音乐\': "],\n        [4, 13, "[\'Jonathan Holliday\',"],\n        [5, 14, "\'Dmitry Mazin\',"],\n        [5, 15, "\'Revolution Void\',"],\n        [5, 16, "\'Fex\',"],\n        [5, 17, "\'iNTRICATE\',"],\n        [5, 18, "\'Tortue Super Sonic\',"],\n        [5, 19, "\'Broke For Free\',"],\n        [5, 20, "\'Sycamore Drive\',"],\n        [5, 21, "\'Eric Skiff\'],"],\n        [30, 13, "\'Mike and Alan\',"],\n        [30, 14, "\'RoccoW\',"],\n        [30, 15, "\'That Andy Guy\',"],\n        [30, 16, "\'Obsibilo\',"],\n        [30, 17, "\'BLEO\',"],\n        [30, 18, "\'Rolemusic\',"],\n        [30, 19, "\'Seropard\',"],\n        [30, 20, "\'Vernon Lenoir\',"],\n        [19, map.getHeight() - 2, "\'感谢\': \'赏玩！\'"],\n        [1, map.getHeight() - 1, "}"]\n    ];\n\n    function drawCredits(i) {\n        if (i >= credits.length) {\n            return;\n        }\n\n        // redraw lines bottom to top to avoid cutting off letters\n        for (var j = i; j >= 0; j--) {\n            var line = credits[j];\n            map._display.drawText(line[0], line[1], line[2]);\n        }\n\n        map.timeout(function () {drawCredits(i+1);}, 2000)\n    }\n\n    map.timeout(function () {drawCredits(0);}, 4000);\n\n#END_OF_START_LEVEL#\n}\n ', 
};
$(document).ready(function() {
    var startLevel = getParameterByName('lvl') ? parseInt(getParameterByName('lvl')) : null;
    window.game = new Game(true, startLevel);
    window.game._initialize();
    window.eval = {};
});

})();

console.log(_("%cIf you can read this, you are cheating! D:"), "color: red; font-size: x-large");
console.log(_("%cBut really, you don't need this console to play the game. Walk around using arrow keys (or Vim keys), and pick up the computer (") + String.fromCharCode(0x2318) + _("). Then the fun begins!"), "font-size: 15px");

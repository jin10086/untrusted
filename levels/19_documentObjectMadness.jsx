#BEGIN_PROPERTIES#
{
    "version": "1.2.2",
    "commandsIntroduced":
        ["global.objective", "map.getDOM", "map.createFromDOM",
         "map.updateDOM", "map.overrideKey", "global.$",
         "jQuery.find", "jQuery.addClass", "jQuery.hasClass",
         "jQuery.removeClass", "jQuery.parent", "jQuery.length",
         "jQuery.children", "jQuery.first", "jQuery.next",
         "jQuery.prev"],
    "music": "BossLoop",
    "mapProperties": {
        "showDummyDom": true
    }
}
#END_PROPERTIES#
/****************************
 * documentObjectMadness.js *
 ****************************
 *
 * 这真令人无法相信！我无法相信你居然进入了人工智能部门的 Web 服务器！
 * 你应该已经被删除了！这不可能！这些干 IT 的蠢货在想什么？
 *
 * 没关系。算法还在我这里。这是最重要的。
 * 剩下的部分只是实现一下，这能有多难？
 *
 * 无论如何，你已经无法抓到我了，我亲爱的博士。
 * 最终，科研的史册里会记载你被授予令人尊敬的教授头衔的。
 *
 * 你大概不知道 jQuery 吧！
 */

function objective(map) {
    return map.getDOM().find('.adversary').hasClass('drEval');
}

function startLevel(map) {
#START_OF_START_LEVEL#
    var html = "<div class='container'>" +
    "<div style='width: 600px; height: 500px; background-color: white; font-size: 10px;'>" +
        "<center><h1>人工智能部门</h1></center>" +
        "<hr />" +
        "<table border='0'><tr valign='top'>" +
            "<td><div id='face' /></td>" +
            "<td>" +
                "<h2 class=facultyName>Cornelius Eval</h2>" +
                "<h3>计算机科学副教授</h3>" +
                "<ul>" +
                    "<li>学士, 数学, 马尼托巴大学</li>" +
                    "<li>PhD, 人工智能, <a href='http://www.mit.edu'>MIT</a></li>" +
                "</ul>" +
                "<h4>个人介绍</h4>" +
                "<p>我是一名计算机科学副教授，工作于人工智能部门。" +
                "我当前的研究方向包括人机界面、NP 完全问题和并行网格数学理论。</p>" +
                "<p>我现在还是 <a href=''>超级玛丽大学生队</a> 的在职顾问。" +
                "业余时间，我热衷于波尔卡舞和轻骑摩托。</p>" +
            "</td>" +
        "</tr></table>" +

        "<div id='class_schedule'>" +
          "<h4>Class Schedule</h4>" +
            "<table>" +
             "<tr>" +
                "<th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th>" +
             "</tr>" +
             "<tr>" +
                "<td>CS145 - 分号</td><td>无计划</td><td>CS145 - 分号</td><td>CS199 - 实践理论</td><td>CS145 - Semicolons</td>" +
             "</tr>" +
            "</table>" +
        "</div>" +
        "<div id='loremIpsum'>" +
        "<h4>Lorem Ipsum</h4>" +
          "<blockquote>" +
            "<code>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci " +
            "velit, sed quia nonnumquam eiusmodi tempora incidunt ut labore et dolore magnam aliquam quaerat " +
            "voluptatem.</code>" +
            "<footer>— " +
              "<cite>Cicero, De Finibus Bonorum et Malorum</cite>" +
            "</footer>" +
          "</blockquote>" +
        "</div>" +
    "</div></div>";

    var $dom = $(html);

    $dom.find('.facultyName').addClass('drEval');
    $dom.find('cite').addClass('adversary');

    function moveToParent(className) {
        var currentPosition = $dom.find('.' + className);
        if (currentPosition.parent().length > 0 &&
                !currentPosition.parent().hasClass('container')) {
            currentPosition.parent().addClass(className);
            currentPosition.removeClass(className);
            map.updateDOM($dom);
        }
    }

    function moveToFirstChild(className) {
        var currentPosition = $dom.find('.' + className);
        if (currentPosition.children().length > 0) {
            currentPosition.children().first().addClass(className);
            currentPosition.removeClass(className);
            map.updateDOM($dom);
        }
    }

    function moveToPreviousSibling(className) {
        var currentPosition = $dom.find('.' + className);
        if (currentPosition.prev().length > 0) {
            currentPosition.prev().addClass(className);
            currentPosition.removeClass(className);
            map.updateDOM($dom);
        }
    }

    function moveToNextSibling(className) {
        var currentPosition = $dom.find('.' + className);
        if (currentPosition.next().length > 0) {
            currentPosition.next().addClass(className);
            currentPosition.removeClass(className);
            map.updateDOM($dom);
        }
    }

    map.overrideKey('up', function () { moveToParent('drEval'); });
    map.overrideKey('down', function () { moveToFirstChild('drEval'); });
    map.overrideKey('left', function () { moveToPreviousSibling('drEval'); });
    map.overrideKey('right', function () { moveToNextSibling('drEval'); });

    map.defineObject('adversary', {
        'type': 'dynamic',
        'symbol': '@',
        'color': 'red',
        'behavior': function (me) {
            var move = Math.floor(Math.random() * 4) + 1; // 1, 2, 3, or 4
            if (move == 1) {
                moveToParent('adversary');
            } else if (move == 2) {
                moveToFirstChild('adversary');
            } else if (move == 3) {
                moveToPreviousSibling('adversary');
            } else if (move == 4) {
                moveToNextSibling('adversary');
            }
        }
    });

    map.placePlayer(1, 1);
    map.placeObject(map.getWidth() - 2, map.getHeight() - 2, 'adversary');

    map.createFromDOM($dom);
#END_OF_START_LEVEL#
}

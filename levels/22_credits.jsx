#BEGIN_PROPERTIES#
{
    "version": "1.2.1",
    "music": "Brazil"
}
#END_PROPERTIES#
/**************
 * credits.js *
 *************
 *
 * 恭喜！Dr. Eval 已经成功带着算法逃离了赛博空间。
 *
 * 给你自己一个大大的奖励吧，你是一个聪明的黑客。
 *
 *
 *
 * 渴望更多？
 *
 * 访问一意孤行的 github 版本库
 *      https://github.com/AlexNisnevich/untrusted （英文版）
 *		https://github.com/mikespook/untrusted （中文版）
 *
 * 或许还可以尝试自己作一两个关卡！
 *
 * 喜欢这些音乐？你可以完整地听一遍
 *      https://soundcloud.com/untrusted
 *
 * 请随时联系我们 [
 *      'alex [dot] nisnevich [at] gmail [dot] com'，
 *      'greg [dot] shuflin [at] gmail [dot] com'，
 *      'mikepook [plus] untrusted [at] gmail [dot] com'
 * ]
 *
 * 再一次，衷心祝贺！
 *
 *             -- Alex，Greg 和 mikespook
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    var credits = [
        [21, 1, "一意孤行"],
        [23, 2, "- 或 -"],
        [19, 3, "Dr.Eval 大冒险"],
        [1, 4, "{"],
        [2, 5, "'开发': 'Alex Nisnevich 和 Greg Shuflin',"],
        [2, 6, "'汉化': 'mikespook',"], 
        [2, 7, "'特别感谢': {"],
        [5, 8, "Dmitry_Mazin: ['设计', '编码'],"],
        [5, 9, "Jordan_Arnesen: ['关卡', '测试'],"],
        [5, 10, "Natasha_HullRichter: ['关卡','测试']"],
        [2, 11, "},"],
        [2, 12, "'音乐': "],
        [4, 13, "['Jonathan Holliday',"],
        [5, 14, "'Dmitry Mazin',"],
        [5, 15, "'Revolution Void',"],
        [5, 16, "'Fex',"],
        [5, 17, "'iNTRICATE',"],
        [5, 18, "'Tortue Super Sonic',"],
        [5, 19, "'Broke For Free',"],
        [5, 20, "'Sycamore Drive',"],
        [5, 21, "'Eric Skiff'],"],
        [30, 13, "'Mike and Alan',"],
        [30, 14, "'RoccoW',"],
        [30, 15, "'That Andy Guy',"],
        [30, 16, "'Obsibilo',"],
        [30, 17, "'BLEO',"],
        [30, 18, "'Rolemusic',"],
        [30, 19, "'Seropard',"],
        [30, 20, "'Vernon Lenoir',"],
        [19, map.getHeight() - 2, "'感谢': '赏玩！'"],
        [1, map.getHeight() - 1, "}"]
    ];

    function drawCredits(i) {
        if (i >= credits.length) {
            return;
        }

        // redraw lines bottom to top to avoid cutting off letters
        for (var j = i; j >= 0; j--) {
            var line = credits[j];
            map._display.drawText(line[0], line[1], line[2]);
        }

        map.timeout(function () {drawCredits(i+1);}, 2000)
    }

    map.timeout(function () {drawCredits(0);}, 4000);

#END_OF_START_LEVEL#
}

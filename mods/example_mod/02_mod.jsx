#BEGIN_PROPERTIES#
{
    "version": "1.0",
    "music": "Brazil"
}
#END_PROPERTIES#
/**************
 * mod.js *
 *************
 *
 * 恭喜你！你已经完成了 mod 的例子。
 *
 * 将代码放置于 [mods/$your_mod_name] 目录可以创建你自己的 mod。
 * 当一切就绪，只需要运行 [make mod=$your_mod_name] 来构建它。
 * 你可以将这个参数放入该项目的 make 中，任何一个合法的命令下，
 * 来指定要处理哪个模块。
 * 
 * 还在等什么？快来！
 *
 * 创建你自己的 mod 并乐在其中吧。
 *
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    var credits = [
        [14, 5, "关于 M O D 的例子"],
		[10, 7, "%c{#0f0}$%c{#cccccc} make mod=example_mod"],
		[10, 9, "%c{#0f0}$%c{#cccccc} make mod=example_mod release"],
		[10, 11, "%c{#0f0}$%c{#cccccc} make mod=example_mod runlocal"],
	] 

    function drawCredits(i) {
        if (i >= credits.length) {
            return;
        }

        // 从底向上重绘每行，以防止字符被覆盖
        for (var j = i; j >= 0; j--) {
            var line = credits[j];
            map._display.drawText(line[0], line[1], line[2]);
        }

        map.timeout(function () {drawCredits(i+1);}, 2000)
    }

    map.timeout(function () {drawCredits(0);}, 4000);

#END_OF_START_LEVEL#
}

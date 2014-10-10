function playIntro(display, map, i) {
    if (i < 0) {
        display._intro = true;
    } else {
        if (typeof i === 'undefined') { i = map.getHeight(); }
        display.clear();
		var l = ["%c{#0f0}> initialize", "R I S E O F T H E M O D S",
		"- or - ", "THE EXAMPLE OF MODS",
		"a demo that shows how to develop a mod",
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

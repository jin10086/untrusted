var _i18n = {
	'INVENTORY: '	:	'背包：',
	'Now playing: "':	'正在播放："',
	'The Green'		:	'绿之韵',
	'%cIf you can read this, you are cheating! D:'	:	'"%c如果你看到这些文字，说明你在作弊！:D"',
	'%cBut really, you don\'t need this console to play the game. Walk around using arrow keys (or Vim keys), and pick up the computer ('	:	'%c说真的，你没必要用控制台来玩这个游戏。用方向键（或 Vim 快捷键）移动，捡起电脑（',
	'). Then the fun begins!'	:	'）。来找点乐子吧！'
}
function _(txt) {
	return _i18n[txt] == undefined ? txt : _i18n[txt];
}

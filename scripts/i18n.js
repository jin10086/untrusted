var _i18n = {
	'INVENTORY: '	:	'背包：',
	'Now playing: "':	'正在播放："',
	'The Green'		:	'绿之韵'
}
function _(txt) {
	return _i18n[txt] == undefined ? txt : _i18n[txt];
}

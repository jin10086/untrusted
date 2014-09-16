**一意孤行，也叫做 Dr. Eval 大冒险** 是一个由 JavaScript 驱动的刺激的冒险游戏。在游戏中，你需要利用可信的电脑和 JavaScript 的图灵完备能力引导无畏和坚强的 Dr. Eval 穿越神秘的主机时空带。为了追求自由，他必须挑战现实！你需要在浏览器中编辑并执行游戏中的每个 JavaScript，以便从黑暗且混乱的现实中拯救 Dr. Eval！

### 概况

你要在一个类似文字版龙与地下城的界面和一个控制台中进行游戏。每个关卡控制台都会生成一些 JavaScript 代码。所有关卡在开始的时候，都无法顺利通过，而多数 JavaScript 都不能进行编辑。使用有限的工具，打开通向下一关的道路是极具挑战的。

### 开发

执行
```
make
```
会合并 JavaScript 文件到 `scripts/build/untrusted.js` 中（并且开启 Debug 模式）。

```
make release
```
会合并并且优化 JavaScript 文件到 `scripts/build/untrusted.min.js` 中（并且关闭 Debug 模式）。

在本地运行游戏，你需要为 `index.html` 建立一个本地服务器（由于 Access-Control-Allow-Origin 的限制，这个步骤不能省略）。

如果你还没有安装 [http-server](https://github.com/nodeapps/http-server/#installing-globally)的话，首先需要：

```
sudo npm install http-server
```

然后执行：

```
make runlocal
```

### 对关卡进行贡献

在 [/levels/bonus](https://github.com/AlexNisnevich/untrusted/tree/master/levels/bonus) 中创建新的 jsx 文件，并且将该文件名添加到 [game.js](https://github.com/AlexNisnevich/untrusted/blob/master/scripts/game.js#L40) 中的 `bonusLevels` 数组里可以创建新的关卡。

如果需要添加任何新的命令让玩家使用，请确保它们都被添加到了 `reference.js` 中。

#### .jsx 文件格式

jsx 与一般的 JavaScript 文件类似，不过有一些扩展语法：
- `#BEGIN_EDITABLE#` 和 `#END_EDITABLE#` 包裹那些可以编辑的行
- `#{#` 和 `#}#` 包裹可以编辑的片段（一行中的某部分）
- `#BEGIN_PROPERTIES#` 和 `#END_PROPERTIES#` 在文件的开始封装了属性对象。可用的属性包括：
  - `commandsIntroduced`：关卡中引入的新命令的数组（参阅 `reference.js`）
  - `mapProperties`：可以包含以下任意内容：
     - `allowOverwrite`：如果为 true，允许其他对象重写竞态对象
     - `keyDelay`：指定了玩家按键之间的延迟，单位是毫秒（默认：0）
	 - `quickValidateCallback`：为了保险期间加速回调方法的验证（对于拥有大量动态对象的关卡十分有用）
     - `refreshRate`：关卡的刷新时间，单位是毫秒（为了能正常工作，需要动态对象有 `interval` 属性）
     - `showDrawingCanvas`：如果为 true，显示画布重绘区域
     - `showDummyDom`：如果为 ture，一个虚拟的 DOM 将会代替原有的地图进行显示
  - `music`：关卡的背景音乐的名称（参阅 `music.js`）
  - `startingMessage`：在关卡开始的时候显示在屏幕下方的消息（如果有的话）
  - `version`：当更新了关卡以后需要增加版本
- `#START_OF_START_LEVEL#` 和 `#END_OF_START_LEVEL#` 应当分别是 `startLevel` 方法的首行和末行

#### 添加音乐

[待补充]

### 感谢

一意孤行是由 [Alex Nisnevich](http://alex.nisnevich.com/) 和 [Greg Shuflin](https://github.com/neunenak) 开发的游戏。
汉化工作由 [mikespook](http://mikespook.com) 完成。

我们要感谢：

- [Dmitry Mazin](https://github.com/dmazin) 帮助设计和实现多行编辑器
- [Jordan Arnesen](https://github.com/extrajordanary) 协助测试并设计了关卡 #17
- [Natasha Hull-Richter](http://nhull.com) 协助进行了大量的测试，以及对关卡设计给与的支持
- Alex Bolotov、Colin Curtin、Conrad Irwin、Devin C-R、Eugene Evans、Gilbert Hsyu、Jacob Nisnevich、James Silvey、Jason Jiang、Jimmy Hack、Philip Shao、Ryan Fitzgerald、Stephen Liu、Yayoi Ukai 和 Yuval Gnessin 协助测试并给与反馈
- [Ondřej Žára](https://github.com/ondras) 和他的 [rot.js](http://ondras.github.io/rot.js/) 库
- [Marijn Haverbeke](https://github.com/marijnh) 和他的 [CodeMirror](http://codemirror.net/) 库
- [Brian Harvey](http://www.cs.berkeley.edu/~bh/) 允许我们在关卡 #19 使用了他的肖像

#### 音效

你可以[在这里听到完整的音效](https://soundcloud.com/untrusted/sets/untrusted-soundtrack).

一意孤行中出现的音乐，按照顺序有

- "The Green" - [Jonathan Holliday](http://www.soundclick.com/bands/default.cfm?bandID=836578) （授权使用）
- "Dmitry's Thing #2" - [Dmitry Mazin](https://soundcloud.com/dmitry-mazin) （为一意孤行撰写）
- "Obscure Terrain" - [Revolution Void](http://revolutionvoid.com/) (CC-BY-NC-SA)
- "coming soon" - [Fex](http://artistserver.com/Fex) （公共领域）
- "cloudy sin" - [iNTRICATE](https://soundcloud.com/stk13) （授权使用）
- "Dynamic Punctuality" - [Dmitry Mazin](https://soundcloud.com/dmitry-mazin) （为一意孤行撰写）
- "Y" - [Tortue Super Sonic](https://soundcloud.com/tss-tortue-super-sonic) (CC-BY-NC-SA)
- "Night Owl" - [Broke for Free](http://brokeforfree.com/) (CC-BY)
- "The Waves Call Her Name" - [Sycamore Drive](http://sycamoredrive.bandcamp.com/) (CC-BY-NC-SA)
- "Come and Find Me - B mix" - [Eric Skiff](http://ericskiff.com/) (CC-BY)
- "Conspiracy" - [Mike and Alan](https://www.facebook.com/MicAndAlan) （授权使用）
- "Messeah" - [RoccoW](https://soundcloud.com/roccow) (CC-BY)
- "Searching" - [Eric Skiff](http://ericskiff.com/) (CC-BY)
- "Da Funk Do You Know 'bout Chip?" - [That Andy Guy](https://soundcloud.com/that-andy-guy) （授权使用）
- "Soixante-8" - [Obsibilo](http://freemusicarchive.org/music/Obsibilo/) (CC-BY-NC-SA)
- "Tart (Pts 1 and 2)" - [BLEO feat KeFF](http://bleo.dummydrome.com/) (CC-BY-NC-SA)
- "Beach Wedding Dance" - [Rolemusic](https://soundcloud.com/rolemusic) (CC-BY-NC-SA)
- "Boss Loop 1" - [Essa](http://www.youtube.com/user/Essasmusic) （免费使用）
- "Adversity" - [Seropard](https://soundcloud.com/seropard) （免费使用）
- "Comme Des Orages" - [Obsibilo](http://freemusicarchive.org/music/Obsibilo/) (CC-BY-NC-SA)
- "Brazilicon Alley" - [Vernon Lenoir](http://vernonlenoir.wordpress.com/) (CC-BY-NC-SA)，基于 Ary Barroso 的 "Aquarela do Brazil"

### 许可证
使用双许可证授权。

- 一意孤行以及一意孤行音效在 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License (CC-BY-NC-SA 3.0)</a> 下授权。换句话说，建立在信任的基础上，你可以自由的使用、修改一意孤行用于非商业用途，而相关工作同样也需要在 CC-BY-NC-SA 授权下。
- 作为补充，一意孤行 *没有音效* 的代码需要进行商业授权。也就是说，在商业用途中使用一意孤行需要一些条款，并保证你不会使用任何相关音乐。请[与我们联系](mailto:alex.nisnevich@gmail.com,greg.shuflin@gmail.com)了解更多信息。

- 一意孤行中文版将遵守英文版的许可证协议，请[与我们联系](mailto:alex.nisnevich@gmail.com,greg.shuflin@gmail.com,mikespook@gmail.com)了解更多信息。

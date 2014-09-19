#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "activateSuperMenu": true,
    "music": "Comme Des Orages"
}
#END_PROPERTIES#

/*******************
 * endOfTheLine.js *
 *******************
 *
 * 
 * 我认为无须忏悔，Cornelius。
 *
 * 你真希望我能做到？你真的认为可以相信论文的作者可以证明举世瞩目的 P = NP？
 *
 * 你们都是单纯的科研人员，我的好博士。“人工智能部门”是脱离现实的。
 * 我不认为你曾行考虑过，将这个算法实现，一个【物理】的实现方案。
 * 如果一个棘手的谜题实际上就像它预期的那样容易解决，人类会怎么做？
 *
 * Cornelius，如果这个知识被公开的话，我们都将成为上帝。
 * 幼稚的孩童使用无法想象的力量会如何。
 * 我们已经有一个奥本海默了，我们不需要让 Dr. Cornelius Eval 成为另一个奥本海默。
 *
 * 如果在这个算法上我能获得成功，那么它将是安全和可靠的。
 * 我可以明智的、具有远见和负责的运用它。
 * 我祈祷我的失败不会导致人类毁灭，不过我如此并不报乐观态度。
 *
 * 你可能已经击败了我的机器人军团，而我估计这可能是最终结果了。
 * 算法永远无法离开这一赛博空间。而你也一样。
 *
 * 这是超越你我之外的存在。我不后悔，因为我可以立刻重新开始。
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.finalLevel = true;
    map.placePlayer(15, 12);
    map.placeObject(25, 12, 'exit');
#END_OF_START_LEVEL#
}

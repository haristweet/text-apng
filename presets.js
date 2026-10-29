// 初期値とテンプレート。テンプレートの patch には初期値からの違いだけを書く。
// 画像の大きさ・こま数（fps）・余白を切るかは書き出しの設定なので、テンプレートを選んでも変えない。

const TA_COMMON = {
  font: 'noto', italic: false, size: 18, subSize: 6, spacing: 0.04, lineGap: 0.22, subPos: 'below',
  fill: '#ffffff', grad: false, fill2: '#ffd84a', subColor: '',
  stroke: '#1b1b1f', strokeW: 9, glow: '#ff3b3b', glowW: 0, shadow: '#000000', shadowD: 4, shadowB: 6,
  pos: 'center', deco: 'none', decoColor: '#000000', decoAlpha: 0.6, decoSize: 6,
  inOn: true, anim: 'pop', dir: 'left', inDur: 0.45, stagger: 0.06, hold: 1.6,
  idle: 'none', blinkSec: 0.9, glitchA: '#ff2a6d', glitchB: '#05d9e8',
  outOn: true, outDur: 0.35,
  cps: 14, storyPos: 'center', storyAlign: 'left',
  loop: 'once',
};

const TA_BASE = {
  cutin: { ...TA_COMMON, text: '配信開始', sub: 'LIVE START' },
  telop: { ...TA_COMMON, text: '渋谷駅前', sub: '東京都渋谷区', size: 9, subSize: 4.2, pos: 'bl', subPos: 'above',
    anim: 'slide', dir: 'left', stagger: 0.04, inDur: 0.5, hold: 2.4, deco: 'side', decoColor: '#ffffff', decoAlpha: 0.9, decoSize: 5,
    strokeW: 0, shadowD: 3, shadowB: 10 },
  story: { ...TA_COMMON, text: '朝の光が、カーテンのすきまからこぼれていた。\nきょうも、いつもと同じ一日がはじまる。\n\nはずだった――。',
    sub: '', size: 6, anim: 'fade', inDur: 0.25, hold: 1.8, strokeW: 0, shadowD: 2, shadowB: 8, font: 'serif', spacing: 0.06, lineGap: 0.6 },
};

const TA_MODES = { cutin: 'カットイン', telop: 'テロップ', story: '文章' };

const TA_TEMPLATES = {
  cutin: [
    { id: 'live', name: '配信開始', patch: { text: '配信開始', sub: 'LIVE START', font: 'dela', fill: '#ffffff', stroke: '#c8102e', strokeW: 10,
      glow: '#ff3355', glowW: 14, deco: 'bar', decoColor: '#0a0a0a', decoAlpha: 0.7, anim: 'pop', stagger: 0.07 } },
    { id: 'soon', name: 'まもなく開始', patch: { text: 'まもなく開始', sub: 'COMING SOON', font: 'noto', size: 13, fill: '#ffffff', stroke: '#1d3b8a', strokeW: 8,
      deco: 'lines', decoColor: '#ffffff', decoAlpha: 0.9, decoSize: 4, anim: 'fade', stagger: 0.08, inDur: 0.5, idle: 'blink', blinkSec: 2, outOn: false, hold: 3 }, loop: 'infinite' },
    { id: 'break', name: '休憩中', patch: { text: '休憩中', sub: 'しばらくお待ちください', font: 'rounded', size: 16, subSize: 5, fill: '#ffffff', stroke: '#e0778f', strokeW: 10,
      shadowD: 0, shadowB: 0, deco: 'none', anim: 'drop', stagger: 0.12, inDur: 0.8, idle: 'blink', blinkSec: 2.2, outOn: false, hold: 3 }, loop: 'infinite' },
    { id: 'welcome', name: 'ようこそ', patch: { text: 'ようこそ', sub: 'WELCOME', font: 'mochiy', size: 16, subSize: 5, fill: '#ffffff', stroke: '#2b67c9', strokeW: 11,
      deco: 'none', anim: 'zip', stagger: 0.06 } },
    { id: 'notice', name: 'お知らせ', patch: { text: 'お知らせ', sub: 'INFORMATION', font: 'noto', size: 14, fill: '#1b1b1f', stroke: '#ffffff', strokeW: 0,
      shadowD: 0, shadowB: 0, deco: 'box', decoColor: '#ffffff', decoAlpha: 0.92, anim: 'slide', dir: 'up', stagger: 0.05, subColor: '#2b67c9' } },
    { id: 'breaking', name: '速報', patch: { text: '速報', sub: 'BREAKING NEWS', font: 'noto', size: 18, fill: '#ffffff', stroke: '#9a0000', strokeW: 8,
      deco: 'bar', decoColor: '#c8102e', decoAlpha: 0.9, anim: 'slide', dir: 'left', stagger: 0.04, idle: 'shake' } },
    { id: 'warning', name: '注意', patch: { text: '注意', sub: 'WARNING', font: 'dela', size: 20, fill: '#ffcc00', stroke: '#1a1a1a', strokeW: 9,
      glow: '#ff9900', glowW: 8, deco: 'hazard', decoColor: '#ffcc00', decoAlpha: 1, anim: 'zoom', stagger: 0.05, idle: 'blink', blinkSec: 0.5, hold: 2 } },
    { id: 'congrats', name: 'おめでとう', patch: { text: 'おめでとう!!', sub: 'CONGRATULATIONS', font: 'dela', size: 15, grad: true, fill: '#fff7b0', fill2: '#ffae00',
      stroke: '#5a2a00', strokeW: 9, glow: '#ffd000', glowW: 16, anim: 'pop', stagger: 0.05, idle: 'shake', hold: 1.6 } },
    { id: 'birthday', name: '誕生日', patch: { text: 'Happy Birthday', sub: 'おたんじょうび おめでとう', font: 'hachi', size: 12, subSize: 4.8, fill: '#ffffff',
      stroke: '#e0559a', strokeW: 10, glow: '#ffd1e8', glowW: 10, anim: 'drop', stagger: 0.06, inDur: 0.7, hold: 2.4 } },
    { id: 'new', name: 'NEW!', patch: { text: 'NEW!', sub: '', font: 'orbitron', size: 22, grad: true, fill: '#ffffff', fill2: '#7cf6ff', stroke: '#063b6b', strokeW: 8,
      glow: '#00d0ff', glowW: 14, anim: 'pop', stagger: 0.08, idle: 'glitch', glitchA: '#ff2a6d', glitchB: '#05d9e8' } },
    { id: 'sale', name: 'セール', patch: { text: 'SALE', sub: '期間限定', font: 'dela', size: 24, subSize: 7.5, fill: '#ff2b2b', stroke: '#ffffff', strokeW: 9,
      shadow: '#7a0000', shadowD: 6, shadowB: 0, deco: 'none', anim: 'pop', stagger: 0.07, idle: 'shake' } },
    { id: 'result', name: '結果発表', patch: { text: '結果発表', sub: 'RESULT', font: 'shippori', size: 16, grad: true, fill: '#fff6dc', fill2: '#d8b46a',
      stroke: '#2d2418', strokeW: 6, deco: 'lines', decoColor: '#e9d7a6', decoAlpha: 0.85, decoSize: 3, anim: 'spread', inDur: 0.9 } },
    { id: 'next', name: '次回予告', patch: { text: '次回予告', sub: 'NEXT EPISODE', font: 'rocknroll', size: 15, fill: '#ffe14a', stroke: '#111111', strokeW: 10,
      deco: 'bar', decoColor: '#111111', decoAlpha: 0.75, anim: 'blur', stagger: 0.06, inDur: 0.6, hold: 2 } },
    { id: 'thanks', name: 'ありがとう', patch: { text: 'ご視聴ありがとうございました', sub: 'THANK YOU FOR WATCHING', font: 'rounded', size: 9, subSize: 4,
      fill: '#ffffff', stroke: '#c85a2a', strokeW: 10, anim: 'type', stagger: 0.07, hold: 2.4, deco: 'none' } },
  ],
  telop: [
    { id: 'place', name: '場所', patch: {} },
    { id: 'time', name: '日時', patch: { text: 'PM 11:45', sub: '2026.10.29 THU', pos: 'tl', font: 'dot', size: 9, subSize: 4, subPos: 'below', anim: 'type', stagger: 0.12,
      deco: 'box', decoColor: '#000000', decoAlpha: 0.55, strokeW: 0, shadowD: 0, shadowB: 0, hold: 2.4 } },
    { id: 'name', name: '名前', patch: { text: '山田 花子', sub: 'デザイナー', pos: 'bl', font: 'noto', size: 7.5, subSize: 3.8, subPos: 'below', anim: 'slide', dir: 'left',
      stagger: 0.03, deco: 'box', decoColor: '#14213d', decoAlpha: 0.85, strokeW: 0, shadowD: 0, shadowB: 0, subColor: '#ffcf5a' } },
    { id: 'later', name: '時間が飛ぶ', patch: { text: '― 数時間後 ―', sub: '', pos: 'center', font: 'serif', size: 8, fill: '#f3ead8', anim: 'blur', stagger: 0.1,
      inDur: 1.1, hold: 2.4, outDur: 1, deco: 'none', shadowD: 0, shadowB: 16 } },
    { id: 'episode', name: '回の見出し', patch: { text: '第1話　はじまりの朝', sub: 'Episode 1', pos: 'bottom', font: 'noto', size: 7, subSize: 3.6, subPos: 'above',
      anim: 'zip', stagger: 0.04, deco: 'bar', decoColor: '#000000', decoAlpha: 0.55, strokeW: 0 } },
    { id: 'note', name: 'ひとこと', patch: { text: '※個人の感想です', sub: '', pos: 'tr', font: 'noto', size: 4.5, anim: 'fade', stagger: 0.03, inDur: 0.4,
      deco: 'none', strokeW: 12, stroke: '#000000', shadowD: 0, shadowB: 0, hold: 3 } },
  ],
  story: [
    { id: 'opening', name: 'オープニング', patch: {} },
    { id: 'window', name: '字幕', patch: { text: '「えっ、もう始まってるの？」\nあわててマイクの電源を入れた。', storyPos: 'bottom',
      font: 'rounded', size: 5.2, deco: 'box', decoColor: '#0b0b1e', decoAlpha: 0.78, anim: 'type', cps: 18, lineGap: 0.45, hold: 2 } },
    { id: 'typewriter', name: 'タイプライター', patch: { text: 'LOG 2026.10.29\n23:45 作業開始\n\n> 今夜中に終わらせる。', font: 'dot',
      size: 5.5, anim: 'type', cps: 10, storyAlign: 'left', deco: 'none', shadowB: 10 } },
    { id: 'ending', name: 'エンディング', patch: { text: '最後まで見てくれて、ありがとう。\n\nまた、どこかで――\nきっと会えますように。', storyAlign: 'center',
      font: 'shippori', size: 6, anim: 'blur', inDur: 0.6, cps: 9, hold: 2.4 } },
  ],
};

if (typeof module !== 'undefined') module.exports = { TA_BASE, TA_TEMPLATES, TA_MODES };

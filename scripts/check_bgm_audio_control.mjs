// input: src/components/Quiz.astro audio volume and mute control logic
// output: Fails unless audioBgm uses muted property and unmuting ensures playback resumes
// pos: scripts/check_bgm_audio_control.mjs（更新规则：音频控制逻辑变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const quizSource = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');

// 1. Check updateAudioVolumes sets audioBgm.muted explicitly
assert(quizSource.includes('audioBgm.muted = audioSettings.musicMuted;'), 'updateAudioVolumes must set audioBgm.muted explicitly');

// 2. Check unmuting triggers startBgm
assert(quizSource.includes('if (!audioSettings.musicMuted) startBgm();'), 'Unmuting music must call startBgm()');

// 3. Check muting pauses or silences BGM properly
assert(quizSource.includes('audioBgm.volume = audioSettings.volMusic / 100;'), 'updateAudioVolumes must set volume proportionally');

console.log('BGM audio control checks passed.');

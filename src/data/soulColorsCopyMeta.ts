// input: Existing SOULS definition source
// output: Stable soul slug list used by the soul color page copy blocks
// pos: src/data/soulColorsCopyMeta.ts (更新规则：文件变更需同步本注释与所属目录 README)

import { SOUL_CODES, SOUL_SLUGS_BY_CODE, type SoulCode } from './souls';

export const SOUL_COLOR_COPY_KEYS = SOUL_CODES.map(code => SOUL_SLUGS_BY_CODE[code]);

export function soulColorCopyKey(code: SoulCode): string {
  return SOUL_SLUGS_BY_CODE[code];
}

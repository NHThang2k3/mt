
const fs = require('fs');
const content = fs.readFileSync('public/vietnam.svg', 'utf8');
const paths = [];
const regex = /<path\s+d="([^"]+)"\s+title="([^"]+)"\s+id="([^"]+)"\s*\/>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  paths.push({ id: match[3], title: match[2], d: match[1] });
}

const REGION_MAPPING = {
  // Miền Bắc (Bac) - typically VN-01 to VN-20, VN-61, VN-63, VN-49, VN-46, VN-51, VN-52
  'VN-01': 'bac', 'VN-02': 'bac', 'VN-03': 'bac', 'VN-04': 'bac', 'VN-05': 'bac',
  'VN-06': 'bac', 'VN-07': 'bac', 'VN-09': 'bac', 'VN-13': 'bac', 'VN-14': 'bac',
  'VN-18': 'bac', 'VN-20': 'bac', 'VN-61': 'bac', 'VN-63': 'bac', 'VN-51': 'bac',
  'VN-52': 'bac', 'VN-49': 'bac', 'VN-46': 'bac', 'VN-11': 'bac', 'VN-12': 'bac',
  'VN-10': 'bac', 'VN-15': 'bac', 'VN-16': 'bac', 'VN-17': 'bac', 'VN-19': 'bac',

  // Miền Trung (Trung) - typically VN-21 to VN-36, VN-40, VN-53, VN-54
  'VN-21': 'trung', 'VN-22': 'trung', 'VN-23': 'trung', 'VN-24': 'trung', 'VN-25': 'trung',
  'VN-26': 'trung', 'VN-27': 'trung', 'VN-28': 'trung', 'VN-29': 'trung', 'VN-30': 'trung',
  'VN-31': 'trung', 'VN-32': 'trung', 'VN-33': 'trung', 'VN-34': 'trung', 'VN-35': 'trung',
  'VN-36': 'trung', 'VN-40': 'trung', 'VN-53': 'trung', 'VN-54': 'trung',

  // Miền Nam (Nam) - typically VN-37 to VN-60 (excluding some), VN-71 to VN-74
  'VN-37': 'nam', 'VN-39': 'nam', 'VN-41': 'nam', 'VN-43': 'nam', 'VN-44': 'nam',
  'VN-45': 'nam', 'VN-47': 'nam', 'VN-50': 'nam', 'VN-55': 'nam', 'VN-56': 'nam',
  'VN-57': 'nam', 'VN-58': 'nam', 'VN-59': 'nam', 'VN-60': 'nam', 'VN-62': 'nam',
  'VN-71': 'nam', 'VN-72': 'nam', 'VN-73': 'nam', 'VN-74': 'nam'
};

const output = `
export type MapRegion = 'bac' | 'trung' | 'nam';

export const PROVINCE_PATHS = ${JSON.stringify(paths, null, 2)};

export const REGION_MAPPING: Record<string, MapRegion> = ${JSON.stringify(REGION_MAPPING, null, 2)};
`;

fs.writeFileSync('src/data/vietnam-map.ts', output);
console.log('Generated src/data/vietnam-map.ts');

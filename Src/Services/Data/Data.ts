export interface ContextType {
  label: string;
  value: number;
}
export const chooseActionTypeData: ContextType[] = [
  { label: 'Personal', value: 0 },
  { label: 'Work', value: 1 },
  { label: 'Experimental', value: 2 },
  { label: 'Educational', value: 3 },
];
export const LANGS = [
  { lngCode: 'en', label: 'English' },
  { lngCode: 'hi', label: 'हिन्दी' },
];

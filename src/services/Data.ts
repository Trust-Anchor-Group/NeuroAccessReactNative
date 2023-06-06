export interface ContextType {
  label: string,
  value: number
}
export const chooseActionTypeData : ContextType[] = [
  { label: 'choosePurposeScreen.personalUse', value: 0 },
  { label: 'choosePurposeScreen.work', value: 1 },
  { label: 'choosePurposeScreen.experimental', value: 2 },
  { label: 'choosePurposeScreen.educational', value: 3 },
];
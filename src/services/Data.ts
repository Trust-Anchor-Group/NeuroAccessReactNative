
export interface ContextType {
  label: string,
  value: number
}
export const chooseActionTypeData : ContextType[] = [
  { label: 'Personal use', value: 0 },
  { label: 'Work', value: 1 },
  { label: 'Experimental', value: 2 },
  { label: 'Educational', value: 3 },
];
export interface ContextType {
  label: string;
  description: string;
  value: number;
}
export const chooseActionTypeData: ContextType[] = [
  { label: 'accessPurposeInformation.Personal.title', description: 'accessPurposeInformation.Personal.description', value: 0 },
  { label: 'accessPurposeInformation.Work.title', description: 'accessPurposeInformation.Work.description' , value: 1 },
  { label: 'accessPurposeInformation.Experimental.title', description: 'accessPurposeInformation.Experimental.description', value: 2 },
  { label: 'accessPurposeInformation.Educational.title', description: 'accessPurposeInformation.Educational.description', value: 3 },
];
export const LANGS = [
  { lngCode: 'en', label: 'English' },
  { lngCode: 'hi', label: 'हिन्दी' },
];

export interface ITemplate {
  id: number;
  name: string;
  templateFileName: string;
  contentVariables: IContentVariable;
}

interface IContentVariable {
  [key: string]: { type: 'array' | 'string' };
}

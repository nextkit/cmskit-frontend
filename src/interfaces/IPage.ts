import { ITemplate } from './ITemplate';
import { IPageContent } from './IPageContent';

export interface IPage {
  id?: number;
  title: string;
  uri: string;
  template: number | ITemplate;
  content?: IPageContent;
}

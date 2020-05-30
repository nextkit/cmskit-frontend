import { action, observable } from 'mobx';
import config from '../config';
import { ITemplate } from '../interfaces';
import { UploadFile } from 'antd/lib/upload/interface';

export interface ITemplateStore {
  templates: ITemplate[];
  firstLoad: boolean;
  load: () => Promise<void>;
  add: (template: { name: string; templateFile: File }) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export class TemplateStore implements ITemplateStore {
  @observable
  public templates: ITemplate[] = [];

  @observable
  public firstLoad: boolean = false;

  @action
  public load(): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/templates`)
        .then((response) => {
          if (response.ok) {
            this.firstLoad = true;
            return response.json();
          } else {
            throw Error('' + response.status);
          }
        })
        .then((templates: ITemplate[]) => (this.templates = templates))
        .finally(() => resolve());
    });
  }

  @action
  public add(template: { name: string; templateFile: File }): Promise<void> {
    return new Promise((resolve) => {
      const form = new FormData();
      form.append('name', template.name);
      form.append('templateFile', template.templateFile);

      fetch(`${config.baseUrl}/api/admin/templates`, {
        method: 'POST',
        body: form,
      })
        .then((response) => {
          if (response.ok) {
            return this.load();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }

  @action
  public remove(id: number): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/templates/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
        .then((response) => {
          if (response.ok) {
            return this.load();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }
}

import { action, observable } from 'mobx';
import config from '../config';
import { IPage, IPageContent } from '../interfaces';

export interface IPageStore {
  pages: IPage[];
  firstLoad: boolean;
  load: () => Promise<void>;
  add: (page: IPage) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateContent: (id: number, content: IPageContent) => Promise<void>;
}

export class PageStore implements IPageStore {
  @observable
  public pages: IPage[] = [];

  @observable
  public firstLoad: boolean = false;

  @action
  public load(): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/pages`)
        .then((response) => {
          if (response.ok) {
            this.firstLoad = true;
            return response.json();
          } else {
            throw Error('' + response.status);
          }
        })
        .then(
          (pages: IPage[]) =>
            (this.pages = pages.map((page) => {
              page.uri = `/${page.uri}`;
              return page;
            })),
        )
        .finally(() => resolve());
    });
  }

  @action
  public add(page: IPage): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/pages`, {
        method: 'POST',
        body: JSON.stringify(page),
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
      fetch(`${config.baseUrl}/api/admin/pages/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
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
  public updateContent(id: number, content: IPageContent): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/pages/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
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

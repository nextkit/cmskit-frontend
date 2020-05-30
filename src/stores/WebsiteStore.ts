import { action, observable } from 'mobx';
import config from '../config';
import { ILanguage, IVariable } from '../interfaces';

export interface IWebsiteStore {
  i18n: ILanguage[];
  globalVariables: IVariable[];
  loadedI18N: boolean;
  loadedGlobalVariables: boolean;
  loadI18N: () => Promise<void>;
  addI18N: (languages: ILanguage[]) => Promise<void>;
  removeI18N: (id: number) => Promise<void>;
  setDefaultI18N: (id: number) => Promise<void>;
  loadVariables: () => Promise<void>;
  addVariable: (variable: IVariable) => Promise<void>;
  updateVariable: (variable: IVariable) => Promise<void>;
  removeVariable: (id: number) => Promise<void>;
}

export class WebsiteStore implements IWebsiteStore {
  @observable
  public i18n: ILanguage[] = [];
  @observable
  public globalVariables: IVariable[] = [];

  @observable
  public loadedI18N: boolean = false;
  @observable
  public loadedGlobalVariables: boolean = false;

  @action
  public loadI18N(): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/i18n`)
        .then((response) => {
          if (response.ok) {
            this.loadedI18N = true;
            return response.json();
          } else {
            throw Error('' + response.status);
          }
        })
        .then(
          (i18n: ILanguage[]) =>
            (this.i18n = i18n.map((x) => {
              return { ...x, langCountryCode: `/${x.langCountryCode}` };
            })),
        )
        .finally(() => resolve());
    });
  }

  @action
  public addI18N(languages: ILanguage[]): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/i18n`, {
        method: 'POST',
        body: JSON.stringify(languages),
      })
        .then((response) => {
          if (response.ok) {
            return this.loadI18N();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }

  @action
  public removeI18N(id: number): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/i18n/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (response.ok) {
            return this.loadI18N();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }

  @action
  public setDefaultI18N(id: number): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/i18n/${id}`, {
        method: 'POST',
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (response.ok) {
            return this.loadI18N();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }

  @action
  public loadVariables(): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/global-variables`)
        .then((response) => {
          if (response.ok) {
            this.loadedGlobalVariables = true;
            return response.json();
          } else {
            throw Error('' + response.status);
          }
        })
        .then((globalContent: IVariable[]) => (this.globalVariables = globalContent))
        .finally(() => resolve());
    });
  }

  @action
  public addVariable(variable: IVariable): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/global-variables`, {
        method: 'POST',
        body: JSON.stringify(variable),
      })
        .then((response) => {
          if (response.ok) {
            return this.loadVariables();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }

  @action
  public removeVariable(id: number): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/global-variables/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (response.ok) {
            return this.loadVariables();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }

  @action
  public updateVariable(variable: IVariable): Promise<void> {
    return new Promise((resolve) => {
      fetch(`${config.baseUrl}/api/admin/global-variables/${variable.id}`, {
        method: 'PUT',
        body: JSON.stringify(variable),
      })
        .then((response) => {
          if (response.ok) {
            return this.loadVariables();
          } else {
            throw Error('' + response.status);
          }
        })
        .finally(() => resolve());
    });
  }
}

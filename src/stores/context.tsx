import React, { createContext } from 'react';

import { PageStore, TemplateStore, WebsiteStore } from '.';

const pageStore = new PageStore();
const templateStore = new TemplateStore();
const websiteStore = new WebsiteStore();

export const StoreContext = createContext({
  pageStore,
  templateStore,
  websiteStore,
});

const StoreContextProvider: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={{ pageStore, templateStore, websiteStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

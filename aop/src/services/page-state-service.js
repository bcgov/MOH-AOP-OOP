import { routes } from "../router/routes";

class PageStateService {
  pages = [];

  constructor() {
    this.pages = [];
    for (let key in routes) {
      this.pages.push(routes[key]);
    }
  }

  importRoutes() {}

  setPageIncomplete(path) {
    const page = this.pages.find(page => {
      return page.path === path;
    });
    if (page) {
      page.isComplete = false;
    }
  }

  setPageComplete(path) {
    const page = this.pages.find(page => {
      return page.path === path;
    });
    if (page) {
      page.isComplete = true;
    }
  }

  isPageComplete(path) {
    const page = this.pages.find(page => {
      return page.path === path;
    });
    return page && !!page.isComplete;
  }
}

export default new PageStateService();

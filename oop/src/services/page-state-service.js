import settings from '../settings';

class PageStateService {
  pages = [];

  constructor() {
    this.pages = [];
  }

  importPageRoutes(routes) {
    this.pages = [];
    for (let key in routes) {
      this.pages.push(routes[key]);
      this.pages[this.pages.length-1].isVisited = false;
    }
  }

  setPageIncomplete(path) {
    const page = this.pages.find((page) => {
      return page.path === path;
    });
    if (page) {
      page.isComplete = false;
    }
  }

  setPageComplete(path) {
    const page = this.pages.find((page) => {
      return page.path === path;
    });
    if (page) {
      page.isComplete = true;
    }
  }

  isPageComplete(path) {
    const page = this.pages.find((page) => {
      return page.path === path;
    });
    return (page && !!page.isComplete) || settings.bypassRouteGuards;
  }

  visitPage(path) {
    const page = this.pages.find((page) => {
      return page.path === path;
    });
    if (page) {
      page.isVisited = true;
    }
  }

  isPageVisited(path) {
    const page = this.pages.find((page) => {
      return page.path === path;
    });
    return page && !!page.isVisited;
  }
}

export default new PageStateService();

import { routes } from '../../../routes';
import environment from '../../../environments/environment';

class PageStateService {
  pages = [];

  constructor() {
    this.pages = [];
    for (let key in routes) {
      this.pages.push(routes[key]);
    }
    console.log('Init PageStateService.');
  }

  importRoutes() {
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
    return (page && !!page.isComplete) || environment.bypassRouteGuards;
  }
}

export default new PageStateService();
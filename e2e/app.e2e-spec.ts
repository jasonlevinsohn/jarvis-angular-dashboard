import { JarvisDashboard2Page } from './app.po';

describe('jarvis-dashboard2 App', function() {
  let page: JarvisDashboard2Page;

  beforeEach(() => {
    page = new JarvisDashboard2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

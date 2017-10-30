import { ArsPortalPage } from './app.po';

describe('ars-portal App', () => {
  let page: ArsPortalPage;

  beforeEach(() => {
    page = new ArsPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

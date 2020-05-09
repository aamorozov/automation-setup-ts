describe('DuckDuckGo search', async () => {
  it('searches for WebdriverIO', async () => {
    browser.url('https://duckduckgo.com/');
    const el = await $('#search_form_input_homepage');
    el.setValue('WebdriverIO');
    const search = await $('#search_button_homepage');
    search.click();
    const title = await browser.getTitle();
    console.log('Title is: ' + title);
  });
});

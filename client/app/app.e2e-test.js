describe('App E2E Test', function () {
  it('should default to the home page', function () {
    browser.get('http://localhost:20080/')
    expect(browser.getTitle()).toEqual('JSPM Angular1 Starter')
  })
})

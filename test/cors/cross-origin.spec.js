import SVGInjector from '../../src'

const injected =
  '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="8" height="8" data-icon="thumb-up" viewBox="0 0 8 8" id="cross-origin" title="I like it!" class="injected-svg inject-me thumb-icon" data-src="http://support.useiconic.com/svginjector-cors-test/svg/thumb-up.svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <path d="M4.438 0c-.19.021-.34.149-.438.344-.13.26-1.101 2.185-1.281 2.375-.19.18-.439.281-.719.281v4.001h3.5c.21 0 .389-.133.469-.313 0 0 1.031-2.908 1.031-3.188 0-.28-.22-.5-.5-.5h-1.5c-.28 0-.5-.25-.5-.5s.389-1.574.469-1.844c.08-.27-.053-.545-.313-.625l-.219-.031zm-4.438 3v4h1v-4h-1z"></path>\n</svg>'

describe('cross origin', () => {
  it('should render correctly', done => {
    expect.assertions(2)

    container.insertAdjacentHTML(
      'beforeend',
      '<img id="cross-origin" class="inject-me thumb-icon" data-src="http://support.useiconic.com/svginjector-cors-test/svg/thumb-up.svg" title="I like it!" alt="thumb up">'
    )

    SVGInjector(
      document.querySelector('.inject-me'),
      {
        each: svg => {
          expect(svg.outerHTML).toBe(injected)
        }
      },
      totalSVGsInjected => {
        expect(totalSVGsInjected).toBe(1)
        done()
      }
    )
  })
})

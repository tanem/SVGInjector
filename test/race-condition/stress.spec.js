import shortid from 'shortid'
import SVGInjector from '../../src'

const svgName = shortid.generate()
const source =
  '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M4.47 0c-.19.02-.37.15-.47.34-.13.26-1.09 2.19-1.28 2.38-.19.19-.44.28-.72.28v4h3.5c.21 0 .39-.13.47-.31 0 0 1.03-2.91 1.03-3.19 0-.28-.22-.5-.5-.5h-1.5c-.28 0-.5-.25-.5-.5s.39-1.58.47-1.84c.08-.26-.05-.54-.31-.63-.07-.02-.12-.04-.19-.03zm-4.47 3v4h1v-4h-1z" /></svg>'
const injected = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" id="thumb-up" title="I like it!" class="injected-svg inject-me thumb-icon" data-src="${svgName}.svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M4.47 0c-.19.02-.37.15-.47.34-.13.26-1.09 2.19-1.28 2.38-.19.19-.44.28-.72.28v4h3.5c.21 0 .39-.13.47-.31 0 0 1.03-2.91 1.03-3.19 0-.28-.22-.5-.5-.5h-1.5c-.28 0-.5-.25-.5-.5s.39-1.58.47-1.84c.08-.26-.05-.54-.31-.63-.07-.02-.12-.04-.19-.03zm-4.47 3v4h1v-4h-1z"></path></svg>`

describe('race condition', () => {
  it('should render correctly', done => {
    expect.assertions(3)

    container.insertAdjacentHTML(
      'beforeend',
      `<img id="thumb-up" class="inject-me thumb-icon" data-src="${svgName}.svg" title="I like it!" alt="thumb up">`
    )

    let x = 0
    while (x < 1000) {
      SVGInjector(
        document.querySelector('.inject-me'),
        {
          each: svg => {
            expect(svg.outerHTML).toBe(injected)
          }
        },
        totalSVGsInjected => {
          expect(totalSVGsInjected).toBe(1)
          expect(requests).toHaveLength(1)
          done()
        }
      )

      if (requests[x] && requests[x].status !== 200) {
        requests[x].respond(200, {}, source)
      }

      x++
    }
  })
})

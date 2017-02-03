import m from 'mithril'
import layout from '../../components/layout'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

async function getJs () {
  return await require.ensure([], (require) => {
    return require('./about.js').default
  })
}

export default {
  async onmatch () {
    const [ component ] = await Promise.all([
      getJs()
    ])

    this.component = component
    window.__STATE_IS_PRELOADED__ = false
  },
  render (vnode) {
    this.title = 'About - Mithril'
    document.title = this.title
    return m(layout, vnode.attrs, m(this.component, vnode.attrs))
  }
}

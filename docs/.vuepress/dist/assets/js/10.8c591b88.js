;(window.webpackJsonp = window.webpackJsonp || []).push([
  [10],
  {
    277: function (n, a, t) {
      'use strict'
      t.r(a),
        t.d(a, 'Tabbar', function () {
          return s
        })
      var o = { name: 'Tabbar' },
        e = t(14),
        i = Object(e.a)(
          o,
          function () {
            return (0, this._self._c)('div', { staticClass: 'Tabbar' }, [
              this._v('sdsd')
            ])
          },
          [],
          !1,
          null,
          null,
          null
        ).exports
      i.install = function (n) {
        n.component(i.name, i)
      }
      var s = i
      const u = [s],
        c = function (n) {
          u.forEach((a) => {
            n.component(a.name, a)
          })
        }
      'undefined' != typeof window && window.Vue && c(window.Vue)
      a.default = { install: c, Tabbar: s }
    }
  }
])

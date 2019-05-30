(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Datatable.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/Datatable.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_Table_PaginationMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../mixins/Table/PaginationMixin */ "./resources/js/mixins/Table/PaginationMixin.vue");
/* harmony import */ var _TableLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableLoader */ "./resources/js/components/Table/TableLoader.vue");
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pagination */ "./resources/js/components/Table/Pagination.vue");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import FileMixin from '../mixins/FileMixin'




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    fetchUrl: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      tableData: [],
      url: '',
      selectAll: false,
      sortedColumn: this.columns[3].title,
      order: 'desc',
      itemsShow: [15, 50, 100],
      loading: false,
      generalSearch: '',
      queries: {},
      editingIndex: 0,
      editingRow: {},
      viewColumns: false,
      activeColumns: {},
      selected: [],
      selectBoxes: {},
      editMultipleDialog: false,
      editingMultipleRow: {},
      dialog: {
        editMultiple: false,
        edit: false,
        viewColumns: false
      },
      options: {
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {// format: 'DD/MM/YY hh:mm'
        },
        autoUpdateInput: false
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    var clipboard = new Clipboard('#export-btn');
    $('.double-scroll').doubleScroll();
    $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      },
      timePicker: true
    });
    var dateInputs = this.columns.filter(function (item) {
      return item.type == 'date';
    });
    dateInputs.map(function (item) {
      $('#' + item.title).on('apply.daterangepicker', function (ev, picker) {
        var value = picker.startDate.format('DD/MM/YYYY hh:mm') + ' - ' + picker.endDate.format('DD/MM/YYYY hh:mm');
        _this.queries[item.title] = value;
        $('#' + item.title).val(value);

        _this.fetchData(true);
      });
      $('#' + item.title).on('cancel.daterangepicker', function (ev, picker) {
        _this.queries[item.title] = '';
        $('#' + item.title).val('');

        _this.fetchData(true);
      });
    });
  },
  created: function created() {
    this.loading = true;
    this.setActiveColumnsAndQueries();
    return this.fetchData();
  },
  computed: {
    getItemsCount: function getItemsCount() {
      if (this.perPage < this.pagination.meta.total) {
        return "".concat(this.perPage, " of ").concat(this.pagination.meta.total, " entries");
      }

      return "".concat(this.pagination.meta.total, " of ").concat(this.pagination.meta.total, " entries");
    },
    dataExists: function dataExists() {
      if (this.tableData.length === 0 && !this.loading) return true;
      return false;
    }
  },
  methods: {
    openDialog: function openDialog(name) {
      this.dialog[name] = true;
    },
    closeDialog: function closeDialog(name) {
      this.dialog[name] = false;
    },
    setActiveColumnsAndQueries: function setActiveColumnsAndQueries() {
      var _this2 = this;

      this.columns.map(function (column) {
        _this2.activeColumns[column.title] = true;
        _this2.queries[column.title] = '';
      });
    },
    fetchData: function fetchData() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.loading = true;
      this.fetch(reset, msg);
    },
    fetch: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.debounce(function (reset, msg) {
      var _this3 = this;

      if (reset) this.currentPage = 1;
      if (this.generalSearch == null) this.generalSearch = '';
      var dataFetchUrl = "".concat(this.url, "?page=").concat(this.currentPage, "&column=").concat(this.sortedColumn, "&order=").concat(this.order, "&per_page=").concat(this.perPage, "&search=").concat(this.generalSearch);
      Object.keys(this.queries).map(function (item) {
        var queryItem = _this3.queries[item];
        if (queryItem == null) queryItem = '';
        dataFetchUrl += '&' + item + '=' + queryItem;
      });
      this.loading = true;
      axios.get(dataFetchUrl).then(function (_ref) {
        var data = _ref.data;
        _this3.pagination = data;
        _this3.tableData = data.data;
        if (msg) setTimeout(function () {
          return _this3.$notify(msg);
        }, 200);
        _this3.loading = false;

        _this3.$store.dispatch('loading/setLoading', false);
      })["catch"](function (error) {
        _this3.tableData = [];

        _this3.$store.dispatch('loading/setLoading', false);
      });
    }, 500),
    serialNumber: function serialNumber(key) {
      return (this.currentPage - 1) * this.perPage + 1 + key;
    },
    changePage: function changePage(pageNumber) {
      this.loading = true;
      this.currentPage = pageNumber;
      this.selectAll = false;
      this.fetchData();
    },
    sortByColumn: function sortByColumn(column) {
      this.loading = true;

      if (column.title === this.sortedColumn) {
        this.order = this.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortedColumn = column.title;
        this.order = 'asc';
      }

      this.fetchData();
    },
    select: function select(item) {
      if (!this.selected.includes(item.id)) {
        this.selected.push(item.id);
        this.selectBoxes[item.id] = true;
      } else {
        this.selected.splice(this.selected.indexOf(item.id), 1);
        this.selectBoxes[item.id] = false;
      }
    },
    update: function update(index, row) {
      var _this4 = this;

      this.$store.dispatch('loading/setLoading', true);
      axios.post(this.url + '/update', {
        row: JSON.stringify(row)
      }).then(function (response) {
        _this4.fetchData(false, {
          type: 'success',
          text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been updated'
        });
      })["catch"](function (error) {
        _this4.handleFailure;
      });
    },
    setEditDialog: function setEditDialog(key1, data) {
      this.openDialog('edit');
      this.editingIndex = key1;
      Object.assign(this.editingRow, data);
    },
    destroy: function destroy(index, row) {
      var _this5 = this;

      this.$store.dispatch('loading/setLoading', true);
      axios.post(this.url + '/destroy', {
        id: row.id
      }).then(function (response) {
        _this5.fetchData(false, {
          type: 'success',
          text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been deleted'
        });
      })["catch"](function (error) {
        _this5.handleFailure;
      });
    },
    updateMultiple: function updateMultiple(row) {
      var _this6 = this;

      this.$store.dispatch('loading/setLoading', true);
      axios.post(this.url + '/update-many', {
        selected: JSON.stringify(this.selected),
        row: JSON.stringify(row)
      }).then(function (response) {
        _this6.fetchData(false, {
          type: 'success',
          text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Items has been updated'
        });
      })["catch"](function (error) {
        _this6.handleFailure;
      });
    },
    toggleAll: function toggleAll() {
      var _this7 = this;

      if (!this.selectAll) {
        this.selectAll = true;
        this.tableData.map(function (item) {
          _this7.selectBoxes[item.id] = true;
          if (_this7.selected.indexOf(item.id) == -1) _this7.selected.push(item.id);
        });
      } else {
        this.selectAll = false;
        this.tableData.map(function (item) {
          _this7.selectBoxes[item.id] = false;
          if (_this7.selected.indexOf(item.id) != -1) _this7.selected.splice(_this7.selected.indexOf(item.id), 1);
        });
      }
    },
    handleFailure: function handleFailure() {
      this.loading = false;
      this.$store.dispatch('loading/setLoading', false);
      this.fetchData(false, {
        type: 'danger',
        text: '<i class="fa fa-times" aria-hidden="true"></i> &nbsp;An error occured'
      });
    },
    clearFilters: function clearFilters() {
      var _this8 = this;

      this.queries = {};
      this.generalSearch = '';
      this.columns.map(function (column) {
        _this8.queries[column.title] = '';
      });
      this.fetchData();
    }
  },
  filters: {
    columnHead: function columnHead(value) {
      return value.split('_').join(' ').toUpperCase();
    },
    columnLow: function columnLow(value) {
      return value.split('_').join(' ').toLowerCase();
    }
  },
  watch: {
    fetchUrl: {
      handler: function handler(fetchUrl) {
        this.url = fetchUrl;
      },
      immediate: true
    }
  },
  name: 'DataTable',
  mixins: [_mixins_Table_PaginationMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  components: {
    TableLoader: _TableLoader__WEBPACK_IMPORTED_MODULE_1__["default"],
    Pagination: _Pagination__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Pagination.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/Pagination.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    pagination: {
      type: Object,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    pagesNumber: {
      type: Array,
      required: true
    }
  },
  methods: {
    changePage: function changePage(pageNumber) {
      this.$emit('changePage', pageNumber);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/TableLoader.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/TableLoader.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/mixins/Table/PaginationMixin.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/mixins/Table/PaginationMixin.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      pagination: {
        meta: {
          to: 1,
          from: 1
        }
      },
      offset: 4,
      currentPage: 1,
      perPage: 15
    };
  },
  computed: {
    pagesNumber: function pagesNumber() {
      if (!this.pagination.meta.to) {
        return [];
      }

      var from = this.pagination.meta.current_page - this.offset;

      if (from < 1) {
        from = 1;
      }

      var to = from + this.offset * 2;

      if (to >= this.pagination.meta.last_page) {
        to = this.pagination.meta.last_page;
      }

      var pagesArray = [];

      for (var page = from; page <= to; page++) {
        pagesArray.push(page);
      }

      return pagesArray;
    },
    totalData: function totalData() {
      return this.pagination.meta.to - this.pagination.meta.from + 1;
    }
  },
  methods: {
    changePage: function changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Users.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Users.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Table_Datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Table/Datatable */ "./resources/js/components/Table/Datatable.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function (_data) {
    function data() {
      return _data.apply(this, arguments);
    }

    data.toString = function () {
      return _data.toString();
    };

    return data;
  }(function () {
    return {
      url: data.users.url,
      columns: data.users.headers
    };
  }),
  components: {
    Datatable: _components_Table_Datatable__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Datatable.vue?vue&type=template&id=27d47028&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/Datatable.vue?vue&type=template&id=27d47028& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-layout",
        [
          _c(
            "v-flex",
            { staticClass: "d-flex align-center", attrs: { xs6: "" } },
            [
              _c(
                "div",
                { staticClass: "items-show" },
                [
                  _c("span", [_vm._v("Show")]),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: { items: _vm.itemsShow, label: "Show", solo: "" },
                    on: {
                      change: function($event) {
                        return _vm.fetchData(true)
                      }
                    },
                    model: {
                      value: _vm.perPage,
                      callback: function($$v) {
                        _vm.perPage = $$v
                      },
                      expression: "perPage"
                    }
                  }),
                  _vm._v(" "),
                  _c("span", [_vm._v("entries")])
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c("v-flex", { staticClass: "text-right", attrs: { xs6: "" } }, [
            _c("div", { staticClass: "items-count" }, [
              !_vm.loading
                ? _c("div", [
                    _c("p", { staticClass: "text-white" }, [
                      _vm._v(
                        "\n                        Last Update @ " +
                          _vm._s(_vm.pagination.meta.last_update) +
                          "\n                    "
                      )
                    ]),
                    _vm._v(" "),
                    _c("i", [_vm._v(_vm._s(_vm.getItemsCount))])
                  ])
                : _c("div", { staticStyle: { height: "50px" } }, [
                    _c("img", {
                      attrs: { src: "/images/ajax-loader.gif", alt: "" }
                    })
                  ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("u", [_vm._v("Selected: " + _vm._s(_vm.selected.length))])
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider", { attrs: { color: "white" } }),
      _vm._v(" "),
      _c(
        "v-layout",
        { staticClass: "table-tools" },
        [
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { color: "blue", dark: "" },
                  on: {
                    click: function($event) {
                      return _vm.fetchData(true)
                    }
                  }
                },
                [
                  _vm._v("\n                Reload \n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("fas fa-sync")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                { attrs: { color: "yellow" }, on: { click: _vm.clearFilters } },
                [
                  _vm._v("\n                Clear \n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("fas fa-eraser")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { color: "secondary", dark: "" },
                  on: {
                    click: function($event) {
                      return _vm.openDialog("viewColumns")
                    }
                  }
                },
                [
                  _vm._v("\n                Columns \n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("fas fa-columns")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    disabled: _vm.selected.length < 2,
                    color: "secondary",
                    dark: ""
                  },
                  on: {
                    click: function($event) {
                      return _vm.openDialog("editMultiple")
                    }
                  }
                },
                [
                  _vm._v("\n                Update \n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("fas fa-edit")
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        [
          _c(
            "v-flex",
            { attrs: { xs3: "", "offset-xs9": "" } },
            [
              _c("v-text-field", {
                staticClass: "generalSearch",
                attrs: {
                  solo: "",
                  "prepend-inner-icon": "search",
                  autocomplete: "off",
                  clearable: "",
                  label: "Search"
                },
                on: {
                  input: function($event) {
                    return _vm.fetchData(true)
                  }
                },
                model: {
                  value: _vm.generalSearch,
                  callback: function($$v) {
                    _vm.generalSearch = $$v
                  },
                  expression: "generalSearch"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("table-loader", { attrs: { loading: _vm.loading } }),
      _vm._v(" "),
      _c("div", { staticClass: "wrapper double-scroll" }, [
        _c(
          "table",
          {
            directives: [{ name: "scroll", rawName: "v-scroll" }],
            staticClass: "elevation-3 table table-bordered bg-white mb-0",
            attrs: { id: "resultsTable", "data-tableName": "Test Table 2" }
          },
          [
            _c("thead", [
              _c(
                "tr",
                { staticClass: "bg-dark text-white" },
                [
                  _c("th", { staticClass: "pt-3", attrs: { width: "5%" } }),
                  _vm._v(" "),
                  _c("th", { staticClass: "pt-3", attrs: { width: "5%" } }),
                  _vm._v(" "),
                  _vm._l(_vm.columns, function(column) {
                    return _vm.activeColumns[column.title]
                      ? _c(
                          "th",
                          {
                            key: column.title,
                            staticClass: "table-header",
                            on: {
                              click: function($event) {
                                return _vm.sortByColumn(column)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm._f("columnHead")(column.title)) +
                                "\n                        "
                            ),
                            column.title === _vm.sortedColumn
                              ? _c("span", [
                                  _vm.order === "asc"
                                    ? _c("i", {
                                        staticClass: "fas fa-chevron-up"
                                      })
                                    : _c("i", {
                                        staticClass: "fas fa-chevron-down"
                                      })
                                ])
                              : _vm._e()
                          ]
                        )
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _c("th", { staticClass: "pt-3", attrs: { width: "10%" } })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "tr",
                { staticClass: "bg-dark text-white" },
                [
                  _c("th", { attrs: { width: "5%" } }),
                  _vm._v(" "),
                  _c(
                    "th",
                    { attrs: { width: "5%" } },
                    [
                      _c("v-checkbox", {
                        staticClass: "toggleAll mt-0",
                        attrs: { color: "white" },
                        on: {
                          click: function($event) {
                            if ($event.target !== $event.currentTarget) {
                              return null
                            }
                            return _vm.toggleAll($event)
                          }
                        },
                        model: {
                          value: _vm.selectAll,
                          callback: function($$v) {
                            _vm.selectAll = $$v
                          },
                          expression: "selectAll"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.columns, function(column) {
                    return _vm.activeColumns[column.title]
                      ? _c(
                          "th",
                          { key: column.title, staticClass: "pt-0 pb-0" },
                          [
                            column.type == "text"
                              ? _c("v-text-field", {
                                  staticStyle: { "min-width": "100px" },
                                  attrs: {
                                    clearable: "",
                                    solo: "",
                                    autocomplete: "off",
                                    name: "name",
                                    label: "",
                                    "prepend-inner-icon": "search"
                                  },
                                  on: {
                                    input: function($event) {
                                      return _vm.fetchData(true)
                                    }
                                  },
                                  model: {
                                    value: _vm.queries[column.title],
                                    callback: function($$v) {
                                      _vm.$set(_vm.queries, column.title, $$v)
                                    },
                                    expression: "queries[column.title]"
                                  }
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            column.type == "date"
                              ? _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.queries[column.title],
                                      expression: "queries[column.title]"
                                    }
                                  ],
                                  staticClass: "date-range-picker elevation-2",
                                  attrs: {
                                    type: "text",
                                    name: "datefilter",
                                    autocomplete: "off",
                                    id: column.title
                                  },
                                  domProps: {
                                    value: _vm.queries[column.title]
                                  },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.queries,
                                        column.title,
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _c("th", { attrs: { width: "10%" } })
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              [
                _vm.dataExists
                  ? _c("tr", [
                      _c(
                        "td",
                        {
                          staticClass: "no-data bg-info",
                          attrs: { colspan: _vm.columns.length + 3 }
                        },
                        [
                          _vm._v(
                            "\n                        No data was found\n                    "
                          )
                        ]
                      )
                    ])
                  : _vm._l(_vm.tableData, function(data, key1) {
                      return _c(
                        "tr",
                        { key: data.id, staticClass: "m-datatable__row" },
                        [
                          _c("td", { attrs: { width: "5%" } }, [
                            _vm._v(_vm._s(_vm.serialNumber(key1)))
                          ]),
                          _vm._v(" "),
                          _c(
                            "td",
                            { attrs: { width: "5%" } },
                            [
                              _c("v-checkbox", {
                                attrs: { color: "black" },
                                on: {
                                  change: function($event) {
                                    return _vm.select(data)
                                  }
                                },
                                model: {
                                  value: _vm.selectBoxes[data.id],
                                  callback: function($$v) {
                                    _vm.$set(_vm.selectBoxes, data.id, $$v)
                                  },
                                  expression: "selectBoxes[data.id]"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm._l(data, function(value, key) {
                            return _vm.activeColumns[key]
                              ? _c("td", [
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(value) +
                                      "\n                    "
                                  )
                                ])
                              : _vm._e()
                          }),
                          _vm._v(" "),
                          _c(
                            "td",
                            {
                              staticStyle: { "white-space": "nowrap" },
                              attrs: { width: "10%" }
                            },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    flat: "",
                                    fab: "",
                                    dark: "",
                                    small: "",
                                    color: "info"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.setEditDialog(key1, data)
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", { attrs: { dark: "" } }, [
                                    _vm._v(
                                      "\n                                edit\n                            "
                                    )
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    flat: "",
                                    fab: "",
                                    dark: "",
                                    small: "",
                                    color: "red"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.destroy(_vm.editingRow, data)
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", { attrs: { dark: "" } }, [
                                    _vm._v("delete")
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        2
                      )
                    })
              ],
              2
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("table-loader", { attrs: { loading: _vm.loading } }),
      _vm._v(" "),
      _vm.tableData.length
        ? _c("pagination", {
            staticClass: "pagination",
            attrs: {
              pagination: _vm.pagination,
              tableData: _vm.tableData,
              currentPage: _vm.currentPage,
              pagesNumber: _vm.pagesNumber
            },
            on: { changePage: _vm.changePage }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "500" },
          model: {
            value: _vm.dialog.viewColumns,
            callback: function($$v) {
              _vm.$set(_vm.dialog, "viewColumns", $$v)
            },
            expression: "dialog.viewColumns"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                {
                  staticClass: "headline grey lighten-2",
                  attrs: { "primary-title": "" }
                },
                [_vm._v("\n                Columns\n            ")]
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                { staticClass: "d-flex", staticStyle: { "flex-flow": "wrap" } },
                [
                  _vm._l(_vm.columns, function(column, key) {
                    return _c("v-checkbox", {
                      key: column.title,
                      staticClass: "d-inline-block ml-3",
                      attrs: {
                        label: _vm._f("columnLow")(column.title),
                        color: "black"
                      },
                      model: {
                        value: _vm.activeColumns[column.title],
                        callback: function($$v) {
                          _vm.$set(_vm.activeColumns, column.title, $$v)
                        },
                        expression: "activeColumns[column.title]"
                      }
                    })
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "w-100 ml-0 mr-0",
                      attrs: { dark: "" },
                      on: {
                        click: function($event) {
                          return _vm.closeDialog("viewColumns")
                        }
                      }
                    },
                    [_vm._v("Ok")]
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "close-window",
                  attrs: { flat: "", icon: "" },
                  on: {
                    click: function($event) {
                      return _vm.closeDialog("viewColumns")
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("fa fa-times")
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", width: "500" },
          model: {
            value: _vm.dialog.edit,
            callback: function($$v) {
              _vm.$set(_vm.dialog, "edit", $$v)
            },
            expression: "dialog.edit"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                {
                  staticClass: "headline grey lighten-2",
                  attrs: { "primary-title": "" }
                },
                [_vm._v("\n                Edit\n            ")]
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    {
                      attrs: { method: "post" },
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.update(_vm.editingIndex, _vm.editingRow)
                        }
                      }
                    },
                    [
                      _vm._l(_vm.columns, function(column, key) {
                        return column.type == "text"
                          ? _c("v-text-field", {
                              key: column.title,
                              staticClass: "mt-3",
                              attrs: {
                                label: column.title,
                                solo: "",
                                type: "text"
                              },
                              model: {
                                value: _vm.editingRow[column.title],
                                callback: function($$v) {
                                  _vm.$set(_vm.editingRow, column.title, $$v)
                                },
                                expression: "editingRow[column.title]"
                              }
                            })
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 w-100",
                          attrs: { color: "primary", type: "submit" }
                        },
                        [_vm._v("edit")]
                      )
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "close-window",
                      attrs: { flat: "", icon: "" },
                      on: {
                        click: function($event) {
                          return _vm.closeDialog("edit")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { small: "" } }, [
                        _vm._v("fa fa-times")
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", width: "500" },
          model: {
            value: _vm.dialog.editMultiple,
            callback: function($$v) {
              _vm.$set(_vm.dialog, "editMultiple", $$v)
            },
            expression: "dialog.editMultiple"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                {
                  staticClass: "headline grey lighten-2",
                  attrs: { "primary-title": "" }
                },
                [_vm._v("\n                Edit fields\n            ")]
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    {
                      attrs: { method: "post" },
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.updateMultiple(_vm.editingMultipleRow)
                        }
                      }
                    },
                    [
                      _vm._l(_vm.columns, function(column, key) {
                        return column.type == "text"
                          ? _c("v-text-field", {
                              key: column.title,
                              staticClass: "mt-3",
                              attrs: {
                                label: column.title,
                                solo: "",
                                type: "text"
                              },
                              model: {
                                value: _vm.editingMultipleRow[column.title],
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.editingMultipleRow,
                                    column.title,
                                    $$v
                                  )
                                },
                                expression: "editingMultipleRow[column.title]"
                              }
                            })
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 w-100",
                          attrs: { color: "primary", type: "submit" }
                        },
                        [
                          _vm._v(
                            "\n                        edit\n                    "
                          )
                        ]
                      )
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "close-window",
                      attrs: { flat: "", icon: "" },
                      on: {
                        click: function($event) {
                          return _vm.closeDialog("editMultiple")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { small: "" } }, [
                        _vm._v("fa fa-times")
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Pagination.vue?vue&type=template&id=93c2acf4&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/Pagination.vue?vue&type=template&id=93c2acf4& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.pagination && _vm.tableData.length > 0
    ? _c(
        "nav",
        {
          staticClass:
            "text-center ml-auto mr-auto d-flex align-center justify-content-center"
        },
        [
          _c(
            "ul",
            { staticClass: "pagination justify-content-center m-0" },
            [
              _c(
                "li",
                { class: { disabled: _vm.currentPage === 1 } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "page-link d-flex",
                      attrs: {
                        disabled: _vm.currentPage === 1,
                        dark: "",
                        fab: "",
                        small: "",
                        href: "#"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.changePage(1)
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("fast_rewind")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                { class: { disabled: _vm.currentPage === 1 } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "page-link d-flex",
                      attrs: {
                        disabled: _vm.currentPage === 1,
                        dark: "",
                        fab: "",
                        small: "",
                        href: "#"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.changePage(_vm.currentPage - 1)
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("chevron_left")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm._l(_vm.pagesNumber, function(page) {
                return _c(
                  "li",
                  {
                    staticClass: "page-item",
                    class: { active: page == _vm.pagination.meta.current_page }
                  },
                  [
                    _c(
                      "v-btn",
                      {
                        staticClass: "page-link d-flex",
                        attrs: {
                          fab: "",
                          small: "",
                          href: "javascript:void(0)"
                        },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.changePage(page)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(page) +
                            "\n                "
                        )
                      ]
                    )
                  ],
                  1
                )
              }),
              _vm._v(" "),
              _c(
                "li",
                {
                  class: {
                    disabled: _vm.currentPage === _vm.pagination.meta.last_page
                  }
                },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "page-link d-flex",
                      attrs: {
                        disabled:
                          _vm.currentPage === _vm.pagination.meta.last_page,
                        dark: "",
                        fab: "",
                        small: "",
                        href: "#"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.changePage(_vm.currentPage + 1)
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("chevron_right")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  class: {
                    disabled: _vm.currentPage === _vm.pagination.meta.last_page
                  }
                },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "page-link d-flex",
                      attrs: {
                        disabled:
                          _vm.currentPage === _vm.pagination.meta.last_page,
                        dark: "",
                        fab: "",
                        small: "",
                        href: "#"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.changePage(_vm.pagination.meta.last_page)
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("fast_forward")])],
                    1
                  )
                ],
                1
              )
            ],
            2
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/TableLoader.vue?vue&type=template&id=27973dc5&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/TableLoader.vue?vue&type=template&id=27973dc5& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "loader", class: { nopacity: !_vm.loading } },
    [
      _c("v-progress-linear", {
        staticClass: "mb-0 mt-0",
        attrs: { indeterminate: true, color: "blue" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Users.vue?vue&type=template&id=e2911f0e&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Users.vue?vue&type=template&id=e2911f0e& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-layout",
        { staticClass: "table-tools" },
        [
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    color: "green",
                    dark: "",
                    href: "/storage/invoices.xlsx"
                  }
                },
                [
                  _vm._v("\n                Excel \n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("far fa-file-excel")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    color: "red",
                    dark: "",
                    href: "/storage/invoices.pdf",
                    download: ""
                  }
                },
                [
                  _vm._v("\n                PDF \n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("far fa-file-pdf")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs1: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    id: "export-btn",
                    "data-clipboard-target": "#resultsTable"
                  }
                },
                [
                  _vm._v("\n                Export\n                "),
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("fas fa-file-export")
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider", { attrs: { color: "white" } }),
      _vm._v(" "),
      _c("datatable", { attrs: { "fetch-url": _vm.url, columns: _vm.columns } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Table/Datatable.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/Table/Datatable.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Datatable_vue_vue_type_template_id_27d47028___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Datatable.vue?vue&type=template&id=27d47028& */ "./resources/js/components/Table/Datatable.vue?vue&type=template&id=27d47028&");
/* harmony import */ var _Datatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Datatable.vue?vue&type=script&lang=js& */ "./resources/js/components/Table/Datatable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Datatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Datatable_vue_vue_type_template_id_27d47028___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Datatable_vue_vue_type_template_id_27d47028___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Table/Datatable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Table/Datatable.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Table/Datatable.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Datatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Datatable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Datatable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Datatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Table/Datatable.vue?vue&type=template&id=27d47028&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Table/Datatable.vue?vue&type=template&id=27d47028& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Datatable_vue_vue_type_template_id_27d47028___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Datatable.vue?vue&type=template&id=27d47028& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Datatable.vue?vue&type=template&id=27d47028&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Datatable_vue_vue_type_template_id_27d47028___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Datatable_vue_vue_type_template_id_27d47028___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Table/Pagination.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/Table/Pagination.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination_vue_vue_type_template_id_93c2acf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.vue?vue&type=template&id=93c2acf4& */ "./resources/js/components/Table/Pagination.vue?vue&type=template&id=93c2acf4&");
/* harmony import */ var _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.vue?vue&type=script&lang=js& */ "./resources/js/components/Table/Pagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_vue_vue_type_template_id_93c2acf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Pagination_vue_vue_type_template_id_93c2acf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Table/Pagination.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Table/Pagination.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Table/Pagination.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Pagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Pagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Table/Pagination.vue?vue&type=template&id=93c2acf4&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Table/Pagination.vue?vue&type=template&id=93c2acf4& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_93c2acf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Pagination.vue?vue&type=template&id=93c2acf4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Pagination.vue?vue&type=template&id=93c2acf4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_93c2acf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_93c2acf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Table/TableLoader.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Table/TableLoader.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableLoader_vue_vue_type_template_id_27973dc5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableLoader.vue?vue&type=template&id=27973dc5& */ "./resources/js/components/Table/TableLoader.vue?vue&type=template&id=27973dc5&");
/* harmony import */ var _TableLoader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableLoader.vue?vue&type=script&lang=js& */ "./resources/js/components/Table/TableLoader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TableLoader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableLoader_vue_vue_type_template_id_27973dc5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TableLoader_vue_vue_type_template_id_27973dc5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Table/TableLoader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Table/TableLoader.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Table/TableLoader.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableLoader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TableLoader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/TableLoader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableLoader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Table/TableLoader.vue?vue&type=template&id=27973dc5&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Table/TableLoader.vue?vue&type=template&id=27973dc5& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableLoader_vue_vue_type_template_id_27973dc5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TableLoader.vue?vue&type=template&id=27973dc5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/TableLoader.vue?vue&type=template&id=27973dc5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableLoader_vue_vue_type_template_id_27973dc5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableLoader_vue_vue_type_template_id_27973dc5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/mixins/Table/PaginationMixin.vue":
/*!*******************************************************!*\
  !*** ./resources/js/mixins/Table/PaginationMixin.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PaginationMixin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaginationMixin.vue?vue&type=script&lang=js& */ "./resources/js/mixins/Table/PaginationMixin.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _PaginationMixin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/mixins/Table/PaginationMixin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/mixins/Table/PaginationMixin.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/mixins/Table/PaginationMixin.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationMixin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PaginationMixin.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/mixins/Table/PaginationMixin.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationMixin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Users.vue":
/*!**************************************!*\
  !*** ./resources/js/views/Users.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_vue_vue_type_template_id_e2911f0e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=e2911f0e& */ "./resources/js/views/Users.vue?vue&type=template&id=e2911f0e&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/views/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_e2911f0e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Users_vue_vue_type_template_id_e2911f0e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Users.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Users.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/views/Users.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Users.vue?vue&type=template&id=e2911f0e&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Users.vue?vue&type=template&id=e2911f0e& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_e2911f0e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=template&id=e2911f0e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Users.vue?vue&type=template&id=e2911f0e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_e2911f0e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_e2911f0e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
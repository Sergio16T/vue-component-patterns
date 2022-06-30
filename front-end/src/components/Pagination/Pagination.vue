<script>
export default {
  name: 'paginationFooter',
  props: {
    page: Number,
    numberPerPage: Number,
    totalCount: Number,
  },

  data: () => ({
    select: {
      text: 'View 25',
      value: 25,
    },
    pageSizes: [
      {
        text: 'View 10',
        value: 10,

      },
      {
        text: 'View 25',
        value: 25,

      },
      {
        text: 'View 50',
        value: 50,
      },
      {
        text: 'View 100',
        value: 100,
      },
    ],
  }),
  methods: {
    goToPage1() {
      this.$emit('updatePage', 1, this.numberPerPage);
    },

    goToLastPage() {
      this.$emit('updatePage', this.numberOfPages, this.numberPerPage);
    },

    goToNextPage() {
      this.$emit('updatePage', this.page + 1, this.numberPerPage);
    },

    goToPreviousPage() {
      this.$emit('updatePage', this.page - 1, this.numberPerPage);
    },

    updatePageInput(e) {
      const { value } = e.target;

      let page = parseInt(value, 10);

      if (page === this.page || !value) {
        return;
      }

      if (page === 0) {
        return;
      }

      if (page > this.numberOfPages) {
        page = this.numberOfPages;
      }

      this.$emit('updatePage', page, this.numberPerPage);
    },

    validateInput(e) {
      const keyCode = (e.keyCode ? e.keyCode : e.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        e.preventDefault();
      }
    },

    updatePageSize(numberPerPage) {
      console.log('numberPerPage');
      this.$emit('updatePage', this.page, numberPerPage);
    },
  },

  watch: {
    select(numberPerPage) {
      this.updatePageSize(numberPerPage);
    }
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.totalCount / this.numberPerPage) || 1;
    },
    pageRange() {
      const rangeStart = (this.page - 1) * this.numberPerPage + 1;
      const rangeEnd = this.page === this.numberOfPages ? this.totalCount : this.numberPerPage * this.page;
      return `${rangeStart} - ${rangeEnd} of ${this.totalCount}`;
    },

    goToPage1Disabled() {
      return this.page === 1;
    },

    goToPreviousPageDisabled() {
      return this.page - 1 === 0;
    },

    goToNextPageDisabled() {
      return this.page + 1 > this.numberOfPages;
    },

    goToLastPageDisabled() {
      return this.page === this.numberOfPages;
    },

  },

};

</script>

<template>
  <div class="SM-footer">
    <div class="pagination" test-id="SM-pagination">
        <span class="page-range">{{ pageRange }}</span>
        <button v-on:click="goToPage1" :disabled="goToPage1Disabled" tabindex="0">
          <v-icon>
            mdi-chevron-double-left
          </v-icon>
        </button>
        <button v-on:click="goToPreviousPage" :disabled="goToPreviousPageDisabled" tabindex="0">
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </button>

        <span>{{ `Page` }}</span>
        <input
          :value="`${page}`"
          @keypress="validateInput"
          v-on:keyup.enter="updatePageInput"
          v-on:blur="updatePageInput"
          tabindex="0"
        />
        <span>{{ `of ${numberOfPages} `}}</span>

        <button v-on:click="goToNextPage" :disabled="goToNextPageDisabled" tabindex="0">
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </button>

        <button v-on:click="goToLastPage" :disabled="goToLastPageDisabled" tabindex="0">
          <v-icon>
            mdi-chevron-double-right
          </v-icon>
        </button>
    </div>
    <v-select
      hide-details
      test-id="page-size-select"
      aria-label="number of records per page"
      class="selectItem"
      v-model="select"
      :items="pageSizes"
      item-title="text"
      item-value="value"
    />

  </div>
</template>

<style lang="scss" scoped>
.SM-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 0;
    background: white;
    .pagination {
        padding: 4px 1rem;
        transition: color .2s ease-in;
        display: inline-block;
        font-size: 14px;
        height: 31px;
        flex-grow: 1;
        span {
            color: rgb(77, 77, 77);
            display: inline-block;
        }
        .page-range {
            margin-right: 1rem;
            min-width: 110px;
        }
        button {
            background: transparent;
            cursor: pointer;
            border: 0;
            width: 44px;
            height: 44px;
            &:focus {
                box-shadow: rgb(51, 180, 255) 0px 0px 0px 2px;
                outline: none;
            }
            &:hover,
            &:focus {
                background-color: rgb(235, 235, 235);
            }
            &:hover:not([disabled]) {
                color: black;
            }
            i {
                color: rgb(77, 77, 77);
            }
            &:disabled {
                cursor: not-allowed;
                opacity: .4;
                i {
                    color: rgba(77, 77, 77, .4);
                }
            }

            &:first-of-type {
                padding-right: 0;
            }

            &:nth-of-type(2) {
                margin-right: 5px;
            }

            &:nth-of-type(3) {
                margin-left: 5px;
            }

            &:last-of-type {
                padding-left: 0;
            }
        }

        input {
            width: 60px;
            border: 1px solid  rgb(204, 204, 204);
            text-align: center;
            border-radius: 3px;
            margin: 0 1rem;
            background-color: rgb(252, 252, 253);
            color: rgb(77, 77, 77);
            height: 30px;
        }
    }
    .selectItem {
        display: inline-block;
        margin-left: auto;
        width: min-content;
        max-width: 156.24px;
        padding-top: 0;
        ::v-deep .v-select__selection--comma {
            margin-right: 10px;
        }
    }
}
</style>
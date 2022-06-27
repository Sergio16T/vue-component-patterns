<script>
export default {
    data: () => ({
        state: {
            tabIndex: 0,
        },
    }),

    provide() {
        return {
            state: this.state, // by providing an object Vue makes state provided to children reactive
            setTabIndex: this.setTabIndex,
        };
    },

    methods: {
        setTabIndex(index) {
            this.state.tabIndex = index;
        },
    }
}
</script>

<template>
    <div class="tab-provider">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .tab-provider {
        width: 100%;
    }
   .tabs {
        border: 1px solid hsl(210, 14%, 83%);
        border-radius: 6px;
        overflow: hidden ;
        & > * {
            border-right: 1px solid hsl(210, 14%, 83%);
        }
        width: 300px;
    }
    .tab {
        width: 50%;
        display: inline-block;
        padding: .5rem 1rem;
        cursor: pointer;
        font-size: 1rem;
        text-align: center;
        &:last-child {
            border-right: 0;
        }
    }
    .tab[aria-disabled="true"] {
        pointer-events: none;
        color: rgba(0, 0, 0, .3);
    }
    .tab.active {
        background: white;
        color: black;
    }
</style>
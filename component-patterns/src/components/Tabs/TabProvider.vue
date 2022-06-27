<script>
export default {
    data: () => ({
        tabIndex: 0,
    }),

    provide() {
        return {
            tabIndex: this.tabIndex,
            setTabIndex: this.setTabIndex,
        };
    },

    methods: {
        setTabIndex(index) {
            this.tabIndex = index;
        },
    }
}
</script>

<template lang="">
    <div>
        <slot></slot>
    </div>
</template>
<style lang="">

</style>
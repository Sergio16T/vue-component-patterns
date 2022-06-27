<script>
export default {
    inject: ['state', 'setTabIndex'],
    props: {
        index: Number,
    },

    computed: {
        isActive() {
            const { tabIndex } = this.state;
            return this.index === tabIndex;
        },
    },
}
</script>

<template>
    <div class="tab" :class="{ active: isActive }" v-on:click="setTabIndex(this.index)">
        <slot></slot>
    </div>
</template>

<style lang="scss">

</style>
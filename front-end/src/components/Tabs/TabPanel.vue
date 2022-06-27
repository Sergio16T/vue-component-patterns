
<script>
export default {
    inject: ['state'],
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
    <div v-if="isActive">
        <slot></slot>
    </div>
</template>

<style lang="scss">

</style>
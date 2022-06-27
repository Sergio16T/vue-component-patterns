<script>
import TabProvider from './TabProvider.vue';
import TabList from './TabList.vue';
import TabItem from './TabItem.vue';
import TabPanel from './TabPanel.vue';

export default {
    components: {
        TabProvider,
        TabList,
        TabItem,
        TabPanel,
    }
}
</script>

<template lang="">
        <TabProvider>
            <TabList>
                <TabItem :index="0">Tab 1</TabItem>
                <TabItem :index="1">Tab 2</TabItem>
            </TabList>
            <TabPanel :index="0">
                Content
            </TabPanel>
            <TabPanel :index="1">
                Content 2
            </TabPanel>

        </TabProvider>
</template>
<style lang="">

</style>
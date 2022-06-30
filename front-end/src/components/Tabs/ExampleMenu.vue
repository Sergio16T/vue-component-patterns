<script>
import TabProvider from './TabProvider.vue';
import TabList from './TabList.vue';
import TabItem from './TabItem.vue';
import TabPanel from './TabPanel.vue';
import Pagination from '../Pagination/Pagination.vue';

export default {
    components: {
        TabProvider,
        TabList,
        TabItem,
        TabPanel,
        Pagination,
    },

    data: () => ({
        page: 1,
        pageSize: 25,
    }),

    methods: {
        updatePage(page, pageSize) {
            this.page = page;
            this.pageSize = pageSize;
        },
    },
}
</script>

<template lang="">
    <div class="example">
        <TabProvider>
            <TabList>
                <TabItem :index="0">Tab 1</TabItem>
                <TabItem :index="1">Tab 2</TabItem>
            </TabList>
            <TabPanel :index="0">
                Content 1
            </TabPanel>
            <TabPanel :index="1">
                Content 2
            </TabPanel>

        </TabProvider>
        <Pagination
            :page="page"
            :numberPerPage="pageSize"
            :totalCount="300"
            @updatePage="updatePage"
        />
    </div>
</template>
<style lang="scss">
    .example {
        width: 100%;
    }
</style>
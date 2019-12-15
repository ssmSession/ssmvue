<template>
  <el-container class="main-container">
    <el-aside v-bind:class="asideClass">
      <LeftAside :opened='opened'></LeftAside>
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <TopNav @left-open-collapsed="doToggerLeft"></TopNav>
      </el-header>
      <el-main class="main-center">
        <router-view></router-view>
      </el-main>
    </el-container>

    <!-- <div class="tab" >
      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
        <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
          {{item.text}}
        </el-tab-pane>
      </el-tabs>
    </div> -->

  </el-container>

</template>

<script>
  // 导入组件
  import TopNav from '@/admin/TopNav.vue'
  import LeftAside from '@/admin/LeftAside.vue'

  // 导出模块
  export default {
    name: 'Main',
    data: function() {
      return {
        asideClass: 'main-aside',
        opened: true,
        // editableTabsValue: '2',
        // editableTabs: [{
        //           title: '',
        //           name: '1',
        //           text: 'Tab 1 content'
        //         }],
        // tabIndex: 2
      }
    },
    components: {
      TopNav,
      LeftAside
    },
    methods: {
      doToggerLeft: function(opened) {
        console.log("Main opened = " + opened);
        if (opened) {
          this.asideClass = 'main-aside';
        } else {
          this.asideClass = 'main-aside-collapsed';
        }
        //将TopNav组价传递过来的参数付给 opened
        this.opened = opened;
      }
      //  handleTabsEdit(targetName, action) {
      //         if (action === 'add') {
      //           let newTabName = ++this.tabIndex + '';
      //           this.editableTabs.push({
      //             title: 'New Tab',
      //             name: newTabName,
      //             content: 'New Tab content'
      //           });
      //           this.editableTabsValue = newTabName;
      //         }
      //         if (action === 'remove') {
      //           let tabs = this.editableTabs;
      //           let activeName = this.editableTabsValue;
      //           if (activeName === targetName) {
      //             tabs.forEach((tab, index) => {
      //               if (tab.name === targetName) {
      //                 let nextTab = tabs[index + 1] || tabs[index - 1];
      //                 if (nextTab) {
      //                   activeName = nextTab.name;
      //                 }
      //               }
      //             });
      //           }

      //           this.editableTabsValue = activeName;
      //           this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      //         }
      //       }
    }
  }
</script>
<style scoped>
  .main-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  /* .tab{
    width: 100%;
    height: 100;
    margin-top: 100px;
  } */

  .main-aside-collapsed {
    /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
    width: 64px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-aside {
    width: 240px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-header,
  .main-center {
    padding: 0px;
    border-left: 2px solid #333;
  }
</style>

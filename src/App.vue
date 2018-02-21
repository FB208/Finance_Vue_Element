<template>
  <div id="app">
<el-container style=" border: 1px solid #eee;border-bottom:none">

<el-header style="text-align: right; font-size: 12px">
      <span style="float:left;font-family:PingFang SC;font-size:26px;font-weight:800px;">资产记账</span>
      <span>王小虎</span>
    </el-header>

 
  
  <el-container>
    
     <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1"><router-link to="/">资产编辑</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/testpage">Go to Foo</router-link></el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>


export default {
  name: 'App',
  
}

</script>

<style>

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

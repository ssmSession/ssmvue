<template>

  <div>

    <!-- 根据条件进行查询 -->
    <div>
      <i class="el-icon-user">用户名</i>
      <el-input placeholder="请输入内容" style="width: 20%;" v-model="username" clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain @click="getData()">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180">
        <template slot-scope="scope">
          {{getStateDesc(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column prop="userType" label="类型" width="180">
        <template slot-scope="scope">
          {{getTypeDesc(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="medium" plain @click="getLoginInfo(scope.row)">查看</el-button>
          <el-button type="warning" size="medium" plain @click="updateUserType(scope.row)">修改状态</el-button>
          <el-button type="danger" size="medium" plain @click="delLoginInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" style="text-align:right;margin-top:10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
        :page-sizes="[5, 10, 15, 20]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 查看+ 编辑信息 -->
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" width="550px">
      <el-form v-model="labelPosition" :model="staffForm" :inline="true" class="demo-form-inline">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="staffForm.username" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="staffForm.password" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber" :label-width="formLabelWidth">
          <el-input v-model="staffForm.phoneNumber" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="userType" :label-width="formLabelWidth">
          <el-select v-model="staffForm.userType" placeholder="请选择类型" :style="{width: formEleWidth}">
            <el-option label="管理员" value="1"></el-option>
            <!-- <el-option label="普通管理员" value="2"></el-option> -->
          </el-select>
          <!-- <el-input  v-model="staffForm.userType" autocomplete="off" :style="{width: formEleWidth}"></el-input> -->
        </el-form-item>
        <el-form-item style="margin-left: 200px;">
          <template slot-scope="scope">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="warning" plain @click="updateLogininfo(scope.row)">编辑并保存</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: 'staff', //员工管理
    data() {
      return {
        tableData: [],
        username: null,
        total: 0,
        rows: 10,
        page: 1,
        dialogName: '查看',
        dialogFormVisible: false,
        formLabelWidth: '90px',
        labelPosition: 'center',
        //统一控制表单元素的宽度
        formEleWidth: '220px',
        staffForm: {
          username: '',
          password: '',
          phoneNumber: '',
          userType: ''
        },
        lid: '',
      }
    },
    methods: {
      getData: function() { //查询所有员工
        let url = this.axios.urls.GETLOGININFOBYUSERTYPE;
        let param = {
          userType: 1,
          page: this.page,
          rows: this.rows
        }
        this.axios.post(url, param).then(response => {
          this.tableData = response.data.data;
          this.total = response.data.total;
        }).catch(error => {
          alert(error);
        })
      },
      getStateDesc(row) { //判断员工状态
        if (0 == row.state) {
          return "正常";
        } else if (1 == row.state) {
          return "禁用";
        }
      },
      getTypeDesc(row) { //判断员工类型
        if (1 == row.userType) {
          return "管理员";
        } else if (2 == row.userType) {
          return "普通管理员";
        }
      },
      delLoginInfo: function(row) { //删除用户
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.UPDATELOGININFOUSERTYPE;
          let param = {
            id: row.id,
            userType: 5
          }
          this.axios.post(url, param).then(response => {
            // this.tableData = response.data.data;
            if (response.data.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getData();
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          }).catch(error => {
            alert(error);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateUserType: function(row) { //修改用户状态
        let userstate ;
        let url = this.axios.urls.UPDATELOGININFOSTATE;
        if (row.state == 0) {
          userstate = 1;
        }
        if (row.state == 1) {
          userstate = 0;
        }
        let param = {
          id: row.id,
          state: userstate
        }
        this.axios.post(url, param).then(resp => {
          if (resp.data.code == 1) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getData();
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        }).catch(error => {
          alert(error);
        })
      },
      handleSizeChange: function(rows) {
        this.rows = rows;
        this.page = 1;
        this.getData();
      },
      handleCurrentChange: function(page) {
        this.page = page;
        this.getData();
      },
      getLoginInfo: function(row) { //查看按钮
        this.dialogFormVisible = true;
        this.lid = row.id;
        this.staffForm.username = row.username;
        this.staffForm.password = row.password;
        this.staffForm.phoneNumber = row.phoneNumber;
        this.staffForm.userType = this.getTypeDesc(row);
        // console.log(row.pwd);
      },
      updateLogininfo: function(row) { //编辑员工信息
        // console.log(this.staffForm.state);
        let url = this.axios.urls.UPDATELOGININFOSTATE;
        let userType1=this.staffForm.userType;
        let userTypevalue='';
        if(userType1=='管理员'){
           userTypevalue=1;
        }
        let param = {
          id: this.lid,
          username: this.staffForm.username,
          password: this.staffForm.password,
          phoneNumber: this.staffForm.phoneNumber,
          userType: userTypevalue
        }
        this.axios.post(url,param).then(resp => {
          if (resp.data.code == 1) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.dialogFormVisible = false;
            this.getData();
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        }).catch(error => {
          alert(error);
        })
      },


    }

  }
</script>

<style>

</style>

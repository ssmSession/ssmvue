<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="sn" label="编码" width="240">
      </el-table-column>
      <el-table-column prop="title" label="名称" width="240">
      </el-table-column>
      <el-table-column prop="intro" label="简介" width="220">
      </el-table-column>
      <el-table-column prop="cz" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="danger" plain size="small" @click="deldict(scope.row)"> 删除</el-button>
          <el-button type="warning" plain size="small" @click="updatedict(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" width="450px">
      <el-form v-model="labelPosition" :model="dictForm" :inline="true" class="demo-form-inline">
        <el-form-item label="编码" prop="sn" :label-width="formLabelWidth">
          <el-input v-model="dictForm.sn" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="dictForm.title" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="intro" :label-width="formLabelWidth">
          <el-input v-model="dictForm.intro" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 200px;">
          <template slot-scope="scope">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" plain @click="updateLogininfo(scope.row)">保存</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--分页-->
    <div class="block" style="text-align:right;margin-top:10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
        :page-sizes="[5, 10, 15, 20]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Systemdictionary',
        tableData: [],
        dialogName: '编辑信息',
        dialogFormVisible: false,
        labelPosition: 'left',
        dictForm: {
          sn: '',
          title: '',
          intro: ''
        },
        did: '',
        formLabelWidth: '90px',
        formEleWidth: '220px',
        total: 0,
        rows: 10,
        page: 1,
      }
    },
    methods: {
      deldict: function(row) { //删除按钮
        // alert(row.id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.DELSYSTEMDICTIONARY;
          let param = {
            id: row.id
          }
          this.axios.post(url, param).then(response => {
            if (response.data.code) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.update();
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
          })
        });
      },
      updatedict: function(row) { //修改按钮
        this.dialogFormVisible = true;
        this.did = row.id;
        this.dictForm.sn = row.sn;
        this.dictForm.title = row.title;
        this.dictForm.intro = row.intro;
      },
      updateLogininfo: function() { //保存按钮
        let url = this.axios.urls.UDAPTESYSTEMDICTIONARY;
        let param = {
          id: this.did,
          sn: this.dictForm.sn,
          title: this.dictForm.title,
          intro: this.dictForm.intro
        }
        this.axios.post(url, param).then(resp => {
          if (resp.data.code) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogFormVisible = false;
            this.update();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }).catch(error => {
          alert(error);
        })
      },
      update:function(){
        let url = this.axios.urls.SYSTEMDICTIONARY;
        let param={
          page: this.page,
          rows: this.rows
        }
        this.axios.post(url,param).then(resp => {
          this.tableData = resp.data.data;
          this.total=resp.data.total;
          // console.log(resp.data.data);
        }).catch(error => {
          alert(error);
        })
      },
      handleSizeChange: function(rows) {
        this.rows = rows;
        this.page = 1;
        this.update();
      },
      handleCurrentChange: function(page) {
        this.page = page;
        this.update();
      },


    },
    created() {
    this.update();
    }
  }
</script>

<style>
</style>

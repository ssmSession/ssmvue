<template>
  <div>
    <!-- 根据条件进行查询 -->
    <el-form style="margin-top: 15px;" :inline="true" class="demo-form-inline">
      <el-form-item label="状态">
        <el-select v-model="state" placeholder="请选择">
          <el-option v-for="item in stateData" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="申请时间">
        <el-input v-model="chcTitle" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item> -->
      <el-button type="primary" plain size="medium" icon="el-icon-search" @click="query()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="chanceDate" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="编 号:" prop="id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="用户名:" prop="id">
              <span>{{ props.row.appler }}</span>
            </el-form-item>
            <el-form-item label="真实姓名:">
              <span>{{ props.row.realname }}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ props.row.sex==0 ?'男':'女' }}</span>
            </el-form-item>
            <el-form-item label="身份证号:">
              <span>{{ props.row.idNumber }}</span>
            </el-form-item>
            <el-form-item label="身份证地址:">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="状态:">
              <span>{{ props.row.stateDesc }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="审核人:">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="身份证正面:" style="display: none;">
              <span>{{ props.row.image1 }}</span>
            </el-form-item>
            <el-form-item label="身份证反面:" style="display: none;">
              <span>{{ props.row.image2 }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="编号 " prop="id">
      </el-table-column>
      <el-table-column label="用户名 " prop="appler">
      </el-table-column>
      <el-table-column label="真实姓名" prop="realname">
      </el-table-column>
      <!-- <el-table-column label="身份证正面" prop="image1" style="display: none;">
      </el-table-column> -->
      <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          {{scope.row.sex == 0 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" prop="idNumber">
      </el-table-column>
      <el-table-column label="状态" prop="stateDesc">
      </el-table-column>
      <el-table-column label="审核人" prop="username">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="bottom-start" content="审核">
            <el-button type="primary" plain size="small" class="el-icon-edit" @click="checked(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" placement="bottom-start" content="删除">
            <el-button type="danger" plain size="small" class="el-icon-delete" @click="delRealauth()"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审核页面 -->
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" width="700px">
      <el-form v-model="labelPosition" :model="realthForm" :inline="true" class="demo-form-inline">
        <el-form-item label="用户名" prop="appler" :label-width="formLabelWidth">
          <el-input v-model="realthForm.appler" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname" :label-width="formLabelWidth">
          <el-input v-model="realthForm.realname" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber" :label-width="formLabelWidth">
          <el-input v-model="realthForm.idNumber" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="身份地址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="realthForm.address" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" prop="image1" :label-width="formLabelWidth">
          <img :src="realthForm.image1" alt="" style="width:200px;height:150px;" />
          <!-- <el-input v-model="realthForm.image1" autocomplete="off" style="400px;"></el-input> -->
        </el-form-item>
        <el-form-item label="身份证反面" prop="image2" :label-width="formLabelWidth">
          <img :src="realthForm.image2" alt="" style="width:200px;height:150px;" />
          <!-- <el-input v-model="realthForm.image2" autocomplete="off" style="400px;"></el-input> -->
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-input v-model="realthForm.sex == 0 ?'男':'女'" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="审核备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="realthForm.remark" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 300px;">
          <template slot-scope="scope">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" plain @click="realSuccess()">审核通过</el-button>
            <el-button type="warning" plain @click="realFail()">审核拒绝</el-button>
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
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Certification',
    data() {
      return {
        state: '',
        stateData: [],
        chanceDate: [],
        total: 0,
        rows: 10,
        page: 1,
        dialogName: '实名认证审核',
        dialogFormVisible: false,
        //统一控制标签的宽度
        formLabelWidth: '90px',
        labelPosition: 'left',
        //统一控制表单元素的宽度
        formEleWidth: '200px',
        realthForm: {
          appler: null,
          realname: null,
          idNumber: null,
          address: null,
          image1: null,
          image2: null,
          sex: null,
          remark: null,
        },
        rid: '',

      }
    },
    created() { //所有状态
      let url = this.axios.urls.ALLSTATE;
      this.axios.post(url).then(resp => {
        this.stateData = resp.data.data;
        // console.log(resp.data.data);
      }).catch(error => {
        alert(error);
      })
    },
    methods: {
      query: function() { //查询按钮
        let url = this.axios.urls.ALLREALTH;
        this.axios.post(url, {
          state: this.state,
          page: this.page,
          rows: this.rows
        }).then(resp => {
          this.chanceDate = resp.data.data;
          this.total = resp.data.total;
          // console.log(resp.data.data);
          // console.log(this.state);
        }).catch(error => {
          alert(error);
        })
      },
      checked: function(row) { //审核按钮
        // alert(row.image1);
        this.realthForm.appler = row.appler;
        this.realthForm.realname = row.realname;
        this.realthForm.idNumber = row.idNumber;
        this.realthForm.address = row.address;
        this.realthForm.image1 = row.image1;
        this.realthForm.image2 = row.image2;
        this.realthForm.sex = row.sex;
        this.dialogFormVisible = true;
        this.rid = row.id; //存储审核id
      },
      realSuccess: function() { //审核通过
        let url = this.axios.urls.CHECKREALAUTH;
        this.axios.post(url, {
          id: this.rid,
          remark: this.realthForm.remark,
          auditorId: this.sysUserId,
          state: 33
        }).then(resp => {
          if (resp.data.code) {
            this.$message({
              message: '审核成功',
              type: 'success'
            });
            console.log(this.sysUserId);
            this.realthForm.remark = null;
            this.dialogFormVisible = false;
            this.query(); //刷新
          } else {
            this.$message({
              message: '审核失败',
              type: 'error'
            });
          }
        }).catch(error => {
          alert(error);
        })
      },
      realFail: function() { //审核拒绝
        let url = this.axios.urls.CHECKREALAUTH;
        this.axios.post(url, {
          id: this.rid,
          remark: this.realthForm.remark,
          auditorId: this.sysUserId,
          state: 34
        }).then(resp => {
          if (resp.data.code) {
            this.$message({
              message: '审核完成',
              type: 'success'
            });
            console.log(this.sysUserId);
            this.realthForm.remark = null;
            this.dialogFormVisible = false;
            this.query(); //刷新
          } else {
            this.$message({
              message: '审核失败',
              type: 'error'
            });
          }
        }).catch(error => {
          alert(error);
        })
      },
      delRealauth: function() { //删除审核

      },
      handleSizeChange: function(rows) {
        this.rows = rows;
        this.page = 1;
        this.query();
      },
      handleCurrentChange: function(page) {
        this.page = page;
        this.query();
      }

    },
    computed: mapGetters({
      sysUserId: 'getsysUserId',
      sysUserName: 'getsysUserName'
    })

  }
</script>

<style>
</style>

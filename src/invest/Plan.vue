<template>
  <div>
    <el-container>
      <el-header>
        <el-form style="margin-top: 15px;" :inline="true" class="demo-form-inline">
          <el-form-item label="客户名称">
            <el-input v-model="chcCustName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="概要">
            <el-input v-model="chcTitle" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain size="medium" icon="el-icon-search" @click="query()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="chanceDate" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="编 号:" prop="chcId">
                  <span>{{ props.row.chcId }}</span>
                </el-form-item>
                <el-form-item label="客户名称:">
                  <span>{{ props.row.chcCustName }}</span>
                </el-form-item>
                <el-form-item label="概 要:">
                  <span>{{ props.row.chcTitle }}</span>
                </el-form-item>
                <el-form-item label="成功机率:">
                  <span>{{ props.row.chcRate }}</span>
                </el-form-item>
                <el-form-item label="联系人:">
                  <span>{{ props.row.chcLinkman }}</span>
                </el-form-item>
                <el-form-item label="联系电话:">
                  <span>{{ props.row.chcTel }}</span>
                </el-form-item>
                <el-form-item label="机会描述:">
                  <span>{{ props.row.chcDesc }}</span>
                </el-form-item>
                <el-form-item label="机会来源:">
                  <span>{{ props.row.chcSource }}</span>
                </el-form-item>
                <el-form-item label="创建人:">
                  <span>{{ props.row.chcCreateBy }}</span>
                </el-form-item>
                <el-form-item label="创建时间:">
                  <span>{{ props.row.chcCreateDate }}</span>
                </el-form-item>
                <el-form-item label="指派给:">
                  <span>{{ props.row.chcDueTo }}</span>
                </el-form-item>
                <el-form-item label="指派时间:">
                  <span>{{ props.row.chcDueDate }}</span>
                </el-form-item>
                <el-form-item label="状态:">
                  <span>{{ props.row.chcStatus }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="编号 " prop="chcId">
          </el-table-column>
          <el-table-column label="客户名称" prop="chcCustName">
          </el-table-column>
          <el-table-column label="概要" prop="chcTitle">
          </el-table-column>
          <el-table-column label="状态" prop="chcStatus">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip v-show="scope.row.chcStatus == '已指派'||scope.row.chcStatus=='未指派'" class="item" effect="dark"
                content="制定计划" placement="bottom-start">
                <el-button type="primary" plain size="small" class="el-icon-tickets" @click='addCPlan(scope.row)'></el-button>
              </el-tooltip>
              <el-tooltip v-show="scope.row.chcStatus == '已指派'||scope.row.chcStatus=='未指派'" class="item" effect="dark"
                content="执行计划" placement="bottom-start">
                <el-button size="small" @click="todoPlan(scope.row)" type="info" plain class="el-icon-document"></el-button>
              </el-tooltip>
              <!-- :style="{display:active}" -->
              <!-- v-show 可以设置按钮显示(true)隐藏（false） -->
              <el-tooltip v-show="scope.row.chcStatus == '开发成功'||scope.row.chcStatus=='开发失败'" class="item" effect="dark"
                content="已归档" placement="bottom-start">
                <el-button size="small" type="success" plain class="el-icon-success" @click="successful(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
<!--      <el-footer>
        <div class="block" style="text-align:right;margin-top:10px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-footer> -->
    </el-container>

     <!-- 制定计划 -->
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" @close="closeBookForm" width="800px;">
      <el-table :data="tableData" stripe style="width: 100%; ">
        <el-table-column prop="planDateDesc" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="plaTodo" label="计划项" width="280">
          <template slot-scope="scope">
            <el-input v-model="scope.row.plaTodo"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="保存" placement="bottom-start">
              <el-button size="small" type="primary" @click="editPlans(scope.row)" plain class="el-icon-edit-outline"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
              <el-button size="small" type="danger" plain class="el-icon-delete" @click="delPlan(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="text-align:right;margin-top:10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
          :page-sizes="[2, 3, 4, 5]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <el-form :model="planForm" style="margin-top: 60px;" :rules="rules" ref="planForm">
        <el-form-item :inline="true" class="demo-form-inline" width="100%">
          <el-form-item label="日期" prop="plaDate" :label-width="formLabelWidth" style="float: left;">
            <el-date-picker v-model="planForm.plaDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="机会ID" prop="plaChcId" :label-width="formLabelWidth" style="display: none;">
            <el-input v-model="planForm.plaChcId" autocomplete="off" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="计划项" prop="plaTodo" :label-width="formLabelWidth" style="float: left;">
            <el-input type="textarea" v-model="planForm.plaTodo" style="width: 220px;"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item align="right">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="doPlan(scope.row)">执行计划</el-button>
            <el-button type="success" plain @click="savePlan('planForm')">保存</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 执行计划 -->
    <el-dialog title="执行计划" :visible.sync="todoPlanVisible" width="600px;">
      <template slot-scope="scope">
        <el-table :data="todoData" stripe style="width: 100%">
          <el-table-column prop="planDateDesc" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="plaTodo" label="计划项" width="180">
          </el-table-column>
          <el-table-column prop="plaResult" label="计划结果" width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.plaResult"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="保存" placement="bottom-start">
                <el-button size="small" type="primary" @click="resultPlan(scope.row)" plain class="el-icon-edit-outline"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <br><br><br><br><br><br>
        <el-button type="primary" plain size="small" @click="appiontPlan()">制定计划</el-button>
        <el-button type="warning" plain size="small" @click="stopPlan()">终止计划</el-button>
        <el-button type="success" plain size="small" @click="successPlan(scope.row)">开发成功</el-button>
        <el-button @click="todoPlanVisible = false" size="small">返 回</el-button>
      </template>
    </el-dialog>

    <el-dialog title="开发计划" :visible.sync="successVisible" width="600px;">
      <template slot-scope="scope">
        <el-table :data="todoData" stripe style="width: 100%">
          <el-table-column prop="planDateDesc" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="plaTodo" label="计划项" width="180">
          </el-table-column>
          <el-table-column prop="plaResult" label="计划结果" width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.plaResult"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <br /><br /> <br /><br />
        <el-button @click="successVisible = false" size="small">返 回</el-button>
      </template>
    </el-dialog>



  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    data: function() {
      var checkDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择日期'));
        }
        return callback();
      };
      var checkPlanTodo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写计划项'));
        }
        return callback();
      };
      return {
        rules: {
          plaDate: [{
            required: true,
            validator: checkDate,
            trigger: 'blur'
          }],
          plaTodo: [{
            required: true,
            validator: checkPlanTodo,
            trigger: 'blur'
          }]
        },
        chance: [],
        chcCustName: '',
        chcTitle: '',
        plan: [],
        tableData: [],
        chanceDate: [],
        todoData: [],
        page: 1,
        rows: 2,
        total: 0,
        inputs: '',
        dialogName: '制定计划',
        dialogFormVisible: false,
        todoPlanVisible: false,
        successVisible: false,
        optiontype: 'add',
        //统一控制标签的宽度
        formLabelWidth: '70px',
        //统一控制表单元素的宽度
        formEleWidth: '210px',
        planForm: {
          plaDate: null,
          plaChcId: null,
          plaTodo: null
        },

      }
    },
    methods: {
      query: function() { //查询所有计划

        let url = this.axios.urls.BYUSER_SALECHANCE;
        this.axios.post(url, {
           chcDueId: this.sysUserId,
          chcCustName: this.chcCustName,
          chcTitle: this.chcTitle
        }).then(resp => {
          this.chanceDate = resp.data.data;
          this.total = resp.data.totla;
        }).catch(error => {
          alert(error);
        })
      },
      successful: function(row) { //已归档
        this.successVisible = true;
        let urls = this.axios.urls.SAL_PLAN;
        this.axios.post(urls, {
          plaChcId: row.chcId,
          page: this.page,
          rows: this.rows
        }).then(resp => {
          this.todoData = resp.data.data;
          this.total = resp.data.totla;
        }).catch(error => {
          alert(error);
        })
      },
      successPlan: function(row) { //开发成功
        this.chance.chcStatus = '开发成功';
        this.successAnderror();
        console.log(this.chance);
        let url=this.axios.urls.ADD_CUSTOMER;
        this.axios.post(url,this.chance).then(resp=>{
          if(resp.data.code){

          }
        }).catch(error=>{
          alert(error);
        })

      },
      successAnderror: function() { //开发成功或者失败
        let url = this.axios.urls.UPDATE_SAL_CHANCE;
        this.axios.post(url, this.chance).then(resp => {
          if (resp.data.code) {
            this.todoPlanVisible = false;
            let url = this.axios.urls.BYUSER_SALECHANCE;
            this.axios.post(url, {
              chcDueId: this.sysUserId
            }).then(resp => {
              this.chanceDate = resp.data.data;
            }).catch(error => {
              alert(error);
            })
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            })
          }
        }).catch(error => {
          alert(error);
        })
      },
      stopPlan: function() { //终止开发（开发失败）
        this.chance.chcStatus = '开发失败';
        this.successAnderror();
      },
      appiontPlan: function() { //执行定计划页面跳制定
        this.todoPlanVisible = false;
        this.dialogFormVisible = true;

      },
      addCPlan: function(row) { //制定计划
        this.dialogName = '制定计划';
        this.dialogFormVisible = true;
        this.optiontype = 'add';
        this.planForm.plaChcId=row.chcId;
        // console.log(row.chcId);
        let urls = this.axios.urls.SAL_PLAN;
        this.axios.post(urls, {
          plaChcId: row.chcId,
          page: this.page,
          rows: this.rows
        }).then(resp => {
          this.tableData = resp.data.data;
          this.total = resp.data.totla;
          for (let i = 0; i < this.tableData.length; i++) {
            this.planForm.plaChcId = this.tableData[i].plaChcId;
          }
        }).catch(error => {
          alert(error);
        })
      },
      doPlan: function(row) {//执行计划按钮
        this.dialogFormVisible = false;
        this.todoPlanVisible = true;
        console.log(this.planForm.plaChcId );
        let urls = this.axios.urls.SAL_PLAN;
        this.axios.post(urls,{
          plaChcId:this.planForm.plaChcId,
          page: this.page,
          rows: this.rows
        }).then(resp => {
          this.todoData = resp.data.data;
          this.total = resp.data.totla;
          console.log(resp.data.data);
        }).catch(error => {
          alert(error);
        })
      },
      todoPlan: function(row) { //执行计划
        this.chance = row;
        this.todoPlanVisible = true;
        let urls = this.axios.urls.SAL_PLAN;
        this.axios.post(urls, {
          plaChcId: row.chcId,
          page: this.page,
          rows: this.rows
        }).then(resp => {
          this.todoData = resp.data.data;
          this.total = resp.data.totla;
        }).catch(error => {
          alert(error);
        })
      },
      handleSizeChange: function(rows) {
        this.rows = rows;
        this.page = 1;
        this.selectAllPlan();
      },
      handleCurrentChange: function(page) {
        this.page = page;
        this.selectAllPlan();
      },
      closeBookForm: function() {

      },
      editPlans: function(row) { //编辑计划项并保存
        let url = this.axios.urls.UPDATE_SAL_PLAN;
        this.axios.post(url, {
          plaId: row.plaId,
          plaChcId: row.plaChcId,
          plaDate: row.plaDate,
          plaTodo: row.plaTodo
        }).then(resp => {
          if (resp.data.code) {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });
            let urls = this.axios.urls.SAL_PLAN;
            this.axios.post(urls, {
              plaChcId: row.plaChcId,
              page: this.page,
              rows: this.rows
            }).then(resp => {
              this.tableData = resp.data.data;
              this.total = resp.data.totla;
            }).catch(error => {
              alert(error);
            })
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            })
          }
        }).catch(error => {
          alert(error);
        })
      },
      resultPlan: function(row) { //编辑计划效果保存
        let url = this.axios.urls.UPDATE_SAL_PLAN;
        this.axios.post(url, {
          plaId: row.plaId,
          plaChcId: row.plaChcId,
          plaDate: row.plaDate,
          plaTodo: row.plaTodo,
          plaResult: row.plaResult
        }).then(resp => {
          if (resp.data.code) {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });
            let urls = this.axios.urls.SAL_PLAN;
            this.axios.post(urls, {
              plaChcId: row.plaChcId,
              page: this.page,
              rows: this.rows
            }).then(resp => {
              this.tableData = resp.data.data;
              this.total = resp.data.totla;
            }).catch(error => {
              alert(error);
            })
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            })
          }
        }).catch(error => {
          alert(error);
        })
      },
      delPlan: function(row) { //删除计划
        let url = this.axios.urls.DELETE_SAL_PLAN + "?plaId=" + row.plaId;
        this.$confirm('此操作将删除该记录, 是否继续?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete(url).then(resp => {
            if (resp.data.code) {
              this.$message({
                message: resp.data.msg,
                type: 'success'
              });
              this.selectAllPlan();
            } else {
              this.$message({
                message: resp.data.msg,
                type: 'error'
              })
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
      selectAllPlan: function() {
        // let url = this.axios.urls.SAL_PLAN;
        // this.axios.post(url, this.planForm).then(resp => {
        //   this.tableData = resp.data.data;
        //   // console.log(this.planForm.plaChcId);
        //   // console.log(resp.data.data);
        // }).catch(error => {
        //   alert(error);
        // });

        let urls = this.axios.urls.SAL_PLAN;
        this.axios.post(urls, {
          plaChcId: this.plaChcId,
          page: this.page,
          rows: this.rows
        }).then(resp => {
          this.tableData = resp.data.data;
          this.total = resp.data.totla;
        }).catch(error => {
          alert(error);
        })

      },
      savePlan: function(formName) { //保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.axios.urls.ADD_SAL_PLAN;
            this.axios.post(url, this.planForm).then(resp => {
              // console.log(this.planForm);
              if (resp.data.code) {
                this.$message({
                  message: resp.data.msg,
                  type: 'success'
                });
                // console.log(resp.data.msg);
                this.planForm.plaDate = null;
                this.planForm.plaTodo = null;
                let urls = this.axios.urls.SAL_PLAN;
                this.axios.post(urls, {
                  plaChcId: this.planForm.plaChcId,
                  page: this.page,
                  rows: this.rows
                }).then(resp => {
                  this.tableData = resp.data.data;
                  this.total = resp.data.totla;
                }).catch(error => {
                  alert(error);
                })
                // this.selectAllPlan();
              } else {
                this.$message({
                  message: resp.data.msg,
                  type: 'error'
                });
              }
            }).catch(error => {
              alert(error);
            })
          }
        })
      }
    },
    created() { //通过指派ID查询所有机会
      let url = this.axios.urls.BYUSER_SALECHANCE;
      this.axios.post(url, {
        chcDueId: this.sysUserId
      }).then(resp => {
        this.chanceDate = resp.data.data;
      }).catch(error => {
        alert(error);
      })
    },
    computed: mapGetters({
      sysUserId: 'getsysUserId',
    })

  }
</script>

<style scoped>
  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 2px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 90px; */
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

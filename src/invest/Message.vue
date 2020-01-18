<template>

  <div>
    <h1 class="title">客户信息管理</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 20px;" size="medium">
      <el-form-item label="客户编号" style="float: left;">
        <el-input v-model="formInline.custNo " placeholder="客户编号"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" style="float: left;">
        <el-input v-model="formInline.custName " placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="电话" style="float: left;">
        <el-input v-model="formInline.custTel " placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="地区" style="float: left;">
        <el-select style="width: 200px;" v-model="formInline.custRegion " placeholder="----请选择------">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮政编码" style="float: left;">
        <el-input v-model="formInline.custZip " placeholder="邮政编码"></el-input>
      </el-form-item>
      <el-form-item label="客户等级" style="float: left;">
        <el-select style="width: 200px;" v-model="formInline.custLevel " placeholder="----请选择------">
          <el-option label="普通" value="shanghai"></el-option>
          <el-option label="会员" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户经理" style="float: left;">
        <el-input v-model="formInline.custManagerName " placeholder="客户经理"></el-input>
      </el-form-item>
      <el-form-item label="操 作:" style="float: left;">
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>



      <!-- 表头表格-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="custNo" label="客户编号" width="160px">
        </el-table-column>
        <el-table-column prop="custName" label="公司名称" width="140px">
        </el-table-column>
        <el-table-column prop="custTel" label="电话" width="140px">
        </el-table-column>
        <el-table-column prop="custRegion" label="地区" width="140px">
        </el-table-column>
        <el-table-column prop="custZip" label="邮政编码" width="160px">
        </el-table-column>
        <el-table-column prop="custManagerName" label="客户经理" width="160px">
        </el-table-column>
        <el-table-column prop="custLevel" label="客户等级" width="160px">
        </el-table-column>

        <!-- 图标-->
        <el-table-column label="操作" width="305px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑客户信息" placement="bottom-start">
              <el-button icon="el-icon-edit" type="text" size="small" @click="editShow(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="联系人" placement="bottom-start">
              <el-button icon="el-icon-s-custom" type="text" size="small" @click="contacts(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="交往记录" placement="bottom-start">
              <el-button icon="el-icon-coffee" type="text" size="small" @click="arecord(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="历史订单" placement="bottom-start">
              <el-button icon="el-icon-more" type="text" size="small" @click="queryOrder(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
              <el-button icon="el-icon-delete" type="text" size="small" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-form>


    <!-- Table 客户详情&编辑对话框-->

    <el-dialog title="客户信息" :visible.sync="dialogTableEdit" style="width: 100%;">
      <el-form :inline="true" :rules="rules" ref="cusInform" :model="cusInform" class="demo-form-inline">

        <el-form-item label="客户编号" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custNo" placeholder="客户编号" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="custName">
          <el-input v-model="cusInform.custName" placeholder="公司名称" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="所在地区" :label-width="formLabelWidth" prop="custRegion">
          <el-select v-model="cusInform.custRegion" placeholder="地区" :style="{width: formEleWidth}">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户经理" :label-width="formLabelWidth" prop="custManagerName">
          <el-select v-model="cusInform.custManagerName" placeholder="客户经理" :style="{width: formEleWidth}">
            <el-option label="阿敏" value="shanghai"></el-option>
            <el-option label="欣东" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户等级" :label-width="formLabelWidth" prop="custLevel">
          <el-select v-model="cusInform.custLevel" placeholder="客户等级" :style="{width: formEleWidth}">
            <el-option label="战略合作伙伴" value="shanghai"></el-option>
            <el-option label="普通用户" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址" :label-width="formLabelWidth" prop="custAddr">
          <el-input v-model="cusInform.custAddr" placeholder="详细地址" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="客户满意度" :label-width="formLabelWidth" prop="custSatisfy">
          <!-- <el-select  v-model="cusInform.custSatisfy" placeholder="客户满意度" :style="{width: formEleWidth}">
            <el-option :el-select="true" label="☆☆☆" value="shanghai"></el-option>
            <el-option :el-select="'2' == cusInform.custSatisfy" label="☆☆" value="beijing"></el-option>
            <el-option :el-select="'1' == cusInform.custSatisfy" label="☆" value="beijing"></el-option>
          </el-select> -->
          <el-rate :style="{width: formEleWidth}" v-model="cusInform.custSatisfy"></el-rate>
        </el-form-item>

        <el-form-item label="客户信用度" :label-width="formLabelWidth" prop="custCredit">
          <!-- <el-select v-model="cusInform.custCredit" placeholder="客户信用度" :style="{width: formEleWidth}">
            <el-option label="☆☆☆" value="shanghai"></el-option>
            <el-option label="☆☆" value="beijing"></el-option>
            <el-option label="☆" value="beijing"></el-option>
          </el-select> -->
          <el-rate :style="{width: formEleWidth}" v-model="cusInform.custCredit"></el-rate>
        </el-form-item>

        <el-form-item label="电话" prop="custTel" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custTel" autocomplete="off" placeholder="电话" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="传真" :label-width="formLabelWidth" prop="custFax">
          <el-input v-model="cusInform.custFax" placeholder="传真" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="网址" :label-width="formLabelWidth" prop="custWebsite">
          <el-input v-model="cusInform.custWebsite" placeholder="网址" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="邮政编码" :label-width="formLabelWidth" prop="custZip">
          <el-input v-model="cusInform.custZip" placeholder="邮政编码" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="营业执照注册号" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custLicenceNo" placeholder="营业执照注册号" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="注册资金(万元)" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custBankroll" placeholder="注册资金(万元)" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="法人" :label-width="formLabelWidth" prop="custChieftain">
          <el-input v-model="cusInform.custChieftain" placeholder="法人" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="开户银行" :label-width="formLabelWidth" prop="custBank">
          <el-input v-model="cusInform.custBank" placeholder="开户银行" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="年营业额" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custTurnover" placeholder="年营业额" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="银行账号" :label-width="formLabelWidth" prop="custBankAccount">
          <el-input v-model="cusInform.custBankAccount" placeholder="银行账号" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="地税登记号" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custBocalTaxNo" placeholder="地税登记号" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="国税登记号" :label-width="formLabelWidth">
          <el-input v-model="cusInform.custNationalTaxNo" placeholder="国税登记号" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableEdit = false">关闭</el-button>
        <el-button type="primary" plain @click="saveCustomer()">保存</el-button>
      </div>
    </el-dialog>



    <!-- 联系人话框-->

    <el-dialog title="<strong>查询联系人</strong>" :visible.sync="dialogTableContact" style="width: 100%;">
      <el-form :inline="true" :model="formContacts" class="demo-form-inline" size="medium">
        <el-form-item label="客户编号" style="float: left;">
          <el-input v-model="formContacts.lkmCustNo " placeholder="客户编号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" style="float: left;">
          <el-input v-model="formContacts.lkmCustName" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="操 作:" style="float: left;">
        </el-form-item>
        <el-form-item style="float: left;">
          <el-button type="primary" @click="addCus">新建</el-button>
        </el-form-item>
        <!-- 表格-->
        <el-table border :data="contactData" style="width: 100%">
          <el-table-column prop="lkmName" label="姓名" width="110px">
          </el-table-column>
          <el-table-column prop="lkmSex" label="性别" width="110px">
          </el-table-column>
          <el-table-column prop="lkmPostion" label="职位" width="100px">
          </el-table-column>
          <el-table-column prop="lkmTel" label="办公电话" width="120px">
          </el-table-column>
          <el-table-column prop="lkmMobile" label="手机" width="110px">
          </el-table-column>
          <el-table-column prop="lkmMemo" label="备注" width="110px">
          </el-table-column>
          <el-table-column label="操作" width="122px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改" placement="bottom-start">
                <el-button icon="el-icon-edit" type="text" size="small" @click="exitLinkMan(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
                <el-button icon="el-icon-delete" type="text" size="small" @click="deleteLinkMan(scope.row)"></el-button>
              </el-tooltip>
            </template>

            <!-- <template slot-scope="scope">
              <el-button type="primary" plain @click="exitLinkMan(scope.row)">修改</el-button>
              <el-button type="danger" plain @click="deleteLinkMan(scope.row)">删除</el-button>
            </template> -->

          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>


    <!-- 新建联系人-->
    <el-dialog :title="dialogName" :visible.sync="dialogTableAdd" style="width: 100%;" @close="closeLinkForm">
      <el-form :inline="true" :model="formAddcon" class="demo-form-inline" ref="formAddcon" :rules="rules">

        <el-form-item v-show="optiontype == 'update'" label="编号" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="formAddcon.lkmId" autocomplete="off" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth" prop="lkmName">
          <el-input v-model="formAddcon.lkmName" placeholder="姓名" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="formAddcon.lkmSex" placeholder="性别" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="lkmPostion">
          <el-input v-model="formAddcon.lkmPostion" placeholder="职位" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" :label-width="formLabelWidth" prop="lkmTel">
          <el-input v-model="formAddcon.lkmTel" placeholder="办公电话" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="formAddcon.lkmMobile" placeholder="手机号码" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="formAddcon.lkmMemo" placeholder="备注" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableAdd = false">关闭</el-button>
        <el-button type="primary" plain @click="saveLinkMan('formAddcon')">保存</el-button>

      </div>
    </el-dialog>



    <!-- 交往记录-->
    <el-dialog title="交往记录" :visible.sync="dialogTableRecord" style="width: 100%;">
      <el-form :inline="true" :model="formActivity" class="demo-form-inline">
        <el-form-item label="客户编号" style="float: left;">
          <el-input v-model="formActivity.atvCustNo " placeholder="客户编号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" style="float: left;">
          <el-input v-model="formActivity.atvCustName " placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="操 作:" style="float: left;">
        </el-form-item>
        <el-form-item style="float: left;">
          <el-button type="primary" @click="addRecord">新建</el-button>
        </el-form-item>
        <!-- 表格-->
        <el-table border :data="recordData" style="width: 100%">
          <el-table-column prop="atvDateDesc" label="时间" width="130px">
          </el-table-column>
          <el-table-column prop="atvPlace" label="地点" width="130px">
          </el-table-column>
          <el-table-column prop="atvTitle" label="概要" width="120px">
          </el-table-column>
          <el-table-column prop="atvDesc" label="详细信息" width="140px">
          </el-table-column>
          <el-table-column prop="atvRemark" label="备注" width="130px">
          </el-table-column>
          <el-table-column label="操作" width="132px">
            <template slot-scope="scope">
              <el-button type="primary" plain @click="exitActive(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>


    <!-- 新建交往记录-->
    <el-dialog :title="dialogActiveName" :visible.sync="dialogTableAddRecord" style="width: 80%;" @close="closeActiveForm">
      <el-form :inline="true" :model="addActivity" class="demo-form-inline" ref="addActivity" :rules="rules">

        <el-form-item v-show="optiontypeAct == 'updateActive'" label="编号" :label-width="formLabelWidth">
          <el-input v-model="addActivity.atvId" autocomplete="off" :disabled="true" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="时间" :label-width="formLabelWidth" prop="atvDate">
          <!-- <el-input v-model="addActivity.atvDate" placeholder="时间" :style="{width: formEleWidth}"></el-input> -->
          <el-date-picker v-model="addActivity.atvDate" style="width: 200px;" :disabled="dis()" type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地点" :label-width="formLabelWidth" prop="atvPlace">
          <el-input v-model="addActivity.atvPlace" placeholder="地点" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="概要" :label-width="formLabelWidth" prop="atvTitle">
          <el-input v-model="addActivity.atvTitle" placeholder="概要" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="详细详情" :label-width="formLabelWidth">
          <el-input v-model="addActivity.atvDesc" placeholder="详情" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addActivity.atvRemark" placeholder="备注" :style="{width: formEleWidth}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableAddRecord = false">关闭</el-button>
        <el-button type="primary" @click="saveAct('addActivity')" plain>保存</el-button>
      </div>
    </el-dialog>




    <!-- 历史订单-->
    <el-dialog title="历史订单" :visible.sync="dialogTableOrder" style="width: 100%;">
      <el-form :inline="true" :model="formOrder" class="demo-form-inline">
        <el-form-item label="客户编号" style="float: left;">
          <el-input v-model="formOrder.odrId " placeholder="客户编号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" style="float: left;">
          <el-input v-model="formOrder.odrCustomer " placeholder="名称"></el-input>
        </el-form-item>
        <el-table border style="width: 100%" :data="orderData">
          <el-table-column prop="odrId" label="订单编号" width="170px">
          </el-table-column>
          <el-table-column prop="odrDate" label="时间" width="145px">
          </el-table-column>
          <el-table-column prop="odrAddr" label="送货地址" width="170px">
          </el-table-column>
          <el-table-column prop="odrStatus" label="状态" width="145px">
          </el-table-column>
          <el-table-column label="操作" width="152px">
            <template slot-scope="scope">
              <el-button type="primary" plain @click="queryDetail(scope.row)">订单明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>

    <!-- 订单明细-->
    <el-dialog :title="dialogDeatilName" :visible.sync="dialogTableDetail" style="width: 100%;">
      <el-form :inline="true" :model="formOrderDetail" class="demo-form-inline">



        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="formOrderDetail.oddId" placeholder="订单编号" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-input v-model="formOrderDetail.odrDate" placeholder="日期" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input v-model="formOrderDetail.odrAddr" placeholder="送货地址" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="总金额(元)" :label-width="formLabelWidth">
          <el-input v-model="formOrderDetail.sumPrice" placeholder="总金额(元)" :style="{width: formEleWidth}"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth" style="float: left; padding-left: 65px;">
          <el-input v-model="formOrderDetail.odrStatus" placeholder="状态" :style="{width: formEleWidth}"></el-input>
        </el-form-item>



      </el-form>
      <!-- 表头表格-->
      <el-table :data="DetailData" border style="width: 100%">
        <el-table-column fixed prop="prodName" label="商品" width="160px">
        </el-table-column>
        <el-table-column prop="oddCount" label="数量" width="150px">
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="150px">
        </el-table-column>
        <el-table-column prop="oddPrice" label="单价" width="150px">
        </el-table-column>
        <el-table-column prop="sumPrice" label="总金额(元)" width="163x">
        </el-table-column>
      </el-table>

    </el-dialog>



  </div>


</template>

<script>
  export default {
    name: 'Message',
    data() {
      //自定义验证方法
      var checkcusTel = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        if (isNaN(value)) {
          return callback(new Error('请输入11为数字'));
        }
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error('电话号码格式不正确'))
        }
        return callback();
      };
      var checkcusfax = (rule, value, callback) => {
        const faxreg = /^(\d{3,4}-)?\d{7,8}$/;
        if (faxreg.test(value)) {
          callback();
        } else {
          callback(new Error('网址格式格式不正确'));
        }
        return callback();
      };
      var checkcusWebsite = (rule, value, callback) => {
        const urlregex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&‘\*\+,;=.]+$/
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        if (urlregex.test(value)) {
          callback();
        } else {
          callback(new Error('网址格式格式不正确'));
        }
        return callback();
      };
      var checkcusZip = (rule, value, callback) => {
        const zipreg = /^[1-9][0-9]{5}$/
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        if (zipreg.test(value)) {
          callback();
        } else {
          callback(new Error('邮政编号格式格式不正确'));
        }
        return callback();
      };
      var checusBankAccount = (rule, value, callback) => {
        const BankAccountreg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        if (BankAccountreg.test(value)) {
          callback();
        } else {
          callback(new Error('银行卡号格式格式不正确'));
        }
        return callback();
      };

      var checkcusLinkman = (rule, value, callback) => {
        const manReg = /^([\u4e00-\u9fa5]{2,6})$/;
        if (manReg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入中文或者英文'));
        }
        return callback();
      };
      return {
        //客户信息验证
        rules: {
          custName: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          custRegion: [{
            required: true,
            message: '请选择地区',
            trigger: 'blur'
          }],
          custManagerName: [{
            required: true,
            message: '请输入客户经理名称',
            trigger: 'blur'
          }],
          custLevel: [{
            required: true,
            message: '请选择客户等级',
            trigger: 'blur'
          }],
          custAddr: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }],
          custSatisfy: [{
            required: true,
            message: '请选择客户满意度',
            trigger: 'blur'
          }],
          custCredit: [{
            required: true,
            message: '请选择客户信用度',
            trigger: 'blur'
          }],
          //电话号码
          custTel: [{
            required: true,
            validator: checkcusTel, //自定义验证
            trigger: 'blur'
          }],
          //传真
          custFax: [{
            required: true,
            validator: checkcusfax, //自定义验证
            trigger: 'blur'
          }],
          //网址
          custWebsite: [{
            required: true,
            validator: checkcusWebsite, //自定义验证
            trigger: 'blur'
          }],
          //邮政编码
          custZip: [{
            required: true,
            validator: checkcusZip, //自定义验证
            trigger: 'blur'
          }],
          custChieftain: [{
            required: true,
            message: '请输入法人名称',
            trigger: 'blur'
          }],
          custBank: [{
            required: true,
            message: '请输入开户银行',
            trigger: 'blur'
          }],
          //银行卡号
          custBankAccount: [{
            required: true,
            validator: checusBankAccount, //自定义验证
            trigger: 'blur'
          }],
          //联系人姓名
          lkmName: [{
            required: true,
            validator: checkcusLinkman,
            trigger: 'blur'
          }],
          lkmPostion: [{
            required: true,
            message: '请输入职位',
            trigger: 'blur'
          }],
          lkmTel: [{
            required: true,
            message: '请输入办公电话',
            trigger: 'blur'
          }],
          atvDate: [
            //   {
            //   required: true,
            //   validator: checkcusDate, //自定义验证
            //   trigger: 'blur'
            // },
            {
              type: 'date',
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          atvPlace: [{
            required: true,
            message: '请输入地点',
            trigger: 'blur'
          }],
          atvTitle: [{
            required: true,
            message: '请输入概要',
            trigger: 'blur'
          }],
        },

        //客户信息
        formInline: {},
        //客户详情&编辑对话框
        cusInform: {},
        //联系人
        formContacts: {
          lkmCustNo: null,
          lkmCustName: null
        },
        //新建联系人
        // formAddcon: {

        // },
        //交往记录
        formActivity: {},
        //新建交往记录
        // addActivity: {},
        //历史订单
        formOrder: {},
        //订单明细
        formOrderDetail: {},

        tableData: [],
        contactData: [],
        recordData: [],
        orderData: [],
        DetailData: [],

        //对话框隐藏&显示
        dialogTableEdit: false,
        dialogTableContact: false,
        dialogTableAdd: false,
        dialogTableRecord: false,
        dialogTableAddRecord: false,
        dialogTableOrder: false,
        dialogTableDetail: false,
        //统一控制标签的宽度
        formLabelWidth: '110px',
        //统一控制表单元素的宽度
        formEleWidth: '200px',
        //对话框标题，默认为新增，如果是点击修改按钮打开对话框，则标题应为修改。
        dialogName: '新增联系人',
        dialogActiveName: '新增交往记录',
        dialogDeatilName: '查看订单明细',
        //操作类型，默认为添加，如果是点击修改打开对话框，则操作类类型应变为修改
        //该变量用于控制是否显示书本编号字段，当操作类型为新增时不需显示（书本编号数据表字段为自增）
        //当操作类型为修改时，需要显示。
        optiontype: 'addCus',
        optiontypeAct: 'addRecord',

        //定义表单对应的model
        formAddcon: {
          lkmId: '',
          lkmName: '',
          lkmSex: '男',
          lkmPostion: '',
          lkmTel: '',
          lkmMobile: '',
          lkmMemo: '',
          lkmCustNo: null,
          lkmCustName: null
        },
        addActivity: {
          atvId: null,
          atvDate: null,
          atvPlace: null,
          atvTitle: null,
          atvDesc: null,
          atvRemark: null,
        },


      }
    },

    methods: {
      //查询 数据
      query() {
        var url = this.axios.urls.CUSTOMER_GETCSTCUSTOMER;
        console.log(url);

        // this.formInline.date = new Date().getTime();
        console.log(this.formInline);
        this.axios.post(url, this.formInline).then(resp => {
          // console.log(resp.data.data);
          this.tableData = resp.data.data;
        }).catch(error => {
          console.log(error);
        })
      },

      //编辑客户信息&详细信息
      saveCustomer: function() {

        this.$refs['cusInform'].validate((valid) => {
          if (valid) {

            var url = this.axios.urls.CUSTOMER_UPDATECSTCUSTOMER;
            console.log(url);
            this.axios.post(url, this.cusInform).then(resp => {
              // console.log(resp.data.data);
              this.tableData = resp.data.data;
              this.formInline = {
                date: new Date().getTime()
              };
              this.query();
              this.dialogTableEdit = false;
            }).catch(error => {})
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },

      editShow: function(row) {
        this.dialogTableEdit = true;
        this.cusInform = row;
        console.log(row.custCredit);
        console.log(row);
      },

      //点击弹框同时查询联系人
      contacts: function(row) {

        this.formContacts.lkmCustNo = row.custNo;
        this.formContacts.lkmCustName = row.custName;

        this.dialogTableContact = true;
        let url = this.axios.urls.CUSTOMER_GETCSTLINKMAN;
        // console.log(url);
        console.log((row.custNo));
        console.log("adad" + this.formContacts);
        this.axios.post(url, this.formContacts).then(resp => {
          console.log(resp.data.data);
          this.contactData = resp.data.data;
        }).catch(error => {
          console.log(error);
        })
      },

      // 联系人
      //当关闭对话框时，该方法用于清空表单
      closeLinkForm: function() {
        //通过form表单的ref属性来清空表单验证信息
        this.$refs['formAddcon'].resetFields();
        this.formAddcon.lkmId = null;
        this.formAddcon.lkmName = null;
        this.formAddcon.lkmSex = null;
        this.formAddcon.lkmPostion = null;
        this.formAddcon.lkmTel = null;
        this.formAddcon.lkmMobile = null;
        this.formAddcon.lkmMemo = null;
      },

      //交往记录
      //当关闭对话框时，该方法用于清空表单
      closeActiveForm: function() {
        //通过form表单的ref属性来清空表单验证信息
        this.$refs['addActivity'].resetFields();
        this.addActivity.atvId = null;
        this.addActivity.atvDate = null;
        this.addActivity.atvPlace = null;
        this.addActivity.atvTitle = null;
        this.addActivity.atvDesc = null;
        this.addActivity.atvRemark = null;
      },


      //新增联系人
      addCus: function() {
        this.dialogName = '新增联系人信息';
        this.dialogTableAdd = true;
        this.optiontype = 'addCus';
      },
      //打开对话框，将对话框标题设置为修改，操作类型设置为'update'，
      //并使用获取的待修改的记录的值设置对应的表单元素
      exitLinkMan: function(row) {
        this.dialogName = '编辑联系人信息';
        this.dialogTableAdd = true;
        this.optiontype = 'update';
        this.formAddcon.lkmId = row.lkmId;
        this.formAddcon.lkmName = row.lkmName;
        this.formAddcon.lkmSex = row.lkmSex;
        this.formAddcon.lkmPostion = row.lkmPostion;
        this.formAddcon.lkmTel = row.lkmTel;
        this.formAddcon.lkmMobile = row.lkmMobile;
        this.formAddcon.lkmMemo = row.lkmMemo;
      },
      //保存联系人信息
      saveLinkMan: function(formAddcon) {
        this.$refs[formAddcon].validate((valid) => {
          if (valid) {
            let url = this.axios.urls.CUSTOMER_ADDCSTLINKMAN;
            //如果当前操作类型为update则需要调用更新接口
            if (this.optiontype == 'update') {
              url = this.axios.urls.CUSTOMER_UPDATECSTLINKMAN;
            }
            this.formAddcon.lkmCustNo = this.formContacts.lkmCustNo;
            this.formAddcon.lkmCustName = this.formContacts.lkmCustName;
            this.axios.post(url, this.formAddcon).then(resp => {
              //操作成功，关闭弹出框，执行查询以便于显示最新数据
              // this.formContacts = null;
              //操作失败，提示失败，关闭弹出框
              if (resp.data.code) {
                this.$message({
                  message: resp.data.msg,
                  type: 'success'
                });

                this.contact = true;
                this.dialogTableAdd = false;
                let url = this.axios.urls.CUSTOMER_GETCSTLINKMAN;
                // console.log(url);
                this.axios.post(url, this.formContacts).then(resp => {
                  this.contactData = resp.data.data;
                  // },
                  // console.log(this.formAddcon);
                  // console.log(this.formContacts);
                  // console.log(resp.data.data);
                  // console.log(resp.data.data);
                  // this.contactData = resp.data.data;
                  // this.formContacts.lkmCustNo = row.custNo;
                  // this.formContacts.lkmCustName = row.custName;
                }).catch(error => {
                  console.log(error);
                })
                // this.formContacts = resp.data.data;
              } else {
                this.$message({
                  message: resp.data.msg,
                  type: 'error'
                });
                this.dialogTableAdd = false;
              }
            }).catch(error => {})
          } else {
            console.log('error submit!');
            return false;
          }
        });


      },

      //点击弹框同时查询交往记录
      arecord: function(row) {
        this.dialogTableRecord = true;
        this.formActivity.atvCustNo = row.custNo;
        this.formActivity.atvCustName = row.custName;
        let url = this.axios.urls.CUSTOMER_GETCSTACTIVITY;
        // console.log(url);
        this.axios.post(url, this.formActivity).then(resp => {
          console.log(resp.data.data);
          this.recordData = resp.data.data;

        }).catch(error => {
          console.log(error);
        })
      },

      //新建交往记录
      addRecord: function() {
        this.dialogActiveName = '新增交往记录';
        this.dialogTableAddRecord = true;
        this.optiontypeAct = 'addRecord';
      },

      //修改交往记录信息
      exitActive: function(row) {
        this.dialogActiveName = '编辑交往记录信息';
        this.dialogTableAddRecord = true;
        this.addActivity.atvId = row.atvId;
        this.addActivity.atvDate = row.atvDate;
        this.addActivity.atvPlace = row.atvPlace;
        this.addActivity.atvTitle = row.atvTitle;
        this.addActivity.atvDesc = row.atvDesc;
        this.addActivity.atvRemark = row.atvRemark;
        this.optiontypeAct = 'updateActive';

      },

      dis:function() {
        return this.optiontype === 'update';
      },
      //查询历史订单
      queryOrder: function(row) {
        this.dialogTableOrder = true;
        this.formOrder.odrId = row.custNo;
        this.formOrder.odrCustomer = row.custName;
        var url = this.axios.urls.CUSTOMER_GETORDERSPAGE;
        console.log(url);
        this.axios.post(url, this.formOrder).then(resp => {
          console.log(resp.data.data);
          this.orderData = resp.data.data;
        }).catch(error => {
          console.log(error);
        })
      },

      //订单明细
      queryDetail: function(row) {
        this.dialogTableDetail = true;
        this.formOrderDetail.oddId = row.odrId;
        this.formOrderDetail.odrDate = row.odrDate;
        this.formOrderDetail.odrAddr = row.odrAddr;
        this.formOrderDetail.sumPrice = row.sumPrice;
        this.formOrderDetail.odrStatus = row.odrStatus;
        var url = this.axios.urls.CUSTOMER_GETORDERSLINE;
        console.log(url);
        this.axios.post(url, this.formOrder).then(resp => {
          console.log(resp.data.data);
          this.DetailData = resp.data.data;
        }).catch(error => {
          console.log(error);
        })
      },


      //删除客户信息
      handleDelete: function(row) {

        this.$confirm('此操作将删除该记录, 是否继续?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let url = this.axios.urls.CUSTOMER_dELCSTCUSTOMER + "?custNo=" + row.custNo;
          this.axios.delete(url).then(resp => {
            if (resp.data.code) {
              this.$message({
                message: resp.data.msg,
                type: 'success'
              });
              this.query();
            } else {
              this.$message({
                message: resp.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log("dele=" + row);
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });





      },
     /* onSubmit() {
        console.log('submit!');
      }, */

      //删除联系人信息
      deleteLinkMan: function(row) {
        let url = this.axios.urls.CUSTOMER_DELCSTLINKMAN + "?lkmId=" + row.lkmId;

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
              let url = this.axios.urls.CUSTOMER_GETCSTLINKMAN;
              // console.log(url);
              this.axios.post(url, this.formContacts).then(resp => {
                console.log(resp.data.data);
                this.contactData = resp.data.data;
              }).catch(error => {
                console.log(error);
              })

            } else {
              this.$message({
                message: resp.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log("dele=" + row);
          })



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },

      onSubmit() {
        console.log('submit!');
      },

      //新建交往记录(保存)
      saveAct: function(addActivity) {
        this.$refs[addActivity].validate((valid) => {
          if (valid) {
            console.log(this.addActivity);
            let url = this.axios.urls.CUSTOMER_ADDCSTACTIVITY;
            //如果当前操作类型为update则需要调用更新接口
            if (this.optiontypeAct == 'updateActive') {
              url = this.axios.urls.CUSTOMER_UPDATECSTACTIVITY;
            }
            this.addActivity.atvCustNo = this.formContacts.atvCustNo;
            this.addActivity.atvCustName = this.formContacts.atvCustName;
            this.axios.post(url, this.addActivity).then(resp => {
              //操作成功，关闭弹出框，执行查询以便于显示最新数据
              // this.formContacts = null;
              //操作失败，提示失败，关闭弹出框
              if (resp.data.code) {
                this.$message({
                  message: resp.data.msg,
                  type: 'success'
                });
                this.record = true;
                this.dialogTableAddRecord = false;
                let url = this.axios.urls.CUSTOMER_GETCSTACTIVITY;
                // console.log(url);
                this.axios.post(url, {
                  atvCustNo: this.atvCustNo,
                }).then(resp => {
                  this.recordData = resp.data.data;
                  console.log(resp.data.data);
                  // console.log(resp.data.data);
                  // this.contactData = resp.data.data;
                  // this.formContacts.lkmCustNo = row.custNo;
                  // this.formContacts.lkmCustName = row.custName;
                }).catch(error => {
                  console.log(error);
                })
                // this.formContacts = resp.data.data;
              } else {
                this.$message({
                  message: resp.data.msg,
                  type: 'error'
                });
                this.dialogTableAddRecord = false;
              }
            }).catch(error => {})
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },

    }
  }
</script>

<style>

</style>

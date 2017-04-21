<template>
  <div id="home">
    <div>
      <el-form :inline="true" :model="param">

        <el-form-item>
          <el-button icon="plus" @click="$refs['addStockDialog'].open()">入库</el-button>
        </el-form-item>

        <el-form-item label="">
          <el-input v-model="param.key" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table
        :data="stockList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="good.code"
          label="商品编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="good.name"
          label="商品名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="good.color"
          label="颜色"
          width="80">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="总量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="assigned"
          label="已分配"
          width="100">
        </el-table-column>
        <el-table-column
          prop="effectiveDate"
          label="过期时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <div>
              <el-button type="info" @click="$refs['deliveryAssignDialog'].open()">出库分配</el-button>
              <el-button type="info">出库完成</el-button>
              <el-button type="info" @click="$refs['adjustStockDialog'].open()">调整库存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="出库分配" ref="deliveryAssignDialog">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="分配数量">
          <el-input-number></el-input-number>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="入库" ref="addStockDialog">
      <div>
        <el-form :model="currentStock" label-width="100px" label-position="right">
          <el-form-item label="商品编号">
            <el-input v-model="currentStock.good.code"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="currentStock.good.name"></el-input>
          </el-form-item>
          <el-form-item label="商品颜色">
            <el-input v-model="currentStock.good.color"></el-input>
          </el-form-item>
          <el-form-item label="总量">
            <el-input v-model="currentStock.amount"></el-input>
          </el-form-item>
          <el-form-item label="已分配">
            <el-input v-model="currentStock.assigned"></el-input>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-date-picker
              v-model="currentStock.effectiveDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs['addStockDialog'].close()">取 消</el-button>
        <el-button type="primary" @click="addStock">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="调整库存" ref="adjustStockDialog">
      <div>
        <el-form :model="currentStock" label-width="100px" label-position="right">
          <el-form-item label="商品编号">
            <el-input v-model="currentStock.good.code"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="currentStock.good.name"></el-input>
          </el-form-item>
          <el-form-item label="商品颜色">
            <el-input v-model="currentStock.good.color"></el-input>
          </el-form-item>
          <el-form-item label="总量">
            <el-input v-model="currentStock.amount"></el-input>
          </el-form-item>
          <el-form-item label="已分配">
            <el-input v-model="currentStock.assigned"></el-input>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-date-picker
              v-model="currentStock.effectiveDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs['adjustStockDialog'].close()">取 消</el-button>
        <el-button type="primary" @click="addStock">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        param: {
          key: ''
        },
        currentStock: {
          id: null,
          good: {
            code: null,
            name: null,
            color: null
          },
          amount: 0,
          assigned: 0,
          effectiveDate: null
        },
        stockList: [{
          id: '1',
          good: {
            code: '123',
            name: '鼠标',
            color: '黑色'
          },
          amount: '3000',
          assigned: '200',
          effectiveDate: '2016'
        }, {
          id: '1',
          good: {
            code: '123',
            name: '鼠标',
            color: '黑色'
          },
          amount: '3000',
          assigned: '200',
          effectiveDate: new Date()
        }, {
          id: '1',
          good: {
            code: '123',
            name: '鼠标',
            color: '黑色'
          },
          amount: '3000',
          assigned: '200',
          effectiveDate: new Date()
        }, {
          id: '1',
          good: {
            code: '123',
            name: '鼠标',
            color: '黑色'
          },
          amount: '3000',
          assigned: '200',
          effectiveDate: new Date()
        }, {
          id: '1',
          good: {
            code: '123',
            name: '鼠标',
            color: '黑色'
          },
          amount: '3000',
          assigned: '200',
          effectiveDate: new Date()
        }]
      }
    },
    methods: {
      addStock () {
        this.$refs['addStockDialog'].close()
      },
      adjustStock () {
        this.$refs['adjustStockDialog'].close()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

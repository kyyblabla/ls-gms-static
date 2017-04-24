<template>
  <div id="home">
    <div>
      <el-form :inline="true" :model="params">

        <el-form-item>
          <el-button icon="plus" @click="$refs['addStockDialog'].open()">入库</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="params.key" placeholder="请输入关键字" @keyup.enter="search()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="search()">搜索</el-button>
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
          prop="goods.code"
          label="商品编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goods.name"
          label="商品名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goods.color"
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
          type="datetime"
          :formatter="dateFormat"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <div>
              <el-button type="info" @click="onDeliveryAssignClick(scope.row)">出库分配</el-button>
              <el-button type="info" @click="onDeliveryFinishClick(scope.row)">出库完成</el-button>
              <el-button type="info" @click="onAdjustStockClick(scope.row)">调整库存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="出库分配" ref="deliveryAssignDialog">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="分配数量">
          <el-input-number v-model="currentStock.assigned" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs['deliveryAssignDialog'].close()">取 消</el-button>
        <el-button type="primary" @click="deliveryAssign()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="出库完成" ref="deliveryFinishDialog">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="分配数量">
          <el-input-number v-model="currentStock.assigned" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs['deliveryFinishDialog'].close()">取 消</el-button>
        <el-button type="primary" @click="deliveryFinish()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="入库" ref="addStockDialog">
      <div>
        <el-form :model="currentStock" label-width="100px" label-position="right">
          <el-form-item label="商品编号">
            <el-input v-model="currentStock.goods.code"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="currentStock.goods.name"></el-input>
          </el-form-item>
          <el-form-item label="商品颜色">
            <el-input v-model="currentStock.goods.color"></el-input>
          </el-form-item>
          <el-form-item label="总量">
            <el-input-number :min="0" v-model="currentStock.amount"></el-input-number>
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
            <el-input v-model="currentStock.goods.code"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="currentStock.goods.name"></el-input>
          </el-form-item>
          <el-form-item label="商品颜色">
            <el-input v-model="currentStock.goods.color"></el-input>
          </el-form-item>
          <el-form-item label="总量">
            <el-input v-model="currentStock.amount"></el-input>
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
        <el-button type="primary" @click="adjustStock()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'hello',
    data () {
      return {
        params: {
          key: ''
        },
        currentStock: {
          id: null,
          goods: {
            code: null,
            name: null,
            color: null
          },
          amount: 0,
          assigned: 0,
          effectiveDate: null
        },
        stockList: []
      }
    },
    methods: {
      addStock () {
        console.log(this.currentStock)
        this.$http.post('/stock', this.currentStock).then(({data}) => {
          this.$refs['addStockDialog'].close()
          this.search()
        })
      },
      onDeliveryAssignClick (stock) {
        Object.assign(this.currentStock, stock)
        this.$refs['deliveryAssignDialog'].open()
      },
      deliveryAssign () {
        this.$http.put('/stock/assign', {}, {
          params: {
            assigned: this.currentStock.assigned,
            stockId: this.currentStock.id
          }
        }).then(({data}) => {
          this.$refs['deliveryAssignDialog'].close()
          this.search()
        })
      },
      onDeliveryFinishClick (stock) {
        Object.assign(this.currentStock, stock)
        this.$refs['deliveryFinishDialog'].open()
      },
      deliveryFinish () {
        this.$http.put('/stock/finish', {}, {
          params: {
            assigned: this.currentStock.assigned,
            stockId: this.currentStock.id
          }
        }).then(({data}) => {
          this.$refs['deliveryFinishDialog'].close()
          this.search()
        })
      },
      onAdjustStockClick (stock) {
        Object.assign(this.currentStock, stock)
        this.$refs['adjustStockDialog'].open()
      },
      adjustStock () {
        this.$http.put('/stock/adjust', this.currentStock).then(({data}) => {
          this.$refs['adjustStockDialog'].close()
          this.search()
        })
      },
      search () {
        this.$http.get('/stock/search', {
          params: this.params
        }).then(({data}) => {
          this.stockList = data
        })
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    mounted () {
      this.search()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

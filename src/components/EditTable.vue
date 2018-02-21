<template>
  <div class="EditTable">
  <el-button type="primary" v-on:click="Add">增行</el-button>
<el-table :data="dataGroups" style="width: 100%" @cell-click="Edit">
<el-table-column prop="name" label="资产" width="180" >
	<template slot-scope="scope">
	<el-input v-show="scope.row.edit=='name'" size="small" v-model="scope.row.name" :autofocus="true" @blur="SaveEdit(scope.row)">
	</el-input><span v-show="scope.row.edit!='name'">{{scope.row.name}}</span>
	</template>
</el-table-column>
<el-table-column prop="money" label="金额" width="180">
	<template slot-scope="scope">
	<el-input v-show="scope.row.edit=='money'" size="small" v-model="scope.row.money" :autofocus="true" @blur="SaveEdit(scope.row)">
	</el-input><span v-show="scope.row.edit!='money'">{{scope.row.money}}</span>
	</template>
</el-table-column>
<el-table-column prop="insertDate" label="入账时间">
	<template slot-scope="scope">
	<el-input v-show="scope.row.edit=='insertDate'" size="small" v-model="scope.row.insertDate" :autofocus="true" @blur="SaveEdit(scope.row)">
	</el-input><span v-show="scope.row.edit!='insertDate'">{{scope.row.insertDate}}</span>
	</template>
</el-table-column>
<el-table-column prop="backDate" label="回款日">
	<template slot-scope="scope">
	<el-input v-show="scope.row.edit=='backDate'" size="small" v-model="scope.row.backDate" :autofocus="true" @blur="SaveEdit(scope.row)">
	</el-input><span v-show="scope.row.edit!='backDate'">{{scope.row.backDate}}</span>
	</template>
</el-table-column>
<el-table-column prop="expectInterst" label="预期利息">
	<template slot-scope="scope">
	<el-input v-show="scope.row.edit=='expectInterst'" size="small" v-model="scope.row.expectInterst" :autofocus="true" @blur="SaveEdit(scope.row)">
	</el-input><span v-show="scope.row.edit!='expectInterst'">{{scope.row.expectInterst}}</span>
	</template>
</el-table-column>
<el-table-column prop="remark" label="备注">
	<template slot-scope="scope">
	<el-input v-show="scope.row.edit=='remark'" size="small" v-model="scope.row.remark" :autofocus="true" @blur="SaveEdit(scope.row)">
	</el-input><span v-show="scope.row.edit!='remark'">{{scope.row.remark}}</span>
	</template>
</el-table-column>
</el-table>
<el-row style="margin:10px;font-color:gray;font-size:16px;">
  <el-col :span="24">
	  <div class="grid-content bg-purple-dark">
		总计：<label>{{totalMoney}}</label>
	  </div>
  </el-col>
</el-row>

</div>
</template>


<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)


export default {
  name: 'EditTable',
  data(){
  
	return {dataGroups:[],totalMoney:0}
  },
  created:function(){
	let _this=this
	Vue.http.get('http://123.207.187.133:10003/getjson.py').then(response => {
		console.log(response)
		_this.data=response.body;
		_this.dataGroups=_this.data.dataGroups;
		var total=0;
		for(var i in _this.dataGroups)
		{
			if(!isNaN(_this.dataGroups[i].money))
			{
				total+=parseInt(_this.dataGroups[i].money);
			}
		}
		_this.totalMoney=total;
	}, response => {
    this.$message.error('数据请求失败，请检查网络');
  })
	
  },
   methods:{
    Add(){
		let _this=this;
		let json = {
			name: "修改后保存",
			money: 0,
			insertDate: new Date().toLocaleDateString(),
			backDate: "",
			expectInterst: 0,
			remark: "",
			edit: false
		}
		_this.dataGroups.push(json)
	},
	Edit(row, column, cell, event){
		console.log(row, column, cell, event)
		row.edit=column.property;
		//this.onCellClick(event);
	},
	onCellClick(event){
		let _this=this;
		_this.$nextTick(function(){
			$(event.target).children().find("input").focus();
		})
	},
	SaveEdit(row){
		let _this=this;
		console.log(row)
		row.edit=false;
		for(var i in _this.dataGroups)
		{
			//删除
			if(_this.dataGroups[i].name==null||_this.dataGroups[i].name==""||_this.dataGroups[i].name==undefined)
			{
				if(confirm('资产名称为空会删除整行数据，是否确认？'))
				{
					_this.dataGroups.splice(i,1);
				}
			}
			//判断金额必须是数字
			let money = _this.dataGroups[i].money.toString();
			let nan=isNaN(money);
			
			if(nan){
				//判断是否可计算
				//console.log(money)
				let add=money.split("+");
				//console.log(add);
				//console.log(add[0])
				if(add.length==2){
					_this.dataGroups[i].money=parseInt(add[0])+parseInt(add[1]);
				}
				else{
					let subtract=money.split("-");
					if(subtract.length==2){
						_this.dataGroups[i].money=parseInt(subtract[0])-parseInt(subtract[1]);
					}
					else{
						this.$message({message: '金额中的非数字将会被置零',type: 'warning'});
						_this.dataGroups[i].money=0;
						_this.dataGroups[i].expectInterst=0
					}
				}
				
				
			}
		}
		//提交至服务器
		//console.log(_this.dataGroups)
		Vue.http.post('http://123.207.187.133:10003/setjson.py',_this.data).then(response => {
			this.$message({message: '保存成功',type: 'success'});
			var total=0;
			for(var i in _this.dataGroups)
			{
				if(!isNaN(_this.dataGroups[i].money))
				{
					total+=parseInt(_this.dataGroups[i].money);
				}
			}
			_this.totalMoney=total;
		  }, response => {
			this.$message.error('保存失败，请检查网络');
		  });
	}
  }
    
}
  </script>
<template>
    <div class="echarts">
        <!-- <div>{{title}}</div> -->
        <div :id="id" ref='charts' class="echartsName" :style="{'min-Width':width,'height':height}">

        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    props: ['options','id','title','width','height'],
    data() {
        return {
            optionsNew:{},
            baseOptions:{},
        }
    },
    watch:{
      'options.series':{
        handler(newV,oldV) {
          let opObj = this.options;
          opObj.title = this.jiequ(this.options,15)
          opObj.series = newV;
          this.updateOptions(opObj);
          this.$nextTick(()=>{
              this.echartsInit(this.baseOptions,this.id)
            })
        },
        immediate:true
      },
      'options.xAxis':{
        handler(newV,oldV) {
          let opObj = this.options;
          opObj.xAxis = newV;
          this.updateOptions(opObj);
          this.$nextTick(()=>{
              this.echartsInit(this.baseOptions,this.id)
            })
        },
        immediate:true
      }
    },
    mounted: function(){
      let test = JSON.parse(JSON.stringify(this.options));
      this.updateOptions(this.options);
      this.$nextTick(()=>{
        this.echartsInit(this.baseOptions,this.id)
      })
    },
    methods:{
       jiequ(str,n) {
            if(str.series.type == "pie") {
              str = str.title;
              var strArr = [];
              for (var i = 0, l = str.length; i < l / n; i++) {
                  var a = str.slice(n * i, n * (i + 1));
                  strArr.push(a);
              };
              let aaa = strArr.map((item)=>{
                item = item+'\n'
                return item;
              });
              return aaa.join('');
            }
        },

      echartsInit(data,id) {
        const initId = this.$refs.charts;
        if(initId) {
          const myChart = echarts.init(document.getElementById(this.id));
          myChart.clear();//画图之前清除内容
          myChart.setOption(data);
        }
      },
      updateOptions(obj) {
        const options  = {
                color:obj.color,
                title:{
                    text: obj.title,
                    x:'center',
                    textStyle:{
                      // fontSize:,
                      width:10,
                      color:'#333333',
                      overflow:'truncate', 
                      ellipsis:'...'
                    },
                },
                formatter:function(val){    return val.split("-").join("\n");},
                tooltip : obj.series.label == 'pie'?
                {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                }:{},
                legend:obj.legendData ? {
                    bottom: 'left',
                    orient:"vertical",
                    x:'left',
                    y:' bottom',
                    padding:[0,100,0,0],
                    data: obj.legendData,
                } : '',

                xAxis: obj.xAxis?{
                    show:true,    //是否显示坐标轴
                    name:obj.xAxis.name,//坐标轴名称
                    nameTextStyle:{
                            color:'#2E2E2E',
                            // fontSize:17,

                    },
                    label:{

                    },
                    data: obj.xAxis.data, //坐标轴名称数据
                     nameGap: 15, //坐标轴名称与轴线之间的距离
                     boundaryGap: ['20%', '20%'], //坐标轴两边留白
                    // axisLine:{ //坐标刻度相关配置
                    // symbol:['none', 'none'],
                    // },
                    // axisTick:{
                    // length:1
                    // },
                    axisLabel:{ //坐标轴文字的设定
                    //    rotate:270,
                        color:'#2E2E2E',
                        // fontSize:12,    
                        padding:[12,0,0,0]
                    },
                    axisLine: {
                        lineStyle: {
                            color:['#BFC9CE'],
                            type:'dotted',
                        }
                    },
                    splitLine: {
                        lineStyle:{
                            color:['#BFC9CE'],
                            type: 'dotted',
                        }
                    },
                    axisTick: {
                        show: false
                    }
                } : '',
                
                yAxis: obj.yAxis?{
                    type : 'value',
                    name:obj.yAxis.name,
                    nameTextStyle:{
                        color:'#2E2E2E',
                        fontSize:8,
                    },
                     nameLocation: 'end', //坐标轴名字位置
                    nameTextStyle:{
                    align:'right'
                    },
                    nameGap:20,
                    min: 0,
                    max: obj.yAxis.max,
                    interval: obj.yAxis.interval,
                    axisLine:{
                        show:true
                    // symbol:['none', 'none'],
                    // symbolSize:[10,15],
                    // symbolOffset:[0,11]
                    },
                    axisLabel:{ //坐标轴文字的设定
                    //    rotate:270,
                        color:'#2E2E2E',
                        // fontSize:17,    
                        padding:[12,0,0,0]
                    },
                    axisTick: {
                        show: true
                    }
                } :'',

                series:[
                    {
                        name:'占比',
                        type:obj.series.type,
                        radius : '45%',
                        center: ['50%', '50%'],
                        // label:obj.series.label?obj.series.label : '',    
                        label:obj.series.label == 'pie'?{
                            show:true,
                            formatter: '{b}:{c} ({d}%)',
                        } :{
                            show:true,
                            position:'top',
                            align:'center',
                            distance:5,
                            color:'block',
                            fontSize:17,
                            padding:[0,0,10,0]
                        },
                        barCategoryGap:'20%',
                        barMaxWidth:'50',
                        data:obj.series.data,
                        itemStyle:obj.series.itemStyle,
                        avoidLabelOverlap:true,
                    }
                ],

                
            };
        this.baseOptions = options;
      }
    }
}
</script>
<style lang="less" scoped>
    .echarts{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
</style>
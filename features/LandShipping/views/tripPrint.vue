<template>
  <v-app>
      <v-container>
<div>

       <v-row class=" mt-3" justify="center"> 
        <v-col cols="4" evaluate='2' class="data pa-2 text-h4 font-weight-bold text-center "> 
             الاحمري للنقل 
             </v-col>
        </v-row>
</div>
<div>

    <v-row  justify="space-between" class="mt-n14 ammar small" dense>
      <v-col cols="5" class="mt-9 text-right" >
        <h5 class=" mb-1">بيان تفصيلي بالرحلات</h5>
        <v-row>
          <v-col cols="3" >  رقم الرحلة </v-col>
         <v-col cols="2" class='small font-weight-light'>{{tripData.id}}</v-col>
        </v-row>
        
         <v-row>
          <v-col cols="3" >  وصف الرحلة </v-col>
         <v-col cols="5" class='small font-weight-light' >
           {{tripDescription(tripData)}}</v-col>
         
        </v-row>

         <v-row>
          <v-col cols="3" >  اسم السائق </v-col>
         <v-col cols="2" class='small font-weight-light'>{{tripData.driver.name}}</v-col>
        </v-row>

        <v-row>
          <v-col cols="3" > السيارة   </v-col>
         <v-col cols="2" class='small font-weight-light'>{{tripData.car.mark}}</v-col>
        </v-row>
       
      </v-col>
      
      <v-col cols="3" class="mt-5 text-right">

          <v-row>
          <v-col cols="4" > تاريخ الطباعة   </v-col>
         <v-col cols="3" class='small font-weight-light'>{{print.date}}</v-col>
        </v-row>

          <v-row>
          <v-col cols="4" > التوقيت   </v-col>
         <v-col cols="3" class='small font-weight-light'>{{print.time}}</v-col>
        </v-row>
          <v-row class="mt-10">
          <v-col cols="4" > تاريخ الرحلة   </v-col>
         <v-col cols="2" class='small font-weight-light'>{{tripData.date}}</v-col>
        </v-row>
          <v-row>
          <v-col cols="4" > ايجار السيارة   </v-col>
         <v-col cols="2" class='small font-weight-light'>{{tripData.rentAmount}}</v-col>
        </v-row>

      </v-col>
    </v-row>
</div>

    <v-row class="mt-16 mb-10">
        <v-col cols="12" style='position:relative'>
    <v-data-table
      :headers="headers"
      :items="entities"
      :items-per-page="17"
      class="elevation-1"
    >
      <template v-slot:[`item.paymentType`]="{ item }" >
        {{item.paymentType |PaymentTypesFilter(item.payment)}}
      
      </template>
    
       <template v-slot:[`item.senderInfo`]="{ item }" >
            <span v-if="item.senderInfo ">
                <span v-if="item.senderInfo">
                {{item.senderInfo.name}}</span>
                </span>
                </template>
         <template v-slot:[`item.receiverInfo`]="{ item }" >
            <span v-if="item.receiverInfo ">
                <span v-if="item.receiverInfo.name">
                {{item.receiverInfo.name}}</span>
                </span>
                </template>
    </v-data-table>
    <div class="aa">
      <span class=" text-center px-5 py-2 both first">28</span>
      <span class=" text-center px-5 py-2 both second">368.50</span>
    </div>
    </v-col>
    </v-row>

<v-row class="mt-16" >
<v-col cols="4" class="text-center">
    <h4>المراجع</h4>
</v-col>
<v-col cols="8" class="text-center ">
     <h4 class="text-center ">مدير التشغيل</h4>


      <v-col cols="12" class="review">
        <v-col cols="3" >طريقة الدفع</v-col>
        <v-col cols="3" >عدد الطرود</v-col>
        <v-col cols="3" >الاجمالي</v-col>
        <v-col cols="3"  >اجمالي السندات النقدية</v-col>

        <v-col cols="3">نقدي</v-col>
        <v-col cols="3">{{reviewShipments(1).leng}}</v-col>
        <v-col cols="3">{{reviewShipments(1).tottal}}</v-col>
        <v-col cols="3">12.00</v-col>

        <v-col cols="3">دفع عند الاستلام</v-col>
        <v-col cols="3">{{reviewShipments(2).leng}}</v-col>
        <v-col cols="3">{{reviewShipments(2).tottal}}</v-col>
        <v-col cols="3">.</v-col>
<!-- 
        <v-col cols="3" class="data mt-0">اجل</v-col>
        <v-col cols="3" class="data">0</v-col>
        <v-col cols="3" class="data">0.00</v-col>
        <v-col cols="3" class="data">.</v-col> -->
      </v-col>

</v-col>

</v-row>
   
      </v-container>
  </v-app>

</template>

<script>
export default {
  data() {
    return {
      print:{
        time:new Date().toLocaleTimeString(),
        date:new Date().toLocaleDateString(),
      },
      tripData:{
       
      },
      entities:[],
      headers: [
        {
          text: "م",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "رقم البوليصة", value: "id",align: "center"},
        { text: "الرقم اليدوي", value: "manualNo",align: "center"},
        { text: "المرسل", value: "senderInfo",align: "center"},
        { text: "المرسل اليه", value: "receiverInfo",align: "center"},
        { text: "نوع البضاعة", value: "items[0].merchandiseId",align: "center"},
        { text: "عدد الطرود", value: "count",align: "center"},
        { text: "طريقة السداد", value: "paymentType",align: "center"},
        { text: "سعر الصنف ", value: "items[0].price",align: "center"},
        { text: "ضريبه الضنف ", value: "taxs",align: "center"},
        { text: "قيمة الامر", value: "total",align: "center"},
        { text: "الملاحظات", value: "notice",align: "center"},
      ],
      data: [],
    };
  },
  created() {
    this.printData = this.$store.getters.printinData;
    this.entities = this.printData.shipments
    this.tripData = this.printData.tripDetails
  },
  methods: {
    tripDescription(item){
          let fullLine = ` من مدينه  ${item.line.source.name}    الى مدينه ${item.line.destination.name}`;
          return fullLine;

    },
    reviewShipments(value) {
        let reviewShipments = this.entities.filter(i=>{

      return i.paymentType ==value
    })
    let leng = reviewShipments.length
    let tottal =reviewShipments.reduce(function (accumulator, currentValue) {
       return accumulator + currentValue.tottalPrice
         }, 0)
     
         return {tottal,leng}
      
    }
  },
};
</script>

<style lang="scss" scoped>
.ammar div{
margin:0 !important;
padding:1px !important;
font-weight:bold
}

.ammar div .edit{
margin-top:20px !important;
}
.data{
    border: 2px solid grey;


}
.both {
    position: absolute;
    border: 2px dotted grey;

}
.first{
    bottom:-32px;
    left:45%;
}
.second{
    bottom:33;
    left:8%;
}


.review div {
  border: 2px solid black;
  display: inline-block;
  font-weight:bold;

}

</style>
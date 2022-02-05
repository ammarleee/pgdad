حقهى<template>
  <div >
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start ">
         <v-btn
          color="success"
          @click="add"
          >
          اضافة مندوب<i class="fa fa-plus mr-2"></i>
        </v-btn>
         </v-col>
    </v-row>
  
     <v-card  width="80%"
    class="mx-auto mr-5">
     <v-data-table
    :headers="headers"
    :items="entities"
    :options.sync="options"
    :server-items-length="total"
    :search="search"
    :items-per-page="15"
    :loading="loadingStates.table"
    class="elevation-1"
  >
   <template v-slot:top>
        <v-text-field 
          v-model="search"
          label="بحث"
          class="mx-4"
        ></v-text-field>
       
      </template>
   <template v-slot:[`item.actions`]="{ item }">


<v-btn
  color="orange"
  elevation="2"
  icon
   outlined
  @click="openPolisa(item)"
>
<v-icon>mdi-eye</v-icon>
</v-btn>
<v-btn
  color="red"
  class="mx-2"
  icon
  elevation="2"
   outlined
  @click="del(item.id)"
>
<v-icon>mdi-delete</v-icon>
</v-btn>

      <v-btn
  color="primary"
  elevation="2" icon
  @click="edit(item.id)"
><v-icon>mdi-pencil</v-icon></v-btn>


    </template>
  </v-data-table>
     </v-card>
    
   <!-- Add Modal -->
   <v-dialog
      v-model="dialog"
      width="600"
      persistent
    >
      <v-card >
  <v-form v-model="valid"> 
 

        <v-card-title class="headline" >
      <i class="fa fa-pen ml-2" ></i> تعديل/إضافة 
        </v-card-title>
         <v-card-text>
             <v-container>
          
          <v-row class="my-0 ammar" dense>
            <v-col>
              <v-text-field dense  outlined
              label="اسم المندوب"
             :rules="[allRules.required, allRules.minNameLen(4)]" 
               v-model="selected.name"
                >
                
              </v-text-field>
            </v-col>
          </v-row>
           <v-row class="my-0 ammar" dense>
            <v-col>
              <v-text-field dense  outlined
              label="رقم الجوال"
               v-model="selected.mob"
   :rules="[allRules.required,allRules.length(8)]" 

                >
              </v-text-field>
            </v-col>
          </v-row>
           <v-row class="my-0 ammar" dense>
            <v-col>
              <v-text-field dense 
   :rules="[allRules.required,allRules.length(8)]" 
              
               outlined
              label="رقم الجوال 2"
               v-model="selected.mob2">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="my-0 ammar" dense>
            <v-textarea
            outlined
          name="notice"
          label="الملاحظات"
          v-model="selected.notice"
        ></v-textarea>
          </v-row>
        </v-container>
        
         </v-card-text>
      
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            :disabled="!valid"
            @click="editConfirmed()"
          >
           حفظ
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="cancelEdit()"
          >
            إلغاء
          </v-btn>
        </v-card-actions>
        </v-form> 
      </v-card>
    </v-dialog>
   <!-- Add Modal -->
     <!-- polisa model start -->
    <v-dialog
      v-model="polisaDialog"
      width="99%"
      
    >
    
      <v-card >
        

        <v-card-title class="headline" >
          <h2 class="pa-3 mx-auto pink--text">

          جميع بوالص المندوب
          </h2>
       
        </v-card-title>
        <!-- <v-row>
          <v-col cols="11" class="pa-3"> -->
            <v-card-text >
          <v-data-table
          v-model="selectedPolisa"
          :single-select="singleSelect"
          item-key="id"
          show-select    
          :headers="polisaHeaders"
          :items="polisaData"
          :options.sync="options"
          fixed-header
          :server-items-length="total"
          :search="search"
          :loading="loadingStates.table"
          class="elevation-1"
        >
         <template v-slot:top>
        <v-text-field   
          v-model="search"
          label="بحث"
          class="mx-4"
        ></v-text-field>
      <v-spacer></v-spacer>

        <div >
           <v-btn @click="sendTo()"   class="d-block ma-2 error " :disabled="selectedPolisa.length < 2" >
             اضافه عموله
           </v-btn>
           </div>
      </template>
       <template >
    </template>
     
          
          <template v-slot:[`item.senderInfo`]="{ item }" >
  <div v-if="item.senderInfo ">
    <div>{{item.senderInfo.name}}</div>
    <div>{{item.senderInfo.phoneNumber}}</div>

    </div>
    </template>

     <template v-slot:[`item.receiverInfo`]="{ item }" >
   <div v-if="item.receiverInfo">
    <div>{{item.receiverInfo.name}}</div>
    <div>{{item.receiverInfo.phoneNumber}}</div>
    </div>
    </template>
      <template v-slot:[`item.items`]="{ item }" >
   <div v-if="item.items">
    <div v-if="item.items[0].merchandise">{{item.items[0].merchandise.name}}</div>
    <div>{{item.items[0].quantity}}</div>
    </div>
    </template>
    
   <template v-slot:[`item.actions`]="{ item }" >
                <v-btn
  color="success"
  elevation="2"
  icon
   outlined
  @click="sendTo(item)"
>
<v-icon color="green" >mdi-account-switch</v-icon>
</v-btn>
   </template>

        </v-data-table>
            </v-card-text>
      </v-card> 
      </v-dialog>
      <!-- commision Dialog -->
       <v-dialog
      v-model="commissionDialog"
      width="50%"
    >
      <v-card >
        <v-card-title class="headline" >
            اضافه عموله لمندوب
        </v-card-title>
         <v-card-text >
             <v-container v-if="!showPrint">
                 <v-row dense justify="center">
                    
                    <v-col cols="3">
                      <div class="rounded-lg  pa-1 text-center grey lighten-3">
                        <h5>عدد البوالص</h5>
                        <h6>{{selectedPolisa.length}}</h6>
                        
                      </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="rounded-lg grey pa-1 text-center lighten-3">
                        <h5>الاجمالى </h5>
                        <h6>{{polisasValue(selectedPolisa)}}</h6>
                        
                      </div>
                    </v-col>
                     <v-col cols="3" class="mt-2">
                        <v-text-field
                outlined
          v-model.lazy="selected.commission"
          @blur="countPercent"
          label="النسبه %"
          class="mx-4"
        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-2">
                        <v-text-field
                        v-if="selected.commission"
                outlined
          v-model="selected.value"
          label="ريال"
          class="mx-4"
        ></v-text-field>
                    </v-col>
                   
                 </v-row>
                 
               </v-container>
               <div v-else class="text-center">
                 <h2>طباعة سند الصرف لمندوب </h2>
                  <v-row>
                    <v-col cols="12">
                      <v-btn icon @click="print">
                        <v-icon large color="error" >
                          mdi-printer
                        </v-icon>
                      </v-btn>

                    </v-col>
                  </v-row>

               </div>
         </v-card-text>
           <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
          v-if="!showPrint"
          :disabled="!selected.commission"
            color="primary"
            @click="finished()"
          >
           حفظ
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="cancelCommissionEdit()"
          >
            إلغاء
          </v-btn>
        </v-card-actions>
        
      </v-card>
      </v-dialog>
  </div>
</template>

<script>
import ApiService from '../services/SalesmenService.js'
export default {
data(){
  return{
    tottal:null,
    valid:false,
    showPrint:false,
    commissionDialog:false,
    singleSelect:false,
    selected:{},
    selectedPolisa:[],
    polisaDialog:false,
    polisaData:null,
    entities:[],
    total: 0,
    search:'',
    options: {},
    dialog:false,
    loadingStates:{
       table:false
   },
    headers: [
          {
            text: 'رقم',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'الاسم', value: 'name' },
           { text: 'مسح / تعديل', value: 'actions', align: 'left',},

          
        ],
          polisaHeaders: [
        {
          text: "رقم",
          align: "start",
          sortable: false,
          value: "id",
          align: "center",
        },
        { text: "التاريخ", value: "date", align: "center", sortable: true },
        {
          text: "الرقم اليدوى",
          value: "manualNo",
          align: "center",
          sortable: true,
        },
        {
          text: "رقم الدفتر",
          value: "bookNum",
          align: "center",
          sortable: true,
        },
        {
          text: " نوع الخدمه ",
          value: "serviceTypeId",
          align: "center",
          sortable: true,
        },
        {
          text: "الصنف",
          value: "items[0].merchandiseId",
          align: "center",
          sortable: true,
        },
        {
          text: "الوحده",
          value: "items[0].unitId",
          align: "center",
          sortable: true,
        },
        {
          text: "المسار",
          value: "lineId",
          align: "center",
          sortable: true,
        },
        { text: "المرسل", value: "senderInfo", align: "center", sortable: true },
        {
          text: "المستلم",
          value: "receiverInfo",
          align: "center",
          sortable: true,
        },
       
        {
          text: "اجمالي السعر",
          value: "totalPrice",
          align: "center",
          sortable: true,
        },
           { text: '  اضافه عموله', value: 'actions', align: 'left',},

        // { text: "الحاله", value: "state", align: "center", sortable: true },
      
      ],
       


        
  }
},
mounted() {
 this.getData();
},
computed:{
  allPolisas(){
    return this.$store.getters.polisas
  }
},
methods:{
  countPercent(){
   let percent= ((this.tottal/100)*this.selected.commission).toFixed(1)
     this.$set(this.selected, "value", percent)
  },
  print(){
    let date =new Date().toLocaleDateString() 
     let printData={
          name:this.entities.find(e=>e.salesManId==this.selectedPolisa.salesManId).name ,
          tottal:this.selected.value,
          quantity:10,
          from:date,
          to: date,
          remain: this.polisaData.length -this.selectedPolisa.length,
          count:this.selectedPolisa.length ,


        }
         this.$store.commit("printData",printData);
      this.$router.push('/shipping/salesMenPrint')

  },
    sendTo(item){
          this.commissionDialog =true
          if (item) {
            this.selectedPolisa = []
            this.selectedPolisa.push(item)
          }
      },
       cancelCommissionEdit(){
          this.commissionDialog =false
           this.showPrint = false
           this.selectedPolisa = []

      },
      finished(){
        this.showPrint = true
        let data = {
          id:this.selected.distObject.id,
          polisas: this.selectedPolisa
        }
        console.log(data);
        // this.$store.commit('pushPolisaToDist',data);
      },
       polisasValue(items){
        let tottal =  items.reduce(function (accumulator, currentValue) {
       return accumulator + currentValue.totalPrice
         }, 0)
         this.tottal = tottal
         return tottal
    },
  openPolisa(item){

    let salesManPolisa = this.allPolisas.filter(i=>{
      return i.salesmanId == item.id &&i.state.id==0
    })

      this.polisaData = [...salesManPolisa]
      this.polisaDialog = true;
    },
  getData(){
   
   this.loadingStates.table=true;
   if(this.options)
     this.options.searchTerm=this.search;
    ApiService.query(this.options).then(resp=>{
        this.entities=resp.data.items;
        console.log(resp.data);
        this.total=resp.data.total;
        this.loadingStates.table=false; 
    }).catch(err=>{
        this.loadingStates.table=false;
    });
  },
  editConfirmed(){
     ApiService.edit(this.selected).then(resp=>{
          this.dialog=false;
            var message='تم تعديل العنصر بنجاح';
          if(!this.selected.id){
                this.addToArr(this.entities,resp.data);
              message='تم إضافة العنصر بنجاح';
          }else{
        this.updateArr(this.entities,resp.data);
          }
        
            this.$dialog.notify.success(message, {
                position: 'top-right',
                timeout: 3000
                })
          }
          ).catch(err=>{
            
            this.dialog=false;
            console.log(err.request.response);
              this.$dialog.notify.error('خطأ اثناء تعديل العنصر', {
                position: 'top-right',
                timeout: 3000
                })
          });
  },
  
  cancelEdit(){
    this.dialog = false;
    this.selected={};
  },
  add(){
    this.selected={};
    this.dialog=true;
  },
  edit(id){
    this.selected={...this.entities.filter(e=>e.id==id)[0]};
    this.dialog=true;
  },
  del(id){
 this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف مندوب  ',
    persistent: true,
    actions: {
      true: {
        text:'نعم',
        color: 'green',
        handle: () => {
          ApiService.delete(id).then(resp=>{
            const index = this.entities.indexOf(this.entities.filter(e=>e.id==id)[0]);
            if (index > -1) {
              this.entities.splice(index, 1);
            }
            this.$dialog.notify.success('تم مسح العنص بنجاح', {
                position: 'top-right',
                timeout: 3000
                })
          }

          ).catch(resp=>{
              this.$dialog.notify.error('خطأ اثناء مسح العنصر', {
                position: 'top-right',
                timeout: 3000
                })
          });
        }
      },
      false: {
        
        text: 'الغاء',
        
      }
    }
  }).then(res=>{
    console.log("delet res:",res);
  })
  },
  view(id){

  }
},
watch: {
      options: {
        handler () {
        
          this.getData()
        },
        deep: true,
      },
       search: {
        handler () {
        
          this.getData()
        },
        deep: true,
      },
    },
}
</script>


<style lang="scss" scoped>

</style>
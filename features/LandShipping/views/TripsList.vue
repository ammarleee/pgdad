<template>
  <div >
    <!-- details polisa start -->
<v-dialog
      v-model="polisaDialog"
      width="99%"
    >
      <v-card >
        <v-card-title class="headline" >
          <!-- header  -->
      <v-row black class='d-block' dense style="width:100% !important">
  <v-col cols="12">
   <v-tabs
    fixed-tabs
    next-icon="mdi-arrow-right-bold-box-outline"
    prev-icon="mdi-arrow-left-bold-box-outline"
    show-arrows
    center-active
    background-color="orange accent-1"
    color="black"
    class="rounded-lg " 
    light
  >
   <v-tab @click="showPolisa()"  >
        جميع ألبوالص 
        
  </v-tab>
  <v-tab @click="showTrip()">
        تفاصيل الرحله
        
  </v-tab>
  
  </v-tabs>
            </v-col>
      </v-row>
     
      <!-- polisas  -->
          <v-row v-if="showPolisaTab" class="text-center">
            <v-col cols="12" >
            <app-polisa-table 
            :shipments="tripDetails" 
            @printShipments="printShipments($event)"
            @printTrip="printTrip($event)"
            @printDriverReport="printDriverReport($event)" ></app-polisa-table>
            </v-col>
          </v-row>
            <!-- trip  -->
      <v-row v-if="showTripTab" class="text-center">
               <v-col cols="12" >
                 <v-card  min-width="98%" class=" ma-4">
     <v-data-table
    :headers="headers"
    :items="singleTrip"
    :options.sync="options"
    fixed-header
    :server-items-length="total"
    :search="search"
    :items-per-page="15"
    :loading="loadingStates.table"
    class="elevation-1"
  >
     
       <!-- end the expand -->
       <template v-slot:[`item.print`]="{ item }">
              <v-icon color="orange"  @click="openPolisa(item)">mdi-eye</v-icon>
          </template>
   <template v-slot:top>
        <v-text-field  
          v-model="search"
          label="بحث"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.state`]="{ item }" >
   <v-chip
        color="green"
        dark
        v-if="item.state ==1"
      >
      مفتوح
      </v-chip>
       <v-chip
        color="error"
        dark
        v-else-if="item.state ==2"
      >
      مغلق
      </v-chip> <v-chip
        color="orange"
        dark
        v-else
      >
      مرحل
      </v-chip>
      
  
    </template>
      <template v-slot:[`item.changeState`]="{ item }" >
        <div class="text-center">
     
    <v-menu>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="primary"
              fab
              icon
              dark
              @click="selected =item"
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >
             <v-icon   >mdi-lock</v-icon>
            </v-btn>
          </template>
          <span>الحالة</span>
        </v-tooltip>
      </template>

      
      <v-card class="text-center" width='200'>
        <v-list>
          <v-list-item>
            <v-list-item-content >
              <v-list-item-title class="text-h5">الحالة</v-list-item-title>
        <v-divider></v-divider>
        <v-icon large :class="showState.color" class="pa-3">{{showState.icon}}</v-icon>
              <v-list-item-subtitle :class="showState.color" >{{showState.state}}</v-list-item-subtitle>
        <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>

            <v-list-item-action class='mt-0'>
            <v-list-item-title v-if="item.state == 1 ">
              <v-btn class="ma-1 white--text" @click="changeState(item,2)" color="error" >غلق</v-btn>
              <v-btn class="ma-1 white--text" @click="changeState(item,3)" color="orange" >ترحيل</v-btn>
              </v-list-item-title>
            <v-list-item-title v-if="item.state == 2 " >
              <v-btn class="ma-1 white--text" @click="changeState(item,3)" color="orange" >ترحيل</v-btn>
              <v-btn class="ma-1 white--text" @click="changeState(item,1)" color="success">اعاده فتح</v-btn>

              </v-list-item-title>
            <v-list-item-title v-if="item.state == 3"  >
              <v-btn class="ma-1 white--text" @click="changeState(item,1)" color="success">اعاده فتح</v-btn>
              <v-btn class="ma-1 white--text" @click="changeState(item,2)" color="error">غلق</v-btn>
              </v-list-item-title>
            </v-list-item-action>
        </v-list>
       
      </v-card>
    </v-menu>
  </div>
      </template>
      <template v-slot:[`item.driver`]="{ item }" >
        <span v-if="item.driver">

         {{ item.driver.name }}
        </span>
  
    </template>
    <template v-slot:[`item.car`]="{ item }" >
      <span v-if="item.car">
          {{item.car.mark}}- {{ item.car.plate }}
      </span>
        
  
    </template>
      <template v-slot:[`item.from`]="{ item }" >
   <v-chip
        color="info"
        dark
        v-if="item.line"
      >
        {{ item.line.source.name }}
      </v-chip>
  
    </template>
    <template v-slot:[`item.to`]="{ item }" >
    <v-chip
        color="pink"
        dark
         v-if="item.line"
      >
        {{ item.line.destination.name }}
      </v-chip>
    </template>
   <template v-slot:[`item.actions`]="{ item }" >
   
  <v-icon color="success"  small  @click="edit(item.id)">mdi-pen</v-icon>
  <v-icon color="error" small  @click="del(item.id)">mdi-delete</v-icon>
  
    </template>
  </v-data-table>
     </v-card>
               </v-col>
      </v-row>
     
        </v-card-title>
      </v-card>
      </v-dialog>

    <!-- finished polisa  -->
      
       <v-dialog v-model="passworDialog" width="500">
        <v-card>
  

          <v-card-title
            class="headline yellow black--text text-capitalize text-center lighten-2"
          >ادخل الرقم السرى</v-card-title>
          <div class="ma-5">
            <v-text-field :rules="[allRules.required]" dense 
              autocomplete="off"
              type="password"
              class="mb-3"
              v-model="password"
              outlined
              label="Enter password"
            ></v-text-field>
            <v-alert type="error" class="text-capitalize" outlined v-if="alert">{{alertMsg}}</v-alert>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="pink" @click="passworDialog = false">الغاء</v-btn>
            <v-btn text color="success" @click="submitPassword">تاكيد</v-btn>
          </v-card-actions>
  
        </v-card>
        
      </v-dialog>
  
    <v-row class="pr-5 pb-3 mt-5" dense>
      <v-col class="d-flex justify-content-start ">
         <v-btn
          color="success"
          @click="add"
          >
          اضافة رحلة
          <i class="fa fa-plus mr-2"></i>
        </v-btn>
        
        <!--  -->
        <hr>
 


<!--  -->
   </v-col>
  
      
    </v-row>
   
     <v-card  min-width="98%" class=" ma-4">
     <v-data-table
    :headers="headers"
    :items="entities"
    :options.sync="options"
    fixed-header
    :server-items-length="total"
    :search="search"
    :items-per-page="15"
    :loading="loadingStates.table"
    class="elevation-1"
  >
     
       <!-- end the expand -->
       <template v-slot:[`item.print`]="{ item }">
              <v-icon color="orange"  @click="openPolisa(item)">mdi-eye</v-icon>
          </template>
   <template v-slot:top>
        <v-text-field  
          v-model="search"
          label="بحث"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.state`]="{ item }" >
   <v-chip
        color="green"
        dark
        v-if="item.state ==1"
      >
      مفتوح
      </v-chip>
       <v-chip
        color="error"
        dark
        v-else-if="item.state ==2"
      >
      مغلق
      </v-chip> <v-chip
        color="orange"
        dark
        v-else
      >
      مرحل
      </v-chip>
      
  
    </template>
      <template v-slot:[`item.changeState`]="{ item }" >
        <div class="text-center">
     
    <v-menu>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="primary"
              fab
              icon
              dark
              @click="selected =item"
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >
             <v-icon   >mdi-lock</v-icon>
            </v-btn>
          </template>
          <span>الحالة</span>
        </v-tooltip>
      </template>

      
      <v-card class="text-center" width='200'>
        <v-list>
          <v-list-item>
            <v-list-item-content >
              <v-list-item-title class="text-h5">الحالة</v-list-item-title>
        <v-divider></v-divider>
        <v-icon large :class="showState.color" class="pa-3">{{showState.icon}}</v-icon>
              <v-list-item-subtitle :class="showState.color" >{{showState.state}}</v-list-item-subtitle>
        <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>

            <v-list-item-action class='mt-0'>
            <v-list-item-title v-if="item.state == 0 ">
              <v-btn class="ma-1 white--text" @click="changeState(item,1)" color="error" >غلق</v-btn>
              <v-btn class="ma-1 white--text" @click="changeState(item,2)" color="orange" >ترحيل</v-btn>
              </v-list-item-title>
            <v-list-item-title v-if="item.state == 1 " >
              <v-btn class="ma-1 white--text" @click="changeState(item,2)" color="orange" >ترحيل</v-btn>
              <v-btn class="ma-1 white--text" @click="changeState(item,0)" color="success">اعاده فتح</v-btn>

              </v-list-item-title>
            <v-list-item-title v-if="item.state == 2 "  >
              <v-btn class="ma-1 white--text" @click="changeState(item,0)" color="success">اعاده فتح</v-btn>
              <v-btn class="ma-1 white--text" @click="changeState(item,1)" color="error">غلق</v-btn>


              </v-list-item-title>
            </v-list-item-action>
        </v-list>
       
      </v-card>
    </v-menu>
  </div>
      </template>
      <template v-slot:[`item.driver`]="{ item }" >
        <span v-if="item.driver">

         {{ item.driver.name }}
        </span>
  
    </template>
    <template v-slot:[`item.car`]="{ item }" >
      <span v-if="item.car">
          {{item.car.mark}}- {{ item.car.plate }}
      </span>
        
  
    </template>
      <template v-slot:[`item.from`]="{ item }" >
   <v-chip
        color="info"
        dark
        v-if="item.line"
      >
        {{ item.line.source.name }}
      </v-chip>
  
    </template>
    <template v-slot:[`item.to`]="{ item }" >
    <v-chip
        color="pink"
        dark
         v-if="item.line"
      >
        {{ item.line.destination.name }}
      </v-chip>
    </template>
   <template v-slot:[`item.actions`]="{ item }" >
   
  <v-icon color="success"  small  @click="edit(item.id)">mdi-pen</v-icon>
  <v-icon color="error" small  @click="del(item.id)">mdi-delete</v-icon>
  
    </template>
  </v-data-table>
     </v-card>
    
   <!-- Add Modal -->
   <v-dialog
      v-model="dialog"
      width="80%"
      persistent
    >
      <v-card >
        <v-form v-model="valid"  >
        <v-card-title class="headline" >
          {{dialogTitle}}
      <!-- <i class="fa fa-pen ml-2" ></i> تعديل/إضافة  -->
        </v-card-title>
         <v-card-text>
             <v-container>
          
   <v-row class="mb-3"  dense>
         
   <v-col cols="12" sm="12">
  <div class="hiddenradio text-center grey lighten-3 pa-3 rounded-lg" >
    <h4 class="font-weight-bold">الحالة</h4>
<label v-for="(state,i) in states" :key="i" class="ma-3">
  <input type="radio" name="currentState" v-model="selected.state"  :value="state.value"  >
  <div class="pa-3 " >
  <v-icon large :color='state.color'>{{state.icon}}</v-icon>
  </div>
</label>
<h4 class="lg-rounded " :class="showState.color"> {{showState.state}}</h4>
</div>
</v-col>
          </v-row>
   <v-row class="my-0 ammar" dense>

<v-col cols="12" sm="4">
              <v-text-field :rules="[allRules.required]" dense  outlined
              label="الرقم اليدوى"
              type="number"
               v-model="selected.manualNo"
                >
              </v-text-field>
</v-col>
           
            <v-col cols="12" sm="4">
            <v-text-field :rules="[allRules.required]" dense  outlined
              label="قيمه الايجار"
              type="number"
               v-model="selected.rentAmount"
                >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
            <v-text-field :rules="[allRules.required]" dense  outlined
              label="اجمالى مصاريف"
              type="number"
               v-model="selected.totalExpenses"
                >
              </v-text-field>
            </v-col>
          
         <v-col cols="12" sm="6">
  
      <v-autocomplete
  :rules="[allRules.required]"      
    dense outlined 
    label="نوع الخدمه"
    :items="servece"
     item-value="id"
      item-text="name"
      auto-select-first   
    v-model="selected.serviceTypeId">

    </v-autocomplete>
  </v-col>
            <!-- 2-driver -->
            
            <v-col cols="12" sm="6">
      <v-autocomplete
  :rules="[allRules.required]"    dense outlined 
    label="اسم السائق"
    :items="driversList"
     item-value="id"
      item-text="name"
      auto-select-first   
    v-model="selected.driverId">
    </v-autocomplete>
  </v-col>
            <!-- 3-cars -->
  <v-col cols="12" sm="6">
  
      <v-autocomplete
  :rules="[allRules.required]"    
  dense
   outlined 
    label="السياره"
    :items="carList"
     item-value="id"
      item-text="plate"
      auto-select-first   
    v-model="selected.carId">
    </v-autocomplete>
  </v-col>
            <!-- 4-lines -->

  <v-col cols="12" sm="6">
  
      <v-autocomplete
  :rules="[allRules.required]" 
     dense outlined 
    label="المسار"
    :items="lines"
     item-value="id"
     
      item-text="name"
      auto-select-first   
    v-model="selected.lineId">

    </v-autocomplete>
    
    
  </v-col>
          </v-row>
<v-row  class="my-0 " dense>
   <v-col cols="12" sm="6"  >
    
    <DatePicker-layout @myEvent="selected.date = $event" :disabled='false' :date.sync="selected.date" label="التاريخ"></DatePicker-layout>
      </v-col>
      <v-col cols="12" sm="6">
    <TimePicker-layout @myEventTime="selected.departure = $event" :time.sync='selected.departure' label="وقت المغادره"></TimePicker-layout>
      </v-col>
      <v-col cols="12" sm="6">
    <TimePicker-layout @myEventTime="selected.arrive = $event" :time="selected.arrive" label="وقت الوصول"></TimePicker-layout>
      </v-col>
      <v-col cols="12" sm="6">
    <TimePicker-layout :time="selected.actualArrive" @myEventTime="selected.actualArrive = $event" label="وقت الوصول الفعلى"></TimePicker-layout>
      </v-col>
</v-row>
<v-row class="my-0 ammar" dense> 
            
      <v-col cols="12" sm="6">
        
        <v-radio-group  v-model="selected.tripCostType">
      <v-radio
        v-for="(n,i) in renting"
        
        mandtory
        :key="i"
        :label="`${n.title}`"
        :value="n.value"
      ></v-radio>
    </v-radio-group>
      </v-col>
      <v-col cols="12" sm="6">

       <v-checkbox
              v-model="printing"
              class="pa-0"
              label="الطباعه مباشره دون عرض"
              color="red darken-3"
              value="red darken-3"
              
            ></v-checkbox>
             <v-checkbox class='ma-0 pa-0'
              v-model="printing2"
              label="طباعه البوليصه المحدده"
              color="orange darken-3"
              value="orange darken-3"
              
            ></v-checkbox>
      </v-col>
   </v-row>
          <v-row class="my-0 ammar" dense>
            <v-textarea
            outlined
          name="input-7-1"
          label="ألملاحظات"
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
  </div>
</template>

<script>
import ApiService from '../services/TripsService.js'
import polisaTable from './polisaTable'
import shipmentService from '../services/ShipmentService.js'
// requird
import driverApi from '../services/DriverService.js'
import lineApi from '../services/LinesService.js'
import carApi from '../services/CarService'
import serveceApi from '../../Settings/services/ServiceTypesService'
 import Enums from './../../../plugins/enums';

export default {
  components: {
    'app-polisa-table':polisaTable
  },
data(){
  return{
    valid: false,
    passworDialog:false,
    singleTrip:[],
    password:null,
      states:Enums.States,
tripDetails:null,
    rightState:false,
    alert:false,
    alertMsg:null, 
    theRight:null,
    dialogTitle:'',
    polisaDialog:false,
    radioGroup:null,
    printing:null,
    printing2:null,
    renting:[{title:'ايجار نقدا' ,value:0},{title: 'ايجار على الفرع ',value:1}],
    selected:{state:"",departure : '11:15',arrive : '11:15',actualArrive : '11:15'},

    newdate1:null,
     driversList:null,
    carList:null,
    lines:null,
    servece:null,
    showPolisaTab:false,
    showTripTab:false,
    entities:[],
    total: 0,
    search:'',
    options: {},
    dialog:false,
    loadingStates:{
       table:false
   },
   
        
  }
},
created() {
 this.getData();
 this.getallData()

},

methods:{
   printShipments(items) {
      this.$store.commit("printData",items);
      this.$router.push('/shipping/barCode')
    },
      printTrip(items) {
        let tripDetails={
          tripDetails:this.entities.find(i=>i.id==this.tripDetails[0].tripId)  ,
          shipments:items
        }
         this.$store.commit("printData",tripDetails);
      this.$router.push('/shipping/tripPrint')
    },
      printDriverReport(items) {
      console.log('printDriverReport');
       let tripDetails={
          tripDetails:this.tripDetails,
          shipments:items
        }
      
       this.$store.commit("printData",tripDetails);
      this.$router.push('/shipping/driverReportPrint')
    },

  openPolisa(trip){
    shipmentService.get()
    .then(resp=>{
      this.singleTrip =[]
      let tripShipments = resp.data.items.filter(i=>{
        return i.tripId ==trip.id
      })
    this.showPolisa()
    this.singleTrip.push(trip)
    this.polisaDialog = true
    this.tripDetails = tripShipments
    console.log( this.tripDetails);

    }).catch(err=>{
      console.log(err);
    })
   


  },
  showPolisa(){
    this.showPolisaTab =true
    this.showTripTab =false

  },
   showTrip(){
     this.showTripTab =true
    this.showPolisaTab =false

  },
    
  
  getCityStart(lineId){
    if(this.lines){
  let name
  let findItem = this.lines.filter(i=>{
    return i.id == lineId
  })
  name = findItem[0].source.name
  return name
    }
},
getCityEnd(lineId){
   if(this.lines){
  let name
  let findItem = this.lines.filter(i=>{
    return i.id == lineId
  })
  name = findItem[0].destination.name
  return name
   }
},
  changeState(item,num){
      item.state = num
    this.editConfirmed()
  },
 async getallData(){
   try {
    this.loadingStates.table=true;
     const line=await lineApi.query()
     const servece=await serveceApi.get()
     const drivers = await driverApi.query()
    const cars = await   carApi.get()
    this.driversList=drivers.data.items;
    this.carList=cars.data.items
    this.lines=line.data.items;
    this.servece=servece.data;
     this.loadingStates.table=false;
   } catch (error) {
     console.log(error);
     this.loadingStates.table=false;
     
   }
  },
  getData(){
   
   this.loadingStates.table=true;
   if(this.options)
     this.options.searchTerm=this.search;
    ApiService.query(this.options).then(resp=>{
      console.log(resp);
        this.entities=resp.data.items;
        this.entities.forEach(i=>{
         ApiService.setEntity(i);
        })
        this.total=resp.data.total;
        this.loadingStates.table=false; 
    }).catch(err=>{
        this.loadingStates.table=false;
    });
  },
  submitPassword(){
  },
  editConfirmed(){
    this.selected.driver = this.driversList.find(i=>i.id == this.selected.driverId)
     ApiService.edit(this.selected).then(resp=>{
       console.log(resp);
          this.dialog=false;
            var message='تم تعديل العنصر بنجاح';
          if(!this.selected.id){
             this.$set(this.entities, this.entities.length,ApiService.setEntity( resp.data));
             console.log(resp.data);
                message='تم إضافة العنصر بنجاح';
                this.selected.departure =null
                this.selected.arrive =null
                this.selected.actualArrive =null
                this.$dialog.notify.success(message, {
              position: 'top-right',
                timeout: 3000
                })
              
          }else{
            
            this.updateArr(this.entities,ApiService.setEntity(resp.data));
            this.$dialog.notify.success(message, {
              position: 'top-right',
                timeout: 3000
                })
              }
          }
          
          ).catch(err=>{
            
            this.dialog=false;
            console.log(err);
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
    this.selected={state:"",departure : '',arrive : '',actualArrive : '',date:''},
    this.dialog=true;
    this.selected.state =1
    this.dialogTitle = 'اضافه'
  },
  edit(id){
    this.selected={...this.entities.filter(e=>e.id==id)[0]};
    console.log(this.selected);
    this.dialog=true;
    this.dialogTitle = 'تعديل'
  },
  del(id){
 this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف رحلة  ',
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
    
    computed: {
  showState() {
    let curentState 
    if(this.selected.state ==1){
      curentState={
        state:'مفتوح',
        color : 'green--text',
        icon:'mdi-lock-open-variant'
      }
    }else if(this.selected.state ==2){
       curentState={
        state:'مغلق',
        color : 'red--text',
        icon:'mdi-lock'
      }
    }else if(this.selected.state ==3){
       curentState={
        state:'مرحل',
        color : 'orange--text',
        icon:'mdi-lock-clock'
      }
    }
    else{
      
       curentState={
        state:'اختار الحالة',
        color : 'black--text',
        icon:'mdi-lock-clock'
      }
    }
    return curentState
  },
  headers(){
    let  headers= [
          {
            text: 'رقم',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          // { text: 'الاسم', value: 'name' },
          { text: 'التاريخ', value: 'date',align: 'center', },
          { text: 'السياره', value: 'car',align: 'center', },
          { text: 'السائق', value: 'driver',align: 'center', },
          { text: 'المغادره', value: 'departure',align: 'center', },
          { text: 'الوصول', value: 'arrive',align: 'center', },
          { text: 'الوصول الفعلى ', value: 'actualArrive',align: 'center', },
          { text: 'رقم الخط', value: 'lineId',align: 'center', },
          { text: 'من', value: 'from',align: 'center', },
          { text: 'الى', value: 'to',align: 'center', },
          { text: 'الرقم اليدوى', value: 'manualNo',align: 'center', },
          { text: 'الحالة', value: 'state',align: 'center', },
          { text: 'قيمه الايجار', value: 'rentAmount',align: 'center', },
          { text: ' نوع تكلفه الرحله ', value: 'tripCostType',align: 'center', },
          { text: 'الاجمالى', value: 'totalExpenses',align: 'center', },
          { text: 'تغيير الحالة', value: 'changeState', align: 'center',},
            { text: "التفاصيل ", value: "print", align: "center", sortable: true },
          { text: 'تعديل / مسح', value: 'actions', align: 'center',},
          
        ]
        if (this.polisaDialog) {
          headers = 
          [
          {
            text: 'رقم',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'التاريخ', value: 'date',align: 'center', },
          { text: 'السياره', value: 'car',align: 'center', },
          { text: 'السائق', value: 'driver',align: 'center', },
          { text: 'المغادره', value: 'departure',align: 'center', },
          { text: 'الوصول', value: 'arrive',align: 'center', },
          { text: 'الوصول الفعلى ', value: 'actualArrive',align: 'center', },
          { text: 'رقم الخط', value: 'lineId',align: 'center', },
          { text: 'من', value: 'from',align: 'center', },
          { text: 'الى', value: 'to',align: 'center', },
          { text: 'الرقم اليدوى', value: 'manualNo',align: 'center', },
          { text: 'الحالة', value: 'state',align: 'center', },
          { text: 'قيمه الايجار', value: 'rentAmount',align: 'center', },
          { text: ' نوع تكلفه الرحله ', value: 'tripCostType',align: 'center', },
          { text: 'الاجمالى', value: 'totalExpenses',align: 'center', },
          { text: 'تغيير الحالة', value: 'changeState', align: 'center',},
          
        ]
          
        }
        return headers
  }
},
}
</script>

<style>
.hiddenradio [type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
/* IMAGE STYLES */
.hiddenradio [type=radio] + div {
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
/* CHECKED STYLES */
.hiddenradio [type=radio]:checked + div {
  outline: 2px solid #42ac0d;
  outline-style: dashed;
}
.text-end{ 
  display: inline-table !important;
}
</style>
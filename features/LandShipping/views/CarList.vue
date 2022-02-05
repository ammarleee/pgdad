<template>
<v-app>

  <div >
   
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start ">
         <v-btn
          color="success"
          @click="add"
          >
          اضافة سيارة<i class="fa fa-plus mr-2"></i>
        </v-btn>
         </v-col>
      
    </v-row>
     <v-card  width="95%" lass=" ma-4">
     <v-data-table
    :headers="headers"
    :items="entities"
    :options.sync="options"
    :server-items-length="total"
    :search="search"
    :items-per-page="15"
    :loading="loadingStates.table"
    class="elevation-1" >
  
   <template v-slot:top>
        <v-text-field 
          v-model="search"
          label="بحث"
          class="mx-4"
        ></v-text-field>
      </template>
       <template v-slot:[`item.driver`]="{ item }">
        <span v-if="item.driver">
          {{item.driver.name}}
        </span>
       </template>
         <template v-slot:[`item.carType`]="{ item }">
        <span v-if="item.carType">
          {{item.carType.name}}
        </span>
       </template>
 <template v-slot:[`item.actions`]="{ item }">


<v-btn
  color="red"
  class="ml-2"
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
            <v-col  cols="12" sm="6">
              <v-text-field dense   
              :rules="[allRules.required, allRules.length(4)]"   outlined
              label="رقم اللوحة"
               v-model="selected.plate"
                >
                
              </v-text-field>
            </v-col>
             <v-col  cols="12" sm="6">
              <v-text-field dense  
               :rules="[allRules.required, allRules.length(4)]"   outlined
              label="رقم الشاسيه"
               v-model="selected.chassis"
                >
                
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="my-0 ammar" dense>
            <v-col  cols="12" sm="6">
              <v-text-field dense 
              :rules="[allRules.required, allRules.minNameLen(4)]"   outlined
              label=" الماركة"
               v-model="selected.mark"
                >
                
              </v-text-field>
            </v-col>
             <v-col  cols="12" sm="6">
              <v-text-field dense 
              :rules="[allRules.required, allRules.minNameLen(4)]"   outlined
              label="الموديل"
               v-model="selected.model"
                >
                
              </v-text-field>
            </v-col>
          </v-row >
          <!-- ResidencyNo -->
           <v-row class="my-0 ammar" dense>
            <v-col  >
              <v-text-field dense :rules="[allRules.required, allRules.minNameLen(4)]"   outlined
              label="اسم المالك"
               v-model="selected.owner"
                >
                
              </v-text-field>
            </v-col>
          
          </v-row>

     <!-- CheckStartDate Date -->
     <!-- start -->
     <v-row class="my-0 " dense>
       
       <v-col  cols="12" sm="6">
              <DatePicker-layout  @myEvent="selected.checkStartDate = $event" label="تاريخ الفحص" :date='selected.checkStartDate'></DatePicker-layout>
       </v-col>
        <v-col  cols="12" sm="6">
              <DatePicker-layout  @myEvent="selected.checkEndDate = $event" label="تاريخ الانتهاء" :date.sync='selected.checkEndDate'></DatePicker-layout>
       </v-col>
        <v-col  cols="12" sm="6">
              <DatePicker-layout  @myEvent="selected.docStartDate = $event" label="تاريخ الاستماره" :date.sync='selected.docStartDate'></DatePicker-layout>
       </v-col>
        <v-col  cols="12" sm="6">
              <DatePicker-layout  @myEvent="selected.docEndDate = $event" label="تاريخ الانتهاء" :date.sync='selected.docEndDate'></DatePicker-layout>
       </v-col>
        <v-col  cols="12" sm="6">
              <DatePicker-layout  @myEvent="selected.purDate = $event" label="التاريخ " :date.sync='selected.purDate'></DatePicker-layout>
       </v-col>
       <v-col cols="12" sm="6">
    <v-text-field dense :rules="[allRules.required,]"  outlined
    type="number"
    label="الوزن"
    v-model="selected.weight">

    </v-text-field>
  </v-col>
     </v-row>
       <!-- finished -->
     
<v-row class="my-0 ammar" dense>
  
  <v-col cols="12" sm="12">
    <v-autocomplete
    :rules="[allRules.required,]"  
    dense
    outlined
    label="النوع"
    :items="brandList"
     item-value="id"
      item-text="name"
      auto-select-first 
    v-model="selected.carTypeId">

    </v-autocomplete>
    
    
  </v-col>
</v-row>
<v-row class="my-0 ammar" dense>
  <v-col cols="12" sm="12">
    <v-autocomplete 
    label="السائق"
     :rules="[allRules.required,]"  
    dense
    outlined
    :items="driversList"
     item-value="id"
      item-text="name"
      auto-select-first
    v-model="selected.driverId">

    </v-autocomplete>
    
  </v-col>
</v-row>
          <v-row class="my-0 ammar" dense>
            <v-textarea
          name="input-7-1"
          label="الملاحظات"
          outlined
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
            class="white--text"
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
</v-app>

</template>

<script>
import ApiService from '../services/CarService.js'
import driverApi from '../services/DriverService.js'
import carApi from '../../Settings/services/CarTypesService'

export default {
data(){
  return{
    selected:{},
    valid:false,
    entities:[],
    total: 0,
    driversList:null,
    brandList:null,
    search:'',
    dates:{},
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
          { text: 'اللوحة', value: 'plate' },
          { text: 'الماركة', value: 'mark' },
          { text: 'الموديل', value: 'model' },
          { text: 'النوع', value: 'carType' },
          { text: 'السائق', value: 'driver' },
          { text: 'مسح / تعديل', value: 'actions', align: 'left',},

          
        ],
       
        
  }
},
async mounted() {
  try {
    const resp = await driverApi.query(this.options)
    const cars = await   carApi.get()
    this.driversList=resp.data.items;
    this.brandList=cars.data
    this.getData();
  } catch (error) {
    console.log(error);
  }
  
},
methods:{
  getData(){
   
   this.loadingStates.table=true;
   if(this.options)
     this.options.searchTerm=this.search;
    ApiService.query(this.options).then(resp=>{
        this.entities=resp.data.items;
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
            debugger;
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
    let d =this.formateDateWithMoment(new Date(),'YYYY-MM-DD' )
       this.selected={checkStartDate:d,checkEndDate:d,docStartDate:d,docEndDate:d,purDate:d},
    this.dialog=true;
  },
  edit(id){
    this.selected={...this.entities.filter(e=>e.id==id)[0]};
    this.dialog=true;
  },
  del(id){
 this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف سيارة  ',
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


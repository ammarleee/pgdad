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
    <!-- table -->
     <v-card   min-width="98%" class=" ma-4">
     <v-data-table
    :headers="headers"
    :items="fakeData"
    :options.sync="options"
    :server-items-length="total"
    :search="search"
    :items-per-page="15"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    show-expand
    :loading="loadingStates.table"
    class="elevation-1" >
  
   <template v-slot:top>
        <v-text-field 
          v-model="search"
          label="بحث"
          class="mx-4"
        ></v-text-field>
      </template>
          <!-- start expand -->
       <template v-slot:expanded-item="{ headers,item }">
      <td :colspan="headers.length" class="pa-3">
           <v-row class='mx-auto text-center'>
               <v-col cols="12" align='start' class="pr-5 mt-4">
         <v-btn @click="openRepaireDialog(item.id)"  class="warning text-capitalize">اضافه فاتوره</v-btn>
               </v-col>
             <v-col cols="12">
 <v-card   min-width="50%" class=" ma-2 rounded-lg">
     <v-simple-table
     dark
    fixed-header
    height="300px"
  >
     
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" v-for="(item,n) in tableHeadersRepare" :key="n">
            
            {{item.name}}
          </th>
          
           <th class="text-center">
            actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,g) in item.repaires"
          :key="g"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.recietNum }}</td>
          <td>{{ item.repaireType }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.buyingDate }}</td>
          <td>
                <v-btn
  color="warning"
  outlined
  elevation="2"

  @click="openDialogForEdit(item)"
>تعديل<i class="far fa-edit mr-2"></i></v-btn>

<v-btn
  color="red"
  class="mr-2"
  elevation="2"
   outlined
  @click="deleteRepareItem(item)"
>حذف<i class="fa fa-trash mr-2" ></i></v-btn>


          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
     </v-card>
             </v-col>
           </v-row>
      </td>
    </template>
          <!-- end expand -->

   <template v-slot:[`item.actions`]="{ item }">

  <v-icon color="success" small @click="edit(item.id)">mdi-pen</v-icon>
  <v-icon color="error" small @click="deleteFakeData(item.id)">mdi-delete</v-icon>
    </template>
  </v-data-table>
     </v-card>
    
   <!-- Add Modal -->
   <v-dialog
      v-model="dialog"
      width="800"
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
              <v-text-field 
               dense 
               outlined
              label="رقم اللوحة"
               v-model="selected.plate"
            :rules="[allRules.required,allRules.length(4)]" 

                >
                
              </v-text-field>
            </v-col>
            <v-col  cols="12" sm="6">
              <v-text-field  dense 
               outlined
              label="الموديل"
               v-model="selected.model"
      :rules="[allRules.required, allRules.length(4)]"  
                >
                
              </v-text-field>

            </v-col>

             <v-col  cols="12" >
              <v-text-field  dense 
               outlined
              label="اسم المالك"
               v-model="selected.ownerName"
    :rules="[allRules.required, allRules.minNameLen(4)]"

                >
                
              </v-text-field>
            </v-col>
                <!-- start owner -->
        <v-col
        cols="12"
      >
        <v-select
        v-model="selected.ownertype"
        outlined
         :rules="[allRules.required,]"  
        dense 
          :items="source"
          label="مستاجره/ تمليك"
          
        ></v-select>
      </v-col>
      <!-- end owner -->
             <v-col cols="12" sm="6">
    <v-autocomplete
    outlined
    dense  :rules="[allRules.required,]"  
    label="النوع"
    :items="brandList"
     item-value="id"
      item-text="name"
      auto-select-first 
    v-model="selected.carTypeId">

    </v-autocomplete>
  </v-col>

  <v-col cols="12" sm="6">
    <v-autocomplete
     :rules="[allRules.required,]"  
     outlined
    dense 
    label="الفرع"
    :items="allBranches"
     item-value="id"
      item-text="name"
      auto-select-first 
    v-model="selected.branch">
    </v-autocomplete>
  </v-col>
  <!-- start data -->
  
  
          </v-row>
     
<v-row  dense>
  <v-col cols="12" sm="6">
    <DatePicker-layout @myEvent="selected.expDate = $event" :date.sync="selected.expDate" label="تاريخ انتهاء الاستماره "></DatePicker-layout>
      </v-col>
      <v-col cols="12" sm="6">
    <DatePicker-layout @myEvent="selected.expInsurance = $event" :date.sync="selected.expInsurance" label="تاريخ انتهاء التامين "></DatePicker-layout>
      </v-col>
      <!-- end date -->
      <!-- start oil -->
             <v-col  cols="12" sm="6">
              <v-text-field dense  
               outlined
              type="number"
              label="عداد تغير الزيت"
 :rules="[allRules.required,allRules.length(4)]"

               v-model="selected.changeOil"
                >
              </v-text-field>
            </v-col>
              <v-col  cols="12" sm="6">
              <v-text-field dense  
               outlined
              type="number"
              label="عداد بدايه العمل"
               v-model="selected.startOil"
 :rules="[allRules.required,allRules.length(2)]"
                >
                
              </v-text-field>
            </v-col>
      <!-- end  oil -->
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
            @click="addFakeData()"
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
   <!-- dialog for repairig  -->
   <v-dialog
      v-model="repaireDialog"
      width="800"
      persistent
    >
      <v-card >
       <v-form v-model="validTwo">
        <v-card-title class="headline" >
      <i class="fa fa-pen ml-2" ></i> تعديل/إضافة 
        </v-card-title>
         <v-card-text>
             <v-container>
          
<!-- repairng  -->
<v-row>
    <v-col  cols="12" class=text-center >
  <h4  class="info--text">جدول الصيانه الدوريه</h4>
    </v-col>
  <v-col  cols="12" sm="6">
              <v-text-field dense  
               outlined
              type="number"
              label="رقم الفاتوره"
              :rules="[allRules.required,allRules.length(4)]"

               v-model="repaireData.recietNum"
                >
              </v-text-field>
            </v-col>
             <v-col  cols="12" sm="6">
              <v-text-field dense  
               outlined
              label="النوع"
               v-model="repaireData.repaireType"
             :rules="[allRules.required, allRules.minNameLen(4)]"

                >
              </v-text-field>
            </v-col>
             <v-col  cols="12" sm="6">
              <v-text-field dense  
               outlined
              type="number"
              label="المبلغ"
               v-model="repaireData.price"
              :rules="[allRules.required,allRules.length(2)]"

                >
              </v-text-field>
            </v-col>
           
            <v-col cols="12" sm="6" >
    <DatePicker-layout @myEvent="repaireData.buyingDate = $event" :date.sync="selected.buyingDate" label="تاريخ الشراء "></DatePicker-layout>
      </v-col>
  
</v-row>
 

        </v-container>
        
         </v-card-text>
      
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            @click="addRepaire()"
          >
           حفظ
          </v-btn>

          <v-btn
            color="red darken-1"
            class="white--text"
            @click="cancelRepaire()"
          >
            إلغاء
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

   <!-- finish dialog  -->
  </div>
</v-app>

</template>

<script>
import ApiService from '../services/DistributionCarService.js'
import carApi from '../../Settings/services/CarTypesService'
import BranchesApi from '../../Settings/services/BranchesService'

export default {
data(){
  return{
    valid:false,
    validTwo: false,
      source:['مالك','مستاجر'],
      owner:null,
      fakeData:[],
    selected:{},
    entities:[],
    total: 0,
     expanded: [],
        singleExpand: false,
    brandList:null,
    search:'',
    allBranches:null,
    options: {},
    dialog:false,
    repaireDialog:false,
    repaireData:{},
    repairId:null,
    loadingStates:{
       table:false
   },
     tableHeadersRepare:
     [
         {   name:'رقم'},
         { name:'نوع الصيانه',},
         { name:'المبلغ',},
         {  name:'تاريخ الشراء',},
     ]
    ,
    headers: [
          {
            text: 'رقم',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'اللوحة', value: 'plate' },
          { text: 'الموديل', value: 'model' },
          { text: 'اسم المالك', value: 'ownerName' },
          { text: 'مصدر السياره ', value: 'ownertype' },
          { text: 'النوع', value: 'carTypeId' },
          { text: 'الفرع', value: 'branch' },
          { text: 'انتهاء الاستماره', value: 'expDate' },
          { text: 'انتهاء التامين', value: 'expInsurance' },
          { text: 'تغيير الزيت', value: 'changeOil' },
          { text: 'بدايه العمل', value: 'startOil' },
  
          { text: 'تعديل/مسح', value: 'actions', align: 'centers',},
          
        ],
       
        
  }
},
async mounted() {
  try {
   this.loadingStates.table=true;

      const branches =  await BranchesApi.query(this.options)
    const cars = await   carApi.get()
    this.allBranches=branches.data.items;
    this.brandList=cars.data
    // this.getData();
   this.loadingStates.table=false;

  } catch (error) {
   this.loadingStates.table=false;
    console.log(error);
  }
  
},
methods:{
   openRepaireDialog(id){
     let d =this.formateDateWithMoment(new Date(),'YYYY-MM-DD' )
    this.repaireData={buyingDate:d};
     this.repaireDialog=true;
     this.repairId = id
    },
    openDialogForEdit(item){
     this.repaireData=item
     this.repaireDialog=true;
     this.repairId = item.parentId

    },
     cancelRepaire(){
         this.repaireDialog=false;
         this.repairId = null
    this.repaireData={};
    },
  
    deleteRepareItem(item){
      console.log(item);},

    addRepaire(){
      if(this.repaireData.id){
          let parentElememnt = this.fakeData.findIndex(i=>{
        return i.id == this.repaireData.parentId
      })
       let childtElememnt = this.fakeData[parentElememnt].repaires.findIndex(i=>{
        return i.id == this.repaireData.id
      })
      this.fakeData[parentElememnt].repaires.splice(childtElememnt,1,this.repaireData)

      }else{
        console.log('add repair');
           let itemIndex = this.fakeData.findIndex(i=>{
            return i.id == this.repairId
        })
        this.repaireData.id = Math.random()
        this.repaireData.parentId = this.repairId
        this.fakeData[itemIndex].repaires.push(this.repaireData)
        this.repaireData={};


      }
     

    },
    addFakeData(){
      if(this.selected.id){
        let editIndex =this.fakeData.findIndex(i=>{
            return i.id == this.selected.id
          })
          this.fakeData.splice(editIndex,1,this.selected)
           

        }else{
          // create new 
          console.log('add new post');
            this.selected.id = Date.now()
            this.selected.repaires = []
              this.fakeData.push(this.selected)
              this.selected = {}
        }


    },
    deleteFakeData(id) {
      this.fakeData = this.fakeData.filter(e=>e.id !== id)
    

    },
   
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
     let d =this.formateDateWithMoment(new Date(),'YYYY-MM-DD')
    this.selected={expInsurance:d,expDate:d};
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
<style lang="scss" scoped>
</style>
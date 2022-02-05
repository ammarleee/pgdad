<template>
<v-app>
<v-btn @click="isStyle =!isStyle">change</v-btn>

  <h2 :style="i>0?{marginTop:'30px'} :{marginTop:'20px'}">ammar</h2>
  <h2 :style="i>0?{paddingTop:'30px'} :{paddingTop:'20px'}">ammar</h2>
  
  <div v-if="!showsearch" >
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start ">
         <v-btn
          color="success"
          @click="add"
          >
          اضافة عميل<i class="fa fa-plus mr-2"></i>
        </v-btn>
         <v-btn @click="startSearching =!startSearching"
          color="success"
          class="mr-3"
          >
           بحث<v-icon>mdi-lens</v-icon>
        </v-btn>
         </v-col>
       
    </v-row>
      <v-row v-if="startSearching" class="my-0 ammar" dense>
           <v-col cols="4">
one
           </v-col>
           <v-col cols="4">
two
           </v-col>
           <v-col cols="4">
thre
           </v-col>
         </v-row>
    
   <!-- Add Modal -->
   <v-dialog
      v-model="dialog"
      width="70%"
      persistent
    >
    
      <v-card  >

        <v-card-title class="headline" >
      <i class="fa fa-pen ml-2" ></i> تعديل/إضافة 
        </v-card-title>
         <v-card-text>
            
        <!-- header  -->
      <v-row class="my-0 ammar" dense >
  <v-col cols="12">
   <v-tabs
    fixed-tabs
    next-icon="mdi-arrow-right-bold-box-outline"
    prev-icon="mdi-arrow-left-bold-box-outline"
    show-arrows
    center-active
    background-color="orange accent-1"
    color="black"
    class="rounded-lg w-100" 
    light
  >
   <v-tab @click="showClient()"  >
          {{mode===0 ? 'اضافة عميل':'تعديل عميل'}} 
        
  </v-tab>
  <v-tab @click="showProduct()" :disabled="!selected.id" >
          {{mode===0 ? 'اضافة صنف':'تعديل صنف'}} 
        
  </v-tab>
  <v-tab @click="showBranch()"  :disabled="!selected.id" >
        {{mode===0 ? 'اضافة فرع':'تعديل فرع'}} 
  </v-tab>
  
  </v-tabs>
            </v-col>
      </v-row>
  <!-- add client  -->
      <v-form v-model="valid" class="mt-5"> 

          <v-row v-if="showClientTab &&dialog" class="my-0 ammar" dense>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                dense
                label="الاسم"
                v-model="selected.name"
                :rules="[allRules.required, allRules.minNameLen(4)]"

              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                dense
                label="اسم المسؤل"
                v-model="selected.empName"
                :rules="[allRules.required, allRules.minNameLen(4)]"

              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                dense
                label="المسمي الوظيفي"
                v-model="selected.empTitle"
                :rules="[allRules.required, allRules.minNameLen(2)]"

              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                type="number"
                outlined
                dense
                label="رقم الهاتف"
                v-model="selected.phoneNumber"
               :rules="[allRules.required,allRules.length(8)]"

              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                type="number"
                outlined
                dense
                label="رقم الهوية"
                v-model="selected.idNum"
               :rules="[allRules.required,allRules.length(6)]"

              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                type="number"
                outlined
                dense
                label="الرقم الضريبي"
                v-model="selected.taxNum"
               :rules="[allRules.required,allRules.length(4)]"

              ></v-text-field>
            </v-col> 
            <v-col cols="12" sm="3">
              <v-text-field
                type="number"
                outlined
                dense
                label="رقم السجل التجاري"
                v-model="selected.commercialRegNum"
               :rules="[allRules.required,allRules.length(6)]"

              ></v-text-field>
            </v-col>
            <v-col cols="12">
               <v-textarea outlined label="ملاحظات" v-model="selected.notice"></v-textarea>
            </v-col>
            <v-card-actions class="">
          <div >
            <v-btn @click="addClient" :disabled="!valid"
         class="primary white--text" v-if="mode===0"
              >اضافة </v-btn>
          
          
          </div>
        </v-card-actions>
          </v-row>
      </v-form>

          <!-- product  -->
      <v-form v-model="validProduct"> 
      <v-row v-if="showProductTab && dialog" class="my-0 ammar" dense>
        <v-card-title class="headline" >
      <!-- <i class="fa fa-pen ml-2" ></i> تعديل/إضافة  -->
      اضافة صنف
        </v-card-title>
         <v-card-text>
             <v-container>
           <v-row class="my-0 ammar" dense>
           
              <v-col cols="12" sm="2">
            <v-autocomplete
              :rules="[allRules.required,]" 
              dense 
              outlined
              label="الصنف"
              :items="MerchandisesList"
              v-show="!loading"
              item-text="name"
              return-object
              auto-select-first
              v-model="selected.product.merchandise"
            ></v-autocomplete>
          </v-col>  
              
              <v-col cols="12" sm="2" v-show="!loading">
            <v-autocomplete
              :rules="[allRules.required,]" 
              dense 
              outlined
              label=" المسار"
              :items="lines"
              item-text="name"
              return-object
              auto-select-first
              v-model="selected.product.line"
            ></v-autocomplete>
            
          </v-col>
              
              <v-col cols="12" sm="2">
                <v-text-field
                  type="number"
                  outlined
                  dense
                  disabled
                  label="السعر العام"
                  v-model="selected.product.merchandise.price"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <v-text-field
                  type="number"
                  outlined
                  dense
                  label="السعر الخاص"
               :rules="[allRules.required,]"
               
                  v-model.lazy="selected.product.price"
                ></v-text-field>
              
              </v-col>
            
           
                <v-col cols="12" sm="4"  class="d-flex align-items-center">
                  <v-switch class="mt-0 pt-0" v-model="selected.product.includeTax" dense hide-details label="متضمن  الضريبه"></v-switch>
                  <span>
    <v-text-field
                 v-show="selected.product.includeTax"
                 disabled 
                 dense
                  type="number"
                  outlined
                  label=" بعد الضريبه"
                  v-model="selected.product.priceAfterTax"
                ></v-text-field>
                  </span>
            <span class="mr-3">
              <v-btn  color="success" @click='addMerchandise()' :disabled="!validProduct" > 
                  <v-icon >mdi-plus</v-icon>
                  {{mode===0 ? 'اضافه':'تعديل'}} 
                  </v-btn>
            </span>
                 
              </v-col>
              
             
            </v-row>
             <v-row  class="my-0 ammar text-center" dense v-if="allProducts">
               <v-col cols="12" v-if="allProducts.length >0">
                 <v-data-table
          :headers="productsHeaders"
          :items="allProducts"
          fixed-header
          
          class="elevation-1"
       >
        <template v-slot:[`item.includeTax`]="{ item }">
                 <v-switch
              v-model="item.includeTax"
              color="primary"
              hide-details
            ></v-switch>
                 
          </template>
          <template v-slot:[`item.actions`]="{ item }">
                 <v-btn  icon @click="deleteProduct(item.id)"><v-icon color="error">mdi-delete</v-icon></v-btn>
                 <v-btn  icon @click="editProduct(item)">
                   <v-icon color="success">mdi-pencil</v-icon>
                 </v-btn>
          </template>
        </v-data-table>
               </v-col>
             
              </v-row>

        </v-container>
        
         </v-card-text>

      </v-row>
      </v-form>

      <v-form v-model="validBranch"> 
      <!-- branch  -->
      <v-row v-if="showBranchTab && dialog" class="my-0 ammar " dense>
        <v-card-title class="headline" >
      <!-- <i class="fa fa-pen ml-2" ></i> تعديل/إضافة  -->
      اضافة فرع
        </v-card-title>
         <v-card-text>
             
                <v-row class="my-0 ammar " dense>
              <v-col cols="12" sm="4">
                <v-text-field
                  :rules="[allRules.required, allRules.minNameLen(3)]"
                  hide-details
                  outlined
                  dense
                  label="اسم الفرع"
                  v-model="selected.branch.name"
                ></v-text-field>
              </v-col>
                 <v-col cols="12" sm="4" >
            <v-autocomplete
              :rules="[allRules.required,]" 
              dense 
              outlined
              label="المدينة"
              :items="cities"
              item-text="name"
              return-object
              auto-select-first
              v-model="selected.branch.city"
            ></v-autocomplete>
          </v-col>
               
              <v-col cols="12" sm="4">
                <v-text-field
               :rules="[allRules.required,allRules.length(8)]"
               

                  type="number"
                  dense
                  outlined
                  label="رقم الهاتف"
                  v-model="selected.branch.phoneNumber"
                ></v-text-field>
               
              </v-col>
              <v-col cols="12" sm="2" class="mx-auto mt-0">
                <v-btn  color="success" @click='addBranch()' :disabled="!validBranch" > 
                  <v-icon >mdi-plus</v-icon>   {{mode===0 ? 'اضافه':'تعديل'}} </v-btn> 
              </v-col>
            </v-row>
               <v-row class="my-0 ammar text-center " dense v-if="allBranches">
               <v-col cols="12" v-if="allBranches.length > 0">
                 <v-data-table
                    :headers="branchesHeaders"
                    :items="allBranches"
                    fixed-header
                     class="elevation-1"
       >
          <template v-slot:[`item.actions`]="{ item }">
                 <v-btn icon @click="deleteBranch(item.id)"><v-icon color="error">mdi-delete</v-icon></v-btn>
                 <v-btn icon @click="editBranch(item)">
                   <v-icon color="success">mdi-pencil</v-icon>
                 </v-btn>
          </template>
        </v-data-table>
               </v-col>
             
              </v-row>
           
         
      
        
         </v-card-text>
      </v-row>
      </v-form>
           
 

        
         </v-card-text>
      
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="cancelEdit()"
          >
            إلغاء
          </v-btn>
        </v-card-actions>
   
      </v-card>
    </v-dialog>
  
   
  </div>
  
     <v-card min-width="98%" class="ma-4 mt-10">
        <v-data-table
          :headers="headers"
          :items="entities"
          fixed-header
          :search="search"
          :items-per-page="15"
          :loading="loadingStates.table"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field v-model="search" label="بحث" class="mx-4"></v-text-field>
          </template>
          <template v-slot:[`item.allPolisValue`]="{ item }">
            {{item.name}}
            <!-- {{polisasValue(item.allPolis,1)}} -->
          </template>
          <template v-slot:[`item.allPolisTaxs`]="{ item }">
            {{item.name}}

            <!-- {{polisasValue(item.allPolis,2)}} -->
          </template>
          
          <template v-slot:[`item.print`]="{ item }">
            <v-icon color="error"  @click="del(item.id)">mdi-printer</v-icon>
              <v-icon color="orange"  @click="openPolisa(item.allPolis,item)">mdi-eye</v-icon>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success"  @click="openUserDialog(item)">mdi-pen</v-icon>
           
            <v-icon color="error"  @click="deleteClient(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
       <v-dialog
      v-model="polisaDialog"
      width="99%"
      
    >
      <v-card >
        <v-card-title class="headline" >
          <!-- header  -->
      <v-row black class='d-block' style="width:100% !important">
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
   <v-tab @click="showClient()"  >
        جميع بوالص العميل
        
  </v-tab>
  <v-tab @click="showProduct()">
        الاصناف
        
  </v-tab>
  <v-tab @click="showBranch()">
        الفروع
  </v-tab>
  
  </v-tabs>
            </v-col>
      </v-row>
     
      <!-- polisas  -->
          <v-row v-if="showClientTab" class="text-center">
            <v-col cols="12" >
           <app-polisa-table :userPolisa="userPolisa"></app-polisa-table>
            </v-col>
          </v-row>
            <!-- product  -->
      <v-row v-if="showProductTab" class="text-center">
               <v-col cols="12" >
                 <v-data-table
          :headers="productsHeaders"
          :items="allProducts"
          fixed-header
          class="elevation-1"
       >
        <template v-slot:[`item.includeTax`]="{ item }">
                 <v-switch
              v-model="item.includeTax"
              
              color="primary"
              hide-details
            ></v-switch>
          </template>

        </v-data-table>
               </v-col>
      </v-row>
       <!-- branch  -->
      <v-row v-if="showBranchTab" class="text-center">
               <v-col cols="12" >
                 <v-data-table
                    :headers="branchesHeaders"
                    :items="allBranches"
                    fixed-header
                     class="elevation-1"  >
        </v-data-table>
               </v-col>
      </v-row>
        </v-card-title>
      </v-card>
      </v-dialog>
</v-app>

</template>

<script>
import MerchandisesApi from "../services/MerchandisesService.js";
import CitiesApi from "../../Settings/services/CityService.js";
import lineApi from "../services/LinesService.js";
import ApiService from "../services/ClientsService.js";
import PricesApi from "../services/PricesService";
import branchesApi from "../services/BranchesService";
import polisaTable from './polisaTable'
export default {
  components: {
    'app-polisa-table':polisaTable

  },
data(){
  return{
    isStyle: true,
    valid:false,
    validBranch:false,
    validProduct:false,
    startSearching:false,
    allBranches:[],
    allProducts:[],
    showBranchTab:false,
    showProductTab:false,
    showClientTab:true,
    showsearch:false,
    selected:{
     
      products:[],
      branches:[],
      product: {
        includeTax:false,
        merchandise:{}
        },
      branch: { },
      city: { },
    },
     polisaDialog:false,
      userPolisa:null,
      search: "",
      total: 10,
      options: {},
      entities: [],
      loadingStates: {
        table: false,
      },

      headers: [
        {
          text: "رقم العميل",
          align: "start",
          sortable: false,
          value: "id",
          align: "center",
        },
        { text: "الاسم", value: "name", align: "center", sortable: true },
        {
          text: "اسم المسؤل",
          value: "empName",
          align: "center",
          sortable: true,
        },
        {
          text: "المسمي الوظيفي",
          value: "empTitle",
          align: "center",
          sortable: true,
        },
        {
          text: "  هاتف المسؤل ",
          value: "phoneNumber",
          align: "center",
          sortable: true,
        },
        { text: "رقم الهويه", value: "idNum", align: "center", sortable: true },
        {
          text: "الرقم الضريبي",
          value: "taxNum",
          align: "center",
          sortable: true,
        },
        {
          text: "السجل التجاري",
          value: "commercialRegNum",
          align: "center",
          sortable: true,
        },
        {
          text: "عدد البوالص",
          value: "allPolis.length",
          align: "center",
          sortable: true,
        },
        {
          text: "قيمة البوالص ",
          value: "allPolisValue",
          align: "center",
          sortable: true,
        },
        {
          text: "قيمة الضريبه ",
          value: "allPolisTaxs",
          align: "center",
          sortable: true,
        },
        { text: "طباعه ", value: "print", align: "center", sortable: true },
        {
          text: "تعديل /مسح ",
          value: "actions",
          align: "center",
          sortable: true,
        },
      ],
   
      userDialog:false,
    productDialog:false,
    branchDialog:false,
    loading:false,
    MerchandisesList:null,
    lines:null,
    cities:[],
    clients:{},
    mode:0,
    outSourceData:null, 
    p:null,
    dialog:false,
    persistent: false,
    maindata:{
      products:[],
      branches:[],
      product: {includeTax:false,merchandise:{}},
      branch: { },
    }
    
       
        
  }
},
 
async mounted() {
  try {
     this.loadingStates.table=true;
      this.loading = true
        const Merchandises =await MerchandisesApi.typeHead("",true);
      const line =  await lineApi.query();

      const clients =  await ApiService.query();
      this.entities = clients.data.items
      let cities=await CitiesApi.typeHead("",true)
      console.log(this.cities);
       this.cities =cities.data
         this.MerchandisesList = Merchandises.data;
     
      
      this.lines = line.data.items;
      this.getData();
      this.loading = false
       this.loadingStates.table=false;

   
  } catch (error) {
      this.loading = false
       this.loadingStates.table=false;
    console.log(error);
  }
  
},
methods:{

async  openUserDialog(item){
 
    this.selected={...this.entities.filter(e=>e.id==item.id)[0],product:{includeTax:false,merchandise:{}},branch:{}}
    this.dialog=true;
     this.showClient();
     const branches =  await branchesApi.get(this.selected);
      const products =  await PricesApi.get(this.selected);
      this.allBranches=branches.data.items
      this.allProducts=products.data.items
  },
  showClient(){
  
    this.showClientTab =true
    this.showBranchTab =false;
    this.showProductTab =false

  },
  showBranch(){
    this.showBranchTab =true;
    this.showProductTab =false
    this.showClientTab =false


  },
   showProduct(){
     this.showProductTab =true
    this.showBranchTab =false;
    this.showClientTab =false

  },

   async openPolisa(items,item){
     this.showClient()
      this.selected={...this.entities.filter(e=>e.id==item.id)[0],product:{includeTax:false,merchandise:{}},branch:{}}
     const branches =  await branchesApi.get(this.selected);
      const products =  await PricesApi.get(this.selected);
      this.allBranches=branches.data.items
      this.allProducts=products.data.items
      this.polisaDialog = true;
      this.userPolisa=items
    },
    polisasValue(data,type){
       if (type ===1) {
         let tottal =  data.reduce(function (accumulator, currentValue) {
       return accumulator + currentValue.tottalPrice
         }, 0)
         return tottal
         
       }else{
         let tottal =  data.reduce(function (accumulator, currentValue) {
       return accumulator + currentValue.taxs
         }, 0)
         return tottal

       }
    },
  add(){
    this.dialog=true;
    this.clearModel()
    this.showClient()
  },
  clearModel(){
    
    this.allBranches = []
    this.allProducts = []
    this.selected={
      products:[],
      branches:[],
      product: {includeTax:false,merchandise:{}},
      branch: { },
    }
  },
  sendEdit(){
        let  data =this.allentities.findIndex(i=>{
                      return i.id ==this.entities.id
                    })
                     this.allentities[data]={...this.selected}

                   this.$store.commit('editOutClient', this.allentities)
  },
  
  addToentities(){
    this.entities.allPolis = []
    this.entities.branch=this.entities.branches[0]
    this.entities.product=this.entities.products[0]
    this.$store.commit('addNewClient',this.entities)
    this.entities = {}
    this.selected.products =[]
    this.selected.branches =[]
  },
    addClient(){
      ApiService.edit(this.selected).then(resp=>{
         if (! this.selected.id)
          {
            this.$set(this.entities, this.entities.length, resp.data);
              this.selected=this.maindata
              this.selected.id = resp.data.id
               
            this.$dialog.notify.success('تم إضافة العنصر بنجاح', {
                  position: 'top-right',
                    timeout: 3000
                    });
         }else
         {
           
            var i= this.entities.indexOf(this.entities.filter(e=>e.id==this.selected.id)[0]);
             this.$set(this.entities, i, this.selected);
             this.selected = this.maindata
              
             this.$dialog.notify.success('تم تعديل العنصر بنجاح', {
              position: 'top-right',
                timeout: 3000
                });
         }
      });
    
  },
  
 deleteClient(id){  
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
  
    addBranch(){
      this.selected.branch.cityId = this.selected.branch.city.id
      if (this.selected.id) {
        // edit it 
        if (this.selected.branch.id){
          let data = {
             id:this.selected.branch.id,
          clientData:{...this.selected.branch,clientId:this.selected.id},
          }
             branchesApi.edit(data).then(resp=>{
              let findItem = this.allBranches.findIndex(i=>{
                return i.id ==resp.id
              })
              this.allBranches[findItem] = resp.data
              this.selected.branch ={}
               this.$dialog.notify.success('تم تعديل الفرع بنجاح', {
                position: 'top-right',
                  timeout: 3000
                  })
  
        })

        }else{
   // add branch 
        this.selected.branch.clientId = this.selected.id
        let data = {
          clientId:this.selected.id,
          clientData:this.selected.branch,
        }
        branchesApi.add(data).then(resp=>{
          console.log(resp);
            let parentIndex = this.entities.findIndex(i=>{
                 return i.id ==this.selected.id
               })
               resp.clientId = this.selected.id
               this.allBranches.push(resp.data)
              //  this.entities[parentIndex].branches.push(this.selected.branch)
              this.selected.branch ={}
           
               this.$dialog.notify.success('تم إضافة فرع بنجاح', {
                position: 'top-right',
                  timeout: 3000
                  })
  
        })
        }
      
      }else{
       

      }

    },
    deleteBranch(id){
       this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف فرع  ',
    persistent: true,
    actions: {
      true: {
        text:'نعم',
        color: 'green',
        handle: () => {
           branchesApi.delete(id).then((resp) =>{
             console.log('deleted');
             console.log(resp);
            this.allBranches =this.allBranches.filter(i=>{
              return i.id !==id
            })
            this.$dialog.notify.success('تم مسح العنص بنجاح', {
                position: 'top-right',
                timeout: 3000
                })

          })
          
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
    deleteProduct(id){
      this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف مدينة  ',
    persistent: true,
    actions: {
      true: {
        text:'نعم',
        color: 'green',
        handle: () => {
           PricesApi.delete(id).then((resp) =>{
              console.log('deleted');
             console.log(resp);
            this.allProducts =this.allProducts.filter(i=>{
              return i.id !==id
            })
            this.$dialog.notify.success('تم مسح العنص بنجاح', {
                position: 'top-right',
                timeout: 3000
                })

          })
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
    
    addMerchandise(){
     
       this.selected.product.merchandiseId = this.selected.product.merchandise.id
      this.selected.product.lineId = this.selected.product.line.id


      if (this.selected.id) {
          this.selected.product.clientId = this.selected.id
        // edit it 
        if (this.selected.product.id){
           let data = {
             id:this.selected.product.id,
          clientData:{...this.selected.product,clientId:this.selected.id},
          }

             PricesApi.edit(data).then(resp=>{

                let findItem = this.allProducts.findIndex(i=>{
                return i.id ==resp.id
              })
              this.allProducts[findItem] = resp.data
              this.selected.product =this.nullMerchandise;
            
               this.$dialog.notify.success('تم تعديل الصنف بنجاح', {
                position: 'top-right',
                  timeout: 3000
                  })
        }).catch(resp=>{
         console.log(resp);
         debugger;
         var msg="";
      this.$dialog.notify.error(msg, {
                position: 'top-right',
                  timeout: 3000
                  })
        });
        }else{
        // add product 
        this.selected.product.clientId = this.selected.id
        let data = {
          clientId:this.selected.id,
          clientData:this.selected.product,
        }
        PricesApi.add(data).then(resp=>{
           this.allProducts.push(resp.data)
              this.selected.product =this.nullMerchandise
              
             
               this.$dialog.notify.success('تم إضافة منتج بنجاح', {
                position: 'top-right',
                  timeout: 3000
                  })
  
        }).catch(resp=>{
         console.log(JSON.stringify( resp));
         
         var msg=`${resp.response.data}`;
      this.$dialog.notify.error(msg, {
                position: 'top-right',
                  timeout: 3000
                  })
        });
        }

      }
    


    },
  cancelEdit(){
     this.showClient()
    this.dialog = false;
    this.clearModel()
    
  },
 
  editProduct(item){
    this.showProduct()
     if (item.id) {
        this.selected.product = this.allProducts.filter(i=>i.id ==item.id)[0]
      }
      
  },
  editBranch(item,i){
    this.showBranch()

       if (item.id) {
        this.selected.branch = this.allBranches.filter(i=>i.id ==item.id)[0]
      }
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
  }

},
computed: {
  nullMerchandise(){
    return { includeTax:false,merchandise:{}};
  },
   allentities() {
      return this.$store.getters.entities;
    },
    branchesHeaders(){
      let header = 
      [
         {
          text: "الرقم ",
          align: "start",
          sortable: false,
          value: "id",
          align: "center",
        },
        { text: "الاسم", value: "name", align: "center", sortable: true },
        { text: "اسم المدينه", value: "city.name", align: "center", sortable: true },
        { text: "رقم الجوال", value: "phoneNumber", align: "center", sortable: true },
       
         
      ]
      if (this.dialog) {
        header.push( {
          text: "تعديل /مسح ",
          value: "actions",
          align: "center",
          sortable: true,
        })
    
        
      }
      return header
    },
     productsHeaders(){
        let header =[
         {
          text: "الرقم ",
          align: "start",
          sortable: false,
          value: "id",
          align: "center",
        },
        { text: "الصنف", value: "merchandise.name", align: "center", sortable: true },
        { text: "الخط", value: "line.name", align: "center", sortable: true },
        { text: "السعر", value: "merchandise.price", align: "center", sortable: true },
        { text: "السعر الخاص", value: "price", align: "center", sortable: true },
        { text: "متضمن الضريبه", value: "includeTax", align: "center", sortable: true },
        
      ]
        if (this.dialog) {
        header.push( {
          text: "تعديل /مسح ",
          value: "actions",
          align: "center",
          sortable: true,
        },)
      
        
      }
      return header

     }
    
  
},
watch: {
     
     
    'selected.product.price' (newValue) {
      
       this.selected.mainPrice = +this.selected.product.price
       if (this.selected.product.includeTax) {
         this.selected.product.priceAfterTax = 0
           var addedValueTaxPercentage=.15;
         var price=+this.selected.product.price;
       if (newValue ==true) {

         var total =
            price -
            (price / (1 + addedValueTaxPercentage)) * addedValueTaxPercentage;
          this.selected.product.priceAfterTax  = this.round(total, 2);
       this.$set(this.selected.product, 'priceAfterTax',this.selected.product.priceAfterTax ) ;
         
       }
       else if (this.selected.product.includeTax ==false){
            this.selected.product.priceAfterTax =this.selected.mainPrice
       }

    
    }
    },
   
     'selected.product.includeTax' (newValue,) {
     
         if (this.selected.product.includeTax) {
           
         this.selected.mainPrice = +this.selected.product.price
         var addedValueTaxPercentage=.15;
         var price=+this.selected.product.price;
       if (newValue ==true) {

         var total =
            price -
            (price / (1 + addedValueTaxPercentage)) * addedValueTaxPercentage;
          this.selected.product.priceAfterTax  = this.round(total, 2);
         
       }else if (newValue ==false){
            this.selected.product.priceAfterTax =this.selected.mainPrice
       }
         }


      
    },
     
    },
}
</script>

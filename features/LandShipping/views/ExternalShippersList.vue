
<template>
  <div>

    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start">
        <v-btn color="success" @click="addConductor">
          اضافة مخرج
          <i class="fa fa-plus mr-2"></i>
        </v-btn>
      </v-col>
    </v-row>
   <v-card  width="80%"
    class="mx-auto mr-5">
     <v-data-table
    :headers="headers"
    :items="entities"
    :items-per-page="15"
    :loading="loadingStates.table"
    class="elevation-1"
  >
   <template v-slot:[`item.city`]="{ item }">
<span v-if="item.city">

      {{item.city.name}}
</span>

   </template>
   <template v-slot:[`item.count`]="{ item }">
<span v-if="item">
      <!-- {{countPolisas(item.id)}} -->
</span>

   </template>
  
     <template v-slot:[`item.details`]="{ item }">
       <v-btn
  color="orange"
  outlined
  elevation="2"
  class="mx-2 "
   @click="openUserDialog(item.id)" :id="item.id"
   icon
><v-icon>mdi-eye-outline</v-icon>
   
       </v-btn>
    </template>
     <template v-slot:[`item.actions`]="{ item }">


 <v-btn
  color="primary"
  elevation="2"
  class="mx-2 "
  @click="edit(item.id)"
   icon
   outlined

>
<v-icon>mdi-pencil</v-icon>
</v-btn>

<v-btn
  color="red"
  elevation="2"
  icon
   outlined
  @click="del(item.id)"
>
<v-icon>mdi-delete</v-icon>
</v-btn>




    </template>
  </v-data-table>
     </v-card>
    
<!-- user dialog  -->
<v-dialog
      v-model="userDialog"
      width="80%"
    >
      <v-card >
        <v-card-title class="headline" >
          <h2 class="pa-3 mx-auto pink--text">
                     جميع بوالص المخرج

          </h2>
        
        </v-card-title>
        <v-data-table
    :headers="headersPolisa"
    :items="entitiesPolisa"
    :items-per-page="15"
    :loading="loadingStates.table"
    class="elevation-1"
  >
   <template v-slot:[`item.city`]="{ item }">

      {{item.city.name}}
   </template>
     
    <template v-slot:[`item.actions`]="{ item }">


<v-btn
  color="red"
  class="mr-2"
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
      </v-dialog>

<!-- finishe the user dilaog -->
    <!-- Add Modal -->
    <v-dialog v-model="dialog" width="900"  persistent>
      <v-card>
   <v-form v-model="valid">

        <v-card-title class="headline">
          <i class="fa fa-pen ml-2"></i> تعديل/إضافة
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                 outlined
                 dense 
                 label="اسم مخرج"
                v-model="selected.name"
    :rules="[allRules.required, allRules.minNameLen(4)]"

                  ></v-text-field>
              </v-col>
            </v-row>
 <v-form v-model="valid2">
             <v-row class="rounded-lg grey lighten-3 mb-6">
              <v-col cols="12" sm="5" v-if="!loadingStates.table">
                <v-autocomplete
                dense
    :rules="[allRules.required]"

                  outlined
                  label="المدينه"
                  :items="cities"
                  item-text="name"
                  item-value="id"
                  return-object
                  auto-select-first
                  v-model="selected.city.city"
                ></v-autocomplete>
              </v-col>
                <v-col cols="12" sm="5">
                     <v-text-field dense outlined 
             :rules="[allRules.required,allRules.length(8)]"
                     
                      label="رقم التلفون " v-model="selected.city.phoneNumber"></v-text-field>
                </v-col>
                 <v-col cols="12" sm="2" class="mt-2 " >
                    <v-btn @click="addNewCity" class="success">اضافة</v-btn>
                </v-col>
                
            </v-row>
 </v-form>   
            <v-row>
              <v-textarea outlined rows="2" label="ألملاحظات" v-model="selected.notice"></v-textarea>
            </v-row>
            <v-row>
              <h5>المدن</h5>
            </v-row>
              <v-row class="text-center" >
              <v-col cols="12" sm="4">
                 <span>المدينة</span>
              </v-col>
                <v-col cols="12" sm="4">
                 <span>رقم التليفون</span>
              </v-col>
              </v-row>
              <v-row  class="text-center" v-for="(city,i) in selected.cities" :key="i">
              <v-col cols="12" sm="4">
                 <span>{{city.city.name}}</span>
              </v-col>
                <v-col cols="12" sm="4">
                 <span>{{city.phoneNumber}}</span>
              </v-col>
               <v-col cols="12" sm="4">
                 <b-button variant="danger" @click="removeNewCity(i)">حذف</b-button>
              </v-col>
              </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" :disabled="!valid"
            @click="editConfirmed()">حفظ</v-btn>

          <v-btn color="red darken-1" text @click="cancelEdit()">إلغاء</v-btn>
        </v-card-actions>
      </v-form>

      </v-card>
    </v-dialog>
    <!-- Add Modal -->
  </div>
</template>

<script>
// import CountryService from "../../Settings/services/CountryService";

 import CityService from '../../Settings/services/CityService.js'
 import ApiService from '../services/ExternalShippersService.js'
 
      export default {
        mounted(){
           this.getData();
         CityService.typeHead("",true).then(resp=>{
           console.log(resp);
                 this.cities=resp.data;
         });
        
        },
data(){
  return{
    valid: false,
    valid2: false,
    country:{},
    entitiesPolisa:[],
    persistent:true,
   countries:[],
     cities:[],
   dialog:false,
   entities:[],
   selected:{  cities:[],city:{}  },
   message:null,
   userDialog:false,
   loadingStates:{
     table:false
   },
    headersPolisa:[  {
          text: "رقم",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "التاريخ", value: "date" ,align: "center"},
        { text: " الرقم اليدوي", value: "manualNum" ,align: "center"},
        { text: "المرسل", value: "senderId.name" ,align: "center"},
        { text: "المرسل اليه", value: "receiverId.name" ,align: "center"},
        { text: "الملف", value: "file" ,align: "center"},
        { text: "المدينه", value: "cityId.name" ,align: "center"},
        { text: "القيمه", value: "tottalPrice" ,align: "center"},
        { text: "اجره المخرج", value: "value" ,align: "center"},
      ],

    headers: [
        {
          text: "رقم",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "الاسم", value: "name" ,align: "center"},
        // { text: " المدينه", value: "city" ,align: "center"},
        // { text: " رقم التلفون", value: "phoneNumber" ,align: "center"},
        { text: " عدد البوالص ", value: "count" ,align: "center"},
        { text: "تفاصيل", value: "details" ,align: "center"},
        { text: "تعديل/مسح", value: "actions", align: "center" },
      ],
  }
},
methods: {
    countPolisas(id){
       let p= this.polisas.filter(i=>{
            return i.outSourceObject.id ==id
        })
        return p.length
    },
    addNewCity(){
      let data = {...this.selected.city};
      if(this.selected.id){
        this.selected.city.cityId=this.selected.city.city.id;
        ApiService.addCity(this.selected.id,this.selected.city).then(resp=>{
            this.selected.cities.push(data);
            this.selected.city={};
             this.message='تم إضافة العنصر بنجاح';
                  this.$dialog.notify.success(this.message, {
                    position: 'top-right',
                      timeout: 3000
                      })
        });
      }else{
        var newCity={...data,cityId:data.city.id}

        this.selected.cities.push(newCity);
            this.selected.city={};
      }
    },
    removeNewCity(index){
     if(this.selected.id&&this.selected.cities[index].id){
       var city=this.selected.cities[index];
        ApiService.deleteCity(this.selected.id,city.id).then(resp=>{
           this.selected.cities=this.selected.cities.splice(index,1);
             this.message='تم إضافة العنصر بنجاح';
                  this.$dialog.notify.success(this.message, {
                    position: 'top-right',
                      timeout: 3000
                      })
        });
      }else{
        this.selected.cities=this.selected.cities.splice(i,1);
      }
    },
    openUserDialog(id){
        this.userDialog =true;
        this.entitiesPolisa=this.polisas.filter(i=>{
            return i.outSourceObject.id ==id
        })

    },
    editConfirmed(){
       
            
      ApiService.add(this.selected).then(resp=>{
         if (! this.selected.id)
          {
            this.addToArr(this.entities,resp.data);
              this.selected={}
                this.message='تم إضافة العنصر بنجاح';
            this.$dialog.notify.success(this.message, {
                  position: 'top-right',
                    timeout: 3000
                    });
         }else
         {
           
            var i= this.entities.indexOf(this.entities.filter(e=>e.id==this.selected.id)[0]);
             this.$set(this.entities, i, this.selected);
               this.message='تم تعديل العنصر بنجاح';
             this.$dialog.notify.success(this.message, {
              position: 'top-right',
                timeout: 3000
                });
         }
      });
     
             
        

    },
  cancelEdit(){
    this.dialog = false;
    this.selected={cities:[],cities:[],city:{}};
  },
  addConductor(){
    this.selected={cities:[],cities:[],city:{}};
    this.dialog=true;
  },
  edit(id){
  
    this.selected={...this.entities.filter(e=>e.id==id)[0],city:{}};
    this.dialog=true;
  },
  del(id){
 this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف مدينة  ',
    persistent: true,
    actions: {
      true: {
        text:'نعم',
        color: 'green',
        handle: () => {
          
           this.entities= this.entities.filter(e=>e.id!==id)
           
            this.$dialog.notify.success('تم مسح العنص بنجاح', {
                position: 'top-right',
                timeout: 3000
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
  getData(){
   
   this.loadingStates.table=true;
   if(this.options)
     this.options.searchTerm=this.search;
    ApiService.query(this.options).then(resp=>{
      console.log(resp);
        this.entities=resp.data.items;
        this.total=resp.data.total;
        this.loadingStates.table=false; 
    }).catch(err=>{
        this.loadingStates.table=false;
    });
  },
},
computed: {
    polisas() {
        return this.$store.getters.polisas 
    }
},
watch: {
     entities: {
        handler () {
        this.$store.commit('pushOutSource',this.entities);
        },
        deep: true,
      },
},
}
</script>

<style>
</style>
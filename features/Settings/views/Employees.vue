<template>
  <div >
    <v-row class="pr-5 pb-3 mt-5">
      <v-col class="d-flex justify-content-start ">
         <v-btn
          color="success"
          @click="add"
          >
          اضافة مستخدم<i class="fa fa-plus mr-2"></i>
        </v-btn>
         </v-col>
    </v-row>
     <v-card  min-width="80%"
    class="mx-auto ma-3">
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
          class="mx-4 "
        ></v-text-field>
      </template>
      <template v-slot:[`item.firstName`]="{ item }">
          <span >
              {{item.firstName}}   {{item.lastName}}
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
             <v-form   v-model="valid" >
        <v-row align="center" justify="center" class="my-0 ammar" dense>
          <v-col cols="12" md="11">
            <v-text-field dense  outlined
               color="primary"
              
              v-model="selected.firstName"
              :counter="30"
              :rules="[allRules.NameRequired , allRules.minNameLen(3)]"
              label="الاسم الاول"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="11">
            <v-text-field dense  outlined
               color="primary"   
              v-model="selected.lastName"
              :counter="30"
              :rules="[allRules.NameRequired , allRules.minNameLen(3)]"
              label="أسم العائلة"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field dense  outlined color="primary"    v-model="selected.email" :rules="[allRules.required , allRules.validEmail]" label="البريد الالكترونى" required></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field
              dense  outlined color="primary"   
              label="الرقم السري"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[ allRules.length(6)]"
              v-model="selected.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field
              dense  outlined color="primary"   
              label="تأكيد الرقم السري"
              :rules="[ allRules.length(6)]"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              v-model="selected.confirmPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field dense  outlined
               color="primary"   
              v-model="selected.position"
              :counter="10"
              :rules="[allRules.NameRequired , allRules.nameLength]"
              label="الوظيفه "
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11" class="pb-0">
            <v-text-field
              dense  outlined color="primary"   
              v-model="selected.mobNumber"
              :rules="[ allRules.length(11)]"
              type="number"
              label="رقم التليفون"
              required
            ></v-text-field>
          </v-col>
        </v-row>
  </v-form>
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
import ApiService from '../services/EmployeeService.js'

export default {
data(){
  return{
    valid:false,
    selected:{},
    entities:[],
    total: 0,
    show1: false,
    show2: false,
    loading: false,
    search:'',
    dates:{},
    options: {},
    dialog:false,
    loadingStates:{
       table:false
   },
    headers: [
         
          { text: 'الاسم', value: 'firstName' },
          { text: 'رقم التليفون', value: 'phoneNumber' },
          { text: 'الوظيفه ', value: 'position' },
          { text: 'مسح / تعديل', value: 'actions', align: 'left',},

          
        ],
  }
},
mounted() {
 this.getData();
},
methods:{
  formatDate(date){

  if(!date)
  return '';
  return new Date(date).toISOString().substr(0, 10);

  }, signup() {
      this.loading = true;
      this.$store
        .dispatch("signup", this.selected)
        .then(() => {
          this.loading = false;
        //   this.$router.push("/dashboard");
        })
        .catch((resp) => {
            console.log(JSON.stringify( resp.response));
            var message="";
            debugger;
            
            message=JSON.stringify( resp.response.data);
          this.loading = false;
          this.$dialog.notify.error(message, {
            position: "top-right",
            timeout: 3000,
          });
        });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  getData(){
   
   this.loadingStates.table=true;
   if(this.options)
     this.options.searchTerm=this.search;
    ApiService.query(this.options).then(resp=>{
        this.entities=resp.data.items;
        this.entities.forEach(e=>{
            e.residencyIss=this.formatDate(e.residencyIss)
            e.residencyExp=this.formatDate(e.residencyExp)
            e.licenseIss=this.formatDate(e.licenseIss)
            e.licenseExp=this.formatDate(e.licenseExp)
        });
        this.total=resp.data.total;
        this.loadingStates.table=false; 
    }).catch(err=>{
        this.loadingStates.table=false;
    });
  },
  editConfirmed(){
    this.signup();
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
    title: '  حذف مستخدم  ',
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
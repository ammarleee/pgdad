<template>
  <div >
 
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start ">
         <v-btn
          color="success"
          @click="add"
          >
          اضافة صنف<i class="fa fa-plus mr-2"></i>
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
            <v-col cols="12" sm="6">
              <v-text-field dense 
              :rules="[allRules.required, allRules.minNameLen(2)]"
               outlined
              label="اسم الصنف"
               v-model="selected.name"
                >
                
              </v-text-field>
            </v-col>
             <v-col cols="12" sm="6">
                <v-text-field
                  type="number"
                  outlined
                   :rules="[allRules.required]"
                  dense
                  label="السعر "
                  v-model="selected.price"
                ></v-text-field>
              </v-col>
          </v-row>
          <v-row class="my-0 ammar" dense>
            <v-textarea
            rows="2"
            dense hide-details outlined
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
import ApiService from '../services/MerchandisesService.js'
export default {
data(){
  return{
    valid:false,
    selected:{},
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
          { text: 'اسم الصنف', value: 'name' },
          { text: 'السعر', value: 'price' },
          { text: 'مسح / تعديل', value: 'actions', align: 'left',},
          
        ],
     
        
  }
},
mounted() {
 this.getData();
},
methods:{
  getData(){
   
   this.loadingStates.table=true;
   if(this.options)
     this.options.searchTerm=this.search;
    ApiService.query(this.options).then(resp=>{
      console.log(resp.data.items);
        this.entities=resp.data.items;
        this.total=resp.data.total;
        this.loadingStates.table=false; 
    }).catch(err=>{
        this.loadingStates.table=false;
    });
  },
  editConfirmed(){
    // this.selected.price = +this.selected.price
    console.log(this.selected.price);
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
    title: '  حذف صنف  ',
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
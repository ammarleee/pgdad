<template>
  <v-app>
    <div>
      <v-card min-width="98%" class="ma-4 mt-10">
        <v-data-table
          :headers="headers"
          :items="allClients"
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
            {{polisasValue(item.allPolis,1)}}
          </template>
          <template v-slot:[`item.allPolisTaxs`]="{ item }">
            {{polisasValue(item.allPolis,2)}}
          </template>
          
          <template v-slot:[`item.print`]="{ item }">
            <v-icon color="error"  @click="del(item.id)">mdi-printer</v-icon>
              <v-icon color="orange"  @click="openPolisa(item.allPolis)">mdi-eye</v-icon>
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
          <h2 class="pa-3 mx-auto pink--text">

          جميع بوالص العميل
          </h2>
       <app-polisa-table :userPolisa="userPolisa"></app-polisa-table>
        </v-card-title>
      </v-card>
      </v-dialog>

       <v-dialog
      v-model="userDialog"
      width="99%"
      
    >
      <v-card >
        <v-card-title class="headline" >
          <h2 class="pa-3 mx-auto pink--text">

           العميل
          </h2>
          <span>
             <v-btn
  color="primary"
  elevation="2"

  @click="editClientData(item)"
>تعديل<i class="far fa-edit mr-2"></i></v-btn>
   
          </span>
        </v-card-title>
        <v-expansion-panels
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>العميل</v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-right">
            الرقم
          </th>
          <th class="text-right">
   الاسم
          </th>  <th class="text-right">
            اسم المسؤل
          </th>  <th class="text-right">
           الرقم الضريبى
          </th>
          <th class="text-right">
            المسمي الوظيفي
          </th>
          <th class="text-right">
            رقم الهاتف
          </th>
           <th class="text-right">
            رقم الهويه
          </th>
           <th class="text-right">
            رقم السجل التجارى
          </th>
            
         

         
        </tr>
      </thead>
      <tbody>
        <tr
        class="text-right"
        >
            <td class="text-right" >{{client.id}}</td>
            <td class="text-right">{{client.name}}</td>
            <td class="text-right">{{client.nameOfficial}}</td>
            <td class="text-right">{{client.taxNum}}</td>
            <td class="text-right">{{client.jobTitle}}</td>
            <td class="text-right">{{client.phoneNum}}</td>
            <td class="text-right">{{client.idNum}}</td>
            <td class="text-right">{{client.commercialNum}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>الفروع</v-expansion-panel-header>
        <v-expansion-panel-content> 
           <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-right">
            رقم الفرع
          </th>
          <th class="text-right">
            اسم الفرع
          </th>
          <th class="text-right">
            المدينه
          </th>
          <th class="text-right">
            رقم الهاتف
          </th>
         
          
         
        </tr>
      </thead>
      <tbody>
        <tr
        class="text-right"
          v-for="(item,i) in branches" :key="i"
        >
          
            <td class="text-right" > {{item.id}}</td>
            <td class="text-right">{{item.branchName}}</td>
            <td class="text-right" v-if="item.city.name">{{item.city.name}}</td>
            <td class="text-right">{{item.phonNum}}</td>
           
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>  الاصناف</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-right">
            رقم الصنف
          </th>
          <th class="text-right">
            الصنف
          </th>
          <th class="text-right">
            المسار
          </th>
          <th class="text-right">
             السعر العام
          </th>
          <th class="text-right">
            السعر الخاص
          </th>
          
           <th class="text-left">
            متضمن الضريبه
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
           v-for="(item,i) in products" :key="i"
        >
          
            <td class="text-right" > {{item.id}}</td>
            <td class="text-right">{{item.merchandisObject.name}}</td>
            <td class="text-right" v-if="item.lineObject.fullLine">{{item.lineObject.fullLine}}</td>
            <td class="text-right">{{item.publicPrice}}</td>
            <td class="text-right">{{item.specialPrice}}</td>
            <td class="text-center">
              <i class="far fa-check-circle fa-2x" v-if="item.taxs"></i>
              <i class="fas fa-times fa-2x" v-else></i>
              

            </td>
         
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
      </v-card>
      </v-dialog>
     
    </div>
  </v-app>
</template>

<script>
import polisaTable from './polisaTable'
export default {
  components: {
    'app-polisa-table':polisaTable

  },
  data() {
    return {
      loading: false,
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
          value: "nameOfficial",
          align: "center",
          sortable: true,
        },
        {
          text: "المسمي الوظيفي",
          value: "jobTitle",
          align: "center",
          sortable: true,
        },
        {
          text: "  هاتف المسؤل ",
          value: "phoneNum",
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
          value: "commercialNum",
          align: "center",
          sortable: true,
        },
        {
          text: "اسم الفرع",
          value: "branch.branchName",
          align: "center",
          sortable: true,
        },
        {
          text: "رقم الفرع",
          value: "branch.branchName",
          align: "center",
          sortable: true,
        },
        {
          text: "تلفون الفرع",
          value: "branch.phonNum",
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
    };
  },
  methods: {
    deleteClient(id){
        this.$dialog.info({
    text: 'هل أنت متاكد من حذف العنصر',
    title: '  حذف وحدة  ',
    persistent: true,
    actions: {
      true: {
        text:'نعم',
        color: 'green',
        handle: () => {
           let p= this.allClients.filter(i=>{
        return i.id !==id
      })
          this.$store.commit('editOutClient', p)
     this.message='تم مسح العميل بنجاح';
             this.$dialog.notify.success(this.message, {
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
    editClientData(){
       this.$emit("editClientData", {client:this.client});

    },
    openUserDialog(item){
      this.userDialog = true
      this.client = item
      this.branches = item.branches
      this.products = item.products
    },
    openPolisa(items){
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
  },
  computed: {
    allClients() {
      return this.$store.getters.clients;
    },
  },
  watch: {
    allClients: {
        handler () {
                 console.log('its changed');

        },
        deep: true,
      }, 
   
  },
};
</script>

<style lang="scss" scoped>
</style>
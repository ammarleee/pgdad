<template>
  <div>
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start">
        <v-btn color="success" @click="add">
          سند الصرف
          <i class="fa fa-plus mr-2"></i>
        </v-btn>
      </v-col>
    </v-row>
    <v-card width="98%" class="mx-auto mr-5">
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
       <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="edit(item.id)" color="primary">mdi-pencil</v-icon>
        <v-icon @click="del(item.id)"  color="red">mdi-delete</v-icon>
       </template>
      </v-data-table>
    </v-card>
    
    <!-- printing -->
 <div hidden >
      <v-row class="mt-3" justify="center">
        <v-col cols="4" class="data pa-2 text-h5 text-center">ألاحمرى للنقل</v-col>
      </v-row>
      <v-row class="mt-3" justify="center">
        <v-col cols="4" class="pa-2 text-h5 text-center text-capitalize">
          <h5>اذن صرف</h5>
          <h5>receipt voucher</h5>
          <small>124</small>
        </v-col>
      </v-row>
      <v-row class="mt-3" justify="center">
        <v-col cols="6" class="text-right">
          <p class="font-weight-bold pa-2 grey d-inline-block">
            <span class="ml-2">ريال</span> SR
          </p>
          <br />
          <div class="d-flex font-weight-bold justify-space-between">
            <span class>8:00</span>
            <span>صنتانيه</span>
          </div>
        </v-col>
        <v-col cols="6" class="text-left">
          <h5 class="small">
            <span class="ml-5">تاريخ الطباعه</span> print Date :
            <span>{{print.date}}</span>
          </h5>
          <h5 class="small">
            <span class="ml-5">وقت الطباعه</span> print time :
            <span>{{print.time}}</span>
          </h5>
        </v-col>
      </v-row>

       <v-row class="mt-3 " >
        <v-col cols="3" class="text-right">
          <p class="font-weight-bold pa-2 grey d-inline-block">
           يصرف الى السادة
          </p>
        </v-col>
         <v-col cols="6" class="text-center mt-10">
          <div>
              <v-btn outlined class="d-block" block>ahmed </v-btn>
          </div>

          
        </v-col>
        <v-col cols="3" class="text-left">
           <p class="font-weight-bold pa-2 grey d-inline-block">
             pay To
          </p>
          
        </v-col>
      </v-row>
       <v-row class="mt-3 " >
        <v-col cols="3" class="text-right">
          <p class="font-weight-bold pa-2 grey d-inline-block">
           وذلك مقابل 
          </p>
        </v-col>
         <v-col cols="6" class="text-center mt-10">
          <div>
            <v-textarea outlined v-model="print.notice">
            </v-textarea>
          </div>
        </v-col>
        <v-col cols="3" class="text-left">
           <p class="font-weight-bold pa-2 grey d-inline-block">
             this for
          </p>
          
        </v-col>
      </v-row>


        <v-row class="mt-3 "  >
        <v-col cols="4" class="text-center">
          <p class="font-weight-bold">
           امين الصندوق 
          </p>
          <p>...............................</p>
        </v-col>
         <v-col cols="4" class="text-center ">
          <p class="font-weight-bold">
           المحاسب 
          </p>
          <p>................................</p>
        </v-col>
        <v-col cols="4" class="text-center">
          <p class="font-weight-bold">
           المدير المالى 
          </p>
          <p>....................................</p>
          
        </v-col>
      </v-row>

      <v-row class="mt-3 "  >
        <v-col cols="4" class="text-center">
          <p class="font-weight-bold">
           المستلم
          </p>
          <p>.............................</p>
        </v-col>
         
      </v-row>
        <div class=" pa-3 font-weight-bold mt-10 text-right">
        <p> اسم  /</p>
        <p> توقيع  /</p>
      </div>

      
    </div>
    <!-- finished printing -->
   

    <!-- Add Modal -->
    <v-dialog v-model="dialog" width="1000" persistent>
      <v-card>
        <v-form v-model="valid">
          <v-card-title class="headline">
            <i class="fa fa-pen ml-2"></i> تعديل/إضافة
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense class="mb-2">
                <v-col cols="12" sm="12">
                  <div class="hiddenradio text-center grey lighten-3 pa-3 rounded-lg">
                    <h4 class="font-weight-bold">الحالة</h4>
                    <label v-for="(state,i) in states" :key="i" class="ma-3">
                      <input
                        type="radio"
                        name="currentState"
                        v-model="selected.state"
                        :value="state.value"
                      />
                      <div class="pa-3">
                        <v-icon large :color="state.color">{{state.icon}}</v-icon>
                      </div>
                    </label>
                    <h5 class="lg-rounded" :class="showState.color">{{showState.state}}</h5>
                  </div>
                </v-col>
              </v-row>
              <v-row class="my-0 ammar" dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    outlined
                    dense
                    label="رقم القيد"
                    :rules="[allRules.required, allRules.minNameLen(4)]"
                    v-model="selected.registrationNum"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <DatePicker-layout
                    @myEvent="selected.date = $event"
                    :date.sync="selected.date"
                    label="التاريخ "
                  ></DatePicker-layout>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    outlined
                    dense
                    :rules="[allRules.required, allRules.minNameLen(1)]"
                    label="المبلغ"
                    v-model="selected.price"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :rules="[allRules.required, allRules.minNameLen(4)]"
                    label="المستلم"
                    v-model="selected.receiver"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-autocomplete
                    v-if="!loading"
                    :rules="[allRules.required]"
                    label="جهة الصرف"
                    dense
                    outlined
                    required
                    :items="cashingSide"
                    item-value="id"
                    item-text="name"
                    auto-select-first
                    v-model="selected.cashingSide"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    outlined
                    :disabled="selected.cashingSide !==1"
                    dense
                    label="الرقم اليدوي"
                    v-model="selected.manualNum"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    outlined
                    :disabled="selected.cashingSide !==1"
                    dense
                    label="رقم البوليصة"
                    v-model="selected.policaNum"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    outlined
                    dense
                    :disabled="selected.cashingSide !==2"
                    label="رقم الرحلة"
                    v-model="selected.tripNum"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-if="!loading"
                    :disabled="selected.cashingSide !==3"
                    label=" الموظف"
                    dense
                    outlined
                    :items="employees"
                    item-value="id"
                    item-text="fullName"
                    auto-select-first
                    v-model="selected.employee"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-if="!loading"
                    :disabled="selected.cashingSide !==4"
                    label=" المصروف"
                    dense
                    outlined
                    :items="expenses"
                    item-value="id"
                    item-text="name"
                    auto-select-first
                    v-model="selected.expense"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-radio-group v-model="selected.cashingSource" row :rules="[allRules.required]">
                    <template v-slot:label>
                      <div class="text-right">
                        <strong>مصادر الصرف</strong>
                      </div>
                    </template>
                    <v-radio label="صندوق" value="1"></v-radio>
                    <v-radio label="عهدة" value="2"></v-radio>
                  </v-radio-group>
                </v-col>
              <v-col cols="6" >
            <v-textarea
              outlined
              dense
              hide-details
                  rows="3"
          row-height="15"
              label="البيان"
              v-model="selected.statement"
            ></v-textarea>
          </v-col>
        
          <v-col cols="6" >
            <v-textarea
              outlined
              dense
              hide-details
                  rows="3"
          row-height="15"
              label="ملحوظات"
              v-model="selected.notes"
            ></v-textarea>
          </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" :disabled="!valid" @click="editConfirmed()">حفظ</v-btn>

            <v-btn color="red darken-1" text @click="cancelEdit()">إلغاء</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Add Modal -->
  </div>
</template>

<script>
import employeesApi from "../../Settings/services/EmployeeService";
import expensesApi from "../services/ExpensesService";
import ApiService from "../services/ReceiptService";
 import Enums from './../../../plugins/enums';

export default {
  data() {
    return {
      print: { date: "3/4/2021", time: "12:10 AM" },
      valid: false,
      employees: null,
      expenses: null,
      selected: {},
      states:Enums.States,
      cashingSide: [
        { id: 1, name: "ارجاع بوليصه" },
        { id: 2, name: "صرف لرحله" },
        { id: 3, name: "صرف لموظف" },
        { id: 4, name: "مصروفات اخرى" },
      ],
      entities: [],
      total: 0,
      search: "",
      options: {},
      dialog: false,
      loadingStates: {
        table: false,
      },
      headers: [
        {
          text: "رقم",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "رقم القيد", value: "registrationNum", align: "center" },
        { text: "التاريخ", value: "date", align: "center" },
        { text: "المبلغ", value: "price", align: "center" },
        { text: "الموظف", value: "employee", align: "center" },
        { text: "المصروف", value: "expense", align: "center" },
        { text: "المستلم", value: "receiverId", align: "center" },
        { text: "جهة الصرف", value: "cashingSide", align: "center" },
        { text: "رقم البوليصه", value: "policaNum", align: "center" },
        { text: "رقم الرحله", value: "tripNum", align: "center" },
        { text: "مسح / تعديل", value: "actions", align: "center" },
      ],
    };
  },
  async mounted() {
    try {
      this.getData();

      const employees = await employeesApi.query();
      const expenses = await expensesApi.query();
      this.expenses = expenses.data.items;
      this.employees = employees.data.items.map((i) => {
        return { ...i, fullName: i.firstName + " " + i.lastName };
      });
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    showState() {
      let curentState;
      if (this.selected.state == 0) {
        curentState = {
          state: "مفتوح",
          color: "green--text",
          icon: "mdi-lock-open-variant",
        };
      } else if (this.selected.state == 1) {
        curentState = {
          state: "مغلق",
          color: "red--text",
          icon: "mdi-lock",
        };
      } else if (this.selected.state == 2) {
        curentState = {
          state: "مرحل",
          color: "orange--text",
          icon: "mdi-lock-clock",
        };
      } else {
        curentState = {
          state: "اختار الحالة",
          color: "black--text",
          icon: "mdi-lock-clock",
        };
      }
      return curentState;
    },
  },
  methods: {
    getData() {
      this.loadingStates.table = true;
      if (this.options) this.options.searchTerm = this.search;
      ApiService.query(this.options)
        .then((resp) => {
          console.log(resp.data.items);
          this.entities = resp.data.items;
          this.total = resp.data.total;
          this.loadingStates.table = false;
        })
        .catch((err) => {
          this.loadingStates.table = false;
        });
    },
    editConfirmed() {
      console.log(this.selected);
      this.entities.push(this.selected);
      this.$store.commit("distrbuters", this.entities);
      this.selected = {};
      //  ApiService.edit(this.selected).then(resp=>{
      //   this.dialog=false;
      //     var message='تم تعديل العنصر بنجاح';
      //   if(!this.selected.id){
      //        this.$set(this.entities, this.entities.length, resp.data);
      //       message='تم إضافة العنصر بنجاح';
      //   }else{
      //     var i= this.entities.indexOf(this.entities.filter(e=>e.id==resp.data.id)[0]);
      //      this.addToArr(this.entities,resp.data);;
      //   }

      //     this.$dialog.notify.success(message, {
      //         position: 'top-right',
      //         timeout: 3000
      //         })
      //   }
      //   ).catch(err=>{

      // this.dialog=false;
      // console.log(err.request.response);
      //   this.$dialog.notify.error('خطا اثناء تعديل العنصر', {
      //     position: 'top-right',
      //     timeout: 3000
      //     })
      //   });
    },

    cancelEdit() {
      this.dialog = false;
      this.selected = { city: {} };
    },
    add() {
      this.selected = {};
      this.dialog = true;
    },
    edit(id) {
      this.selected = { ...this.entities.filter((e) => e.id == id)[0] };
      this.dialog = true;
    },
    del(id) {
      this.$dialog
        .info({
          text: "هل انت متاكد من حذف العنصر",
          title: "  حذف فرع  ",
          persistent: true,
          actions: {
            true: {
              text: "نعم",
              color: "green",
              handle: () => {
                ApiService.delete(id)
                  .then((resp) => {
                    const index = this.entities.indexOf(
                      this.entities.filter((e) => e.id == id)[0]
                    );
                    if (index > -1) {
                      this.entities.splice(index, 1);
                    }
                    this.$dialog.notify.success("تم مسح العنص بنجاح", {
                      position: "top-right",
                      timeout: 3000,
                    });
                  })
                  .catch((resp) => {
                    this.$dialog.notify.error("خطا اثناء مسح العنصر", {
                      position: "top-right",
                      timeout: 3000,
                    });
                  });
              },
            },
            false: {
              text: "الغاء",
            },
          },
        })
        .then((res) => {
          console.log("delet res:", res);
        });
    },
    view(id) {},
  },
  watch: {
    options: {
      handler() {
        this.getData();
      },
      deep: true,
    },
    search: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
};
</script>


<style lang="scss" scoped>

.data{
  border: 2px solid black;
}
.hiddenradio [type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
/* IMAGE STYLES */
.hiddenradio [type="radio"] + div {
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
/* CHECKED STYLES */
.hiddenradio [type="radio"]:checked + div {
  outline: 2px solid #42ac0d;
  outline-style: dashed;
}
</style>
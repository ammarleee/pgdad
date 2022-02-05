<template>
  <div>
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-start">
        <v-btn color="success" @click="add">
          اضافة موزع
          <i class="fa fa-plus mr-2"></i>
        </v-btn>
      </v-col>
    </v-row>
    <v-card width="80%" class="mx-auto mr-5">
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
     
         <template v-slot:[`item.city`]="{ item }">
          <span>{{item.cityObject.name}}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" elevation="2" class="mx-2" @click="edit(item.id)" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn color="red" elevation="2" icon outlined @click="del(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add Modal -->
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card>
        <v-form v-model="isValid">
          <v-card-title class="headline">
            <i class="fa fa-pen ml-2"></i> تعديل/إضافة
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="my-0 ammar" dense>
                <v-col cols="12" sm="4">
                  <v-text-field
                    dense
                    :rules="[allRules.required, allRules.minNameLen(4)]"
                    outlined
                    label="الاسم "
                    v-model="selected.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    dense
                    outlined
                    :rules="[allRules.required,allRules.length(8)]"
                    label="رقم الجوال "
                    type="number"
                    v-model="selected.phoneNum"
                  ></v-text-field>
                </v-col>
                   <v-col cols="12" sm="4">
                  <v-autocomplete
                    outlined
                    dense
                    :rules="[allRules.required,]"
                    v-model="selected.cityObject"
                    :items="cities"
                    return-object
                    item-text="name"
                    :loading="loadingStates.table"
                    auto-select-first
                    label="اسم الفرع"
                  >
                    <template v-slot:selection="data">
                      <span>{{data.item.name}}</span>
                    </template>
                    <template v-slot:item="data">
                      <span>{{data.item.name}}</span>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
             
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" :disabled="!isValid" @click="editConfirmed()">حفظ</v-btn>

            <v-btn color="red darken-1" text @click="cancelEdit()">إلغاء</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Add Modal -->
  </div>
</template>

<script>
import BranchesApi from "../../Settings/services/BranchesService.js";
export default {
  data() {
    return {
      isValid: false,
      selected: {},
      entities: [],
      cities: null,
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
          sortable: false,
          value: "id",
        },
        { text: "الاسم", value: "name" },
        { text: "المدينة", value: "city" },
        { text: "رقم الجوال", value: "phoneNum" },
        { text: "مسح / تعديل", value: "actions", align: "left" },
      ],

      openDialog: false,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    getDistrbuters() {
      return this.$store.getters.distrbuters;
    },
  },
  methods: {
    getData() {
      this.loadingStates.table = true;
      if (this.options) this.options.searchTerm = this.search;
      BranchesApi.query(this.options)
        .then((resp) => {
          console.log(resp.data.items);
          // this.entities=resp.data.items;
          this.entities = this.getDistrbuters;
          this.cities = resp.data.items;
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
    "selected.cityObject"(newval) {
      if (newval) {
        if (newval.id) {
          this.selected.CityId = newval.id;
        }
      }
    },

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
</style>
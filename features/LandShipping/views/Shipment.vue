<template>
  <v-app>
    <v-container>
      <div>
        <div v-if="!showsearch">
          <app-search></app-search>
        </div>
        <div v-if="showsearch">
          <!-- add new one  -->
          <v-card width="95%" class="ma-2 pa-3">
            <AddShipment v-model="selected" :editMode="editMode" showInclud eTaxBtn showPricingBtn />
          </v-card>

          <v-row class="justify-content-end m-3 ml-5">
            <v-col class="cols" sm="2">
              <v-btn color="primary" @click="addShipment()">حفظ</v-btn>
            </v-col>
          </v-row>

          <!-- edit shipment  model -->
          <v-dialog v-model="dialog" width="80%" class="pa-20">
            <v-card class="pa-10">
              <h2 class="text-right">تعديل</h2>
              <AddShipment
                v-model="selected"
                :editMode="editMode"
                :selectedLine="selected.selectedLine"
                showIncludeTaxBtn
                showPricingBtn
              />
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" @click="addShipment()">حفظ</v-btn>

                <v-btn color="red darken-1" text @click="cancelEdit()">ألغاء</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-row class="pr-5 pb-3 mt-5">
            <v-col class="d-flex justify-content-start">
              <v-btn color="success" @click="saveAll()">
                حفظ البوالص
                <i class="fa fa-plus mr-2"></i>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <shipments-table v-model="entities" @prepareToEdit="prepareToEdit($event)" />
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import ApiService from "../services/ShipmentService";
import search from "./search";
import Enums from "./../../../plugins/enums";
import Localbase from "localbase";
let db = new Localbase("db");

export default {
  name: "Shipment",
  components: {
    "app-search": search
  },
  data() {
    return {
      loadings: {},
      showsearch: true,
      allIncludeTax: false,
      linesPricing: false,
      select: null,
      dialog: false,
      selected: {
        paymentType: 0,
        date: this.formateDateWithMoment(Date.now(), "YYYY-MM-DD"),
        senderInfo: {},
        receiverInfo: {},
        sender: {},
        receiver: {},
        serviceTypeId: 1,
        items: [{}],
        netPrice: null,
        totalPrice: null,
        addedValueTax: null
      },
      MainData: {
        paymentType: 0,
        date: this.formateDateWithMoment(Date.now(), "YYYY-MM-DD"),
        senderInfo: {},
        receiverInfo: {},
        sender: {},
        receiver: {},
        serviceTypeId: 1,
        items: [{}],
        netPrice: null,
        totalPrice: null,
        addedValueTax: null
      },
      message: "",
      entities: [],
      total: 10,
      search: "",
      loadingStates: { table: false },
      options: {},
      editMode: false
    };
  },

  methods: {
    cancelEdit() {
      this.dialog = false;
      this.editMode = false;
      // this.selected = this.MainData;
    },
    prepareToEdit(item) {
      // this.editMode = true;
      this.selected = null;
      // this.dialog = true;
      this.selected = { ...item };
      // setTimeout(() => {
      //   this.editMode=false
      // }, 8000);
    },
    getLocalShipments() {
      this.$store.dispatch("getLocalShipments");
    },
    addShipment() {
      var newShipment = ApiService.newShipment(this.selected);
      console.log(newShipment);
      if (newShipment.id) {
        db.collection("shipments")
          .doc({ id: newShipment.id })
          .update(newShipment)
          .then(response => {
            this.message = "تم تعديل العنصر بنجاح";
            this.$dialog.notify.success(this.message, {
              position: "top-right",
              timeout: 3000
            });
            this.getLocalShipments();
            this.cancelEdit();
          })
          .catch(error => {
            console.log("There was an error, do something else.");
          });
      } else {
        newShipment.id = Date.now();
        db.collection("shipments")
          .add(newShipment)
          .then(response => {
            this.message = "تم اضافة العنصر بنجاح";
            this.$dialog.notify.success(this.message, {
              position: "top-right",
              timeout: 3000
            });
            this.getLocalShipments();
            newShipment = { ...newShipment, id: null };
          })
          .catch(error => {
            console.log("There was an error, do something else.");
          });
      }
    },

    saveAll() {
      let items = this.$store.getters.polisas;
      let item = items[1];
      delete item["id"];
      console.log(item);
      ApiService.add(item)
        .then(resp => {
          console.log(resp);
        })
        .then(res => {
          ApiService.get().then(res => {
            console.log(res);
          });
        });
      // db.collection("shipments").delete();
      // this.getLocalShipments();
    }
    //    async saveAll() {
    //   try {
    //     let items = this.$store.getters.polisas;
    //     for (const item of items) {
    //       delete item["id"];
    //     }
    //     let resp = await ApiService.bulk(items);
    //     console.log(resp);
    //     db.collection("shipments").delete();
    //     this.getLocalShipments();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  }
};
</script>

<style lang="scss" scoped></style>

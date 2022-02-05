<template>
  <div>
    <v-container>
      <div   >
     
                  <v-row v-if="shipments" justify="center">
                    <v-col cols="3" class="rounded-lg grey lighten-3" >
                 <h4>طباعه تفاصيل الرحله </h4>
                      <v-btn icon @click="printTrip">
                        <v-icon large color="error" >
                          mdi-printer
                        </v-icon>
                      </v-btn>
                    </v-col>
                     <v-col cols="3" class="rounded-lg mx-2 grey lighten-3">
                 <h4>طباعه البوالص  </h4>
                      <v-btn icon @click="printShipments">
                        <v-icon large color="error" >
                          mdi-printer
                        </v-icon>
                      </v-btn>
                    </v-col>
                     <v-col cols="3" class="rounded-lg grey lighten-3">
                 <h4>تسليم لسائق </h4>
                      <v-btn icon @click="printDriver">
                        <v-icon large color="error" >
                          mdi-printer
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

               </div>
    <div class="mt-10">
      <v-card max-width="99%" class="ma-4 mx-auto">
        <v-data-table
          :headers="headers"
          :items="polisa"
          dark
          :options.sync="options"
          fixed-header
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

          <template  v-slot:[`item.actions`]="{ item }" >
            <v-icon color="error" @click="print(item)">mdi-printer</v-icon>
          </template>
                    <template v-slot:[`item.senderId`]="{ item }" >
            <span v-if="item.senderId ">
                <span v-if="item.senderId.name">
                {{item.senderId.name}}</span>
            <span v-else>{{item.senderId}}</span>

                </span>
                </template>
                <template v-slot:[`item.receiverId`]="{ item }" >
            <span v-if="item.receiverId ">
                <span v-if="item.receiverId.name">
                {{item.receiverId.name}}</span>
            <span v-else>{{item.receiverId}}</span>
                </span>
                </template>
        </v-data-table>
      </v-card>
    </div>
    </v-container>
  </div>
</template>

<script>

export default {
  props: ["shipments","userPolisa"],
  data() {
    return {
      key: "value,",
      entities: [],
      total: 10,
      search: "",
      loadingStates: { table: false },
      options: {},
      headers: [
        {
          text: "رقم",
          align: "start",
          sortable: false,
          value: "id",
          align: "center",
        },
        { text: "التاريخ", value: "date", align: "center", sortable: true },
        {
          text: "الرقم اليدوى",
          value: "manualNo",
          align: "center",
          sortable: true,
        },
        {
          text: "رقم الدفتر",
          value: "bookId",
          align: "center",
          sortable: true,
        },
        {
          text: " نوع الخدمه ",
          value: "serviceTypeId",
          align: "center",
          sortable: true,
        },
        {
          text: "الصنف",
          value: "items[0].merchandiseId",
          align: "center",
          sortable: true,
        },
        {
          text: "الوحده",
          value: "items[0].unitId",
          align: "center",
          sortable: true,
        },
        {
          text: "المسار",
          value: "line.selectedLine.fullLine",
          align: "center",
          sortable: true,
        },
        { text: "المرسل", value: "senderInfo.name", align: "center", sortable: true },
        {
          text: "المستلم",
          value: "receiverInfo.name",
          align: "center",
          sortable: true,
        },
        { text: "المندوب", value: "salesmanId", align: "center", sortable: true },
        { text: "الكميه", value: "items[0].quantity", align: "center", sortable: true },
        {
          text: "اجمالي السعر",
          value: "totalPrice",
          align: "center",
          sortable: true,
        },
        { text: "طباعه", value: "actions", align: "center", sortable: true },
      ],
    };
  },
  mounted () {
    
  },
  methods: {
   
    printTrip() {
    this.$emit("printTrip",this.polisa);
  },
    printShipments() {
      this.$emit("printShipments",this.polisa);
    },
      printDriver() {
      this.$emit("printDriverReport",this.polisa);
    },
   
     print(item) {
       let data = []
       data.push(item)
      this.$store.commit("printData",data);
      this.$router.push('/shipping/barCode')
    }
  },
  computed: {
      polisa() {
        if (this.shipments) {
         let m= this.shipments 
          return m
        }else{
          return this.userPolisa
        }
      }
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <p small>{{selected.from}}</p>
    <div class="mx-auto" style="width:500px">
      <h2 class="data pa-2 text-h5 text-center red--text">الاحمرى للشحن و النقل</h2>
    </div>
    <div class="mx-auto" style="width:300px">
      <h2 class="pa-2 pb-0 mb-0 text-h5 text-center">سند صرف لمندوب</h2>
      <hr />
    </div>
    <div>
      <v-row justify="center" class="text-center my-10">
        <v-col cols="12" sm="4" class='font-weight-bold'>اسم المندوب : {{selected.name}}</v-col>
        <v-col cols="12" sm="4">من : {{selected.from}}</v-col>
        <v-col cols="12" sm="4">الي : {{selected.to}}</v-col>
      </v-row>
    </div>
    <div>
      <v-row  justify="center">
        <v-col cols="10">
          <v-row class='header-wrapper' justify="center">
            <v-col cols="3">عدد البوالص</v-col>
            <v-col cols="2">المسددة</v-col>
            <v-col cols="2">الطرود</v-col>
            <v-col cols="2">المتبقية</v-col>
            <v-col cols="3">الاجمالى</v-col>
          </v-row>
        </v-col>
         <v-col cols="10">
          <v-row class="body-wrapper">
            <v-col cols="3">{{selected.count}}</v-col>
            <v-col cols="2">{{selected.count}}</v-col>
            <v-col cols="2">{{selected.quantity}}</v-col>
            <v-col cols="2">{{selected.remain}}</v-col>
            <v-col cols="3">{{selected.tottal}}</v-col>
          </v-row>
        </v-col>
      </v-row>

       <div>
      <v-row  justify="center" class="text-center mt-16 font-weight-bold">
        <v-col cols="10">
          <v-row >
            <v-col cols="6">
                <p>المندوب</p>
                <p>......................</p>

            </v-col>
             <v-col cols="6">
                <p>المسؤل</p>
                <p>.......................</p>

            </v-col>
            
          </v-row>
        </v-col>
       
      </v-row>
       </div>
    </div>
  </div>
</template>

<script>
export default {
      created() {
    this.printData = this.$store.getters.printinData;
    this.selected = this.printData
  },

    data() {
        return {
            selected: {name:'wew',from:5,to:46}
        }
    },
};
</script>

<style lang="scss" scoped>
.header-wrapper div {
     border: 2px solid black;
     text-align:center;
     font-weight:bold;
     background-color:rgb(211, 209, 209)

}
.body-wrapper div {
     border: 2px solid black;
     text-align:center;

}
</style>
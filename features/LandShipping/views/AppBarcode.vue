<template>
    <div>
      <div>
           <v-row justify="center" class="text-center ">
        <v-col cols="4"></v-col>
        <v-col cols="4">56598998546546554</v-col>
        <v-col cols="4" class='font-weight-bold red--text'>
          <!-- <div>
                  <slot name="barcode"></slot>
           </div> -->
           barcode icon 

</v-col>
      </v-row>
      </div>

      <div>
      <v-row justify="center" class="text-center">
        <!-- <v-col cols="4" class="mb-5">{{item.trip.id}}</v-col> -->
        <v-col cols="4" class="mb-5">{{item.tripId}}</v-col>
        <v-col cols="4">{{item.date}}</v-col>
        <v-col cols="4">{{item.id}}</v-col>
      </v-row>
      </div>

      <div>

      <v-row justify="center" class="text-center">
        <v-col cols="4">{{item.senderInfo.name}}</v-col>
        <v-col cols="4">{{item.paymentType | PaymentTypesFilter(item.paymentType)}} </v-col>
        <v-col cols="4">{{item.receiverInfo ?item.receiverInfo.name :'unknown' }}</v-col>
      </v-row>
      </div>
      <div>

      <v-row justify="center" class="text-center">
        <v-col cols="4">{{item.manualNo}}</v-col>
        <v-col cols="4">{{item.item.quantity ?item.item.quantity:0}}</v-col>
        <v-col cols="4"></v-col>
      </v-row>
      </div>

<div>
  
      <v-row justify="center" class="text-center">
        <!-- <v-col cols="4">{{item.trip.line.source.name}}</v-col> -->
        <v-col cols="4"></v-col>
        <v-col cols="4"></v-col>
        <v-col cols="4"></v-col>
        <!-- <v-col cols="4">{{item.trip.line.destination.name}}</v-col> -->
      </v-row>
</div>
<div>

      <v-row justify="center" class="text-center">
        <v-col cols="4">{{item.senderInfo.phoneNumber}}</v-col>
        <v-col cols="4">
          {{item.item.merchandisId ?item.item.merchandisId:null}}
        </v-col>
        <v-col cols="4">{{item.receiverInfo ?item.receiverInfo.name :'unknown' }}</v-col>
      </v-row>
</div>
<div>

         <v-row justify="right" class="text-center mb-4">
        <v-col cols="4"> {{item.item.price ?item.item.price:null}}</v-col>
        <v-col cols="4">0.00</v-col>
        <v-col cols="4">0.00</v-col>
      </v-row>
</div>
<div>
  
      <v-row justify="right" class="text-center mb-4">
        <v-col cols="4">{{item.deliveryPrice}}</v-col>
        <!-- <v-col cols="4"></v-col> -->
        <v-col cols="4">{{item.notice}}</v-col>
      </v-row>
</div>
<div>

      <v-row justify="right" class="text-center mb-4">
        <v-col cols="4">{{item.otherServicesPrice}}</v-col>
        <!-- <v-col cols="4"></v-col> -->
        <!-- <v-col cols="4"></v-col> -->
      </v-row>
</div>
<div>

      <v-row justify="right " class="text-center">
        <v-col cols="4">0.00</v-col>
        <v-col cols="4">{{item.insurance}}</v-col>
        <v-col cols="4"></v-col>
      </v-row>
</div>
<div>

     <v-row justify="right " class="text-center"> 
        <!-- <v-col cols="4" >{{item.taxs? item.taxs:null}}</v-col> -->
        <!-- <v-col cols="4">{{item.taxs ?item.totalPrice -item.taxs :''}}</v-col> -->
       <!-- <v-col cols="4">{{item.size |SizeFilter(item.size)}}</v-col> -->
        <v-col cols="4">{{item.totalPrice}}</v-col>

      </v-row> 
</div>
<div>

      <v-row class="mt-3 print ammar text-center" >
        <v-col cols="4">{{item.totalPrice}}</v-col>
        <v-col cols="4">{{item.totalPrice}}</v-col>
        <v-col cols="4">{{item.item.unitId}}</v-col>
      </v-row>
</div>
    </div>
</template>

<script>
    export default {
        props: ["item"],
    }
    
</script>

<style lang="scss" scoped>

</style>
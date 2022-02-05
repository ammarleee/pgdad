<template>
<div>

    <v-row class="pr-5 pb-3 mt-3">
        <v-col class="d-flex justify-content-start ">
            <v-btn color="success" @click="add">
                اضافة دفاتر<i class="fa fa-plus mr-2"></i>
            </v-btn>
        </v-col>
    </v-row>
    <v-card min-width="80%" class="mx-auto ma-3">
        <v-data-table :headers="headers" :items="entities" :options.sync="options" :server-items-length="total" :search="search" :items-per-page="15" :loading="loadingStates.table" class="elevation-1">
            <template v-slot:top>
                <v-text-field v-model="search" label="بحث" class="mx-4"></v-text-field>
            </template>
             <template v-slot:[`item.manualNo`]="{item}">
                <div>
                    <v-chip  label >
                      {{item.manualNo}}
                    </v-chip>
                </div>
               
            </template>
      <template v-slot:[`item.city`]="{item}">
                <div>
                    <v-chip  label color="info">
                      {{item.city.name}}
                    </v-chip>
                </div>
               
            </template>
              <template v-slot:[`item.shipmentsCount`]="{item}">
                <div>
                    <v-chip  label color="orange" small>
                      {{item.total-item.shipmentsCount}}
                    </v-chip>
                </div>
               
            </template>
            <template v-slot:[`item.from`]="{item}">
                <div>
                    <v-icon color="blue " small>
                    far fa-clipboard
                  </v-icon>
                    {{item.from}}
                   
                </div>
                <div>
                  <v-icon color="blue darken-2" small>
                    fas fa-clipboard 
                  </v-icon>
                  {{item.to}}
                    
                </div>
            </template>
            <template v-slot:[`item.receiver`]="{item}">
                <div>
                    <i class="fas fa-user-check" @click="edit(item.id)" style="color:green;cursor:pointer" v-if="!item.receiver"></i>
                    <span v-if="item.receiver" @click="edit(item.id)">
                        <i class="fas fa-user-edit" style="color:green;cursor:pointer"></i>
                        {{item.receiver.firstName}} {{item.receiver.lastName}}
                    </span>

                </div>
            </template>
            <template v-slot:[`item.state`]="{ item }">
               
                  <v-menu>
                        <template v-slot:activator="{ on: menu, attrs }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on: tooltip }">
                
                              <AppState :state="item.state" label @click="selected =item" v-bind="attrs" 
                              v-on="{ ...tooltip, ...menu }" />

                                </template>
                                <span>الحالة</span>
                            </v-tooltip>
                        </template>

                        <v-card class="text-center" width='200'>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content v-if="showState">
                                        <v-list-item-title class="text-h5">الحالة</v-list-item-title>
                                        <v-divider></v-divider>
                                        <v-icon large :class="showState.color" class="pa-3">{{showState.icon}}</v-icon>
                                        <v-list-item-subtitle :class="showState.color">{{showState.state}}</v-list-item-subtitle>
                                        <v-divider></v-divider>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item-action class='mt-0'>
                                    <v-list-item-title v-if="item.state == 2 ">
                                        <v-btn class="ma-1 white--text" @click="changeState(item,1)" color="success">اعاده فتح</v-btn>
                                    </v-list-item-title>
                                    <v-list-item-title v-if="item.state == 1 ">
                                        <v-btn class="ma-1 white--text" @click="changeState(item,2)" color="error">غلق</v-btn>

                                    </v-list-item-title>
                                </v-list-item-action>
                            </v-list>

                        </v-card>
                    </v-menu>
            </template>
           
            <template v-slot:[`item.actions`]="{ item }">

                <v-btn color="red" class="ml-2" icon elevation="2" outlined @click="del(item.id)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>

    <!-- Add Modal -->
    <v-dialog v-model="modals.addBooks" width="600" persistent>

        <v-card >
            <v-form v-model="valid">
                <v-card-title class="headline">
                    <i class="fa fa-pen ml-2"></i> تعديل/إضافة
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="my-0 ammar" dense>
                            <v-col class="mb-0 pb-0">
                                <v-autocomplete :rules="[allRules.required]" outlined v-model="selected.cityId" :items="cities" item-value="id" item-text="name" :loading="loadingStates.cities" auto-select-first label="المدينة" dense>
                                </v-autocomplete>

                            </v-col>

                        </v-row>

                        <v-row class="my-0 ammar" dense>
                            <v-col>
                                <v-text-field label="عدد الدفاتر" type="number" outlined :rules="[allRules.required]" dense v-model="selected.count">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="عدد البوالص لكل دفتر" type="number" outlined :rules="[allRules.required]" dense v-model="selected.cargoPerBook">
                                </v-text-field>
                            </v-col>

                        </v-row>
                        <v-row class="my-0 ammar" dense>
                            <v-col>
                                <v-text-field label="رقم أول دفتر" type="number" :rules="[allRules.required]" outlined dense v-model="selected.bookStartNo">
                                </v-text-field>
                            </v-col>

                            <v-col>
                                <v-text-field label="رقم أول بوليصة" type="number" :rules="[allRules.required]" outlined dense v-model="selected.cargoStartNo">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="my-0 ammar" dense>
                            <v-col>
                                <v-text-field label="رقم أخر دفتر" type="number" outlined dense readonly disabled v-model="selected.lastBookNo">
                                </v-text-field>
                            </v-col>

                            <v-col>
                                <v-text-field label="رقم أخر بوليصة" type="number" outlined dense readonly disabled v-model="selected.lastCargoNo">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="إجمالى البوالص" type="number" outlined dense readonly disabled v-model="selected.total">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="my-0 ammar" dense>
                            <v-textarea name="notice" outlined dense label="الملاحظات" v-model="selected.notice"></v-textarea>
                        </v-row>
                    </v-container>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" :disabled="!valid" @click="editConfirmed()">
                        حفظ
                    </v-btn>
                    <v-btn color="red darken-1" text @click="cancelEdit()">
                        إلغاء
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        
    </v-dialog>
    <!-- Add Modal -->
<!-- Add receiver modal  start-->
  <v-dialog v-model="modals.addReceiver" width="600" persistent>
        
        <v-card >
            <v-form v-model="valid">
                <v-card-title class="headline">
                    <i class="fa fa-pen ml-2"></i> اختيار المستلم
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="my-0 ammar" dense>
                            <v-col class="mb-0 pb-0">
                                <app-auto-complete :searchFn="getEmployees" :mapFn="mapEmployee" text='name' strict :rules="[allRules.required]" placeholder="المستلم" v-model="selected.receiver">
                                </app-auto-complete>

                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" :disabled="!valid" @click="updateReceiver">
                        حفظ
                    </v-btn>
                    <v-btn color="red darken-1" text @click="cancelEdit">
                        إلغاء
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
<!-- add receiver modal end-->

</div>
</template>

<script>
import ApiService from '../services/BooksService.js'

import LinesService from '../services/LinesService.js'
import CitiesService from '/src/features/Settings/services/CityService.js'
import EmployeeService from '/src/features/Settings/services/EmployeeService.js'
export default {
    data() {
        return {
          
            selected: {
                count: 0,
                cargoPerBook: 25,
                cargoStartNo: null,
                bookStartNo: null,
                lastCargoNo: null,
                lastBookNo: null,
                total: 0
            },
            employees: [{
                    name: 'احمد',
                    id: 2,
                    phoneNum: 42,
                },
                {
                    name: 'mohamed',
                    id: 1,
                    phoneNum: 4242,
                }
            ],
            entities: [],
            cities: [],
            valid: false,
            destinationBranchId: '',
            sourceBranchId: '',
            total: 0,
            search: '',
            options: {},
            modals:{
              addReceiver:false,
              addBooks:false
              },
            loadingStates: {
                table: false
            },
            headers: [{
                    text: 'رقم',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                {
                    text: 'المدينه',
                    value: 'city',
                    align: "center"
                },
                {
                    text: 'رقم الدفتر',
                    value: 'manualNo',
                    align: "center"
                },
                {
                    text: 'البوالص',
                    value: 'from',
                    align: "center"
                },
                {
                    text: 'المتبقى',
                    value: 'shipmentsCount',
                    align: "center"
                },
                {
                    text: 'المستلم',
                    value: 'receiver',
                    align: "right"
                },
                {
                    text: 'الحالة',
                    value: 'state',
                    align: "center"
                },

                {
                    text: "تعديل/مسح",
                    value: "actions",
                    align: "center"
                },

            ],

        }
    },
    mounted() {
        CitiesService.typeHead('any', true).then(resp => {
            this.cities = resp.data;
        });
        this.getData();
    },
    computed: {
        showState() {
            let curentState
            if (this.selected.state == 1) {
                curentState = {
                    state: 'مفتوح',
                    color: 'green--text',
                    icon: 'mdi-lock-open-variant'
                }
            } else if (this.selected.state == 2) {
                curentState = {
                    state: 'مغلق',
                    color: 'red--text',
                    icon: 'mdi-lock'
                }
            }

            return curentState
        },
    },
    methods: {
      
        updateReceiver() {
            ApiService.updateReceiver(this.selected.id, {
                receiverId: this.selected.receiver.id
            }).then(resp => {
                this.updateArr(this.entities, resp.data);
             
                
                this.$dialog.notify.success('تم تغيير المستلم بنجاح', {
                    position: 'top-right',
                    timeout: 3000
                })
            }).catch(resp => {
                var error = resp.response.data;
                this.$dialog.notify.success(error, {
                    position: 'top-right',
                    timeout: 3000
                })
            }).finally(() => {
                this.selected={};
                this.modals.addReceiver=false;     
            });
        },
        getEmployees(searchTerm) {
            return EmployeeService.typeHead(searchTerm, false);
        },
        mapEmployee(employee) {
            employee.name = `${employee.firstName} ${employee.lastName}`
            return employee;
        },
        changeState(item, state) {
            ApiService.updateState(item.id, {
                state
            }).then(resp => {
                item.state = state;
                this.$dialog.notify.success('تم تغيير الحالة بنجاح', {
                    position: 'top-right',
                    timeout: 3000
                })
            }).catch(resp => {
                var error = resp.response.data;
                this.$dialog.notify.success(error, {
                    position: 'top-right',
                    timeout: 3000
                })
            }).finally(() => {

            });

        },
        getData() {

            this.loadingStates.table = true;
            if (this.options)
                this.options.searchTerm = this.search;
            ApiService.query(this.options).then(resp => {
                this.entities = resp.data.items;
                console.log(this.entities);
                this.total = resp.data.total;
                this.loadingStates.table = false;
            }).catch(err => {
                this.loadingStates.table = false;
            });
        },
        editConfirmed() {
            console.log(this.selected);
            this.selected.destinationId = this.destinationBranchId;
            this.selected.sourceId = this.sourceBranchId;
            ApiService.edit(this.selected).then(resp => {
                console.log(resp.data);

                this.modals.addBooks = false;
                var message = 'تم تعديل العنصر بنجاح';
                if (!this.selected.id) {
                    this.addToArr(this.entities, resp.data);

                    message = 'تم إضافة العنصر بنجاح';
                    this.getData()

                } else {
                  

                }

                this.$dialog.notify.success(message, {
                    position: 'top-right',
                    timeout: 3000
                })
            }).catch(err => {

                this.modals.addBooks = false;
                console.log(err.request.response);
                this.$dialog.notify.error('خطأ اثناء تعديل العنصر', {
                    position: 'top-right',
                    timeout: 3000
                })
            });
        },

        cancelEdit() {
            this.modals.addBooks = false;
            this.modals.addReceiver = false;
            this.selected = {};
        },
        add() {
            this.selected = {};
            this.modals.addBooks = true;
        },
        edit(id) {
           
            this.selected = {
                ...this.entities.filter(e => e.id == id)[0]
            };
          this.modals.addReceiver = true;

        },
        del(id) {
            this.$dialog.info({
                text: 'هل أنت متاكد من حذف العنصر',
                title: '  حذف دفتر  ',
                persistent: true,
                actions: {
                    true: {
                        text: 'نعم',
                        color: 'green',
                        handle: () => {
                            ApiService.delete(id).then(resp => {
                                    const index = this.entities.indexOf(this.entities.filter(e => e.id == id)[0]);
                                    if (index > -1) {
                                        this.entities.splice(index, 1);
                                    }
                                    this.$dialog.notify.success('تم مسح العنص بنجاح', {
                                        position: 'top-right',
                                        timeout: 3000
                                    })
                                }

                            ).catch(resp => {
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
            }).then(res => {
                console.log("delet res:", res);
            })
        },
        view(id) {

        }
    },
    watch: {
        selected: {
            handler() {
                this.selected.lastBookNo = (+this.selected.bookStartNo) + (+this.selected.count) - 1;
                this.selected.lastCargoNo = (+this.selected.cargoStartNo) + (+this.selected.count) * (+this.selected.cargoPerBook) - 1;
                this.selected.total = (+this.selected.count) * (+this.selected.cargoPerBook);
            },
            deep: true
        },
        options: {
            handler() {

                this.getData()
            },
            deep: true,
        },
        search: {
            handler() {

                this.getData()
            },
            deep: true,
        },
    },
}
</script>

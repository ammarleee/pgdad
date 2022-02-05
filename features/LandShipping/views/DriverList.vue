<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <v-btn class="success font-weight-bold" @click="openAddDriver">اضافة كابتن</v-btn>
    </div>
    <v-dialog v-model="addDriver" width="800">
      <v-card class="pa-5">
        <h2 class="text-center">إضافة كابتن</h2>
        <v-form v-model="valid" @submit.prevent="addNewDriver">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="driver.username"
                :rules="[allRules.required]"
                dense
                outlined
                label="اسم الكابتن"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="driver.email"
                :rules="[allRules.required]"
                dense
                outlined
                label="البريد الإلكتروني"
                type="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="driver.address"
                :rules="[allRules.required]"
                dense
                outlined
                label="العنوان"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="driver.idNum"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم الهوية"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6 ">
              <v-text-field
                v-model="driver.homeNum"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم البيت"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6 ">
              <v-text-field
                v-model="driver.locationNum"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم الموقع"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6 ">
              <v-text-field
                v-model="driver.motoType"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم الموتوسيكل"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6 ">
              <v-text-field
                v-model="driver.phone"
                :rules="[allRules.required]"
                dense
                outlined
                label="الهاتف"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" id="idFace">
              <v-text-field
              v-if="!driver._id"
                @click="ref"
                v-model="driver.locationFace"
                outlined
                dense
                placeholder="صورة الهوية من الامام"
              ></v-text-field>
              <div v-else class="d-flex justify-content-center">
                <img :src="driver.locationFace" alt="" width="100" height="100">
                <v-icon button @click="ref">mdi-camera</v-icon>
              </div>
              <input
                class="d-none"
                ref="imgIdFace"
                type="file"
                id="1"
                :rules="[allRules.required]"
                @change="uploadFile"
                multiple
              />
            </v-col>
            <v-col cols="12" sm="6" id="idBack">
              <v-text-field
              v-if="!driver._id"
                @click="ref"
                v-model="driver.locationBack"
                outlined
                dense
                placeholder="صورة الهوية من الخلف"
              ></v-text-field>
               <div v-else class="d-flex justify-content-center">
                <img :src="driver.locationBack" alt="" width="100" height="100">
                <v-icon button @click="ref">mdi-camera</v-icon>

              </div>
              <input
                class="d-none"
                ref="imgIdBack"
                type="file"
                :rules="[allRules.required]"
                @change="uploadFile"
                single
                id="2"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" id="nationalityFace">
              <v-text-field
              v-if="!driver._id"
                @click="ref"
                v-model="driver.nationalityFace"
                outlined
                dense
                placeholder="صورة الجنسية من الامام"
              ></v-text-field>
               <div v-else class="d-flex justify-content-center">
                <img :src="driver.nationalityFace" alt="" width="100" height="100">
                <v-icon button @click="ref">mdi-camera</v-icon>

              </div>
              <input
                class="d-none"
                ref="imgNationalityFace"
                type="file"
                :rules="[allRules.required]"
                @change="uploadFile"
                single
                id="3"
              />
            </v-col>
            <v-col cols="12" sm="6" id="nationalityBack">
              <v-text-field
              v-if="!driver._id"
                @click="ref"
                v-model="driver.nationalityBack"
                outlined
                dense
                placeholder="صورة الجنسية من الخلف"
              ></v-text-field>
               <div v-else class="d-flex justify-content-center">
                <img :src="driver.nationalityBack" alt="" width="100" height="100">
                <v-icon button @click="ref">mdi-camera</v-icon>
              </div>
              <input
                class="d-none"
                ref="imgNationalityBack"
                type="file"
                :rules="[allRules.required]"
                @change="uploadFile"
                single
                id="4"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="driver.strNum"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم الشارع"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-if="!driver._id"
                v-model="driver.password"
                :rules="[allRules.required]"
                dense
                outlined
                label="الرقم السري"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" v-if="driver._id">
              <div v-if="driver.img" class="d-flex justify-content-center position-relative">
                <v-icon button @click="ref">mdi-camera</v-icon>
                <img :src="driver.img" />
              </div>
              <v-text-field
                v-else
                v-model="driver.img"
                @click="ref"
                outlined
                dense
                placeholder="صورة الصنف"
              ></v-text-field>
              <input
                class="d-none"
                ref="uploadImageProfile"
                type="file"
                :rules="[allRules.required]"
                @change="uploadFileProfile"
                single
              />
            </v-col>
          </v-row>
          <v-row justify="center" aling="center">
            <v-col cols="12" md="8" class="d-flex justify-center">
              <v-btn class="font-weight-bold success" type="submit" :disabled="!valid" :loading="loading"
                >تسجيل الكابتن</v-btn
              >
              <v-btn
                class="success font-weight-bold mr-3"
                @click.prevent="addImg"
                :loading="loadingImg"
                v-if="openimage"
                >تأكيد تغيير الصورة</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>

    <template>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headerDrvier" :items="driverData" :search="search">
          <template v-slot:[`item.img`]="{ item }">
            <img width="100px" height="100px" :src="item.img" class="pa-2" />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success" small @click="editDriver(item)">mdi-pen</v-icon>
            <v-icon color="error" small @click="opendelDriver(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteDriver" width="500">
          <v-card class="pa-5">
            <h2 class="text-center">هل انت متأكد من حذف الكابتن</h2>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn class="success font-weight-bold" type="submit" @click="sureDelEmployee" :loading="loading"
                >تأكيد</v-btn
              >
              <v-btn class="error font-weight-bold" @click="openDeleteDriver = false">ألغاء</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      driver: {},
      loading: false,
      loadingImg: false,
      valid: false,
      addDriver: false,
      driverData: [],
      driverId: null,
      openDeleteDriver: false,
      images: null,
      openimage: false,
      headerDrvier: [
        {
          text: "الاسم",
          align: "center",
          value: "username"
        },
        {
          text: "البريد الالكتروني",
          align: "center",
          filterable: false,
          value: "email"
        },
        {
          text: "العنوان",
          align: "center",
          value: "address"
        },

        {
          text: "رقم الهاتف",
          align: "center",
          value: "phone"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      selectRole: [{ nameRole: "user" }, { nameRole: "master" }, { nameRole: "guide" }]
    };
  },
  methods: {
    async addNewDriver() {
      console.log(this.driver);
      if (this.driver._id) {
        console.log(this.driver._id);
        try {
          this.loading = true;
          const res = await axios.put(
            "https://resturant-appv1.herokuapp.com/driver",
            this.driver
          );
          console.log(res);
            this.loading = false;
        this.addDriver = false;

          let itemEdit = res.data.user;

          let index = this.driverData.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.driverData.splice(index, 1, itemEdit);

        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      } else {
        try {
          const formData = new FormData();
          formData.append("address", this.driver.address);
          formData.append("email", this.driver.email);
          formData.append("homeNum", this.driver.homeNum);
          formData.append("idNum", this.driver.idNum);
          formData.append("locationNum", this.driver.locationNum);
          formData.append("motoType", this.driver.motoType);
          formData.append("username", this.driver.username);
          formData.append("strNum", this.driver.strNum);
          formData.append("phone", this.driver.phone);
          formData.append("password", this.driver.password);
          formData.append("locationFace", this.driver.locationFace);
          formData.append("locationBack", this.driver.locationBack);
          formData.append("nationalityFace", this.driver.nationalityFace);
          formData.append("nationalityBack", this.driver.nationalityBack);
        this.loading = true;
          const res = await axios.post("https://resturant-appv1.herokuapp.com/driver", formData);
          console.log(res);
          this.loading = false;
        this.addDriver = false;
          this.driverData.push(res.data.newdriver);
          console.log(res.data);
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      }
    },
    ref(e) {
      console.log(e);
      let target = e.path[5].id;
      console.log(target);
      if (target === "idFace") {
        this.$refs.imgIdFace.click();
      } else if (target === "idBack") {
        this.$refs.imgIdBack.click();
      } else if (target === "nationalityFace") {
        this.$refs.imgNationalityFace.click();
      } else if (target === "nationalityBack") {
        this.$refs.imgNationalityBack.click();
      } else {
        console.log("eeeeeee");
        this.$refs.uploadImageProfile.click();
      }
    },
    uploadFile(e) {
      let character = e.target.id.charAt(e.target.id.length - 1);
      console.log(character);
      if (character == 1) {
        this.driver.locationFace = e.target.files[0];
      } else if (character == 2) {
        this.driver.locationBack = e.target.files[0];
      } else if (character == 3) {
        this.driver.nationalityFace = e.target.files[0];
      } else if (character == 4) {
        this.driver.nationalityBack = e.target.files[0];
      }
    },
    uploadFileProfile(e) {
      this.images = e.target.files[0];
    },
    openAddDriver() {
      this.addDriver = true;
      this.driver = {};
    },
    editDriver(item) {
      this.addDriver = true;
      this.driver = { ...item };
      console.log(this.driver);
    },
    opendelDriver(item) {
      this.userId = item._id;
      this.openDeleteDriver = true;
    },
    async sureDelEmployee() {
      try {
        console.log(this.userId);
          this.loading = true;
        let res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/employee/${this.userId}`
        );
        console.log(res);
          this.loading = false;
          this.openDeleteDriver = false;
        this.driverData = this.driverData.filter(e => {
          return e._id !== this.userId;
        });
        console.log(this.driverData);
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    }
  },
  async mounted() {
    try {
      const res = await axios.get("https://resturant-appv1.herokuapp.com/driver");
      console.log(res);
      console.log(res.data);
      this.driverData = res.data.drivers;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped></style>

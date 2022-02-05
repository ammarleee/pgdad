<template>
  <div>
    <v-dialog v-model="openDilog" width="500">
      <v-card class="pa-10">
        <v-card-title class="d-flex justify-content-center">
          <h2>إضافة مطعم</h2>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="register">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="user.username"
                :rules="[allRules.required]"
                hint="مطلوب 6 أحرف على الاقل"
                dense
                outlined
                label="اسم المطعم"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="user.name"
                :rules="[allRules.required]"
                dense
                outlined
                label="اسم صاحب المطعم"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="user.phone"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم الهاتف"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="user.email"
                :rules="[allRules.required]"
                dense
                outlined
                label="البريد الإلكتروني"
                type="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="user.address"
                :rules="[allRules.required]"
                dense
                outlined
                label="عنوان المطعم"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-if="!user._id"
                v-model="user.password"
                :rules="[allRules.required]"
                dense
                outlined
                label="كلمة السر"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" aling="center">
            <v-col cols="12" md="8" class="d-flex justify-center">
              <v-btn
                type="submit"
                color="success"
                class="font-weight-bold"
                :disabled="!valid"
                :loading="loading"
                >تسجيل المطعم</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <v-btn class="success font-weight-bold" @click="add">اضافة مطعم</v-btn>
    </div>
    <template v-if="data.length > 0">
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
        <v-data-table :headers="headers" :items="data" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success" small @click="edit(item)">mdi-pen</v-icon>
            <v-icon color="error" small @click="del(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:[`item.category`]="{ item }">
            <v-icon color="error" small @click="showcategory(item)">mdi-eye</v-icon>
          </template>

          <template v-slot:[`item.products`]="{ item }">
            <v-icon color="info" small @click="showproducts(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </template>

    <v-dialog v-model="openDelete" width="500">
      <v-card class="pa-5">
        <h2 class="text-center">هل انت متأكد من مسح المطعم</h2>
        <v-card-actions class="d-flex justify-content-center">
          <v-btn class="success font-weight-bold" :loading="loading" @click="removeItem"
            >تأكيد</v-btn
          >
          <v-btn class="error font-weight-bold" @click="openDelete = false">ألغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openCategory" width="800">
      <v-card class="pa-5">
        <v-dialog v-model="addCategory" width="800">
          <v-card class="pa-5">
            <h2 class="text-center">إضافة صنف</h2>
            <v-form v-model="validTwo" @submit.prevent="addcategory">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="mycategories.name"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="اسم الصنف"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="mycategories.description"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="وصف الصنف"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div
                    v-if="mycategories.img"
                    class="d-flex justify-content-center position-relative"
                  >
                    <v-icon button @click="ref">mdi-camera</v-icon>
                    <img width="100px" height="100px" :src="mycategories.img" />
                  </div>
                  <v-text-field
                    v-else
                    @click="ref"
                    outlined
                    dense
                    placeholder="صورة الصنف"
                  ></v-text-field>
                  <input
                    class="d-none"
                    ref="uploadImg"
                    type="file"
                    :rules="[allRules.required]"
                    @change="uploadFile"
                    single
                  />
                </v-col>
              </v-row>
              <v-row justify="center" aling="center">
                <v-col cols="12" md="8" class="d-flex justify-center">
                  <v-btn
                    class="font-weight-bold"
                    type="submit"
                    color="primary"
                    :disabled="!validTwo"
                    :loading="loading"
                    >تسجيل الاضافة</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
        <div class="d-flex justify-content-right mt-10 mb-5">
          <v-btn class="success font-weight-bold" @click="openAddCategory">اضافة صنف</v-btn>
        </div>
        <template v-if="categoryData.length > 0">
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
            <v-data-table :headers="headersCategory" :items="categoryData" :search="search">
              <template v-slot:[`item.img`]="{ item }">
                <img width="100px" height="100px" :src="item.img" class="pa-2" />
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon color="success" small @click="editCategory(item)">mdi-pen</v-icon>
                <v-icon color="error" small @click="opendeleteCategory(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
            <v-dialog v-model="openDeleteCategory" width="500">
              <v-card class="pa-5">
                <h2 class="text-center">هل انت متأكد من مسح الصنف</h2>
                <v-card-actions class="d-flex justify-content-center">
                  <v-btn
                    class="success font-weight-bold"
                    :loading="loading"
                    @click="sureDelCategory"
                    >تأكيد</v-btn
                  >
                  <v-btn class="error font-weight-bold" @click="openDeleteCategory = false"
                    >ألغاء</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openProduct" width="1000">
      <v-card class="pa-5">
        <v-dialog v-model="addProduct" width="800">
          <v-card class="pa-5">
            <h2 class="text-center">إضافة أكلة</h2>
            <v-form v-model="validthree" @submit.prevent="addNewproduct">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="myProducts.name"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="اسم الاكلة"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="myProducts.description"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="وصف الاكلة"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="myProducts.price"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="السعر"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    rounded
                    solo
                    dense
                    :items="categoryData"
                    item-text="name"
                    item-value="_id"
                    v-model="myProducts.category"
                    placeholder="اختار نوع الصنف"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    rounded
                    solo
                    dense
                    :items="selectSize"
                    item-text="sizeName"
                    item-value="value"
                    v-model="myProducts.size"
                    placeholder="الحجم"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="myProducts.quantity"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="العدد"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div v-if="myProducts.img" class="d-flex justify-content-around">
                    <div v-for="(itemImg, index) in myProducts.img" :key="index" class="d-flex">
                      <v-icon @click="openDelProductImg(itemImg)">mdi-close</v-icon>
                      <v-icon button @click="ref">mdi-camera</v-icon>
                      <img width="100px" height="100px" :src="itemImg" />
                    </div>
                  </div>
                  <v-text-field
                    v-else
                    @click="ref"
                    outlined
                    dense
                    placeholder="صورة المنتج"
                  ></v-text-field>
                  <input
                    class="d-none"
                    ref="uploadImg"
                    type="file"
                    :rules="[allRules.required]"
                    @change="uploadFile"
                    multiple
                  />
                </v-col>
              </v-row>
              <v-row justify="center" aling="center">
                <v-col cols="12" md="8" class="d-flex justify-center">
                  <v-btn
                    class="font-weight-bold success"
                    type="submit"
                    :disabled="!validthree"
                    :loading="loading"
                    >تسجيل الاضافة</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="openDeleteProductImg" width="500">
          <v-card class="pa-5">
            <h2 class="text-center">هل أنت متأكد من مسح صورة الاكلة</h2>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn class="success font-weight-bold" :loading="loading" @click="delProductImg"
                >متأكد</v-btn
              >
              <v-btn class="error font-weight-bold" @click="openDeleteProductImg = false"
                >ألغاء</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="d-flex justify-content-right mt-10 mb-5">
          <v-btn class="success font-weight-bold" @click="openAddProduct">اضافة اكلة</v-btn>
        </div>
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
            <v-data-table :headers="headersProduct" :items="productData" :search="search">
              <template v-slot:[`item.img`]="{ item }">
                <img width="100px" height="100px" :src="item.img[0]" class="pa-2" />
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon color="success" small @click="editProduct(item)">mdi-pen</v-icon>
                <v-icon color="error" small @click="opendelProduct(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
            <v-dialog v-model="openDeleteProduct" width="500">
              <v-card class="pa-5">
                <h2 class="text-center">هل أنت متأكد من مسح الاكلة</h2>
                <v-card-actions class="d-flex justify-content-center">
                  <v-btn class="success font-weight-bold" :loading="loading" @click="sureDelProduct"
                    >تأكيد</v-btn
                  >
                  <v-btn class="error font-weight-bold" @click="openDeleteProduct = false"
                    >ألغاء</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      openDilog: false,
      openDelete: false,
      openCategory: false,
      addCategory: false,
      categoryData: [],
      // mycategories: {},
      mycategories: { name: "ammar", description: "qwrqwr", resturantId: "" },
      openProduct: false,
      addProduct: false,
      productData: [],
      myProducts: {},
      openDeleteProduct: false,
      search: "",
      data: null,
      user: {},
      newuser: {},
      loading: false,
      valid: false,
      validTwo: false,
      validthree: false,
      deletedId: null,
      openDeleteCategory: false,
      deletedProductId: null,
      deletedCategoryId: null,
      headers: [
        {
          text: "اسم المطعم",
          align: "center",
          filterable: false,
          value: "username"
        },
        {
          text: "اسم صاحب المطعم",
          align: "center",
          filterable: false,
          value: "name"
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
          text: "البريد الإلكتروني",
          align: "center",
          value: "email"
        },
        {
          text: "اصناف",
          align: "center",
          value: "category"
        },
        {
          text: "الاكلة",
          align: "center",
          value: "products"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      headersCategory: [
        {
          text: "الاسم",
          align: "center",
          value: "name"
        },
        {
          text: "الوصف",
          align: "center",
          filterable: false,
          value: "description"
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

      headersProduct: [
        {
          text: "الاسم",
          align: "center",
          value: "name"
        },
        {
          text: "الوصف",
          align: "center",
          filterable: false,
          value: "description"
        },
        {
          text: "السعر",
          align: "center",
          filterable: false,
          value: "price"
        },
        {
          text: "العدد",
          align: "center",
          filterable: false,
          value: "quantity"
        },
        {
          text: "الحجم",
          align: "center",
          filterable: false,
          value: "size"
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

      categories: [],
      products: [],
      images: null,
      imagesProduct: [],
      resturantId: null,
      categoryId: null,
      allDataInResturant: null,
      selectSize: [
        { sizeName: "larg", value: 1 },
        { sizeName: "medium", value: 2 },
        { sizeName: "small", value: 3 }
      ],
      ProductImgSrc: null,
      openDeleteProductImg: false
    };
  },
  methods: {
    async register() {
      console.log(this.user);
      if (this.user._id) {
        try {
          this.loading = true;
          const res = await axios.put(
            "https://resturant-appv1.herokuapp.com/user/edit-profile",
            this.user
          );
          console.log(res);
          this.loading = false;
          this.openDilog = false;
          let itemEdit = res.data.user;

          let index = this.data.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.data.splice(index, 1, itemEdit);
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      } else {
        try {
          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/user/signup",
            this.user
          );
          console.log(this.user);
          this.loading = false;
          this.openDilog = false;
          this.data.push(res.data.user);
          console.log(res.data.user);
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      }
    },
    openAddCategory() {
      this.addCategory = true;
      this.mycategories = {};
    },
    uploadFile(e) {
      this.images = e.target.files;
    },
    async addcategory() {
      this.mycategories.resturantId = this.resturantId;
      console.log(this.mycategories.resturantId);
      console.log(this.mycategories);
      if (this.mycategories._id) {
        console.log(this.mycategories._id);
        try {
          const formData = new FormData();
          if (this.images) {
            formData.append("files", this.images[0]);
            formData.append("name", this.mycategories.name);
            formData.append("description", this.mycategories.description);
            formData.append("_id", this.mycategories._id);
          } else {
            formData.append("name", this.mycategories.name);
            formData.append("description", this.mycategories.description);
            formData.append("_id", this.mycategories._id);
          }
          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/category-edit",
            formData
          );
          console.log(res);
          this.loading = false;
          this.addCategory = false;
          let itemEdit = res.data.category;
          console.log(itemEdit);

          let index = this.categoryData.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.categoryData.splice(index, 1, itemEdit);

          this.images = null;
        } catch (err) {
          console.log(err);
          this.loading = false;
          // this.addCategory = false;
        }
      } else {
        this.addCategory = true;
        try {
          const formData = new FormData();
          formData.append("files", this.images[0]);
          formData.append("name", this.mycategories.name);
          formData.append("description", this.mycategories.description);
          formData.append("resturantId", this.mycategories.resturantId);
          console.log(this.mycategories);
          console.log(this.images);
          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/add-category",
            formData
          );
          console.log(res);
          this.loading = false;
          this.addCategory = false;
          console.log(this.mycategories);
          this.categoryData.push(res.data.category);

          console.log(this.categoryData);
          console.log(res.data.category);
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      }
    },
    editCategory(item) {
      this.addCategory = true;
      this.mycategories = { ...item };
    },
    opendeleteCategory(item) {
      this.openDeleteCategory = true;
      this.deletedCategoryId = item._id;
    },

    async sureDelCategory() {
      try {
        this.loading = true;
        const res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/user/${this.deletedCategoryId}`
        );
        console.log(res);
        this.loading = false;
        this.openDeleteCategory = false;
        this.categoryData = this.categoryData.filter(e => {
          console.log(e);
          return e._id !== this.deletedCategoryId;
        });
      } catch (err) {
        console.log(err);
        // this.openDeleteCategory = false;
        this.loading = false;
      }
    },
    ref() {
      this.$refs.uploadImg.click();
    },

    async showcategory(item) {
      console.log(item);
      this.resturantId = item._id;
      this.openCategory = true;
      try {
        const res = await axios.get(
          `https://resturant-appv1.herokuapp.com/resturant/categories/${item._id}`
        );
        console.log(res);
        this.categoryData = res.data.categoryies;
        console.log(this.categoryData);
      } catch (error) {
        console.log(error);
      }
    },
    async showproducts(item) {
      console.log(item);
      this.resturantId = item._id;
      console.log(this.categoryId);
      this.openProduct = true;
      try {
        const res = await axios.get(
          `https://resturant-appv1.herokuapp.com/resturant/products/${item._id}`
        );

        console.log(res);
        this.productData = res.data.products;
        console.log(this.productData);

        const ress = await axios.get(
          `https://resturant-appv1.herokuapp.com/resturant/categories/${item._id}`
        );
        console.log(ress);
        this.categoryData = ress.data.categoryies;
        console.log(this.categoryData);
      } catch (error) {
        console.log(error);
      }
    },
    // dataForm() {
    //   const formData = new FormData();
    //   formData.append("name", this.myProducts.name);
    //   formData.append("price", this.myProducts.price);
    //   formData.append("category", this.myProducts.category);
    //   formData.append("quantity", this.myProducts.quantity);
    //   formData.append("size", this.myProducts.size);
    //   formData.append("resturantId", this.myProducts.resturantId);
    //   formData.append("description", this.myProducts.description);
    //   formData.append("_id", this.myProducts._id);
    // },
    async addNewproduct() {
      console.log(this.myProducts);
      this.myProducts.resturantId = this.resturantId;
      console.log(this.myProducts);
      if (this.myProducts._id) {
        console.log(this.myProducts._id);
        console.log(this.dataForm());
        try {
          const formData = new FormData();
          if (this.images) {
            for (const i of Object.keys(this.images)) {
              formData.append("files", this.images[i]);
              formData.append("imgName", this.images[i].name);
            }
            formData.append("name", this.myProducts.name);
            formData.append("price", this.myProducts.price);
            formData.append("category", this.myProducts.category);
            formData.append("quantity", this.myProducts.quantity);
            formData.append("size", this.myProducts.size);
            formData.append("resturantId", this.myProducts.resturantId);
            formData.append("description", this.myProducts.description);
            formData.append("_id", this.myProducts._id);
          } else {
            // const formData = new FormData();
            formData.append("name", this.myProducts.name);
            formData.append("price", this.myProducts.price);
            formData.append("category", this.myProducts.category);
            formData.append("quantity", this.myProducts.quantity);
            formData.append("size", this.myProducts.size);
            formData.append("resturantId", this.myProducts.resturantId);
            formData.append("description", this.myProducts.description);
            formData.append("_id", this.myProducts._id);
          }
          this.loading = true;
          const res = await axios.put(
            `https://resturant-appv1.herokuapp.com/file/edit/${this.myProducts._id}`,
            formData
          );
          this.loading = false;
          this.addProduct = false;
          console.log(res);
          let itemEdit = res.data.post;
          console.log(itemEdit);

          let index = this.productData.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.productData.splice(index, 1, itemEdit);
          this.images = null;
        } catch (err) {
          this.loading = false;

          // this.addProduct = false;
          console.log(err);
        }
      } else {
        this.loading = true;
        this.addProduct = true;
        try {
          const formData = new FormData();
          for (const i of Object.keys(this.images)) {
            formData.append("files", this.images[i]);
          }
          formData.append("name", this.myProducts.name);
          formData.append("price", this.myProducts.price);
          formData.append("category", this.myProducts.category);
          formData.append("quantity", this.myProducts.quantity);
          formData.append("size", this.myProducts.size);
          formData.append("resturantId", this.myProducts.resturantId);
          formData.append("description", this.myProducts.description);
          formData.append("_id", this.myProducts._id);

          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/file-upload",
            formData
          );

          this.productData.push(res.data.products);

          this.loading = false;
          this.addProduct = false;
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
        // this.addProduct = false;
      }
    },
    openDelProductImg(item) {
      this.ProductImgSrc = item;
      this.openDeleteProductImg = true;
    },
    delProductImg() {
      this.loading = true;
      let index = this.myProducts.img.findIndex(e => {
        return e === this.ProductImgSrc;
      });
      console.log(index);
      this.myProducts.img.splice(index, 1);
      this.loading = false;
      this.openDeleteProductImg = false;
    },
    openAddProduct() {
      this.addProduct = true;
      this.myProducts = {};
    },
    editProduct(item) {
      this.addProduct = true;
      this.myProducts = { ...item };
      console.log(this.myProducts);
    },
    opendelProduct(item) {
      console.log("sss");
      this.openDeleteProduct = true;
      this.deletedProductId = item._id;
    },
    async sureDelProduct() {
      try {
        this.loading = true;
        const res = axios.delete(`https://resturant-appv1.herokuapp.com/${this.deletedProductId}`);
        console.log(res);
        this.loading = false;
        this.openDeleteProduct = false;
        this.productData = this.productData.filter(e => {
          return e._id !== this.deletedProductId;
        });
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.openDeleteProduct = false;
      }
      this.loading = false;
    },
    add() {
      this.openDilog = true;
      this.user = {};
    },
    edit(item) {
      this.openDilog = true;
      this.user = { ...item };
    },
    del(item) {
      this.openDelete = true;
      this.deletedId = item._id;
    },
    async removeItem() {
      try {
        this.loading = true;
        const res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/user/${this.deletedId}`
        );
        console.log(res);
        this.loading = false;
        this.openDelete = false;
        this.data = this.data.filter(e => {
          console.log(e);
          return e._id !== this.deletedId;
        });
      } catch (err) {
        console.log(err);
        // this.openDelete = false;
        this.loading = false;
      }
    }
  },
  async mounted() {
    try {
      const res = await axios.get("https://resturant-appv1.herokuapp.com/resturants");
      console.log(res.data.resturants);
      this.data = res.data.resturants;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped></style>

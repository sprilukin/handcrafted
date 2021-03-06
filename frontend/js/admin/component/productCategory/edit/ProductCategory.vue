<template>
    <div>
        <div v-show="!loading">
            <breadCrumb :productCategory="productCategory"></breadCrumb>

            <form class="uk-form-horizontal uk-margin-large">

                <div class="uk-margin">
                    <div class="uk-form-label">Название</div>
                    <div class="uk-form-controls">
                        <input @input="onChange('name', $event.target.value)"
                               name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Имя..."
                               :value="updatedProductCategory.name">
                    </div>
                </div>

                <div class="uk-margin">
                    <div class="uk-form-label">Описание</div>
                    <div class="uk-form-controls uk-form-controls-text">
                        <textarea @input="onChange('description', $event.target.value)" name="description"
                                  class="uk-textarea" id="form-horizontal-select" rows="5" placeholder="Описание..."
                                  :value="updatedProductCategory.description">
                        </textarea>
                    </div>
                </div>

                <grid uk-sortable="handle: .uk-sortable-handle" class="j-productCategory-images-grid">
                    <productCategoryImage @remove="onRemoveImage" v-for="(image, index) in productCategory.images"
                                          :image="image" :index="index" :key="image.id">
                    </productCategoryImage>
                </grid>

                <imageUpload @upload="onImageUpload"></imageUpload>
            </form>

            <div uk-grid class="uk-flex-center">
                <router-link :to="categoryLink" class="uk-button uk-button-default">
                    <span uk-icon="icon: arrow-left"></span>
                    К категориям
                </router-link>
                <button class="uk-button uk-button-primary" type="button" @click="onSaveClicked">
                    <span uk-icon="icon: push"></span>
                    Сохранить
                </button>
            </div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import Loading from "uicommon/component/loading/Loading.vue";
    import navigation from "../../../router/navigation";
    import FlexGrid from "uicommon/component/grid/FlexGrid.vue";
    import ProductCategoryImage from "./ProductCategoryImage.vue";
    import ImageUpload from "../../common/ImageUpload.vue";
    import BreadCrumb from "./BreadCrumb.vue";
    import actionNamesEnum from "../../../store/productCategory/actionNamesEnum";
    import modulesEnum from "../../../store/modulesEnum";
    import $ from "jquery";

    export default {
        props: ["id"],

        components: {
            loading: Loading,
            grid: FlexGrid,
            productCategoryImage: ProductCategoryImage,
            imageUpload: ImageUpload,
            breadCrumb: BreadCrumb
        },

        computed: {
            ...mapState(modulesEnum.PRODUCT_CATEGORY, {
                productCategory: (state) => state.item,
                updatedProductCategory: (state) => state.updatedItem,
                loading: (state) => state.loading
            }),
            categoryLink() {
                return navigation.all.categories.uri
            }
        },

        methods: {
            ...mapActions(modulesEnum.PRODUCT_CATEGORY, {
                load: actionNamesEnum.LOAD_BY_ID,
                save: actionNamesEnum.SAVE,
                reorderImages: actionNamesEnum.REORDER_IMAGES,
                addImages: actionNamesEnum.ADD_IMAGES,
                removeImage: actionNamesEnum.REMOVE_IMAGE,
                update: actionNamesEnum.UPDATE
            }),
            loadCurrentProductCategory: function() {
                this.load(this.id);
            },
            onReorder: function(event, sortable) {
                let reordered = [];

                sortable.$el.find("> div").each((index, el) => {
                    reordered.push({
                        newIndex: Number($(el).attr("data-index")),
                        oldIndex: index
                    });
                });

                this.reorderImages(reordered);
            },
            onChange: function(property, value) {
                this.update({
                    [property]: value
                })
            },
            onSaveClicked: function() {
                this.save();
            },
            onImageUpload: function(uploadedImages) {
                this.addImages(uploadedImages);
            },
            onRemoveImage: function(index) {
                this.removeImage(index);
            }
        },

        watch: {
            id: function () {
                this.loadCurrentProductCategory();
            }
        },

        created: function() {
            this.loadCurrentProductCategory();
        },

        mounted: function() {
            $(this.$el).find(".j-productCategory-images-grid").on("change", this.onReorder.bind(this));
        },

        destroyed: function() {
            $(this.$el).find(".j-productCategory-images-grid").off("change");
        }
    };
</script>

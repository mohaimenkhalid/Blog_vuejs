<template>
    <div>
        <Nav></Nav>
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Create Category
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Enter Category Name" v-model="form.name" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="button" @click.prevent="createCategory()" class="btn btn-primary" value="Create Category">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Category List
                        </div>
                        <div class="card-body">
                            <table class="table" width="100%">
                                <tr>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                <tr v-for="(category, index) in categories">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ category.name }}</td>
                                    <td>
                                        <button class="btn btn-info btn-sm" @click=editCategory(category.id)>Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteCategoryConfirm(category.id)">Delete</button>
                                    </td>
                                </tr>
                            </table>
                            <Modal>
                                <template slot="modal-title">
                                    <h5 class="modal-title">Category Update Modal</h5>
                                </template>
                                <template slot="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" name="name" v-model="form.name" class="form-control">
                                        </div>
                                    </form>
                                </template>
                                <template slot="modal-submit-button">
                                    <button type="button" class="btn btn-primary" @click="updateCategory(form.id)">Update</button>
                                </template>
                            </Modal>
                            <DeleteModal>
                                <template slot="modal-delete-body">
                                    <h5>
                                        Are you sure to delete this category?
                                    </h5>
                                </template>
                                <template slot="modal-action-button">
                                    <button type="button" class="btn btn-danger" @click="deleteCategory(update_category_id)">Yes, Delete</button>
                                </template>
                            </DeleteModal>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
</template>

<script>
    import Nav from '../partials/Nav'
    import Modal from "../modal/modal";
    import DeleteModal from "../modal/delete-modal";
    export default {
        components: {
            Modal,
            Nav,
            DeleteModal
        },
        data(){
            return {
                form: {
                    id : '',
                    name : ''
                },
                update_category_id: '',
                categories: [],
            }
        },
        mounted() {
            this.getAllCategory()
        },
        methods:{
            createCategory(){
                axios.post('/api/add-category', this.form)
                    .then(response => {
                        this.form = ''
                        this.getAllCategory()
                        Notification.success(response.data.success);
                    })
                    .catch( error => {
                        console.log(error)
                        Notification.error('Failed to create category!');
                    })
            },
            getAllCategory(){
                axios.get('/api/all-category')
                    .then(response => {
                        this.categories = response.data.categories;
                    })
                    .catch( error => {
                        console.log(error)
                        Notification.error('Failed to create category!');
                    })
            },
            editCategory(id){
                axios.get('/api/category/edit/'+id)
                    .then(response => {
                        this.form = response.data.category;
                        $('#modal').modal('show')
                    })
                    .catch( error => {
                        console.log(error)
                        Notification.error('Something went wrong!');
                    })
            },
            updateCategory(id){
                axios.post('/api/category/update/'+id, this.form)
                    .then(response => {
                        this.getAllCategory()
                        this.form = ''
                        $('#modal').modal('hide')
                        Notification.success(response.data.success);
                    })
                    .catch( error => {
                        console.log(error)
                        Notification.error('Failed update category!');
                    })
            },
            deleteCategoryConfirm(id){
                this.update_category_id = id
                $('#delete-modal').modal('show')
            },
            deleteCategory(id){
                axios.get('/api/category/delete/'+id)
                    .then(response => {
                        this.getAllCategory()
                        $('#delete-modal').modal('hide')
                        Notification.success(response.data.success);
                    })
                    .catch( error => {
                        console.log(error)
                        Notification.error('Failed to delete category!');
                    })
            }
        }
    }
</script>

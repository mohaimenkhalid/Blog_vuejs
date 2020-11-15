<template>
    <div>
        <Nav></Nav>
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Create Tag
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Enter Tag Name" v-model="form.name" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="button" @click.prevent="createTag()" class="btn btn-primary" value="Create Tag">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Tag List
                        </div>
                        <div class="card-body">
                            <table class="table" width="100%">
                                <tr>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                <tr v-for="(tag, index) in tags">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ tag.name }}</td>
                                    <td>
                                        <button class="btn btn-info btn-sm" @click=editTag(tag.id)>Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteTagConfirm(tag.id)">Delete</button>
                                    </td>
                                </tr>
                            </table>
                            <Modal>
                                <template slot="modal-title">
                                    <h5 class="modal-title">Tag Update</h5>
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
                                    <button type="button" class="btn btn-primary" @click="updateTag(form.id)">Update</button>
                                </template>
                            </Modal>
                            <DeleteModal>
                                <template slot="modal-delete-body">
                                    <h5>
                                        Are you sure to delete this tag?
                                    </h5>
                                </template>
                                <template slot="modal-action-button">
                                    <button type="button" class="btn btn-danger" @click="deleteTag(update_tag_id)">Yes, Delete</button>
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
                update_tag_id: '',
                tags: [],
            }
        },
        mounted() {
            this.getAllTag()
        },
        methods:{
            async createTag(){
                try{
                    const response = await axios.post('/api/add-tag', this.form)
                    this.form.name = ''
                    await this.getAllTag()
                    await Notification.success(response.data.success);
                } catch (e) {
                    Notification.error('Something went wrong!');
                }
            },
            async getAllTag(){
                try{
                    const response = await axios.get('/api/all-tag')
                    this.tags = await response.data.tags;
                } catch (e) {
                    Notification.error('Something went wrong!');
                }
            },
            async editTag(id){
                try{
                    const response = await axios.get('/api/tag/edit/'+id)
                    this.form = await response.data.tag
                    $('#modal').modal('show')
                } catch (e) {
                    Notification.error('Something went wrong!');
                }
            },
            async updateTag(id){
                try{
                    const response = await axios.post('/api/tag/update/'+id, this.form)
                    await this.getAllTag()
                    this.form = ''
                    $('#modal').modal('hide')
                    Notification.success(response.data.success);
                } catch (e) {
                    Notification.error('Failed update tag!');
                }
            },
            deleteTagConfirm(id){
                this.update_tag_id = id
                $('#delete-modal').modal('show')
            },
            async deleteTag(id){
                try{
                    const response = await axios.get('/api/tag/delete/'+id)
                    await this.getAllTag()
                    $('#delete-modal').modal('hide')
                    Notification.success(response.data.success);
                } catch (e) {
                    Notification.error('Failed to delete tag!');
                }
            }
        }
    }
</script>

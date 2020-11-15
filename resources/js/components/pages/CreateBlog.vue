<template>
    <div>
        <Nav></Nav>
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" v-model="form.title" class="form-control" placeholder="Enter blog title">
                            </div>
                            <div class="form-group">
                                <label>Cover Image</label>
                                <input type="file" class="form-control" @change='upload_avatar'>
                            </div>
                            <div class="form-group">
                                <label>Body</label>
                                <vue-editor v-model="form.body"></vue-editor>
                            </div>
                            <div class="form-group">
                                <button @click="createBlog()" class="btn btn-primary">Create Blog</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            Category
                        </div>
                        <div class="card-body">
                            <multiselect v-model="form.blog_selected_category" tag-placeholder="Add this as new tag" placeholder="Select category" label="name" track-by="id" :options="categories" :multiple="true" :taggable="true" ></multiselect>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Tag
                        </div>
                        <div class="card-body">
                            <multiselect v-model="form.blog_selected_tag" tag-placeholder="Add this as new tag" placeholder="Select tags" label="name" track-by="id" :options="tags" :multiple="true" :taggable="true" ></multiselect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from "../partials/Nav";
    import { VueEditor } from "vue2-editor";
    import User from '../../Helpers/User';
    import Multiselect from 'vue-multiselect'
    export default {
        name: 'CreateBlog',
        components: {
            VueEditor,
            Nav,
            Multiselect
        },
        data(){
            return {
                form: {
                    title: '',
                    body: '',
                    cover_image: '',
                    user_id: '',
                    blog_selected_category: [],
                    blog_selected_tag: [],
                },
                categories: [],
                tags: [],
            }
        },
        mounted() {
            this.form.user_id = localStorage.getItem("user_id");
            this.getAllCategory()
            this.getAllTag()
        },
        methods: {
            async createBlog(){
                try{
                    const response = await axios.post('/api/blog/create', this.form)
                    await Notification.success(response.data.message);
                    this.$router.push('/');
                } catch (e) {
                    Notification.error('Something went wrong!');
                }
            },
            upload_avatar(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                if(file['size'] < 2111775)
                {
                    reader.onloadend = (file) => {
                        this.form.cover_image = reader.result;
                    }
                    reader.readAsDataURL(file);
                }else{
                    alert('File size can not be bigger than 2 MB')
                }
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
            async getAllTag(){
                try{
                    const response = await axios.get('/api/all-tag')
                    this.tags = await response.data.tags;
                } catch (e) {
                    Notification.error('Something went wrong!');
                }
            },
        }
    }
</script>

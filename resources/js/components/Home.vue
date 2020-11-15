<template>
	<div>
        <Nav></Nav>
		<div class="container mt-3">
            <div class="row" v-if="loading">
                <div class="col-md-12 text-center">
                    <img src="/loader.gif" width="400">
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-md-12">
                        <input class="form-control" type="text" placeholder="Search blog..." v-model="keyword">
                    </div>
                    <div v-if="totalblogpost !== 0" class="col-12 col-sm-8 col-md-6 col-lg-4 mt-3" v-for="blog in filterBlog">
                        <div class="card">
                            <img class="card-img-top" :src="blog.cover_image_url" alt="">
                            <div class="card-body">
                                <h4 class="card-title">{{ blog.title }}</h4>
                                <h6 class="card-subtitle mb-2 text-muted">Posted By- {{ blog.user.name}}</h6>
                                <hr>
                                <div>
                                    Category:
                                    <span class="categorybadge" v-for="blog_category in blog.blog_category">{{ blog_category.category.name }}</span>
                                </div>
                                <div class="mt-2 mb-2">
                                    Tags:
                                    <span class="tagbadge" v-for="blog_tag in blog.blog_tag">{{ blog_tag.tag.name }}</span>
                                </div>
                                <p class="card-text">{{ blog.body | shortDescription }}</p>
                                <router-link :to="'/blog/'+blog.slug" class="btn btn-info text-white">Read More</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 text-center mt-5" v-if="totalblogpost == 0">
                        <h5>No Blog post Found!</h5>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import Nav from './partials/Nav'
	export default{
        components: {
            Nav
        },
        data(){
            return {
                blogs: [],
                loading: false,
                keyword: '',
                totalblogpost: 0
            }
        },
        mounted() {
            this.getAllBlog()
        },
        methods: {
            getAllBlog() {
                this.loading = true;
                axios.get('/api/all-blog-list')
                    .then(response => {
                        this.blogs = response.data.blogs;
                        console.log(this.blogs.length)
                        this.totalblogpost = this.blogs.length;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        Notification.error('Failed to create category!');
                    })
            },

        },
        computed:{
            filterBlog(){
                var posts =  this.blogs.filter(blog=>{
                    return blog.title.match(this.keyword);
                });
                this.totalblogpost = posts.length;
                return posts;
            }
        },
        filters: {
            shortDescription: function (value) {
                let remove_tag = value.replace(/(<([^>]+)>)/gi, "");
                if(remove_tag.length > 120 ){
                    return remove_tag.substring(0, 120) + '...';
                } else {
                    return remove_tag;
                }
            }
        }
	}
</script>
<style>
    .categorybadge{
        color: yellow;
        border-radius: 2rem;
        border: 2px solid yellow;
        padding: .1rem 0.5rem;
    }

    .tagbadge{
        color: green;
        border-radius: 2rem;
        border: 2px solid green;
        padding: .1rem 0.5rem;
    }
</style>

<template>
    <div>
        <Nav></Nav>
        <div class="container mt-4">
            <div class="row" v-if="loading">
                <div class="col-md-12 text-center">
                    <img src="/loader.gif" width="400">
                </div>
            </div>
            <div class="card" v-else>
                <div class="card-body">
                    <h1>{{ blog.title}}</h1>
                    <hr>
                    <div>
                        Category:
                        <span class="categorybadge" v-for="blog_category in blog.blog_category">{{ blog_category.category.name }}</span>
                    </div>
                    <div class="mt-2 mb-2">
                        Tags:
                        <span class="tagbadge" v-for="blog_tag in blog.blog_tag">{{ blog_tag.tag.name }}</span>
                    </div>
                    <hr>
                    <div class="" v-html="blog.body"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Nav from "../partials/Nav";

    export default{
        components: {
            Nav
        },
        data(){
            return{
                slug: '',
                blog: [],
                loading: false
            }
        },
        mounted() {
            this.singleblog();
        },
        methods: {
            singleblog(){
                this.loading = true
                this.slug = this.$route.params.slug;
                axios.get('/api/single-blog/'+this.slug)
                    .then(response => {
                        this.blog = response.data.blog;
                        this.loading = false
                    })
                    .catch(error => {
                        Notification.error('Something went wrong!');
                    })
            }
        }

    }

</script>

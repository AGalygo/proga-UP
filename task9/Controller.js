let controller = (function () {
    let user="";
    let postList;
    let lastFilter;
    let pageNum=1;
    return {
        restore() {
            //localStorage.clear();
            let user_posts = JSON.parse(localStorage.getItem('user_posts'));
            if (user_posts === null) {
                postList = new PostList([
                    {
                        id: '1',
                        description: 'Это первый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, ' +
                            'тогда как количество смертей превысило 6,4 тыс.',
                        createdAt: new Date('2020-01-17T23:00:00'),
                        author: 'Иванов Иван',
                        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
                        hashTags: ['#ill', '#health'],
                        likes: ['Alena_G', 'Иванов Иван']
                    },
                    {
                        id: '2',
                        description: 'Это второй пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, ' +
                            'тогда как количество смертей превысило 6,4 тыс.',
                        createdAt: new Date('2020-01-20T23:11:00'),
                        author: 'Галыго Алена',
                        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
                        hashTags: ['#ill', '#health'],
                        likes: ['Alena_G', 'Иванов Иван']
                    },
                    {
                        id: '3',
                        description: 'Это третий пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, ' +
                            'спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
                        createdAt: new Date('2020-02-17T21:00:00'),
                        author: 'Галыго Алена',
                        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
                        hashTags: ['#ill', '#health'],
                        likes: ['Alena_G', 'Иванов Иван']
                    }]);
            } else {
                user_posts.forEach(item => item.createdAt = new Date(item.createdAt));
                postList = new PostList(user_posts);
            }

            user = localStorage.getItem('user');
            if(user == null) {
                user="";
            }
            console.log(user);
            controller.save();
        },
        save() {
            localStorage.removeItem('user_posts');
            localStorage.setItem('user_posts', JSON.stringify(postList.getAll()));
            localStorage.setItem('user', user);
            },

        openPage() {

            controller.restore();
            TweetsView.addAuthors(postList);
            if (user== ""){
                controller.ifGuest();
            } else {
                controller.showUser();
            }
            document.getElementsByClassName('search_button')[0].addEventListener('click', (event) => {
                event.preventDefault();
                controller.showPosts();
            });
        },

        ifGuest(){
            controller.logOut();
            controller.showPosts();
            },

        showUser(){
            controller.showPosts();
            document.getElementsByClassName('hSp1')[0].innerHTML = ` Hello, <br> ${user}!`;
            document.getElementById('add-post').setAttribute('style', 'display: inline');
            document.getElementById('add-post').addEventListener('click', controller.addPost);
            document.getElementsByClassName('log_button')[0].setAttribute("style", "display:none");
            document.getElementsByClassName('logout_button')[0].setAttribute("style", "display:inline");
            document.getElementById('logout_button').addEventListener('click', controller.logOut);
        },
         logIn() {
            TweetsView.openLogInWindow();
            document.getElementById('log_form_button').addEventListener('click', (event) => {
                 event.preventDefault();
                 let login = controller.getLogin();
                 if (login !== '') {
                     user = login;
                     TweetsView.closeLogInWindow();
                     controller.showUser();
                 }

             });
         },

        logOut() {
            user = "";
            controller.showPosts();
            document.getElementsByClassName('hSp1')[0].innerHTML = ` Hello <br> log in, please!`;
            document.getElementById('add-post').setAttribute('style', 'display: none');
            document.getElementsByClassName('log_button')[0].setAttribute("style", "display:inline");
            document.getElementsByClassName('logout_button')[0].setAttribute("style", "display:none");
            document.getElementsByClassName('log_button')[0].addEventListener('click', controller.logIn);
            controller.save();
        },

         getPost(id){
             return postList.get(id);
         },


        addPost() {
            document.getElementById("Author").textContent=user;
            TweetsView.openAddWindow();
            document.getElementById('ok_button_add').addEventListener('click', controller.newTweet);
        },

        newTweet() {
            debugger;
            TweetsView.closeAddWindow();
             let tweet = controller.getTweetForm();
                 tweet.author = user;
                 tweet.likes = [];
                 TweetsView.addPost(tweet, postList);
                 controller.save();
                 TweetsView.addAuthors(postList);
                 controller.showPosts();
             },

        edit(id, tweet) {
            debugger;
         TweetsView.closeEditWindow();
         tweet.id=id;
         tweet.author=user;
         tweet.likes = controller.getPost(id).likes;
         tweet.createdAt = new Date(controller.getPost(id).createdAt);
         if (TweetsView.editPost(id, tweet, postList)) {
             controller.save();
             TweetsView.replacePost(tweet, user);
             //controller.showPosts();
         }
         },

        setEditForm(id) {
            debugger;
        let tweet = postList.get(id);
        let editForm = document.getElementsByClassName('editForm')[0];
        editForm.elements.photoLink.value = tweet.photoLink;
        editForm.elements.description.value = tweet.description;
        let tags='';
        tweet.hashTags.forEach(item => tags=tags+ item + " ");
        editForm.elements.tags.value = tags;
    },

    getEditForm() {
            debugger;
        let tweet = {};
        let editForm = document.getElementsByClassName('editForm')[0];
        tweet.photoLink = editForm.elements.photoLink.value;
        tweet.description = editForm.elements.description.value;
        let tags = editForm.elements.tags.value;
        if(tags != "") {
            tweet.hashTags = tags.split( );
        }
        else {
            tweet.hashTags = [];
        }

        editForm.elements.description.value = "";
        editForm.elements.photoLink.value = "";
        editForm.elements.tags.value = "";
        return tweet;
    },
        getTweetForm() {
        let tweet = {};
        let AddForm = document.getElementById('addForm');

        if(AddForm.photoLink.value!=='') {
            tweet.photoLink = AddForm.photoLink.value;
        }
        else {
            tweet.photoLink = "";
        }
        tweet.description = AddForm.description.value;
        let Atags = AddForm.tags.value;
        if(Atags != "") {
            let tagsArr = Atags.split(' ');
            tweet.hashTags = tagsArr;
        }
        else {
            tweet.hashTags=[];
        }
        AddForm.elements.description.value = "";
        AddForm.elements.photoLink.value = "";
        AddForm.elements.tags.value = "";
        return tweet;
    },
        Delete(id) {
            let result = confirm("Are you sure?");
            if(result===true) {
                TweetsView.removePost(id);
                postList.remove(id);
                controller.save();
                TweetsView.addAuthors(postList);
            }

        },

        showPosts(){
            debugger;
            pageNum=1;
            let filterConfig = controller.getFilters();
            let tweets = TweetsView.getPage(0, 10, postList, user, filterConfig);
            lastFilter=filterConfig;
            debugger;
            for (let i = tweets.length-1; i >=0 ; i--) {
                TweetsView.setPost(tweets[i], user);
            }
            controller.save();
            if (postList.length() > 10 && postList.getPage(10, 1, filterConfig).length == 1) {
                TweetsView.showLoadMoreButton();
            }
            else {
                document.getElementsByClassName('loadMore')[0].setAttribute("style", 'display: none');
            }
            },

        getLogin() {
        return document.getElementById('log_form_win').login.value;
       },

        getFilters() {
            let searchForm = document.getElementsByClassName('searchForm')[0];
            let author = searchForm.searchAuthor;
            let selectedOption = author.options[author.selectedIndex].value;
            let tags = searchForm.elements.searchTags.value;
            let hash_tags=[];
            if(tags == "") {
                hash_tags=false;
            }
            else {
                hash_tags=tags.split( );
            }
            let dateDown = searchForm.elements.searchFrom.value;
            let dateDownLim;
            if(dateDown!= "") {
                dateDownLim = dateDown;
            }
            else {
                dateDownLim = "";
            }
            let dateUpLim;
            let dateUp = searchForm.elements.searchTo.value;
            if(dateUp!= "") {
                dateUpLim = dateUp;
            }
            else {
                dateUpLim="";
            }

        let filterConfig = {
            author: selectedOption,
            hashTagSearch: hash_tags,
            dateDownLim: dateDownLim,
            dateUpLim: dateUpLim,
        };
            return filterConfig;
    },

         loadMore() {
            debugger;
             document.getElementsByClassName('loadMore')[0].setAttribute("style",'display:none');
             let posts = postList.getPage(pageNum * 10, 10, lastFilter);
             for(let i=posts.length-1; i>=0; i--) {
                 TweetsView.setPost(posts[i], user);
             }
             pageNum++;
             if(postList.length() > pageNum*10) {
                 TweetsView.showLoadMoreButton();
             }
         },

        likePost(id) {

            if (user.length > 0) {
                let tweet=postList.get(id);
                let index = tweet.likes.indexOf(user);
                if (index === -1) {
                    tweet.likes.push(user);
                } else {
                    tweet.likes.splice(index, 1);
                }
                TweetsView.replacePost(tweet, user);
                controller.save();
            }
        }
    }

}());
window.addEventListener('load', () => {
    controller.openPage();
});

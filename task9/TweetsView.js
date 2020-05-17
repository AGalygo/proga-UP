class TweetsView {

    static createPost(tweet, username) {

        let post = document.createElement('article');
        post.className = 'A-class';
        post.setAttribute('id', tweet.id);

        let editButtonDiv = document.createElement('div');
        if(username===tweet.author) {
            let editButton = document.createElement('button');
            editButton.className = 'edit_button';
            editButton.textContent = 'Edit';
            editButton.onclick = function () {
                TweetsView.openEditWindow(post.id);
            };

            let delButton = document.createElement('button');
            delButton.className = 'delete_button';
            delButton.textContent = 'Delete';
            delButton.onclick = function () {
                controller.Delete(post.id);
            };
            editButtonDiv.appendChild(editButton);
            editButtonDiv.appendChild(delButton);
        }
        else  {editButtonDiv.innerHTML=`<p>  </p>`;}
        post.appendChild(editButtonDiv);

        let userN=document.createElement('p');
        userN.className = 'name';
        let userName=document.createElement('b');
        userName.textContent = tweet.author;
        userN.appendChild(userName);
        post.appendChild(userN);

        let date=document.createElement('p');
        date.textContent = tweet.createdAt;
        post.appendChild(date);

        let line=document.createElement('hr');
        post.appendChild(line);

        if(!(tweet.photoLink=="")){

            let photo = document.createElement("a");
            photo.setAttribute('href', '#');
            photo.innerHTML =`<img src=${tweet.photoLink}  width= "200" height= "150"  alt="Image">`;
            post.appendChild(photo);

        }

        let description=document.createElement('p');
        description.textContent = tweet.description;
        post.appendChild(description);

        if(tweet.hashTags.length!=0) {
            let Tag="";
            for (let i = 0; i < tweet.hashTags.length; i++) {
                Tag = Tag + tweet.hashTags[i] + " ";
            }
            let tags = document.createElement('p');
            tags.className = 'Tags';
            tags.textContent = Tag;
                post.appendChild(tags);
        }

        if(tweet.likes.length!=0) {
            let likesNum = document.createElement('a');
            likesNum.textContent = tweet.likes.length + " ";
            post.appendChild(likesNum);
        }
        let likeButton=document.createElement('button');
        likeButton.className = 'like_button';
        likeButton.textContent='Like';
        if(username.length>0) {
            likeButton.onclick = function () {
           controller.likePost(post.id);
        };}
        post.appendChild(likeButton);

        let page = document.getElementById('posts');
        page.appendChild(post);
        return post;
    }


    static addAuthors(PostList) {
        let authors=PostList.authorsName();
        console.log(authors);
        let element = document.getElementById("searchName");
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
        let opt = document.createElement("option");
        opt.textContent="name";
        opt.value ="name";
        opt.selected="selected";
        element.appendChild(opt);
        for(let i=0; i<authors.length; i++) {
            let newOption = new Option(authors[i], authors[i]);
            element.options[element.options.length]=newOption;
        }

    }


    static addPost(tweet, PostList) {
        if(PostList.add(tweet)) {
        }
        else {
            alert("BAD POST!");
        }

    }


    static removePost(id) {
        let tweet = document.getElementById(id);
        let main = document.getElementById('posts');
        if (tweet !== null) {
            main.removeChild(tweet);
        }
    }

    static replacePost(tweet, userName) {
        debugger;
        let page = document.getElementById('posts');
        let node = document.getElementById(tweet.id);
        if (node !== null) {
            page.replaceChild(TweetsView.createPost(tweet, userName), node);
        }
    }


     static setPost(tweet, username) {
        document.getElementById('posts').appendChild(this.createPost(tweet, username));
     }


    static editPost (id, post, PostList) {
        if(PostList.edit(id, post)) {
            return true;
            }
        return false;
    }

    static clear() {
        let arr = document.getElementById('posts');
        while (arr.firstChild) {
            arr.removeChild(arr.firstChild);
        }
    }

    static getPage(skip, top, PostList, username, filterConfig) {
        TweetsView.clear();
        let tweets = PostList.getPage(skip, top, filterConfig);
        if(filterConfig) {

            if (filterConfig.hashTagSearch) {
                let tags="";
                for(let i=0; i<filterConfig.hashTagSearch.length; i++) {
                    tags=tags+filterConfig.hashTagSearch[i]+" ";
                }
                document.getElementById('searchTags').placeholder = tags;
            }
            if (filterConfig.dateDownLim!="") {
                document.getElementById('dateDownLim').placeholder = filterConfig.dateDownLim;
            }
            if (filterConfig.dateUpLim!="") {
                document.getElementById('dateUpLim').placeholder = filterConfig.dateUpLim;
            }
        }
        return tweets;
    }

    static showLoadMoreButton() {
        document.getElementsByClassName('loadMore')[0].setAttribute("style", 'display: inline');
        document.getElementsByClassName('loadMore')[0].addEventListener('click', controller.loadMore);
    }


    static openAddWindow() {

        document.getElementsByClassName('main')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('addForm')[0].setAttribute('style', 'display: block');

    }
    static closeAddWindow() {
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('addForm')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: block');
    }

    static openLogInWindow() {
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('logInForm')[0].setAttribute('style', 'display: block');

    }
    static closeLogInWindow() {
        document.getElementsByClassName('logInForm')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: block');

    }
    static openEditWindow(id) {
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('editForm')[0].setAttribute('style', 'display: block');
        controller.setEditForm(id);
        document.getElementById('edit_button').addEventListener('click', (event) => {
            event.preventDefault();
            controller.edit(id, controller.getEditForm());
            //TweetsView.replacePost(tweet, user);
        });
    }
    static closeEditWindow() {
        document.getElementsByClassName('editForm')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: block');

    }
}
//  PostList = new PostList([
//      {
//          id: '1',
//          description: 'Это первый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, ' +
//              'тогда как количество смертей превысило 6,4 тыс.',
//          createdAt: new Date('2020-01-17T23:00:00'),
//          author: 'Иванов Иван',
//          photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
//          hashTags: ['#ill', '#health'],
//          likes: ['Alena_G', 'Иванов Иван']
//      },
//      {
//          id: '2',
//          description: 'Это второй пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, ' +
//              'тогда как количество смертей превысило 6,4 тыс.',
//          createdAt: new Date('2020-01-20T23:11:00'),
//          author: 'Галыго Алена',
//          photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
//          hashTags: ['#ill', '#health'],
//          likes: ['Alena_G', 'Иванов Иван']
//      },
//      {
//          id: '3',
//          description: 'Это третий пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, ' +
//              'спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
//          createdAt: new Date('2020-02-17T21:00:00'),
//          author: 'Галыго Алена',
//          photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
//          hashTags: ['#ill', '#health'],
//          likes: ['Alena_G', 'Иванов Иван']
//      }]);
//
// A=new TweetsView();
//console.log(A.showPage(0, 3, PostList));
 //console.log(A.addPost({
 //   id: '1',
//     description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
//     createdAt: new Date('2020-03-17T23:00:00'),
//     author: 'Moya Muza',
//     photoLink: '',
//     hashTags: ["#health"],
//     likes: []
// }, PostList)); //вернет true, пост добавился
// console.log(A.addPost({
//     id: '1',
//     description: 'hello im here',
//     createdAt: new Date('2020-03-17T23:00:00'),
//     author: 'Иванов Иван',
//     photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
//     hashTags: ["#health"],
//     likes: []
// }, PostList));
// console.log(A.userProfile("Иванов Иван"));
// console.log(A.getPage(0, 10, PostList, "Иванов Иван"));
// console.log(A.editPost('2', { description: 'Это измененный пост!'}, PostList ) );
// console.log(A.getPage(0, 10, PostList, "Иванов Иван", {author:'Галыго Алена'}));
// console.log(A.getPage(0, 10, PostList, "Иванов Иван", {hashTagSearch:["#health"]}));
// console.log(A.addAuthors(PostList));
//console.log(A.newTweet());
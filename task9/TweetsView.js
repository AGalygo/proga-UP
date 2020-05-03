class TweetsView {

    createPost(tweet, username) {

        let post = document.createElement('article');
        post.className = 'A-class';
        post.setAttribute('id', tweet.id);

        let editButtonDiv = document.createElement('div');
        if(username===tweet.author) {
            let editButton = document.createElement('button');
            editButton.className = 'edit_button';
            editButton.textContent = '•••';
            editButtonDiv.appendChild(editButton);
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
        post.appendChild(likeButton);

        let page = document.getElementById('posts');
        page.appendChild(post);
        return post;
    }

    userProfile(name) {
         let element = document.getElementById("addButton");
         while (element.firstChild) {
             element.removeChild(element.firstChild);
         }
         let addButt = document.createElement("button");
         addButt.className = 'Mposts_button';
         addButt.textContent="+Add new post";
        if (!name) {
            document.getElementsByClassName('hSp1')[0].innerHTML = ` Hello, <br> log in, please!`;
            document.getElementsByClassName('log_button')[0].innerHTML = `<p><b><u>Log In</u></b></p>`;
        }
        else {
            document.getElementsByClassName('hSp1')[0].innerHTML = ` Hello, <br> ${name}!`;
            document.getElementsByClassName('log_button')[0].innerHTML = `<p><b><u>Log Out</u></b></p>`;
            element.appendChild(addButt);
        }
    }
    addAuthors(PostList) {
        let authors=PostList.authorsName();
        console.log(authors);
        let element = document.getElementById("searchName");
        for(let i=0; i<authors.length; i++) {
            console.log(authors[i]);
            let opt = document.createElement("option");
            opt.textContent=authors[i];
            element.appendChild(opt);
        }

    }


    addPost(tweet, PostList) {
        if(PostList.add(tweet) == true) {
            this.getPage(0, 10, PostList, tweet.author);
        }
        else
            alert("BAD POST!");
    }

    removePost(id, PostList) {
        let tweet = document.getElementById(id);
        let main = document.getElementById('posts');
        if (tweet !== null) {
            main.removeChild(tweet);
        }
        PostList.remove(id);
    }

    getPage(skip, top, PostList, username, filterConfig) {
        let posts = document.getElementById('posts');
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        let tweets = PostList.getPage(skip, top, filterConfig);
        if(filterConfig) {
            // if (filterConfig.author) {
            //     document.getElementById('searchName').placeholder = filterConfig.author;
            // }
            if (filterConfig.hashTagSearch) {
                let tags="";
                for(let i=0; i<filterConfig.hashTagSearch.length; i++) {
                    tags=tags+filterConfig.hashTagSearch[i]+" ";
                }
                document.getElementById('searchTags').placeholder = tags;
            }
        }
        for (let i = tweets.length-1; i >=0 ; i--) {
            this.getPost(tweets[i], username);
        }
    }

    getPost(tweet, username) {
        document.getElementById('posts').appendChild(this.createPost(tweet, username));
    }


    editPost (id, post, PostList) {
        let tweet=PostList.get(id);
        if(PostList.edit(id, post) == true) {
            this.getPage(0, 10, PostList, tweet.author);
        }
    }


}
PostList = new PostList([
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

A=new TweetsView();
//console.log(A.showPage(0, 3, PostList));
console.log(A.addPost({
    id: '1',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Moya Muza',
    photoLink: '',
    hashTags: ["#health"],
    likes: []
}, PostList)); //вернет true, пост добавился
console.log(A.addPost({
    id: '1',
    description: 'hello im here',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: ["#health"],
    likes: []
}, PostList));
console.log(A.userProfile("Иванов Иван"));
console.log(A.getPage(0, 10, PostList, "Иванов Иван"));
console.log(A.editPost('2', { description: 'Это измененный пост!'}, PostList ) );
console.log(A.getPage(0, 10, PostList, "Иванов Иван", {author:'Галыго Алена'}));
console.log(A.getPage(0, 10, PostList, "Иванов Иван", {hashTagSearch:["#health"]}));
console.log(A.addAuthors(PostList));
"use strict"
class PostList {
    _posts = [];
    constructor(posts) {
        this._posts = posts;
    }

   static validatePost(post) {
        if (!post) {
            return false;
        }

        if (post.description === "" || typeof post.description !== "string" || post.description.length>200)
            return false;

        if (post.author === "" || typeof post.author !== "string")
            return false;
        if (typeof post.photoLink !== "string") //необязательное поле
            return false;
        if(post.hashTags.length == 0) {
            return true;
        }
        else
            for (let i = 0; i < post.hashTags.length; i++) {
                if (!(post.hashTags[i].substring(0, 1) === '#')) {
                    return false;
                }
            }
        return true;
    }
    authorsName() {
        let name = [];
        this._posts.forEach(function (item) {
            if (!item.isDelete) {
                name.push(item.author);
            }
        });
        let unique = PostList.unique(name);
        return unique;
    }

    get(id) {
        if (typeof id == "string" && id.valueOf() > 0) {
            return this._posts.find((item) => item.id == id);
        }
        return false;
    }
    getPage(skip, top, filterConfig) {
        let result;
        if (!filterConfig) {
            result = this._posts;
        }

        if (filterConfig) {

            if (filterConfig.author) {
                result = this._posts.filter((function (post) {
                        return post.author.toLowerCase().indexOf(filterConfig.author.toLowerCase())+1;
                    }
                ));
            }

            if (filterConfig.dateFrom) {
                result = this._posts.filter(function (post) {
                    return post.createdAt >= filterConfig.dateFrom;
                });
            }
            if (filterConfig.dateTo) {
                result = this._posts.filter(function (post) {
                    return post.createdAt<= filterConfig.dateFrom;
                });
            }
            if (filterConfig.hashTagSearch && filterConfig.hashTagSearch.length!=0) {
                result = this._posts.filter(function (post) {
                    if(typeof post.hashTags!== "undefined") {
                        return filterConfig.hashTagSearch.every(function (tag) {
                            return post.hashTags.includes(tag);
                        });
                    }

                });
            }
        }
        return result.sort((function(a, b) {
                return a.createdAt-b.createdAt}
        )).slice(skip, skip+top);
    }

    add(post) {
        const date = new Date();
        post.id=+date;
        post.createdAt = new Date();
        //как добавить автора вообще?
        //post.author = author;

        if (PostList.validatePost(post)) {
            this._posts.push(post);
            return true;
        }
        return false;
    }


    edit(id, post) {
        let num = this._posts.findIndex(item => item.id === id);

        if (post.description) {
            this._posts[num].description = post.description;
        }
        if (post.photoLink) {
            this._posts[num].photoLink = post.photoLink;
        }
        if (post.hashTags) {
            this._posts[num].hashTags = post.hashTags;
        }
        if (PostList.validatePost(this._posts[num]) === false){
            return false;
        }
        else
            return true;
    }


    remove(id) {

        let tmp = this._posts.slice();
            tmp.splice(tmp.findIndex(item => item.id === id), 1);
            this._posts=tmp.slice();
            return true;

    }

    addAll(mass) {
        let result = [];
        for (let item of this._posts) {
            if (PostList.validatePost(item)) {
                mass.push(item);
            }
            else {
                result.push(item);
            }
        }
        return result;

    }

}
let postsA=[
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
        },
        {
            id: '4',
            description: 'Это четвертый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-02-19T19:21:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '5',
            description: 'Это пятый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, ' +
                'спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-02-21T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: [],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '6',
            description: 'Это шестой пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, ' +
                'спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-02-22T11:15:00'),
            author: 'Иванов Иван',
            photoLink: '',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '7',
            description: 'Это седьмой пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-02-25T12:05:00'),
            author: '',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '8',
            description: 'Это восьмой пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-01T14:47:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '9',
            description: 'Это девятый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-05T22:19:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['ill', 'health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '10',
            description: 'Это десятый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-05T23:28:00'),
            author: 'Литвинко Вика',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '11',
            description: 'Это одиннадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-12T08:14:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '12',
            description: 'Это двенадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-12T10:45:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '13',
            description: 'Это тринадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-13T23:00:00'),
            author: 'Литвинко Вика',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: []
        },
        {
            id: '14',
            description: 'Это четырнадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-15T17:25:00'),
            author: 'Литвинко Вика',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '15',
            description: 'Это пятнадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-17T20:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#health'],
            likes: ['Иванов Иван']
        },
        {
            id: '16',
            description: 'Это шеснадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-18T11:11:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '17',
            description: 'Это семнадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-19T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: [],
            likes: ['Alena_G']
        },
        {
            id: '18',
            description: 'Это восемнадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-19T23:12:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '19',
            description: 'Это девятнадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-21T23:12:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#love'],
            likes: ['Alena_G', 'Иванов Иван']
        },
        {
            id: '20',
            description: 'Это двадцатый пост! Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
            createdAt: new Date('2020-03-25T23:13:00'),
            author: 'Иванов Иван',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: ['#ill', '#health'],
            likes: ['Alena_G', 'Иванов Иван']
        }
    ];
let tweets = new PostList(postsA);
let postsB = [];
console.log(tweets.addAll(postsB));//вернет посты с id 7(нет имени автора) и 9(нет "#" в тегах)
console.log(tweets.get('5'));
console.log(tweets.get('22'));//не найдет пост с таким id, потому что его нет
console.log(tweets.getPage(0, 17));
console.log(tweets.getPage(0,10,{dateFrom :new Date('2020-03-17T23:00:00')}));
console.log(tweets.getPage(1, 5, {author:'Иванов Иван'}));
console.log(tweets.edit('5', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' } ));
console.log(tweets.add({
    id: '1',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: '',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: [],
    likes: []

})); //вернет false, потому что в посте нет имени автора
console.log(tweets.add({
    id: '1',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: ["#health"],
    likes: []

})); //вернет true, пост добавился
console.log(tweets.get('7'));//вернет пост
console.log(tweets.remove('7'));//удаляется пост, вернет true
console.log(tweets.get('7'));//не вернет, потому что удалили
console.log(tweets.get('11'));
console.log(tweets.add({
    id: '7',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: [],
    likes: []

}));
console.log(tweets.getPage(0, 25));
"use strict"
class PostList {

    constructor(posts) {
        this._posts = posts;
    }

   static validatePost(post) {
        if (!post) {
            return false;
        }
        if (post.id === "" || typeof post.id !== "string" || post.id<0) {
            return false;
        }
        if (post.description === "" || typeof post.description !== "string" || post.description.length>200)
            return false;
        if (!(post.createdAt instanceof Date))
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
    get(id) {
        if (typeof id == "string" && id.valueOf() > 0) {
            return this._posts.find((item) => item.id == id);
        }
        return false;
    }
    getPage(skip, top, filterConfig) {

        if (!filterConfig) {
            return this._posts.sort((function(a, b) {
                    let dateA=new Date(a.createdAt), dateB=new Date(b.createdAt)
                    return dateA-dateB}
            )).slice(skip, skip+top);
        }

        if (filterConfig) {

            if (filterConfig.author) {
                return this._posts.filter((function (post) {
                        return post.author === filterConfig.author
                    }
                )).sort((function (a, b) {
                        let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateA - dateB
                    }
                )).slice(skip, skip + top);
            }

            if (filterConfig.dateFrom) {
                return this._posts.filter(function (post) {
                    return post.createdAt.getTime() >= filterConfig.dateFrom.getTime();
                }).sort((function (a, b) {
                        let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateA - dateB
                    }
                )).slice(skip, skip + top);
            }
            if (filterConfig.dateTo) {
                return this._posts.filter(function (post) {
                    return post.createdAt.getTime() <= filterConfig.dateFrom.getTime();
                }).sort((function (a, b) {
                        let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateA - dateB
                    }
                )).slice(skip, skip + top);
            }
            if (filterConfig.hashTagSearch) {
                return this._posts.filter(function (post) {
                    for (let hashTag of post.hashTags) {
                        if (hashTag === filterConfig.hashTagSearch) {
                            return true;
                        }
                    }
                }).sort((function (a, b) {
                        let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateA - dateB
                    }
                )).slice(skip, skip + top);
            }
        }
    }

    add(post) {
        let id = 0;
        for (let item of this._posts) {
            if (parseInt(item.id) > id) {
                id = parseInt(item.id);
            }
        }
        id=id+1;
        post.id = id+"";
        post.createdAt = new Date();
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
        return true;
    }

    remove(id) {


        if (typeof id == "string" && id.valueOf() >= 0) {
           this._posts.splice(this._posts.findIndex(item => item.id === id),1);
            return true;
        }

        return false;
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
let A = new PostList(postsA);
let postsB = [];
console.log(A.addAll(postsB));//вернет посты с id 7(нет имени автора) и 9(нет "#" в тегах)
console.log(A.get('5'));
console.log(A.get('22'));//не найдет пост с таким id, потому что его нет
console.log(A.getPage(0, 17));
console.log(A.getPage(0,10,{dateFrom :new Date('2020-03-17T23:00:00')}));
console.log(A.getPage(1, 5, {author:'Иванов Иван'}));
console.log(A.edit('5', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' } ));
console.log(A.add({
    id: '1',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: '',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: [],
    likes: []

})); //вернет false, потому что в посте нет имени автора
console.log(A.add({
    id: '1',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: ["#health"],
    likes: []

})); //вернет true, пост добавился
console.log(A.get('7'));//вернет пост
console.log(A.remove('7'));//удаляется пост, вернет true
console.log(A.get('7'));//не вернет, потому что удалили
console.log(A.get('11'));
console.log(A.add({
    id: '7',
    description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    hashTags: [],
    likes: []

}));
console.log(A.getPage(0, 25));
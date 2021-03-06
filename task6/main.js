var posts = [ //массив постов
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
        createdAt: new Date('2021-02-19T19:21:00'),
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
        hashTags: ['#ill', '#health', '#love'],
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
        hashTags: ['#ill', '#love', '#health'],
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
    },
];

   function getPost(id) {
       if (typeof id == "string" && id.valueOf() > 0) {
        return posts.find((item) => item.id == id);
    }
    return "неверный ввод";
}
  function validatePost(post) {
      if (!post) {
          return false;
      }
      if (post.description === "" || typeof post.description !== "string" || post.description.length>200)
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

function getPosts(skip, top, filterConfig) {
       let result;
    if (!filterConfig) {
        result = posts;

    }

    if (filterConfig) {

        if (filterConfig.author) {
            result = posts.filter((function (post) {
                    return post.author.toLowerCase().indexOf(filterConfig.author.toLowerCase())+1;
                }
            ));
        }

        if (filterConfig.dateFrom) {
            result = posts.filter(function (post) {
                return post.createdAt >= filterConfig.dateFrom;
            });
        }
        if (filterConfig.dateTo) {
            result = posts.filter(function (post) {
                return post.createdAt.getTime() <= filterConfig.dateFrom.getTime();
            });
        }
        if (filterConfig.hashTagSearch && filterConfig.hashTagSearch.length!=0) {
            result = posts.filter(function (post) {
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

function addPost(post) {
       const date = new Date();
       post.id=+date;
        post.createdAt = new Date();
        if (validatePost(post)) {
            posts.push(post);
            return true;
        }
        return false;
   }


function editPost(id, post) {
    var num = posts.findIndex(item => item.id === id);

    if (post.description) {
        posts[num].description = post.description;
    }
    if (post.photoLink) {
        posts[num].photoLink = post.photoLink;
    }
    if (post.hashTags) {
        posts[num].hashTags = post.hashTags;
    }
    if (validatePost(posts[num]) === false){
        return false;
    }
    else
        return true;
   }


   // getPost('5');

function removePost(id) {
    let tmp = posts.slice();
    tmp.splice(tmp.findIndex(item => item.id === id), 1);
    posts=tmp.slice();
    return true;
}
// console.log(validatePost(posts[5])); //все правильно, выведет true
// console.log(validatePost(posts[8])); //нет знака '#' в тегах, выведет false
// console.log(validatePost(posts[6])); //нет имени автора, выведет false
// console.log(getPost('5'));//вернет пятый пост
// console.log(getPost('22'));//не найдет пост с таким id, потому что его нет
//console.log(getPosts(0, 22));
console.log(getPosts(0,10,{dateFrom :new Date('2020-03-17T23:00:00')}));
console.log(getPosts(1, 5, {author:'Иванов Иван'}));
console.log(getPosts(1, 5, {hashTagSearch: ['#love']}));
//console.log(editPost('5', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' } ));
console.log(editPost('4', { description: "aaaaa" } ));
 console.log(addPost({
      id: '1',
      description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
     createdAt: new Date('2020-03-17T23:00:00'),
      author: '',
      photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
     hashTags: [],
     likes: []

  })); //вернет false, потому что в посте нет имени автора
 console.log(addPost({
     id: '1',
     description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
     createdAt: new Date('2020-03-17T23:00:00'),
     author: 'Иванов Иван',
     photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
     hashTags: ["#health"],
     likes: []
 })); //вернет true, пост добавился
// console.log(getPost('7'));//вернет пост
// console.log(removePost('7'));//вернет удаляемый пост
// console.log(getPost('7'));//не вернет, потому что удалили
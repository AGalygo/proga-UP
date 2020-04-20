package PostWork;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import com.google.gson.Gson;

public class TweetsWork {
    private List<Tweet> TWList;

    public TweetsWork(){
        this.TWList = new ArrayList<Tweet>(Arrays.asList(
                new Tweet(1, "This is first post", "2020-01-17T23:00:00",
                        "Ivanov Ivan",
                        "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                        new ArrayList<String>(Arrays.asList("#ill", "#health")), new ArrayList<String>(Arrays.asList("Alena_G", "Ivanov Ivan"))),
                new Tweet(2, "This is second post", "2020-01-17T23:00:00",
                        "Ivanov Ivan",
                        "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                        new ArrayList<String>(Arrays.asList("#ill", "#health")), new ArrayList<String>(Arrays.asList("Alena_G", "Ivanov Ivan"))),
                new Tweet(3, "This is third post!", "2020-01-17T23:00:00",
                        "Alena_gl",
                        "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                        new ArrayList<String>(Arrays.asList("#ill", "#health")), new ArrayList<String>(Arrays.asList("Alena_G", "Ivanov Ivan"))),
                new Tweet(4, "This is fourth post", "2020-01-17T23:00:00",
                        "Ivanov Ivan",
                        "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                        new ArrayList<String>(Arrays.asList("#ill", "#health")), new ArrayList<String>(Arrays.asList("Alena_G", "Ivanov Ivan"))),
                new Tweet(5, "This is 5 post", "2020-01-17T23:00:00",
                        "Ivanov Ivan",
                        "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                        new ArrayList<String>(Arrays.asList("#ill", "#health")), new ArrayList<String>(Arrays.asList("Alena_G", "Ivanov Ivan"))),
                new Tweet(11, "This is 11 post", "2020-01-17T23:00:00",
                        "Ivanov Ivan",
                        "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                        new ArrayList<String>(Arrays.asList("#ill", "#health")), new ArrayList<String>(Arrays.asList("Alena_G", "Ivanov Ivan")))));



    }

    public List<Tweet> getPage(int skip, int top, Map<String, String> filterConfig) {
        List<Tweet> filteredPosts = new ArrayList<Tweet>();
        for(Map.Entry pair : filterConfig.entrySet()) {
            if (pair.getKey().equals("author")) {
                TWList.stream()
                        .filter(tweet -> tweet.getAuthor().toLowerCase().contains(pair.getValue().toString().toLowerCase()))
                        .forEach(filteredPosts::add);
            }
            else if (pair.getKey().equals("creationDate")) {
                TWList.stream()
                        .filter(tweet -> tweet.getCreatedAt().equals(pair.getValue()))
                        .forEach(filteredPosts::add);
            }
        }
        if(filterConfig.size() == 0) {
            filteredPosts = new ArrayList<Tweet>(TWList);
        }
        if(top > filteredPosts.size()) {
            top = filteredPosts.size();
        }
        if (skip >= filteredPosts.size()) {
            skip = 0;
        }
        if (skip + top > filteredPosts.size()) {
            return filteredPosts.subList(skip, filteredPosts.size());
        } else {
            return filteredPosts.subList(skip, skip + top);
        }

    }

    public Tweet getPost(int id) {
        for (Tweet tweet: TWList) {
            if (tweet.getId() == id) {
                return tweet;
            }
        }
        return null;
    }

    public boolean validatePost(Tweet tweet) {
        for(Tweet post : TWList) {
            if (post.getId() == tweet.getId()) {
                return false;
            }
        }
        if(tweet.getDescription() == null || tweet.getDescription().length() > 200)
            return false;
        if(tweet.getAuthor() == null)
            return false;

        if(tweet.getCreatedAt() == null )
            return false;

        return true;
    }

    public boolean addPost(Tweet tweet) {
        if(validatePost(tweet)) {
            TWList.add(tweet);
            return true;
       }
        else
            return false;
    }

    public boolean editPost(int id, Tweet filterConfig) {
        Tweet tweet = getPost(id);
        if(tweet == null) {
            return false;
        }
        if (filterConfig.getDescription() != null && filterConfig.getDescription().length() <= 200) {
            tweet.setDescription(filterConfig.getDescription());
        }
        if (filterConfig.getHashTags() != null) {
            tweet.setHashTags(filterConfig.getHashTags());
        }
        return true;
    }

    public boolean removePost(int id) {
        Tweet tweet = getPost(id);
        if(tweet != null) {
            TWList.remove(tweet);
            return true;
        }else {
            return false;
        }
    }

    public String toJsonString(List<Tweet> list)
    {
        if(list.size() > 0) {
            Gson gson = new Gson();
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Tweet post : list) {
                sb.append(gson.toJson(post)).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }
}

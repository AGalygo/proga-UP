package PostWork;

import org.json.simple.JSONObject;

import java.util.List;

public class Tweet {
    private int id;
    private String description;
    private String createdAt;
    private String author;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;


    public Tweet(int id, String description, String Date, String author, String photoLink, List<String> hashTags,
                 List<String> likes) {
        this.id = id;
        this.description = description;
        this.createdAt = Date;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.likes = likes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }


    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }


    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public String printPost() {
        String str = "id " + getId() + "description " + getDescription();
        return str;
    }

    @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("description", description);
        json.put("author", author);
        json.put("photoLink", photoLink);
        json.put("Date", createdAt);
        json.put("likes", likes.toString());
        json.put("hashTags", hashTags.toString());
        return json.toString();
    }
}

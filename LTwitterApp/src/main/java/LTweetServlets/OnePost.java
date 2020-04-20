package LTweetServlets;

import PostWork.Tweet;
import PostWork.TweetsWork;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class OnePost extends HttpServlet {
    private TweetsWork posts = new TweetsWork();
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // response.getOutputStream().println("yes, it works");
        String str = request.getQueryString();
        String sID=str.substring(3,str.length());
        int id = Integer.parseInt(sID);
        response.getOutputStream().println("it Works id= " + id);
        if (posts.removePost(id)) {
            response.getOutputStream().println("deleted\n");
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
       // response.getOutputStream().println("yes, it works");
        String str = request.getQueryString();
        String sID=str.substring(3,str.length());
        int id = Integer.parseInt(sID);
        Tweet tweet = posts.getPost(id);

        if (tweet != null) {
            response.getOutputStream().println(tweet.toString());
           // response.getOutputStream().println(str1);
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }
    @Override
    protected void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException{
        int id = Integer.parseInt(request.getParameter("id"));
        //Date sID = new Date();
        //int id=+sID;
        String description = request.getParameter("description");
        String author = request.getParameter("author");
        String photoLink = request.getParameter("photoLink");
        Date date = new Date();
        String createdAt=date.toString();
        //добавить хештеги

        Tweet tweet = new Tweet(id, description, createdAt, author,  photoLink, new ArrayList<>(), new ArrayList<>());

        response.getOutputStream().println(tweet.toString());
        if (posts.addPost(tweet)) {
            response.getOutputStream().println("Success\n");
        } else {
            response.getOutputStream().println("Invalid\n");
        }
    }

}

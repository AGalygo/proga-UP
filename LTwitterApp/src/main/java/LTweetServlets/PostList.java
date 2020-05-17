package LTweetServlets;

import PostWork.Tweet;
import PostWork.TweetsService;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostList extends HttpServlet {

    private TweetsService posts = TweetsService.getInstance();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int top, skip;
        if (request.getParameter("skip") != null) {
            skip = Integer.parseInt(request.getParameter("skip"));
        } else {
            skip = 0;
        }
        if (request.getParameter("top") != null) {
            top = Integer.parseInt(request.getParameter("top"));
        } else {
            top = 0;
        }
        String author = request.getParameter("author");
        String createdAt = request.getParameter("createdAt");
        //response.getOutputStream().println("author= "+author);
        Map<String, String> filterConfig = new HashMap<>();
        if (author != null) {
            filterConfig.put("author", author);
            response.getOutputStream().println("yes we have author" + skip + top);
        }
        if (createdAt != null) {
            filterConfig.put("createdAt", createdAt);
        }
        //поиск по хештегам
        List<Tweet> res = new ArrayList<>(posts.getPage(skip, top, filterConfig));
        if (res.size() == 0) {
            response.getOutputStream().println("Not found");
        } else {
            response.getOutputStream().println(posts.toJsonString(res));
        }
    }
}

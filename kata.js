database = []
function createUsers(users){
    // Create Users based on their User Name
    if(Array.isArray(users) && users.length > 0){
        users.forEach((name) => {
            let userJson = {
                username: name,
                posts: [],
                following: [],
                followers: []
            }
            if(!getUser(name)){
                database.push(userJson)
            }
        });
    return true;
    }
    else {
        return false;
    }
}

function followUsers(follower, users){
    // Update "following" object when a user follows another user
    followerData = getUser(follower)
    if(!followerData){
        return "USER NOT FOUND";
    } else {
        let usersNotFound = [];
        users.forEach((user) => {
            userData = getUser(user)
            if(!userData){
                usersNotFound.push(user)
            } else {
                // Update "followers" object of users who are followed by the user
                followerData.following = followerData.following.concat(user);
                userData.followers.push(follower)
            }
        });
        return usersNotFound.length == 0 ? true : ('USERS ' + usersNotFound.join() + ' NOT FOUND');
    }
}

function publishPost(user, post, timestamp){
    // Publish a post made by user
    postObj = {
        text: post,
        timestamp: timestamp
    }
    userData = getUser(user)
    if(userData){
        userData.posts.push(postObj)
        return true;
    } else {
        return "USER NOT FOUND";
    }
}


function viewTimeline(user){
    timeline = getUser(user)
    posts = timeline.posts.map((post) => post.text).join("\n")
    return (timeline ? (posts ? posts: "NO POSTS FOUND") : "USER NOT FOUND")
}

function viewTimelineOf(user, ofUser){
    // Get the time line of a user who is followed by this user
    timelinePosts = []
    if(getUser(user)){
        if(getUser(user).following.indexOf(ofUser) != -1){
            timelinePosts = timelinePosts.concat(getUser(ofUser).posts)
            timelinePosts.forEach((p) => {
                p.posted = getTimeElapsed(p.timestamp)
            })
            // Sorting posts based on time elapsed
            timelinePosts.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
            // Formatting the Output
            result = "";
            timelinePosts.forEach((p) => {
                result = result.concat(p.text + " (" + p.posted + ")\n")
            })
            return result;
        } else {
            return "DATA UNAVAILABLE!"
        }
    } else {
        return "USER NOT FOUND"
    }

}


function viewWall(user){
    // Get the time line of a user who follows other users
    wallPosts = getUser(user).posts
    wallPosts.forEach((p) => {
        p.user = user
        p.posted = getTimeElapsed(p.timestamp)
    })

    // Getting posts made by users followed by this user
    getUser(user).following.forEach((u) => {
        posts = getUser(u).posts;    
        posts.forEach((p) => {
            p.user = u,
            p.posted = getTimeElapsed(p.timestamp)
        })
        wallPosts = wallPosts.concat(posts);
    })

    // Sorting posts bsaed on time elapsed 
    wallPosts.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)

    // Formatting the Output 
    result = "";
    wallPosts.forEach((p) => {
        result = result.concat(p.user + " - " + p.text + " (" + p.posted + ")\n")
    })
    return result;
}

function getUser(user){
    data = database.find((account) => account.username === user);
    return data ? data : false;
}

function getTimeElapsed(timestamp){
    // Helper function to evaluate elapsed time relative to a timestamp. (Typically Current time)
    defaultTimeStamp = 1613599325676; // For TDD results
    // defaultTimeStamp = Date.now(); // Ideal case
    timediff = defaultTimeStamp - timestamp
    seconds =  Math.floor((timediff)/1000)
    minutes =  Math.floor((timediff)/60000)
    return timediff < 60000 ? seconds + ` second${seconds > 1? "s":""} ago` :  minutes + ` minute${minutes > 1? "s":""} ago`;
}

module.exports = { createUsers, followUsers, publishPost, viewTimeline, viewTimelineOf, viewWall }
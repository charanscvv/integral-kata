# Solution to Coding Exercise - kata !
#### Author: `Sri Charan Simha Velpur - velpur.charan@gmail.com`
- Hi! I have gone through the TDD given and tried to satisfy all the test cases by implementing core algorithm for the given use-case.
 - **JavaScript** and **Java** are my core skills and I chose JavaScript for this implementation. 


# How to Run

I like to keep things simple. So, created a basic **NodeJS** application to run my code and tests. I've written code with Vanilla JavaScript with just **jest** as a dependency. All you need is latest **npm** installed with **jest** as a sweet testing dependency.

## Commands to Run

> Open `cmd` and `cd` into the project source folder. 
> Run `npm install`
> Run `npm test` 

## Implementation

Here, we are looking into a typical social-networking POC where users view the published content of each other. 
I have developed code with performs below tasks
- Create Users
- **Follow** Users
- **Publish** Posts 
- View **Timeline**
- View Timeline of other Users
- View user's Wall

>### Create Users
|  `createUsers`              |INPUT|OUTPUT|
|----------------|-------------------------------|-----------------------------|
|Type|`list of users`            |`Boolean`           |
|Example|`["Alice","Bob","Charlie"]`            |`true`          |

> ### Follow Users
|  `followUsers`              |INPUT|OUTPUT|
|----------------|-------------------------------|-----------------------------|
|Type|`follower`,`list of users`            |       |
|Example|`Charlie`,`["Alice","Bob"]`            |`true`          |
|Example|`Bob`,`["Alice","Danny"]`            |`USER Danny NOT FOUND`          |

>### Publish Posts
|  `publishPost`              |INPUT|OUTPUT|
|----------------|-------------------------------|-----------------------------|
|Type|`user` `post` `timestamp`            |           |
|Example|`"Alice"` `"I love the weather today."` `1613599025676`            |`true`          |
|Example|`"Danny"` `"I am not a registered user."` `1613599025676`            |`"USER NOT FOUND"`          |


>### View Timeline
|  `viewTimeline`              |INPUT|OUTPUT|
|----------------|-------------------------------|-----------------------------|
|Type|`user`             |           |
|Example|`"Alice"`            |`"I love the weather today."`          |
|Example|`"Danny"`           |`"USER NOT FOUND"`          |

>### View Timeline of other Users
|  `viewTimelineOf`              |INPUT|OUTPUT|
|----------------|-------------------------------|-----------------------------|
|Type|`user` , `ofUser`            |           |
|Example|`"Alice"`, `"Bob"`           |`"Good game though. (1 minute ago) "`,<br/>`"Darn! We lost! (2 minute ago)"`  |

>### View User's Wall
|  `viewWall`              |INPUT|OUTPUT|
|----------------|-------------------------------|-----------------------------|
|Type|`user`             |           |
|Example|`"Charlie"`,            |`"Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago) "`,<br/>`"Bob - Good game though. (1 minute ago)"` ,<br/>`"Bob - Darn! We lost! (2 minute ago)"`  ,<br/>`"Alice - I love the weather today (5 minutes ago)"`  

## Testing
The core algorithm is developed nd tested with the given TDD below
**Corrections** at  `Bob - Darn! We lost! (2 minutes ago)` for `2 minute` and `Damn!` 
```
Feature: Publishing
   Scenario: Alice publishes messages to her personal timeline.   
      Given Alice has published "I love the weather today."
      When Alice views her timeline
      Then Alice sees:
         "I love the weather today."
      
Feature: Timeline
   Scenario: Alice views Bob's timeline.
      Given Bob has published "Darn! We lost!"
      And Bob has published "Good game though."
      When Alice views Bob's timeline
      Then Alice sees:
         Good game though. (1 minute ago)
         Darn! We lost! (2 minutes ago)
      
Feature: Following
   Scenario: Charlie can follow Alice and Bob, and he views an aggregated list of all timelines.
      Given Alice has published "I love the weather today."
      And Bob has published "Darn! We lost!"
      And Bob has published "Good game though."
      And Charlie has published "I'm in New York today! Anyone wants to have a coffee?"
      When Charlie follows Alice
      And Charlie follows Bob
      And Charlie views his wall
      Then Charlie sees:
         Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago)     
         Bob - Good game though. (1 minute ago)     
         Bob - Darn! We lost! (2 minutes ago)     
         Alice - I love the weather today (5 minutes ago) 
```

## Summary
- Implementation of all the features required to satisfy the TDD are developed and tested.
- Additional functionality to check for user existence is implemented.
- Followers and Following functionality is implemented mocking typical social networks. 
- Assumption of timestamp is taken and hardcoded to produce results that match the TDD, can be made more dynamic in real-time. 
- Access Control technique is implemented which allows user to only view content of followed users.  

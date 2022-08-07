Agenda overview:

JavaScript fundamentals

Problem Statement Discussion
Data Flow between screens
Maintaining a submission session
Using a submission session token to record answers to all the question
API Design
Routes
Params
Body
Submission Schema
_id
Nickname
createdAt
Questions:
“StruggleTime”: “Less than 2 weeks” | “2 to 8 weeks” | “More than 8 weeks”
BedTime: Timestamp
WakeUpTime: Timestamp
SleepHours: Number(number of hours)
API Implementation:
Approach 1: Accepts all the data combinedly
POST /new:
Body: Accepts a nickname, and answers to all the questions
Returns:
{

  nickname: 'Vikash',

  struggleTime: '2 weeks',

  bedTime: 2022-08-05T17:04:52.630Z,

  wakeUpTime: 2022-08-05T17:05:13.697Z,

  sleepHours: 8

}

Response Template
Copy this template from below, paste it into a public Google doc and share the URL of the Google doc in the main form

leetCode Challenge : 

Question : https://leetcode.com/problems/validate-binary-search-tree/


Solution : https://leetcode.com/problems/validate-binary-search-tree/submissions/

var isValidBST = function(root) {
    let output = true;
    const loop = (tree, min, max) => {
        if ((tree?.val > min || min === undefined) && (tree?.val < max || max === undefined)) {
            if (tree?.left) {
                loop(tree.left, min, tree.val);    
            }
            if (tree?.right) {
                loop(tree.right, tree.val, max);    
            }
        } else {
            output = false;
        }
    }
    
    loop(root);
    
    return output;
};

output:
Your input
[2,1,3]
Output
true
Expected
true
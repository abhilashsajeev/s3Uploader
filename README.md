	# s3Uploader
Training application in node using mongodb and fake s3

## Github guidelines

Make a branch in the developers name in this master repo your project will be saved to that branch

* Create a **fork** of this repo in your own Github account
* Take a clone from your forked repo
```bash
git clone https://github.com/<yourName>/s3Uploader.git
```
* Checkout to the branch with your name
```bash
git checkout <yourName>
```
* Set upstream to this main repo. You will be sending pull requests to this repo for code review
```bash
git remote add upstream https://github.com/abhilashsajeev/s3Uploader.git
```
now both an origin and upstream will be set to your system
* Always checkout a new branch for each feature you add the format of naming the branch should be feature/<featureName> or if you are doing any bug fix name should be bug/<bugname> or <Trello or PT id>
* commit changes to your local branch
* Before pushing to origin rebase with the upstream branch
** This is very important**

```bash
git fetch upstream

git rebase upstream/<yourNamedBranch>
```
* There should be only one commit per branch before you send pull request. If you have muliple commits squash them before you send pull request

```
git rebase -i HEAD~2
```
Then squash commits then edit commit messages.

use **git log** command to verify only one commit is There

* Always push to your origin that is your forked version of the repo. **Do not commit to the main ie upstream directly** All commits to the main repo should be through pull request followed by peer review.
git push origin feature/<featureName>

* Rise pull request and mention the mentors using @ symbol

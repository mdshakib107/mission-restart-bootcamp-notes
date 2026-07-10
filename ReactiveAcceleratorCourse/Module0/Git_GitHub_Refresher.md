# Git ও GitHub: Beginner থেকে Practical Collaboration — বিস্তারিত বাংলা Study Notes

## Overview

Git ও GitHub modern software development-এর মৌলিক tools। Git একটি **distributed version control system**—এটি file ও source code-এর পরিবর্তনের history সংরক্ষণ করে, নির্দিষ্ট version-এ ফিরে যেতে সাহায্য করে এবং একই project-এ একাধিক developer-এর কাজকে সংগঠিত করে। GitHub একটি cloud-based platform, যেখানে Git repository remoteভাবে রাখা, share করা, review করা এবং collaborate করা যায়।

এই lesson-এ local Git workflow থেকে শুরু করে GitHub repository তৈরি, branch ও merge, merge conflict, stash, `.gitignore`, remote repository, push, pull request, fork, clone, HTTPS/SSH authentication এবং multiple GitHub account ব্যবস্থাপনা পর্যন্ত শেখানো হয়েছে। Transcript-এর command spelling ও কিছু technical statement পরিষ্কার ও সংশোধিত form-এ উপস্থাপন করা হয়েছে।

> **গুরুত্বপূর্ণ সংশোধন:** Transcript-এ কয়েক জায়গায় `git reset --hard`-কে “revert” বলা হয়েছে। বাস্তবে `reset` history pointer সরায়; `git revert` আলাদা command, যা পুরোনো commit বাতিল করতে নতুন commit তৈরি করে। বিস্তারিত warning section-এ আছে।

---

## Prerequisites

- File ও folder সম্পর্কে basic ধারণা
- Terminal/command line-এর basic usage
- Windows, macOS বা Linux-এর সাধারণ ব্যবহার
- একটি text editor, যেমন VS Code, Notepad++ বা Vim
- Git installed থাকা
- GitHub অংশ practice করার জন্য একটি GitHub account

---

## Table of Contents

1. [Main Concepts](#main-concepts)
2. [Git ও Version Control](#1-git-ও-version-control)
3. [Working Directory, Staging Area ও Repository](#2-working-directory-staging-area-ও-repository)
4. [Git Installation ও Configuration](#3-git-installation-ও-configuration)
5. [Repository Initialize ও Status দেখা](#4-repository-initialize-ও-status-দেখা)
6. [File Stage ও Commit করা](#5-file-stage-ও-commit-করা)
7. [Commit History, HEAD, Reset ও Reflog](#6-commit-history-head-reset-ও-reflog)
8. [Tracked File Remove করা](#7-tracked-file-remove-করা)
9. [Branch তৈরি, Switch, Merge, Rename ও Delete](#8-branch-তৈরি-switch-merge-rename-ও-delete)
10. [Merge Conflict](#9-merge-conflict)
11. [Git Stash](#10-git-stash)
12. [`.gitignore`](#11-gitignore)
13. [GitHub ও Remote Repository](#12-github-ও-remote-repository)
14. [Local Repository GitHub-এ Push](#13-local-repository-github-এ-push)
15. [Pull Request](#14-pull-request)
16. [Fork](#15-fork)
17. [Clone ও HTTPS Authentication](#16-clone-ও-https-authentication)
18. [SSH Authentication](#17-ssh-authentication)
19. [Multiple GitHub Accounts](#18-multiple-github-accounts)
20. [Important Commands Summary Table](#important-commands-summary-table)
21. [Git Workflow Summary](#git-workflow-summary)
22. [Common Errors ও Troubleshooting](#common-errors-ও-troubleshooting)
23. [Dangerous Commands ও Warnings](#dangerous-commands-ও-warnings)
24. [Practical Assignments](#practical-assignments)
25. [Quick Revision](#quick-revision)
26. [Interview/Exam Questions](#interviewexam-questions-with-short-answers)
27. [Key Takeaways](#key-takeaways)

---

## Main Concepts

- Git ও version control
- Working directory
- Local repository ও `.git` directory
- Staging area/index
- Tracked, untracked ও modified file
- Commit ও meaningful commit message
- Commit history, commit ID ও `HEAD`
- `git log`, `git reflog`, `git reset`
- Branch, switch, merge ও fast-forward merge
- Merge conflict resolution
- Stash
- `.gitignore`
- GitHub ও remote repository
- `origin`, push ও upstream tracking
- Pull request
- Fork ও clone
- HTTPS ও SSH authentication
- Multiple GitHub account configuration

---

# Detailed Explanation

## 1. Git ও Version Control

### Concept কী?

Git একটি distributed version control system। এটি project-এর file পরিবর্তনের snapshot বা commit history সংরক্ষণ করে। প্রতিটি meaningful অবস্থাকে commit হিসেবে record করা যায়।

### কেন দরকার?

- ভুল change করলে আগের অবস্থায় ফেরা
- কে, কখন, কী change করেছে জানা
- একই project-এ team collaboration
- feature development আলাদা branch-এ করা
- code history ও experiment নিরাপদ রাখা

### কীভাবে কাজ করে?

```text
File পরিবর্তন
    ↓
Git change শনাক্ত করে
    ↓
Selected change staging area-তে যায়
    ↓
Commit করলে local history-তে snapshot তৈরি হয়
    ↓
Push করলে remote repository-তে যায়
```

### Practical example

ধরা যাক `README.md`-এ প্রথমে project title লিখলেন, পরে installation guide যোগ করলেন। Git ব্যবহার করলে এই দুটি state আলাদা commit হিসেবে থাকবে। Installation guide ভুল হলে আগের commit inspect বা restore করা যাবে।

### Common mistakes

- Git এবং GitHub-কে একই জিনিস মনে করা
- প্রতিটি save-কে commit ভাবা
- commit না করে Git history তৈরি হয়েছে ধরে নেওয়া

### Best practices

- ছোট ও logical change commit করুন
- clear commit message লিখুন
- sensitive file কখনো commit করবেন না
- destructive command চালানোর আগে status ও log দেখুন

### মনে রাখার নিয়ম

> Git history রাখে; GitHub সেই history remote-এ host ও share করে।

---

## 2. Working Directory, Staging Area ও Repository

### Working Directory

যে project folder-এর file সরাসরি edit করছেন সেটিই working directory বা working tree।

### Staging Area

পরবর্তী commit-এ কোন change যাবে তার selection area। `git add` change-কে staging area-তে নেয়। একে index-ও বলা হয়।

### Local Repository

`.git` directory-এর মধ্যে commit history, branch reference, configuration ও internal metadata সংরক্ষিত থাকে। `git init` চালালে এটি তৈরি হয়।

### Remote Repository

GitHub-এর মতো server-এ থাকা repository। Team memberরা network-এর মাধ্যমে push, fetch, pull বা clone করতে পারে।

```text
Working Directory
      │ git add
      ▼
Staging Area
      │ git commit
      ▼
Local Repository
      │ git push
      ▼
Remote Repository
```

### গুরুত্বপূর্ণ clarification

Transcript-এ একটি local repository দিয়ে “তিনটি working directory track” করার মতো analogy আছে। সাধারণ beginner workflow-তে একটি `.git` repository তার root directory এবং তার subdirectories-এর file track করে। আলাদা unrelated folder একই repository-এর অংশ নয়, যদি না বিশেষ worktree/submodule arrangement ব্যবহার করা হয়।

> এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।

---

## 3. Git Installation ও Configuration

### Installation

Official Git website থেকে operating system অনুযায়ী installer ব্যবহার করা যায়। Windows-এ Git Bash, Git Credential Manager, default branch name ও line-ending configuration পাওয়া যায়।

### Line ending: LF বনাম CRLF

- Linux/macOS: সাধারণত `LF` (`\n`)
- Windows: সাধারণত `CRLF` (`\r\n`)

Windows-এর common configuration:

```bash
git config --global core.autocrlf true
```

এতে checkout-এর সময় LF → CRLF এবং commit-এর সময় CRLF → LF conversion হতে পারে। তবে team project-এ `.gitattributes` ব্যবহার করা আরও predictable।

### Configuration list দেখা

```bash
git config --list
```

**কাজ:** active Git configuration দেখায়।

**Expected output example:**

```text
user.name=Rahim Ahmed
user.email=rahim@example.com
core.autocrlf=true
init.defaultbranch=main
```

### User name ও email set করা

```bash
git config --global user.name "Rahim Ahmed"
git config --global user.email "rahim@example.com"
```

**Syntax breakdown:**

- `git config`: configuration command
- `--global`: current user-এর সব repository-তে প্রয়োগ
- `user.name`: commit author name
- `user.email`: commit author email

### Verify করা

```bash
git config --global user.name
git config --global user.email
```

### Common mistakes

- GitHub username-কে `user.name`-এ বাধ্যতামূলক মনে করা
- quotation ছাড়া space-সহ full name লেখা
- personal project-এ office email ব্যবহার করা

### Best practice

Global identity-এর পাশাপাশি প্রয়োজন হলে repository-specific identity ব্যবহার করুন:

```bash
git config user.name "Work Name"
git config user.email "work@example.com"
```

এখানে `--global` নেই, তাই current repository-তেই প্রয়োগ হবে।

---

## 4. Repository Initialize ও Status দেখা

### `git init`

```bash
git init
```

**কাজ:** current directory-কে Git repository বানায় এবং hidden `.git` folder তৈরি করে।

**Expected output:**

```text
Initialized empty Git repository in .../.git/
```

### Hidden file দেখা

Git Bash/Linux/macOS:

```bash
ls -a
```

Windows PowerShell:

```powershell
Get-ChildItem -Force
```

### `git status`

```bash
git status
```

**কাজ:** current branch, staged, unstaged ও untracked file দেখায়।

Repository initialize করার আগে output হতে পারে:

```text
fatal: not a git repository (or any of the parent directories): .git
```

Initialize করার পর untracked file থাকলে:

```text
On branch main
No commits yet
Untracked files:
  README.md
```

### Status categories

| অবস্থা | অর্থ |
|---|---|
| Untracked | Git file-টি এখনও track করছে না |
| Tracked | file আগে add/commit হয়েছে |
| Modified | tracked file change হয়েছে |
| Staged | next commit-এর জন্য selected |
| Clean | commit করার মতো pending change নেই |

### Best practice

প্রায় প্রতিটি গুরুত্বপূর্ণ command-এর আগে ও পরে `git status` দেখুন।

---

## 5. File Stage ও Commit করা

### Specific file stage

```bash
git add README.md
```

### Current directory-এর সব change stage

```bash
git add .
```

### Repository-এর সব change stage

```bash
git add --all
```

`git add .` current path থেকে নিচের changes stage করে। Repository root-এ চালালে সাধারণত সব change stage হয়। `git add --all` repository-wide additions, modifications ও deletions stage করে।

### Commit

```bash
git commit -m "Add initial README"
```

**কাজ:** staging area-এর snapshot local repository history-তে save করে।

**Expected output example:**

```text
[main a1b2c3d] Add initial README
 1 file changed, 5 insertions(+)
 create mode 100644 README.md
```

### Meaningful commit message

ভালো message:

```text
Add installation instructions to README
Fix login form validation
Remove unused help file
```

দুর্বল message:

```text
fix
update
changes
final final
```

### Atomic commit

একটি commit-এ একটি logical কাজ রাখুন। README update এবং unrelated file creation একই commit-এ রাখলে পরে শুধু একটি change undo করা কঠিন হতে পারে—transcript-এর example এই বিষয়টি দেখায়।

### Suggested message style

Imperative form:

```text
Add user authentication
Update README usage section
Fix branch switching error
```

### Common mistakes

- `git add` না করে commit করা
- unrelated changes এক commit-এ রাখা
- secret/API key commit করা
- message অস্পষ্ট রাখা

---

## 6. Commit History, HEAD, Reset ও Reflog

### `git log`

```bash
git log
```

Commit ID, author, date ও message দেখায়।

### Compact history

```bash
git log --oneline
```

Example:

```text
8fa21d1 Add help file
39ce182 Add initial README
```

### `HEAD` কী?

`HEAD` current checked-out commit/branch-এর symbolic pointer। সাধারণত current branch-এর latest commit-এ থাকে।

```text
main: A ── B ── C
               ↑
             HEAD
```

### `git reset --hard <commit>`

```bash
git reset --hard 39ce182
```

**কাজ:** current branch ও `HEAD`-কে target commit-এ সরায়; staging area ও working directory target commit-এর মতো করে।

**Warning:** uncommitted changes মুছে যেতে পারে এবং later commits branch history থেকে অদৃশ্য হতে পারে। Shared branch-এ এটি অত্যন্ত ঝুঁকিপূর্ণ।

### `git reflog`

```bash
git reflog
```

Local repository-তে `HEAD` কোথায় কোথায় ছিল তার reference log দেখায়। ভুল reset-এর পরে হারানো commit ID খুঁজতে কাজে লাগে।

Example:

```text
8fa21d1 HEAD@{0}: reset: moving to 8fa21d1
39ce182 HEAD@{1}: reset: moving to 39ce182
8fa21d1 HEAD@{2}: commit: Add help file
```

### Lost commit recover

```bash
git reflog
git reset --hard <recovered-commit-id>
```

আরও নিরাপদ recovery:

```bash
git branch recovery <recovered-commit-id>
```

এতে recovered commit-এ নতুন branch তৈরি হয়; current work না সরিয়েও commit বাঁচানো যায়।

### `reset` বনাম `revert`

| বিষয় | `git reset` | `git revert` |
|---|---|---|
| History | branch pointer সরায়/পুনর্লিখতে পারে | নতুন inverse commit তৈরি করে |
| Shared branch | ঝুঁকিপূর্ণ | সাধারণত নিরাপদ |
| Uncommitted work | `--hard` হলে হারাতে পারে | সাধারণত untouched |
| Use case | local cleanup/recovery | published commit undo |

Published commit বাতিল করতে:

```bash
git revert <commit-id>
```

---

## 7. Tracked File Remove করা

### File delete ও stage করা

```bash
git rm help.md
```

**কাজ:** working directory থেকে file delete করে এবং deletion stage করে। এরপর commit করতে হবে।

```bash
git commit -m "Remove obsolete help file"
```

### শুধু tracking বন্ধ, local file রাখা

```bash
git rm --cached config.local
```

Folder-এর জন্য:

```bash
git rm -r --cached node_modules
```

তারপর `.gitignore`-এ add ও commit করুন।

### Common mistakes

- `git rm` চালিয়ে file permanently হারানো
- `--cached` ছাড়া local-only file remove করা
- deletion commit না করা

---

## 8. Branch তৈরি, Switch, Merge, Rename ও Delete

### Branch list

```bash
git branch --list
```

Short form:

```bash
git branch
```

`*` current branch নির্দেশ করে।

### Branch create

```bash
git branch feature/add-readme-text
```

### Branch switch

```bash
git switch feature/add-readme-text
```

### Create ও switch একসঙ্গে

```bash
git switch -c feature/add-readme-text
```

Older equivalent:

```bash
git checkout -b feature/add-readme-text
```

### Branch naming convention

```text
feature/user-login
fix/navbar-overflow
docs/update-readme
refactor/api-client
```

### Merge

যে branch-এ change আনতে চান, আগে সেই branch-এ যান:

```bash
git switch main
git merge feature/add-readme-text
```

### Fast-forward merge

যদি main branch feature branch তৈরির পর আর এগোয়নি, Git main pointer-কে feature-এর tip-এ সরিয়ে দেয়। Extra merge commit প্রয়োজন হয় না।

```text
Before:
A──B  main
   └──C──D  feature

After fast-forward:
A──B──C──D  main, feature
```

### Branch rename

Current branch rename:

```bash
git branch -m feature/better-name
```

Specific branch rename:

```bash
git branch -m old-name new-name
```

### Safe delete

```bash
git branch -d feature/add-readme-text
```

Merged না হলে Git সাধারণত delete করতে বাধা দেয়।

### Force delete

```bash
git branch -D feature/add-readme-text
```

**Warning:** unmerged commit হারানোর ঝুঁকি।

---

## 9. Merge Conflict

### Conflict কেন হয়?

দুটি branch একই file-এর একই বা overlapping line আলাদাভাবে modify করলে Git কোন version রাখবে তা নিজে সিদ্ধান্ত নিতে পারে না।

### Conflict তৈরি হওয়ার flow

```text
main:    "Created for demo"
branch1: "Created for demos"
branch2: "Created for practice"
```

Branch merge করলে conflict marker দেখা যায়:

```text
<<<<<<< HEAD
Created for practice
=======
Created for demos
>>>>>>> feature/add-heading-text
```

### Marker-এর অর্থ

- `<<<<<<< HEAD` থেকে `=======`: current branch-এর content
- `=======` থেকে `>>>>>>> branch`: incoming branch-এর content

### Resolve করার ধাপ

1. Conflicted file খুলুন।
2. কোন content রাখবেন সিদ্ধান্ত নিন।
3. Conflict marker delete করুন।
4. Final valid content save করুন।
5. File stage করুন।
6. Merge commit complete করুন।

```bash
git status
git add README.md
git commit
```

Git prefilled merge message দিতে পারে। চাইলে save করে editor বন্ধ করুন।

### Merge abort

Resolution শুরু না করে আগের অবস্থায় ফিরে যেতে:

```bash
git merge --abort
```

### Best practices

- merge-এর আগে latest main branch নিন
- ছোট branch ও ছোট commit রাখুন
- conflict blindly accept করবেন না
- application test করুন
- conflict markers repository-তে commit হয়েছে কি না search করুন

---

## 10. Git Stash

### Concept কী?

Incomplete, uncommitted change সাময়িকভাবে সরিয়ে clean working directory তৈরি করে। জরুরি অন্য branch-এ যেতে কাজে লাগে।

### Stash create

```bash
git stash
```

Better message:

```bash
git stash push -m "WIP: update README greeting"
```

### Stash list

```bash
git stash list
```

Example:

```text
stash@{0}: On main: WIP: update README greeting
```

### Stash content দেখুন

```bash
git stash show -p stash@{0}
```

### Latest stash apply ও remove

```bash
git stash pop
```

### Specific stash apply, কিন্তু list-এ রাখা

```bash
git stash apply stash@{1}
```

### Stash delete

```bash
git stash drop stash@{0}
```

### Important nuance

Default `git stash` untracked file অন্তর্ভুক্ত করে না। Untracked file-সহ stash:

```bash
git stash -u
```

### Common mistakes

- stash-কে permanent backup ভাবা
- অনেক stash রেখে context ভুলে যাওয়া
- `pop` conflict হলে stash apply হয়েছে কি না যাচাই না করা

---

## 11. `.gitignore`

### Concept কী?

`.gitignore` pattern অনুযায়ী untracked file/folder-কে Git status ও staging থেকে বাদ দেয়।

### Common example

```gitignore
node_modules/
.env
*.log
dist/
.DS_Store
```

### Create

```bash
touch .gitignore
```

Windows PowerShell:

```powershell
New-Item .gitignore -ItemType File
```

### Important rule

`.gitignore` শুধু untracked file ignore করে। আগে commit করা file `.gitignore`-এ add করলেও Git track করা বন্ধ করবে না।

### Already tracked file ignore করা

```bash
git rm --cached abcd.md
```

Folder:

```bash
git rm -r --cached node_modules
```

তারপর:

```bash
git add .gitignore
git commit -m "Stop tracking local files and update gitignore"
```

### Ignore rule পরীক্ষা

```bash
git check-ignore -v node_modules/package.json
```

### Common mistakes

- `.env` commit করে পরে শুধু `.gitignore`-এ add করা
- `.gitignore` file নিজে commit না করা
- path pattern ভুল লেখা
- generated folder Git-এ রাখা

### Security warning

Secret একবার remote-এ push হলে শুধু file delete করলেই নিরাপদ নয়; secret rotate করতে হবে এবং প্রয়োজনে history rewrite করতে হবে।

---

## 12. GitHub ও Remote Repository

### GitHub কী?

Git repository host করার cloud platform। Repository sharing, collaboration, issue, pull request, review এবং access control দেয়।

### Git বনাম GitHub

| বিষয় | Git | GitHub |
|---|---|---|
| ধরন | Version control system | Cloud hosting/collaboration platform |
| কোথায় চলে | Local machine | Remote server/web |
| মূল কাজ | History, branch, merge | Hosting, review, collaboration |
| Internet দরকার | Local কাজের জন্য না | Remote operation-এর জন্য হ্যাঁ |
| Alternative | Mercurial ইত্যাদি | GitLab, Bitbucket ইত্যাদি |

### Repository create করার সময়

- Meaningful name
- Clear description
- Public/Private visibility
- প্রয়োজনে README, `.gitignore`, license

### Public বনাম Private

- **Public:** সবাই দেখতে পারে; write access আলাদা permission-এর বিষয়
- **Private:** authorized user ছাড়া দেখা যায় না

---

## 13. Local Repository GitHub-এ Push

### Remote add

HTTPS:

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

SSH:

```bash
git remote add origin git@github.com:USERNAME/REPOSITORY.git
```

**Breakdown:**

- `remote add`: নতুন remote reference
- `origin`: conventional remote name
- URL: GitHub repository address

### Remote verify

```bash
git remote -v
```

### Branch name main করা

```bash
git branch -M main
```

### First push

```bash
git push -u origin main
```

- `origin`: target remote
- `main`: target branch
- `-u`/`--set-upstream`: local main-এর upstream `origin/main` set করে

এরপর সাধারণত:

```bash
git push
```

### Complete existing-project flow

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

### Remote URL ভুল হলে

```bash
git remote set-url origin <new-url>
```

---

## 14. Pull Request

### Concept কী?

Pull Request (PR) হলো একটি branch-এর change অন্য branch-এ merge করার formal proposal। এতে review, discussion, automated test ও approval করা যায়।

### Typical flow

```bash
git switch -c feature/update-readme
# file edit
git add README.md
git commit -m "Update README introduction"
git push -u origin feature/update-readme
```

তারপর GitHub-এ:

1. Compare & pull request
2. Base branch: `main`
3. Compare branch: `feature/update-readme`
4. Title ও description লিখুন
5. Create pull request
6. Review/changes
7. Merge pull request

### Good PR description

- কী change হয়েছে
- কেন প্রয়োজন
- কীভাবে test করা হয়েছে
- screenshot/related issue

### Common mistakes

- base ও compare branch উল্টো নির্বাচন
- বিশাল unrelated change এক PR-এ
- test না করে PR করা
- conflict resolve না করা

---

## 15. Fork

### Concept কী?

অন্য user/organization-এর repository-এর server-side copy নিজের GitHub account-এ তৈরি করা। মূল repository-তে write permission না থাকলে open-source contribution-এ ব্যবহার করা হয়।

### Fork বনাম Clone

| বিষয় | Fork | Clone |
|---|---|---|
| কোথায় copy | GitHub account-এ | Local machine-এ |
| উদ্দেশ্য | নিজের remote copy | Local development |
| Command | সাধারণত GitHub UI | `git clone` |
| Original repo link | GitHub maintain করে | remote config অনুযায়ী |

### Fork workflow

```text
Original repository (upstream)
        ↓ Fork
Your GitHub repository (origin)
        ↓ Clone
Your local repository
```

### Upstream add

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/REPO.git
git remote -v
```

### Upstream update নেওয়া

```bash
git fetch upstream
git switch main
git merge upstream/main
```

অথবা:

```bash
git pull upstream main
```

### Contribution flow

1. Fork
2. Clone নিজের fork
3. Branch তৈরি
4. Commit
5. নিজের fork-এ push
6. Original repository-তে PR

---

## 16. Clone ও HTTPS Authentication

### Clone

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

**কাজ:** remote repository-এর files, full commit history ও default remote `origin`-সহ local copy তৈরি করে।

### Specific folder name

```bash
git clone <url> my-project
```

### Clone-এর পর

```bash
cd REPOSITORY
git remote -v
git branch --all
```

### HTTPS authentication

Modern GitHub password authentication for Git operations সমর্থন করে না। সাধারণ options:

- Browser sign-in via Git Credential Manager
- Personal Access Token (PAT)
- SSH key

### Personal Access Token warning

Token password-এর মতো sensitive।

- terminal history-তে paste করা এড়িয়ে চলুন
- source code-এ লিখবেন না
- minimum scope দিন
- leak হলে revoke করুন

### Basic edit-push workflow

```bash
git clone <https-url>
cd <repository>
# file create/edit
git add .
git commit -m "Add bio file"
git push
```

---

## 17. SSH Authentication

### Concept কী?

SSH public/private key pair ব্যবহার করে password/token বারবার না দিয়ে secure authentication করা যায়।

### Key pair

- **Private key:** local machine-এ গোপন থাকবে
- **Public key:** GitHub account-এ add করা যায়

### Recommended key generation

Modern recommendation:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

পুরোনো system-এ RSA:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Transcript-এ RSA-based command দেখানো হয়েছে। `-o` modern private-key format ব্যবহার করতে পারে, তবে current OpenSSH-এ এটি সাধারণত default।

### Key save

Default path সাধারণত:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

বা RSA হলে:

```text
~/.ssh/id_rsa
~/.ssh/id_rsa.pub
```

### Public key display

Git Bash/Linux/macOS:

```bash
cat ~/.ssh/id_ed25519.pub
```

Windows PowerShell:

```powershell
Get-Content $HOME\.ssh\id_ed25519.pub
```

GitHub → Settings → SSH and GPG keys → New SSH key-তে public key paste করুন।

### Connection test

```bash
ssh -T git@github.com
```

Expected first-time prompt host authenticity confirm করতে বলতে পারে। Successful output সাধারণত authentication success জানায়, shell access না দেওয়ার কথাও বলে।

### SSH clone

```bash
git clone git@github.com:USERNAME/REPOSITORY.git
```

### Passphrase

Private key passphrase security বাড়ায়। SSH agent ব্যবহার করলে বারবার type করা কমে।

Git Bash example:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Private key কখনো share করবেন না

`.pub` file share করা যায়; extension ছাড়া private key share/upload করা যাবে না।

---

## 18. Multiple GitHub Accounts

Transcript-এ global `.gitconfig` বদলে এবং `core.sshCommand` দিয়ে account switch দেখানো হয়েছে। এটি কাজ করতে পারে, কিন্তু global identity বারবার বদলানো error-prone। Safer ও scalable পদ্ধতি হলো:

1. প্রতিটি account-এর আলাদা SSH key
2. `~/.ssh/config`-এ host alias
3. প্রতিটি repository-তে local `user.name` ও `user.email`

> এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।

### দুটি key তৈরি

```bash
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_ed25519_personal
ssh-keygen -t ed25519 -C "work@example.com" -f ~/.ssh/id_ed25519_work
```

দুটি public key সংশ্লিষ্ট GitHub account-এ add করুন।

### `~/.ssh/config`

```sshconfig
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

### Clone

Personal:

```bash
git clone git@github-personal:PERSONAL-USER/repo.git
```

Work:

```bash
git clone git@github-work:WORK-ORG/repo.git
```

### Existing remote বদলানো

```bash
git remote set-url origin git@github-work:WORK-ORG/repo.git
```

### Repository-specific identity

```bash
git config user.name "Work User"
git config user.email "work@example.com"
```

### Permission denied scenario

Error:

```text
Permission to OWNER/REPO.git denied to OTHER-USER.
```

কারণ:

- wrong SSH key/account ব্যবহৃত
- account-এর write permission নেই
- remote ভুল account alias ব্যবহার করছে

Check:

```bash
ssh -T git@github-work
git remote -v
git config user.email
```

---

# Important Commands Summary Table

| Command | কাজ | কখন ব্যবহার হয় | সতর্কতা |
|---|---|---|---|
| `git config --list` | Active config দেখা | setup/debug | sensitive credential output হলে share নয় |
| `git init` | নতুন local repository | existing folder version control | ভুল parent folder-এ চালাবেন না |
| `git status` | file state দেখা | প্রায় সব step-এর আগে/পরে | none |
| `git add <file>` | specific change stage | selective commit | whole file stage হয়; hunk চাইলে `git add -p` |
| `git add .` | current path changes stage | ছোট project | unwanted file stage হতে পারে |
| `git commit -m "..."` | staged snapshot commit | logical কাজ complete | clear message দিন |
| `git log --oneline` | compact history | commit ID খোঁজা | none |
| `git reflog` | local HEAD movement | lost commit recovery | local-only; permanent archive নয় |
| `git reset --hard <id>` | history/working tree target commit-এ | local recovery | destructive |
| `git revert <id>` | commit undo via new commit | published history | conflict হতে পারে |
| `git rm <file>` | tracked file delete+stage | file remove | local file delete হয় |
| `git rm --cached <file>` | tracking বন্ধ | ignored/local config | commit করতে হবে |
| `git branch` | branch list | context check | none |
| `git switch -c <name>` | create+switch | feature work | branch base যাচাই করুন |
| `git merge <branch>` | branch change combine | feature integrate | conflict হতে পারে |
| `git branch -d <name>` | safe branch delete | merged branch cleanup | current branch delete নয় |
| `git branch -D <name>` | force delete | intentional discard | unmerged work হারাতে পারে |
| `git stash push -m "..."` | temporary change store | urgent context switch | permanent backup নয় |
| `git stash pop` | latest stash apply/remove | work resume | conflict হতে পারে |
| `git remote add origin <url>` | remote connect | first GitHub setup | duplicate origin error হতে পারে |
| `git remote -v` | remote inspect | troubleshooting | none |
| `git push -u origin main` | first push+upstream | publish branch | wrong remote/branch যাচাই করুন |
| `git push` | commits remote-এ পাঠানো | regular sync | pull/rebase প্রয়োজন হতে পারে |
| `git pull` | fetch+integrate | remote update নেওয়া | working tree clean রাখুন |
| `git fetch` | remote history download | inspect before merge | local files বদলায় না |
| `git clone <url>` | remote repo local copy | project শুরু | correct access method ব্যবহার করুন |
| `ssh-keygen ...` | SSH key তৈরি | secure auth | existing key overwrite নয় |
| `ssh -T git@github.com` | SSH auth test | key setup verify | first host prompt পড়ুন |

---

# Git Workflow Summary

## A. নতুন local project

```bash
mkdir demo-project
cd demo-project
git init
git config user.name "Your Name"
git config user.email "you@example.com"
```

File তৈরি/সম্পাদনার পর:

```bash
git status
git add README.md
git commit -m "Add initial README"
```

## B. Feature branch workflow

```bash
git switch -c feature/add-installation-guide
# edit files
git status
git add README.md
git commit -m "Add installation guide"
git switch main
git merge feature/add-installation-guide
git branch -d feature/add-installation-guide
```

## C. GitHub-এ publish

```bash
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

## D. Team/PR workflow

```bash
git switch main
git pull
git switch -c feature/new-task
# edit
git add .
git commit -m "Implement new task"
git push -u origin feature/new-task
```

তারপর GitHub-এ Pull Request তৈরি করুন।

## E. Fork-based open-source workflow

```bash
git clone <your-fork-url>
cd repo
git remote add upstream <original-repo-url>
git fetch upstream
git switch main
git merge upstream/main
git switch -c fix/issue-description
# edit, add, commit
git push -u origin fix/issue-description
```

---

# Common Errors ও Troubleshooting

## Error 1: Not a Git repository

```text
fatal: not a git repository (or any of the parent directories): .git
```

**কারণ:** current folder বা parent folder-এ `.git` নেই।

**সমাধান:**

```bash
pwd
ls -a
# সঠিক folder-এ যান, অথবা নতুন project হলে:
git init
```

---

## Error 2: Nothing to commit

```text
nothing to commit, working tree clean
```

এটি error নয়। সব change commit হয়েছে বা কোনো change নেই।

---

## Error 3: Pathspec did not match

```text
error: pathspec 'branch-name' did not match any file(s) known to git
```

**কারণ:** branch/file name typo বা branch local-এ নেই।

```bash
git branch --all
git fetch --all
```

---

## Error 4: Merge conflict

```text
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**সমাধান:** file edit → marker remove → `git add` → `git commit`। Abort চাইলে `git merge --abort`।

---

## Error 5: Remote origin already exists

```text
error: remote origin already exists.
```

```bash
git remote -v
git remote set-url origin <correct-url>
```

---

## Error 6: Push rejected / non-fast-forward

```text
! [rejected] main -> main (non-fast-forward)
```

Remote-এ local-এর বাইরে নতুন commit আছে।

```bash
git pull --rebase origin main
git push
```

Conflict হলে resolve করে:

```bash
git add <file>
git rebase --continue
```

---

## Error 7: Permission denied

```text
Permission denied (publickey).
fatal: Could not read from remote repository.
```

Check:

```bash
ssh -T git@github.com
git remote -v
ssh-add -l
```

Public key correct account-এ আছে কি না এবং remote SSH URL কি না দেখুন।

---

## Error 8: Git wrong account ব্যবহার করছে

```text
Permission to OWNER/REPO.git denied to WRONG-USER.
```

- SSH config alias ব্যবহার করুন
- remote URL alias অনুযায়ী বদলান
- repository-specific email set করুন

---

# Dangerous Commands ও Warnings

## `git reset --hard`

- uncommitted file change মুছে দেয়
- branch pointer সরায়
- shared history rewrite হতে পারে

Safer preparation:

```bash
git status
git stash push -u -m "backup before hard reset"
git branch backup-before-reset
```

## `git branch -D`

Unmerged branch force delete করে। আগে:

```bash
git log main..branch-name --oneline
```

## `git rm`

Working directory থেকেও file delete করে। Local file রাখতে `--cached` ব্যবহার করুন।

## Force push

Transcript-এর main demonstration-এ force push নেই, তবে reset-এর পরে অনেকে force push করে। Shared branch-এ avoid করুন। প্রয়োজনে:

```bash
git push --force-with-lease
```

`--force`-এর তুলনায় safer, তবু team coordination দরকার।

## Private SSH key

Private key কখনো GitHub, chat, email বা repository-তে upload করবেন না। Leak হলে key remove/revoke করে নতুন key তৈরি করুন।

---

# Practical Assignments

## Task 1: Local repository তৈরি

**Difficulty:** Beginner

1. `git-practice` folder তৈরি করুন।
2. `git init` চালান।
3. `README.md` তৈরি করুন।
4. `git status` inspect করুন।
5. file add ও commit করুন।

```bash
git init
git add README.md
git commit -m "Add initial README"
```

**Expected result:** clean working tree এবং একটি commit।

---

## Task 2: Atomic commits practice

`README.md` update এবং `help.md` creation আলাদা commit-এ করুন।

```bash
git add README.md
git commit -m "Update README introduction"
git add help.md
git commit -m "Add help documentation"
```

**লক্ষ্য:** unrelated changes আলাদা রাখা।

---

## Task 3: Branch ও merge

```bash
git switch -c feature/add-heading
# README edit
git add README.md
git commit -m "Add project heading"
git switch main
git merge feature/add-heading
git branch -d feature/add-heading
```

**Expected result:** main branch-এ heading থাকবে।

---

## Task 4: Merge conflict তৈরি ও resolve

1. `main` ও `feature/conflict-demo` branch-এ একই line আলাদাভাবে edit করুন।
2. Merge করুন।
3. Conflict marker resolve করুন।
4. Merge commit সম্পন্ন করুন।

**Hint:** `git status` আপনাকে conflicted file দেখাবে।

---

## Task 5: Stash workflow

1. main branch-এ file edit করুন কিন্তু commit করবেন না।
2. `git stash push -m "WIP demo"`।
3. অন্য branch-এ switch করুন।
4. main-এ ফিরে `git stash pop`।

**Expected result:** uncommitted change ফিরে আসবে।

---

## Task 6: `.gitignore`

1. `node_modules/`, `.env`, `debug.log` তৈরি করুন।
2. `.gitignore` লিখুন।
3. `git status`-এ ignored items না আসা verify করুন।

```gitignore
node_modules/
.env
*.log
```

---

## Task 7: GitHub publish

1. GitHub-এ empty repository তৈরি করুন।
2. local remote add করুন।
3. push করুন।

```bash
git remote add origin <url>
git branch -M main
git push -u origin main
```

**Expected result:** files ও commit history GitHub-এ দৃশ্যমান।

---

## Task 8: Pull Request

1. feature branch তৈরি করুন।
2. change commit করুন।
3. branch push করুন।
4. GitHub-এ PR তৈরি করুন।
5. PR description-এ change ও test লিখুন।

---

## Task 9: Fork ও contribution simulation

1. অন্য একটি practice repository fork করুন।
2. নিজের fork clone করুন।
3. original repository-কে `upstream` হিসেবে add করুন।
4. branch-এ change করুন।
5. নিজের fork-এ push ও PR করুন।

---

## Task 10: SSH setup

1. SSH key তৈরি করুন।
2. Public key GitHub-এ add করুন।
3. `ssh -T git@github.com` test করুন।
4. SSH URL দিয়ে repository clone করুন।

**Warning:** private key upload করবেন না।

---

# Quick Revision

## Core flow

```text
Edit → Status → Add → Commit → Push
```

## Branch flow

```text
main → create feature branch → commit → push → PR/merge → delete branch
```

## File states

```text
Untracked → git add → Staged → git commit → Tracked/Clean
Tracked file edit → Modified → git add → Staged
```

## Remote flow

```text
Local Repository --push--> GitHub
Local Repository <--fetch/pull-- GitHub
GitHub Repository --clone--> New Local Repository
```

## Must-remember commands

```bash
git status
git add .
git commit -m "Message"
git log --oneline
git switch -c feature/name
git merge feature/name
git stash
git remote -v
git push -u origin main
git pull
git clone <url>
```

## Important warnings

- `git reset --hard` destructive
- `git branch -D` unmerged work delete করতে পারে
- `.gitignore` tracked file-কে automatically untrack করে না
- private SSH key গোপন রাখুন
- token/password repository-তে লিখবেন না
- ভুল GitHub account দিয়ে push করলে permission error হবে

---

# Interview/Exam Questions (with Short Answers)

### 1. Git কী?
Git একটি distributed version control system, যা file change ও commit history track করে।

### 2. GitHub কী?
Git repository host ও collaborate করার cloud platform।

### 3. Git ও GitHub-এর পার্থক্য কী?
Git local version control tool; GitHub remote hosting ও collaboration service।

### 4. Working directory কী?
Project-এর যে files সরাসরি edit করা হয় সেই local directory।

### 5. Staging area কী?
পরবর্তী commit-এ অন্তর্ভুক্ত changes-এর selection area।

### 6. `git init` কী করে?
Current directory-তে `.git` তৈরি করে Git repository initialize করে।

### 7. `git status` কেন গুরুত্বপূর্ণ?
Current branch, staged, modified ও untracked changes দেখায়।

### 8. `git add` কি commit তৈরি করে?
না। এটি change stage করে; commit তৈরি করে `git commit`।

### 9. Commit কী?
Staged project state-এর identified snapshot, যার ID, author ও message থাকে।

### 10. ভালো commit message কেমন?
সংক্ষিপ্ত, specific, action-oriented এবং change-এর উদ্দেশ্য বোঝায়।

### 11. `HEAD` কী?
Current checked-out commit/branch-এর pointer।

### 12. `git log --oneline` কী দেখায়?
প্রতি commit এক লাইনে short hash ও message।

### 13. `git reflog` কেন ব্যবহার হয়?
Local `HEAD` movement track এবং lost commit recovery-তে।

### 14. `git reset --hard` ঝুঁকিপূর্ণ কেন?
Working directory ও staging changes মুছে দিতে পারে এবং branch history সরায়।

### 15. `git reset` ও `git revert` পার্থক্য কী?
Reset history pointer বদলায়; revert inverse change-এর নতুন commit তৈরি করে।

### 16. Branch কী?
Independent development line, যেখানে main-কে সরাসরি প্রভাবিত না করে কাজ করা যায়।

### 17. Fast-forward merge কী?
Target branch না এগোলে pointer সরিয়ে feature tip-এ নেওয়া।

### 18. Merge conflict কেন হয়?
দুটি branch একই/overlapping অংশে incompatible change করলে।

### 19. Merge conflict কীভাবে resolve করবেন?
Markers edit করে final content ঠিক করুন, তারপর `git add` ও `git commit`।

### 20. Stash কী?
Uncommitted changes সাময়িকভাবে সংরক্ষণ করে working tree clean করার ব্যবস্থা।

### 21. `git stash pop` ও `apply` পার্থক্য কী?
`pop` apply করে stash entry remove করে; `apply` entry রেখে দেয়।

### 22. `.gitignore` কী করে?
Matching untracked file/folder Git tracking থেকে ignore করে।

### 23. আগে committed file `.gitignore`-এ দিলেই কি ignore হবে?
না। আগে `git rm --cached <file>` দিয়ে untrack করতে হবে।

### 24. Remote repository কী?
Network/cloud server-এ থাকা Git repository।

### 25. `origin` কী?
Default/conventional remote name; এটি কোনো special server নয়।

### 26. `git push -u origin main`-এর `-u` কী করে?
Local branch-এর upstream tracking branch set করে।

### 27. `fetch` ও `pull` পার্থক্য কী?
Fetch remote data download করে কিন্তু integrate করে না; pull fetch-এর পর merge/rebase করে।

### 28. Clone কী?
Remote repository-এর full local copy তৈরি করা।

### 29. Fork ও clone-এর পার্থক্য কী?
Fork GitHub account-এ server-side copy; clone local machine-এ copy।

### 30. Pull Request কী?
এক branch/repository-এর changes review করে অন্য branch-এ merge করার proposal।

### 31. HTTPS ও SSH authentication পার্থক্য কী?
HTTPS browser/token/credential manager ব্যবহার করতে পারে; SSH public/private key pair ব্যবহার করে।

### 32. Public ও private SSH key-এর ভূমিকা কী?
Public key GitHub-এ থাকে; private key local machine-এ গোপন থেকে authentication প্রমাণ করে।

### 33. “Permission denied to another user” error কেন হয়?
Wrong account/key selected অথবা repository write permission নেই।

### 34. Multiple GitHub account কীভাবে manage করা ভালো?
প্রতি account-এর separate SSH key, SSH config host alias এবং per-repository Git identity।

### 35. কেন ছোট logical commit ভালো?
Review, debugging, cherry-pick ও selective revert সহজ হয়।

---

# Key Takeaways

- Git code save করার tool নয়; এটি meaningful project history তৈরি করে।
- Working directory, staging area, local repository ও remote repository—এই চারটি layer বুঝলে Git workflow পরিষ্কার হয়।
- `git status` beginner-এর সবচেয়ে গুরুত্বপূর্ণ diagnostic command।
- `git add` selection করে, `git commit` snapshot তৈরি করে, `git push` remote-এ পাঠায়।
- Commit ছোট, logical ও meaningful রাখুন।
- Branch isolation দেয়; merge change integrate করে; conflict হলে মানুষকে সিদ্ধান্ত নিতে হয়।
- `git reset --hard` ও force deletion সতর্কতার সঙ্গে ব্যবহার করুন। Published history undo করতে `git revert` অধিক নিরাপদ।
- Stash temporary work সংরক্ষণ করে, কিন্তু permanent backup নয়।
- `.gitignore` আগে tracked file automatically untrack করে না।
- GitHub collaboration-এর core flow: branch → commit → push → Pull Request → review → merge।
- Fork write access ছাড়া contribution-এর common পদ্ধতি; clone local development-এর জন্য।
- SSH key-এর private অংশ কখনো share করবেন না।
- Multiple account-এর জন্য global config বারবার বদলানোর বদলে SSH aliases ও repository-specific identity ব্যবহার করা ভালো।

---

## Final Practice Checklist

- [ ] Git install ও identity configure করেছি
- [ ] Repository initialize করতে পারি
- [ ] File state `git status` দিয়ে বুঝতে পারি
- [ ] Selective staging ও meaningful commit করতে পারি
- [ ] Log ও reflog পড়তে পারি
- [ ] Branch create, switch, merge ও delete করতে পারি
- [ ] Merge conflict resolve করতে পারি
- [ ] Stash create/apply/pop করতে পারি
- [ ] `.gitignore` এবং tracked-file untracking বুঝি
- [ ] GitHub remote add ও push করতে পারি
- [ ] PR, fork ও clone workflow বুঝি
- [ ] HTTPS ও SSH authentication-এর পার্থক্য বুঝি
- [ ] Multiple GitHub account safely configure করতে পারি

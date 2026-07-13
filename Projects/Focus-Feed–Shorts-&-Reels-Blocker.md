##V1
আমি একটি সম্পূর্ণ কার্যকর **Chrome Extension (Manifest V3)** তৈরি করতে চাই, যার কাজ হবে YouTube এবং Facebook-এর সব ধরনের Shorts/Reels কনটেন্ট ব্লক করা।

## Extension-এর মূল উদ্দেশ্য

Extension চালু থাকলে:

### YouTube-এ ব্লক করবে

* YouTube Shorts-এর হোমপেজ সেকশন
* Sidebar-এর Shorts বাটন
* Search result-এর Shorts ভিডিও
* Channel page-এর Shorts tab
* Subscription feed-এর Shorts
* `/shorts/` URL
* Shorts video player
* Shorts recommendation shelf

কেউ সরাসরি YouTube Shorts-এর URL খুললে তাকে স্বয়ংক্রিয়ভাবে YouTube Home Page বা সাধারণ Videos Page-এ redirect করবে।

### Facebook-এ ব্লক করবে

* Facebook Reels tab
* Homepage-এর Reels and Short Videos section
* Watch page-এর Reels
* Sidebar/Menu-এর Reels link
* Reels recommendations
* `/reel/` এবং `/reels/` URL
* Facebook-এর popup বা modal-এ দেখানো Reels

কেউ সরাসরি Facebook Reel URL খুললে তাকে Facebook Home Page-এ redirect করবে।

## প্রয়োজনীয় ফিচার

1. Extension-এর একটি সুন্দর popup interface থাকবে।

2. Popup-এ আলাদা toggle থাকবে:

* Block YouTube Shorts
* Block Facebook Reels

3. একটি প্রধান toggle থাকবে:

* Enable/Disable Extension

4. User-এর settings `chrome.storage.sync` ব্যবহার করে save করতে হবে।

5. Browser restart হলেও settings যেন পরিবর্তন না হয়।

6. Popup-এ blocked content-এর counter দেখাবে:

* YouTube Shorts Blocked
* Facebook Reels Blocked
* Total Content Blocked

7. একটি “Reset Statistics” বাটন থাকবে।

8. YouTube এবং Facebook Single Page Application হওয়ায় page reload ছাড়াই content পরিবর্তিত হলে extension যেন কাজ করে।

এর জন্য ব্যবহার করতে হবে:

* `MutationObserver`
* URL change detection
* `history.pushState`
* `history.replaceState`
* `popstate`
* প্রয়োজন হলে periodic fallback scanning

9. Extension যেন দ্রুত কাজ করে এবং অপ্রয়োজনীয়ভাবে পুরো DOM বারবার scan না করে।

10. Shorts বা Reels remove করার সময় layout যেন ভেঙে না যায়।

11. Content remove করার জন্য প্রয়োজন অনুযায়ী CSS injection এবং JavaScript DOM removal—দুই পদ্ধতিই ব্যবহার করা যাবে।

12. YouTube বা Facebook-এর normal video যেন ভুল করে block না হয়।

13. Extension-এর popup design হবে:

* Clean
* Modern
* Minimal
* Responsive
* Light theme
* Blue accent color
* Smooth toggle animation

14. Extension-এর একটি extension icon থাকবে। Temporary placeholder icon তৈরি করার নির্দেশনাও দাও।

## প্রয়োজনীয় ফাইল

সম্পূর্ণ project structure তৈরি করো:

```text
reels-blocker/
├── manifest.json
├── background.js
├── popup.html
├── popup.css
├── popup.js
├── content/
│   ├── youtube.js
│   ├── facebook.js
│   └── common.js
├── styles/
│   ├── youtube.css
│   └── facebook.css
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Technical Requirements

* Chrome Extension Manifest V3 ব্যবহার করতে হবে।
* কোনো external JavaScript library ব্যবহার করা যাবে না।
* Vanilla JavaScript, HTML এবং CSS ব্যবহার করতে হবে।
* যথাযথ permissions ব্যবহার করতে হবে।
* অপ্রয়োজনীয় broad permission দেওয়া যাবে না।
* `host_permissions` শুধু YouTube এবং Facebook-এর জন্য দিতে হবে।
* Content scripts আলাদাভাবে YouTube এবং Facebook-এর জন্য configure করতে হবে।
* Code modular এবং সহজে maintainable হতে হবে।
* প্রত্যেক গুরুত্বপূর্ণ function-এর উপরে ছোট comment দিতে হবে।
* Error handling যোগ করতে হবে।
* Console-এ অপ্রয়োজনীয় log রাখা যাবে না।

## YouTube Detection Logic

YouTube Shorts শনাক্ত করতে শুধু CSS class-এর উপর নির্ভর করবে না। নিচের বিষয়গুলোর সমন্বয় ব্যবহার করবে:

* URL-এ `/shorts/`
* Shorts-related links
* `href` attributes
* Accessible labels
* Section headings
* YouTube custom elements যেমন:

  * `ytd-rich-shelf-renderer`
  * `ytd-reel-shelf-renderer`
  * `ytd-reel-item-renderer`
  * `ytd-guide-entry-renderer`
  * `ytd-mini-guide-entry-renderer`

YouTube-এর UI পরিবর্তন হলে সহজে selector update করা যায়—এভাবে selectors একটি configuration object-এর মধ্যে রাখতে হবে।

## Facebook Detection Logic

Facebook Reels শনাক্ত করতে নিচের বিষয়গুলোর সমন্বয় ব্যবহার করবে:

* URL-এ `/reel/` বা `/reels/`
* Link-এর `href`
* `aria-label`
* Visible text যেমন “Reels”
* Facebook feed card structure
* Navigation item
* Dialog এবং modal content

শুধু generated class name-এর উপর নির্ভর করবে না, কারণ Facebook-এর class name প্রায়ই পরিবর্তিত হয়।

## Statistics Logic

* কোনো Shorts/Reels element block হলে counter increment করবে।
* একই element বারবার detect হলে counter যেন বারবার increment না হয়।
* এজন্য blocked element-এ custom data attribute বা `WeakSet` ব্যবহার করা যেতে পারে।
* Statistics `chrome.storage.local`-এ রাখতে হবে।
* Settings `chrome.storage.sync`-এ রাখতে হবে।

## Background Service Worker

`background.js`-এ:

* Default settings initialize করবে।
* Extension install/update event handle করবে।
* প্রয়োজন হলে badge-এ total blocked count দেখাবে।
* Counter update হলে badge refresh করবে।

## Popup Interface

Popup-এ দেখাবে:

* Extension name: “Focus Feed”
* Subtitle: “Block distracting short-form videos”
* Main enable toggle
* YouTube Shorts toggle
* Facebook Reels toggle
* Blocked statistics
* Reset Statistics button
* ছোট status text:

  * “Protection is active”
  * “Protection is paused”

## README.md

README-তে বিস্তারিত লিখবে:

1. Extension কী করে
2. Project structure
3. Chrome-এ unpacked extension হিসেবে কীভাবে install করতে হবে
4. কীভাবে test করতে হবে
5. কীভাবে selectors update করতে হবে
6. কীভাবে Chrome Web Store-এর জন্য ZIP বানাতে হবে
7. Known limitations
8. Privacy policy summary

## Privacy

Extension কোনো browsing history, personal information বা user data server-এ পাঠাবে না।

সব processing local browser-এর মধ্যে হবে।

README এবং extension description-এ privacy বিষয়টি স্পষ্টভাবে উল্লেখ করবে।

## Output Format

প্রথমে project structure দেখাও।

তারপর প্রতিটি ফাইলের সম্পূর্ণ code আলাদা heading এবং code block-এ দাও।

কোনো placeholder, অসম্পূর্ণ function, pseudocode বা “add your code here” ব্যবহার করবে না।

সব ফাইল এমনভাবে দাও যেন আমি সরাসরি copy করে folder-এ রেখে Chrome-এর `Load unpacked` অপশন দিয়ে extension চালাতে পারি।

সবশেষে:

* Installation instructions
* Testing checklist
* সম্ভাব্য bugs
* ভবিষ্যৎ improvement ideas

দাও।


##V2
আমি একটি সম্পূর্ণ কার্যকর **Google Chrome Extension** তৈরি করতে চাই, যার কাজ হবে YouTube Shorts এবং Facebook Reels ব্লক করা।

Extension-এর নাম হবে:

**Focus Feed – Shorts & Reels Blocker**

## মূল ফিচার

Extension চালু থাকলে YouTube এবং Facebook-এর short-form video content স্বয়ংক্রিয়ভাবে hide বা block করবে।

### YouTube থেকে ব্লক করবে

* YouTube Homepage-এর Shorts section
* Sidebar-এর Shorts button
* Search results-এর Shorts videos
* Subscription feed-এর Shorts
* Channel page-এর Shorts tab
* Recommended Shorts shelf
* Shorts player
* `/shorts/` URL

কেউ সরাসরি কোনো YouTube Shorts URL খুললে তাকে এই URL-এ redirect করবে:

```text
https://www.youtube.com/
```

### Facebook থেকে ব্লক করবে

* Facebook Homepage-এর Reels section
* Reels navigation button
* Suggested Reels
* Watch page-এর Reels
* Feed-এর Reels cards
* Popup বা modal-এর Reels
* `/reel/` এবং `/reels/` URL

কেউ সরাসরি কোনো Facebook Reel URL খুললে তাকে এই URL-এ redirect করবে:

```text
https://www.facebook.com/
```

## Popup Interface

Extension icon-এ click করলে একটি সুন্দর popup খুলবে।

Popup-এ থাকবে:

* Extension name
* Extension on/off করার main toggle
* Block YouTube Shorts toggle
* Block Facebook Reels toggle
* YouTube Shorts blocked counter
* Facebook Reels blocked counter
* Total blocked counter
* Reset Statistics button
* বর্তমান status:

  * Protection is active
  * Protection is paused

Popup design হবে:

* Modern
* Minimal
* Professional
* Responsive
* Light background
* Blue accent color
* Smooth toggle animation
* Width প্রায় 340px

## Storage

Settings save করার জন্য ব্যবহার করবে:

```javascript
chrome.storage.sync
```

Statistics save করার জন্য ব্যবহার করবে:

```javascript
chrome.storage.local
```

Browser restart হলেও settings এবং statistics যেন হারিয়ে না যায়।

## SPA Support

YouTube এবং Facebook Single Page Application হওয়ায় page reload ছাড়াও URL এবং content পরিবর্তিত হয়।

তাই ব্যবহার করতে হবে:

* MutationObserver
* popstate event
* history.pushState detection
* history.replaceState detection
* URL change detection
* Lightweight periodic fallback scanning

Extension যেন নতুন Shorts বা Reels content page-এ যোগ হওয়ার সঙ্গে সঙ্গে block করতে পারে।

## Performance Requirements

* অপ্রয়োজনীয়ভাবে পুরো DOM বারবার scan করা যাবে না।
* MutationObserver-এর callback debounce করতে হবে।
* একই element একাধিকবার process করা যাবে না।
* Process করা element track করার জন্য WeakSet বা data attribute ব্যবহার করতে হবে।
* Normal YouTube বা Facebook video যেন ভুল করে block না হয়।
* Shorts বা Reels remove করার কারণে page layout যেন ভেঙে না যায়।
* প্রয়োজন অনুযায়ী element remove অথবা `display: none !important` ব্যবহার করতে হবে।

## YouTube Detection

শুধু CSS class-এর উপর নির্ভর করা যাবে না।

YouTube Shorts শনাক্ত করতে ব্যবহার করবে:

* URL-এ `/shorts/`
* Link-এর href-এ `/shorts/`
* aria-label
* Accessible text
* Section heading
* YouTube custom elements

সম্ভাব্য selectors:

```text
ytd-reel-shelf-renderer
ytd-reel-item-renderer
ytd-rich-shelf-renderer
ytd-guide-entry-renderer
ytd-mini-guide-entry-renderer
yt-tab-shape
```

Selectors একটি আলাদা configuration object-এর মধ্যে রাখতে হবে, যেন ভবিষ্যতে সহজে update করা যায়।

## Facebook Detection

Facebook Reels শনাক্ত করতে ব্যবহার করবে:

* URL-এ `/reel/`
* URL-এ `/reels/`
* Link-এর href
* aria-label
* Navigation text
* Visible “Reels” text
* Dialog content
* Feed card-এর link structure

Facebook-এর generated বা random CSS class-এর উপর নির্ভর করা যাবে না।

## Statistics

যখন কোনো Shorts বা Reels element block হবে:

* সংশ্লিষ্ট counter increment করবে।
* একই element পুনরায় scan হলে counter আবার increment করা যাবে না।
* Counter update হলে extension badge-এ total blocked number দেখাবে।
* Counter অনেক বড় হলে badge-এ `999+` দেখাতে পারে।
* Reset button চাপলে সব counter শূন্য হবে।

## Background Service Worker

`background.js` বা `service-worker.js` ফাইলে:

* Extension install হলে default settings initialize করবে।
* Extension update handle করবে।
* Statistics update হলে badge update করবে।
* Settings আগে থেকে থাকলে overwrite করবে না।
* Chrome runtime message handle করবে।

## Project Structure

নিচের structure অনুযায়ী পুরো project তৈরি করো:

```text
focus-feed/
├── manifest.json
├── background.js
├── popup.html
├── popup.css
├── popup.js
├── content/
│   ├── youtube.js
│   └── facebook.js
├── styles/
│   ├── youtube.css
│   └── facebook.css
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Manifest Requirements

* Manifest Version 3 ব্যবহার করতে হবে।
* Minimum permissions ব্যবহার করতে হবে।
* প্রয়োজন অনুযায়ী permissions:

```json
[
  "storage"
]
```

* প্রয়োজন অনুযায়ী host permissions:

```json
[
  "*://*.youtube.com/*",
  "*://*.facebook.com/*"
]
```

* YouTube এবং Facebook-এর জন্য আলাদা content script ব্যবহার করতে হবে।
* Background service worker configure করতে হবে।
* Popup configure করতে হবে।
* Icons configure করতে হবে।

## Technical Requirements

* Vanilla JavaScript ব্যবহার করতে হবে।
* কোনো external framework বা library ব্যবহার করা যাবে না।
* কোনো CDN ব্যবহার করা যাবে না।
* সব JavaScript extension-এর local file থেকে load হতে হবে।
* কোনো inline JavaScript ব্যবহার করা যাবে না।
* Manifest V3 Content Security Policy মেনে চলতে হবে।
* Code modular, readable এবং maintainable হতে হবে।
* গুরুত্বপূর্ণ function-এর উপরে সংক্ষিপ্ত comment দিতে হবে।
* Error handling থাকতে হবে।
* Production code-এ অপ্রয়োজনীয় console log রাখা যাবে না।

## Privacy

Extension:

* কোনো personal data সংগ্রহ করবে না।
* কোনো browsing history server-এ পাঠাবে না।
* কোনো analytics ব্যবহার করবে না।
* কোনো external server-এর সঙ্গে যোগাযোগ করবে না।
* সব processing local browser-এর মধ্যে করবে।

README-তে privacy section লিখতে হবে।

## Icon

Extension-এর জন্য একটি simple icon concept তৈরি করো:

* Blue shield
* Shield-এর মধ্যে white play icon
* Play icon-এর উপর diagonal block line

যেহেতু text-based output-এ PNG দেওয়া সম্ভব না হতে পারে, তাই:

1. একটি SVG icon file-এর complete code দাও।
2. SVG থেকে 16, 32, 48 এবং 128 pixel PNG বানানোর পদ্ধতি দাও।
3. সম্ভব হলে একটি ছোট HTML icon generator file-ও তৈরি করো।

## README

README.md-তে লিখবে:

* Extension কী করে
* Features
* Project structure
* কীভাবে Chrome-এ Load unpacked করতে হবে
* কীভাবে YouTube ও Facebook-এ test করতে হবে
* কীভাবে selectors update করতে হবে
* কীভাবে Chrome Web Store submission-এর ZIP বানাতে হবে
* Privacy information
* Known limitations
* Troubleshooting guide

## Output Rules

প্রথমে project structure দেখাবে।

তারপর প্রতিটি file-এর সম্পূর্ণ code আলাদা heading ও code block-এ দেবে।

যেমন:

```text
## manifest.json
```

তারপর সম্পূর্ণ code।

কোনো pseudocode ব্যবহার করা যাবে না।

কোনো function অসম্পূর্ণ রাখা যাবে না।

কোনো জায়গায় নিচের ধরনের লেখা রাখা যাবে না:

```text
Add your code here
TODO
Implement later
```

সব file সম্পূর্ণ working অবস্থায় দিতে হবে, যেন আমি:

1. Code copy করি
2. Folder তৈরি করি
3. Chrome-এর Extensions page খুলি
4. Developer Mode চালু করি
5. Load unpacked নির্বাচন করি
6. Extension ব্যবহার শুরু করতে পারি

সবশেষে একটি detailed testing checklist দাও।

এছাড়াও সম্ভাব্য YouTube/Facebook UI update-এর কারণে কোন selectors ভবিষ্যতে পরিবর্তন করতে হতে পারে, তা আলাদাভাবে উল্লেখ করো।


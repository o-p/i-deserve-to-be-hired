# Interview question for Node.js

本題選用 TypeScript 實作，開發環境 Node.js v14，測試 framework 選用 Jest，CI 使用 GitHub Actions。

## Links

- [simple-reverse](src/simple-reverse.ts) - 第一版本簡易實作，可處理 happy path，輸入值必須為符合規則之 object，每層均至少包含一組 key-value pair

- [reverse](src/reverse.ts) - 第二版本實作，對於大部分不合法的輸入值統一回傳 null；使用者可自行注入 filter，當 object 中包含多組 key-value pair 時，透過 filter 選擇要轉換的路徑。

- [Coverage Report](https://o-p.github.io/i-deserve-to-be-hired/) - CI 中透過 Jest 產生

## Demo

```bash
$ FOLDER=path/to/go # 要用來下載的資料夾路徑
$ git clone git@github.com:o-p/i-deserve-to-be-hired.git $FOLDER && cd $FOLDER
...
# 安裝相依套件，將 TypeScript source code 轉譯成 JavaScript
$ yarn && yarn build
...
# 測試題目 input，確認 output 是否相符
$ node -e "const { reverse } = require('./es'); console.log(JSON.stringify(reverse({ hired: { be: { to: { deserve: 'I' } } } })))"
{"I":{"deserve":{"to":{"be":"hired"}}}}
```

## Question

```js
/**
 * Please use TypeScript/JS to answer question
 * Welcome to answer with unit testing code if you can
 *
 * After you finish coding, please push to your GitHub account and share the link with us.
 */

// Please write a function to reverse the following nested input value into output value

// Input:
let inputValue = {
  hired: {
    be: {
      to: {
      	deserve: 'I'
      }
    }
  }
};

// Output:
let outputValue = {
  I: {
    deserve: {
      to: {
         be: 'hired'
      }
    }
  }
};
```

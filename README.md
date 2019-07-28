# shutter
## About
- [puppeteer](https://github.com/GoogleChrome/puppeteer)によるスクリーンショット取得するシンプルなAPIを提供します
- 現状作成されるスクリーンショットの解像度は1280x1280です。
- ファイルベースのスクリーンショット画像のキャッシュを行います

## Installation
### Local

```
$ npm start
```

### Production

(null)

## Usage

```
http://localhost:5000/?key=sample-key&url=https://github.com/hideack/shutter
```

## Environment variable
- PORT: 起動時の待機ポート (デフォルト: 5000)
- KEY : スクリーンショットリクエスト呼び出し制御用のキー (デフォルト: sample-key)
- EXPIRE: ファイルキャッシュ期限 (デフォルト:5分)
 
## heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hideack/shutter) [![Greenkeeper badge](https://badges.greenkeeper.io/hideack/shutter.svg)](https://greenkeeper.io/)

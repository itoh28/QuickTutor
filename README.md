# QuickTutor
[マニュアル管理はこれにおまかせ！マニュアル管理ツール『QuickTutor』](https://quicktutor.work)

## 1. 概要
このアプリは **Web上でマニュアル管理** したい

**職場の同僚** 向けの **QuickTutor** という **マニュアル管理アプリ** です。

このアプリでは **画像や動画を用いたマニュアルを簡単に作成・閲覧**　でき 、類似アプリの **Teachme Biz** と比べて、

**シンプルで直感的な操作をすること** ができます。

## 2. 使用技術
### フロントエンド
* React 18.0.0
* Next.js 14.2.3

### バックエンド
* PHP 8.2
* Laravel/Framework 11.0

### 主なライブラリ
**データフェッチ関連**
* Axios 1.7.2
* SWR 2.2.5

**UI関連**
* Tailwind CSS 3.4.1

**認証関連**
* Laravel/Sanctum

### インフラ
※技術の選定理由についてはこちら→[design.md](https://github.com/itoh28/QuickTutor/blob/main/documents/design.md#%E4%BD%BF%E7%94%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%A8%E9%81%B8%E5%AE%9A%E7%90%86%E7%94%B1)
* Vercel
* Route53
* ACM
* ALB
* EC2
* S3
* RDS
* GitHub Actions

## 3. ER図
![image](https://github.com/itoh28/QuickTutor/assets/150091562/c3c84692-edc3-447b-a3e9-04776199a55c)

## 4. システム構成図
![image](https://github.com/itoh28/QuickTutor/assets/150091562/9927cc04-04be-425e-a9f7-64ca1e969d2b)

## 5. 機能一覧
**アカウント機能**
* ユーザー登録、ログイン
* ユーザー名の変更

**マニュアル編集機能**
* マニュアル作成、更新、削除
* ジャンルタグの設定
* 画像、動画のアップロード
* マニュアルの下書き保存
* 削除したマニュアルの復元

**マニュアル閲覧機能**
* マニュアルの一覧表示
* マニュアルのジャンル別一覧表示
* マニュアルの個別表示
* マニュアルのスライド表示

**今後追加予定の機能**
※（）内は実装優先度、P0＞P1＞P2　の順で優先度が高い
* ユーザー管理（P0）
* 関連マニュアルのリンク設定（P1）
* マニュアル検索（P1）
* マニュアルの並べ替え（P1）
* 画像編集（P1）
* 穴埋め問題（P2）
* 教育プログラム（P2）

## 6. チーム開発の経験
「アプレンティス」でのチーム開発経験を記事にまとめました。

[1回目のチーム開発](https://qiita.com/itoh28/items/777faedf64e0cea1523a)

[2回目のチーム開発](https://qiita.com/itoh28/items/78c562b92e90565f50ca)

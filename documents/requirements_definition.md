## 一言サービスコンセプト（サービスのキャッチコピーを一言で）

- マニュアルをもっと身近に

## 誰のどんな課題を解決するのか？

- 対象：職場の同僚、新入社員
- 課題：
    - 社内に体系的なマニュアルがないため、人によって知識にばらつきがある
        
    - 既存のマニュアル作成ツールは高額なので導入が難しい。
        
    - 社員の教育プログラムがないため、知識習得効率が悪い。特に新入社員はその現状に戸惑ってしまうことが多い。

## なぜそれを解決したいのか？

- マニュアルによって、社員が効率的に知識を習得できる環境を作りたい
- 社員全員が正しい知識を習得し、安定したパフォーマンスを出せるようにしたい
- 教育担当者の負担を減らし、会社全体の生産性を上げたい

## どうやって解決したいのか？

- マニュアルを簡単に作成、閲覧できるWebアプリを開発する
- 効率的な知識の習得ができるように、ジャンル別にマニュアルを閲覧できる機能を実装する。
- マニュアルを穴埋め形式の問題として出題できる機能を実装し、知識の定着を確かなものにする。

## 機能要件

※（）内は実装優先度、P0＞P1＞P2　の順で優先度が高い

- 認証機能
    - **会員登録（名前、パスワードの登録）ができる（P0）**
    - **ログイン（名前、パスワードの照合）ができる（P0）**
    - パスワードを再設定できる（P2）

- マニュアル作成機能
    - **マニュアルを作成できる（P0）**
    - **マニュアルを更新（修正）できる（P0）**
    - **マニュアルを削除できる（P0）**
    - **画像（動画）をアップロードできる（P0）**
    - 関連マニュアルをリンクとして設定できる（P1）
    - マニュアルの下書きを保存できる（P1）
 
- 穴埋め問題作成機能
    - マニュアルの穴埋め問題を作成できる（P2）
    - 穴埋め問題を更新（修正）できる（P2）
    - 穴埋め問題を削除できる（P2）
    - 穴埋め問題の下書きを保存できる（P2）

- 教育プログラム作成機能
    - 教育プログラムを作成できる（P2）
    - 教育プログラムを削除できる（P2）
    - 教育プログラムにマニュアルを追加できる（P2）
    - 教育プログラムからマニュアルを削除できる（P2）

- マニュアル一覧表示機能
    - **全マニュアルを一覧で見られる（P0）**
    - **選択したマニュアルの詳細を見られる（P0）**
    - 手順ごとにマニュアルを拡大表示できる（P1）
    - マニュアルを検索できる（P1）
    - 「タイトル」「ジャンル」「作成者」「閲覧数」「最終更新日時」ごとにマニュアルを昇順/降順に並べ替えられる（P1）
    
- ジャンル別マニュアル表示機能
    - **ジャンルごとにマニュアルを見られる（P0）**
    - **選択したマニュアルの詳細を見られる（P0）**
    - 手順ごとにマニュアルを拡大表示できる（P1）
    - マニュアルを検索できる（P1）
    - 「タイトル」「ジャンル」「作成者」「閲覧数」「最終更新日時」ごとにマニュアルを昇順/降順に並べ替えられる（P1）

- 教育プログラム表示機能
    - 教育プログラムを実施できる（P2）
    - 穴埋め問題の正誤判定ができる（P2）
    - 教育プログラムごとに学習進捗度がわかる（P2）
    - 学習が終了したマニュアルにはチェックを入れられる（P2）

- 画像編集機能
    - アップロードした画像にテキストと図形を挿入できる（P2）
    - テキスト/図形の色、太さ、大きさを変更できる（P2）

- ごみ箱機能
    - 削除したマニュアルを一覧で見られる（P1）
    - 削除したマニュアルを復元できる（P1）
    

## 非機能要件

- 保守性
    - フロントエンドは、ESLintとPrettierを導入し、コードスタイルの一貫性を保ちながら品質の向上を図る
    - バックエンドは、PHP_CodeSnifferとPHP Intelephenseを導入し、コードスタイルの一貫性を保ちながら品質の向上を図る
- 運用性
    - GitHub Actionsを利用して自動デプロイを行う
- 費用
    - 月10,000円まで
    - 社内で実運用する場合は会社と相談
- セキュリティ
    - 個人情報は取り扱わない
    - プロダクトをSSL化し、セキュリティを高める
- 性能
    - AWSのS3、CloudFrontを利用し、画像配信を高速化する
- 可用性
    - フロントエンドはVercelにデプロイし、自動スケーリング等の機能を利用することで可用性を高める
    - バックエンドはAWSにデプロイし、必要に応じてサーバーを冗長化することで可用性を高める
    - Sentryを導入し、エラー監視を行う
- その他
    - PC、タブレット、スマホに対応している
    - デザインにこだわり、UI/UXを向上させる

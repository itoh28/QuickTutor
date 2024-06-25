## 業務フロー

[業務フロー(Figma)](https://www.figma.com/file/l8aDAO8lRcgPfgA7m5enGw/%E3%82%AA%E3%83%AA%E3%83%97%E3%83%AD_%E6%A5%AD%E5%8B%99%E3%83%95%E3%83%AD%E3%83%BC?type=whiteboard&node-id=0%3A1&t=E1kva6UgVOYtebps-1)

## 画面遷移図

[画面遷移図(Figma)](https://www.figma.com/file/qc49iJPdfADvaUF8mbDaae/%E3%82%AA%E3%83%AA%E3%83%97%E3%83%AD_%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3?type=design&mode=design&t=E1kva6UgVOYtebps-1)

## ワイヤーフレーム兼デザインカンプ

[ワイヤーフレーム兼デザインカンプ(Figma)](https://www.figma.com/file/byak8FlPnP6M1RYps1P1B6/%E3%82%AA%E3%83%AA%E3%83%97%E3%83%AD_%E3%83%AF%E3%82%A4%E3%83%A4%E3%83%BC%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0?type=design&mode=design&t=E1kva6UgVOYtebps-1)

## DB設計
### ER図
![image](https://github.com/itoh28/QuickTutor/assets/150091562/c3c84692-edc3-447b-a3e9-04776199a55c)

### テーブル定義
[別ファイル参照](https://github.com/itoh28/QuickTutor/blob/main/documents/table_definition.md)

## システム構成図
![image](https://github.com/itoh28/QuickTutor/assets/150091562/9927cc04-04be-425e-a9f7-64ca1e969d2b)

## 使用サービスと選定理由

### Vercel
- スケーラビリティが高く、サーバーメンテナンスが不要なため。
- GitHubと簡単に連携でき、自動デプロイが可能なため。
- エッジネットワークを利用し、高速なコンテンツ配信が可能なため。
- Next.jsと同じ企業が開発しており、信頼性が高いため。

### Route53
- 可用性とスケーラビリティが高く、ドメイン名の管理が容易なため。
- 他のAWSサービスとの統合が容易なため。

### ACM
- SSL/TLS証明書の取得、管理、更新を自動化し、セキュリティを簡単に維持できるため。
- 無料で証明書を発行でき、コストを削減できるため。
- 他のAWSサービスとの統合が容易なため。

### ALB
- トラフィックの分散を行い、アプリケーションの可用性と耐障害性を向上させるため。
- HTTPS通信を受け取り、SSL/TLS証明書の管理が容易なため。

### EC2　
※現在、コストとの兼ね合いで冗長化は行っていません。今後必要に応じて冗長化を検討します。
- サーバーの管理負担を削減し、スケーラビリティと可用性を高めるため。
- 必要に応じてリソースをスケールアップ/スケールダウンできるため。

### S3
- 耐久性とアクセス性が高く、低コストでデータを保存できるため。
- ストレージ容量が無制限であり、データの増加に柔軟に対応できるため。

### CloudFront　
※現在、コストとの兼ね合いで利用していません。今後画像・動画配信の高速化が必要と感じた場合に利用します。
- エッジロケーションを活用し、コンテンツを高速配信できるため。
- DDoS攻撃からの保護やSSL/TLSのサポートができ、セキュリティを強化できるため。

### RDS 
※現在、コストとの兼ね合いで冗長化は行っていません。今後必要に応じて冗長化を検討します。
- データベースの設定、運用、スケーリングが容易なため。
- 自動バックアップにより、データを保護できるため。
- マルチAZ機能により、可用性と耐障害性を高められるため。

### GitHub Actions
- GitHubと簡単に連携でき、テストやデプロイを自動化できるため。
- カスタムワークフローを簡単に作成でき、プロジェクトのニーズに応じたCI/CDパイプラインを構築できるため。


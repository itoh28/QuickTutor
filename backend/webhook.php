<?php
// GitHub Webhook Secret
$secret = 'soudai1224';

// GitHubから送信された署名を取得
$hubSignature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

// 署名がない場合は終了
if (!$hubSignature) {
    die('No signature provided.');
}

// POSTデータを取得
$payload = file_get_contents('php://input');

// 署名を検証
list($algo, $hash) = explode('=', $hubSignature, 2);
if ($hash !== hash_hmac($algo, $payload, $secret)) {
    die('Invalid signature.');
}

// POSTデータをデコード
$payloadData = json_decode($payload, true);

// pushイベントを処理
if ($payloadData['ref'] === 'refs/heads/main') {
    // リポジトリを更新
    shell_exec('cd /var/www/html && git pull origin main');
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * HTTPリクエストのオリジンを検証するミドルウェア。
 */
class VerifyOrigin
{
    /**
     * リクエストを処理し、オリジンが許可されているかどうかを検証します。
     * @param  Request  $request  現在のHTTPリクエスト
     * @param  Closure  $next     次に実行すべきミドルウェア
     * @return mixed 許可されたオリジンからのリクエストの場合は次のミドルウェアに進む。それ以外の場合は403エラーを返す。
     */
    public function handle(Request $request, Closure $next): mixed
    {
        if ($this->isReading($request) || $this->runningTests() || $this->isOriginAllowed($request)) {
            return $next($request);
        }

        // Originが許可リストにない場合はエラーレスポンスを返す
        abort(403, 'CSRFエラー: Originが一致しません。');
    }

    /**
     * データを読み取るのみで変更するのことないリクエストか否か
     * @param  Request  $request
     * @return bool
     */
    protected function isReading(Request $request): bool
    {
        return in_array($request->method(), ['HEAD', 'GET', 'OPTIONS']);
    }

    /**
     * アプリケーションがテスト中か否か
     * @return bool
     */
    protected function runningTests(): bool
    {
        // runningUnitTestsとあるが、実際はテスト環境か否かのチェックのみがされている
        return app()->runningInConsole() && app()->runningUnitTests();
    }

    /**
     * $requestのオリジンが許可リストに含まれているか否か。
     * .envファイルのAPP_URLから構築されたオリジン、及び設定ファイルに定義された追加のオリジンを許可リストとして使用する。
     * @param  Request  $request
     * @return bool
     */
    protected function isOriginAllowed(Request $request): bool
    {
        $origin = $request->headers->get('Origin');
        // .envのAPP_URLからOriginを作る
        $appUrl    = config('app.url');
        $appOrigin = parse_url($appUrl, PHP_URL_SCHEME) . '://' . parse_url($appUrl, PHP_URL_HOST);
        $port      = parse_url($appUrl, PHP_URL_PORT);
        if ($port) {
            $appOrigin .= ':' . $port;
        }
        // APP_URL以外に許可するOriginがあればここで追加する
        $allowedOrigins = [
            $appOrigin,
            // config/app.php に次のように記載したURLも許可する
            // 'allowed_origins' => [
            //     'https://example.com',
            // ],
            ...config('app.allowed_origins', [])
        ];
        // 渡されたOriginが許可したOriginに含まれているかどうかを判定する
        return in_array($origin, $allowedOrigins, true);
    }
}

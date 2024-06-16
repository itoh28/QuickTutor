<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // トークンによるCSRF対策が使われないようにする
        $middleware->removeFromGroup('web', \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
        // オリジンによるCSRF対策が使われるようにする
        $middleware->appendToGroup('web', \App\Http\Middleware\VerifyOrigin::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

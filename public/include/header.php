<?php
    // Declare site wide variables
    $site_name = 'NAME_OF_SITE';
    $site_app_name = 'NAME_OF_SITE_APP';
    $google_analytics_ua = 'UA-XXXXX-X';

?>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-title" content="<?= $site_app_name ?>">

        <!-- TODO: Meta tags -->
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="author" content="">

        <title><?= $site_name ?> | <?= $page_name ?></title>

        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="stylesheet" href="/css/app.css">

        <script src="/js/vendor/modernizr.js"></script>
        <script src="/js/vendor/jquery.js" defer></script>
        <script src="/js/polyfill/viewport-units-buggyfill.js" defer></script>
        <script src="/js/all.js" defer></script>
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create', '<?= $google_analytics_ua ?>');
            ga('send','pageview');
        </script>
    </head>
    <body>
        <main class="page-wrap <?= $page_url ?>" role="main">
            <header class="header" role="banner">
                <?php include('navigation.php'); ?>
            </header>

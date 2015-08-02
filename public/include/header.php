<?php
    // Declare site wide variables
    $site_name = 'NAME_OF_SITE';
    $app_name = 'NAME_SMALL';
    $author = 'AUTHOR';
    $google_analytics_ua = 'UA-XXXXX-X';
    $facebook_admin = '0000000000';
    $twitter_username = '@account_name';

    $page_name = '';
    $page_description = '';
    $page_keywords = '';
    $page_url = '';

    $twitter_image_path = '';
    $facebook_image_path = '';

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <!-- Responsive -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-title" content="<?= $app_name ?>">

        <!-- SEO -->
        <meta name="description" content="<?= $page_description ?>">
        <meta name="keywords" content="<?= $page_keywords ?>">
        <meta name="author" content="<?= $author ?>">
        <!--
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="<?= $twitter_username ?>">
        <meta name="twitter:title" content="<?= $page_name ?>">
        <meta name="twitter:description" content="<?= $page_description ?>">
        <meta name="twitter:image" content="<?= $twitter_image_path ?>">
        <meta name="twitter:creator" content="<?= $twitter_username ?>">

        <meta property="fb:admins" content="<?= $facebook_admin ?>">
        <meta property="og:locale" content="en_GB">
        <meta property="og:type" content="website">
        <meta property="og:title" content="<?= $site_name ?> | <?= $page_name ?>">
        <meta property="og:description" content="<?= $page_description ?>">
        <meta property="og:url" content="<?= $page_url ?>">
        <meta property="og:site_name" content="<?= $site_name ?>">
        <meta property="og:image" content="<?= $facebook_image_path ?>">
        -->

        <title><?= $site_name ?> | <?= $page_name ?></title>

        <link rel="canonical" href="<?= $page_url ?>">

        <link rel="icon" href="/favicon.ico">
        <link rel="stylesheet" href="/css/app.css">

        <script src="/js/polyfill.js" defer></script>
        <script src="/js/vendor.js"></script>
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
    <body class="page">
        <header class="header" role="banner">
            <?php include('navigation.php'); ?>
        </header>
        <main role="main">

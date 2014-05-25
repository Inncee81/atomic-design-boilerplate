<?php
	$nav = array(
		'about' => 'About',
		'contact' => 'Contact'
	);
?>
<nav class="nav" role="navigation">
	<?php foreach($nav as $url => $name) { ?>
		<a class="nav-item<?php if($page_url == $url) echo ' current' ?>" href="<?= $site_base . $url ?>/"><?= $name ?></a>
	<?php } ?>
</nav>
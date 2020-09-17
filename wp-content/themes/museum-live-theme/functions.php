<?php

function museum_files() {
    wp_enqueue_style("custom-google-font", "//fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");
	wp_enqueue_style("bootstrap", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
	wp_enqueue_style("custom-google-font2", "//fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400&display=swap");

    // scripts
    wp_enqueue_script( 'boot1','//code.jquery.com/jquery-3.3.1.slim.min.js', array( 'jquery' ),'',true );
    wp_enqueue_script( 'boot2','//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js', array( 'jquery' ),'',true );
    wp_enqueue_script( 'boot3','//stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js', array( 'jquery' ),'',true );
	wp_enqueue_style("museum_main_styles", get_stylesheet_uri());
	
	//scripts for temporary ui layout
	wp_enqueue_script('bootstrap-js', "//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js", '', true);
	wp_enqueue_script( 'jquery-for-slider','//code.jquery.com/jquery-1.11.1.min.js', array( 'jquery' ),'',true );

    
	// public
	/// FIXME: Not creating vendors
	wp_enqueue_script("vendors-js", get_theme_file_uri("/bundled-assets/vendors~scripts.920bf068e75aa8ef387f.js"), NULL, "1.0", true);
	wp_enqueue_script("museum-js", get_theme_file_uri("/bundled-assets/scripts.ef4ef82f03a0bd9df2c7.js"), NULL, "1.0", true);
	wp_enqueue_style("museum-theme", get_theme_file_uri("/bundled-assets/styles.ef4ef82f03a0bd9df2c7.css"));

	wp_localize_script("museum-js", "museumData", array(
		"root_url" => get_site_url(),
		"nonce" => wp_create_nonce("wp_rest")
	));
}

add_action("wp_enqueue_scripts", "museum_files");

function museum_features() {
	add_theme_support("title-tag");
	add_theme_support("post-thumbnails");
	add_image_size("entry-thumbnail", 500, 500, true);
}

add_action("after_setup_theme", "museum_features");

function museum_post_types() {
	register_post_type("entry", array(
		"show_in_rest" => true,
		"supports" => array("title", "editor", "excerpt", "thumbnail"),
		"rewrite" => array("slug", "entries"),
		"has_archive" => true,
		"public" => true,
		"labels" => array(
			"name" => "Entries",
			"add_new_item" => "Add New Entry",
			"edit_item" => "Edit Entry",
			"all_items" => "All Entries",
			"singular_name" => "Entry"
		),
		"menu_icon" => "dashicons-calendar"
	));
	register_taxonomy_for_object_type("post_tag", "entry");
}

add_action("init", "museum_post_types");

//Redirect subscriber's account
add_action("admin_init", "redirectSubsToFrontend");

function redirectSubsToFrontend() {
    $ourCurrentUser = wp_get_current_user(); 
    if (count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == "subscriber" ) {
          wp_redirect(site_url("/"));
          exit;
     }
}

add_action("wp_loaded", "noSubsAdminBar");

function noSubsAdminBar() {
    $ourCurrentUser = wp_get_current_user(); 
    if (count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == "subscriber" ) {
          show_admin_bar(false);
     }
}

//customize login screen
add_filter("login_headerurl", "museumHeaderUrl");

function museumHeaderUrl() {
    return esc_url(site_url("/"));
}

add_action("login_enqueue_scripts", "museumLoginCSS");

function museumLoginCSS() {
    wp_enqueue_style("museum_main_styles", get_theme_file_uri("/css/modules/login.css") );
}

function museum_custom_rest() {
	register_rest_field("entry", "media", array(
		"get_callback" => function() {return [];}
	));
}

add_action("rest_api_init", "museum_custom_rest");

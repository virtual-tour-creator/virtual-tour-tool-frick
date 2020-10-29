<?php

function museum_files() {
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

function museum_custom_rest() {
	register_rest_field("entry", "media", array(
		"get_callback" => function() {return [];}
	));
}

add_action("rest_api_init", "museum_custom_rest");

function create_ACF_meta_in_REST() {
    $postypes_to_exclude = ['acf-field-group','acf-field'];
    $extra_postypes_to_include = ["page"];
    $post_types = array_diff(get_post_types(["_builtin" => false], 'names'),$postypes_to_exclude);

    array_push($post_types, $extra_postypes_to_include);

    foreach ($post_types as $post_type) {
        register_rest_field( $post_type, 'ACF', [
            'get_callback'    => 'expose_ACF_fields',
            'schema'          => null,
       ]
     );
    }

}

function expose_ACF_fields( $object ) {
    $ID = $object['id'];
    return get_fields($ID);
}

add_action( 'rest_api_init', 'create_ACF_meta_in_REST' );


//Enqueue Theme JS with React Dependency
add_action( 'wp_enqueue_scripts', 'my_enqueue_theme_js' );
function my_enqueue_theme_js() {
  wp_enqueue_script(
    'my-theme-frontend',
    get_stylesheet_directory_uri() . '/build/index.js',
    ['wp-element'],
    null,
    true
  );
}

